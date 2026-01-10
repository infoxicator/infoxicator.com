---
title: "My Poor Man's AI Coding Setup (Jan 2026)"
excerpt: "A practical tour of my AI coding setup: Codex, Claude Code, IDE extensions, and CLIs, plus Ralph loop coding, verification loops, and the realities of shipping production software."
date: "2026-01-10"
tags:
  - AI
  - Agents
  - Tooling
readingTime: "9 min read"
---

For the past few weeks, My timeline has been filled with a lot of developers showcasing (and showing off) the projects they built during the holidays using claude code and the insane progress and that both Opus 4.5 and Codex 5.2 have made to **"solve software engineering"**

{% twitter 2009161942339080204 %}

If you feel FOMO, overwhelmed, don't know where to start... **you are not alone!** This stuff is moving so fast that is normal to feel a bit of whiplash... but fear not, this piece of advice is still very relevant:

> **Keep it simple… just talk to it!**

Here is the current way I build with Ai at work, this is what works for me... for **production code** that cannot be "slop", that needs to be reviewed and approved by co-workers and that has to deal with the realities of production software, like large brownfield codebases, trade offs, business priorities and tech debt...

> This is not a guide... all of these are subjective and matter of preference


## My Setup
I use **both Codex and Claude Code** and use them in parallel or interchangeably depending on the task.

I use the VSCode / Cursor IDE **extensions** one on each side, easier to add context and see the code and make adjustments. 

I rarely use Cursor Agent Mode or Composer these days. (Even if you use Opus 4.5 there, **the harness matters** and I get better results with Claude Code CLI or the extensions). 

There are still some features in Cursor that I find handy, like browser editing especially useful for frontend coding.

I run both at the same time on different parts of the code or a complementary task and often ask Codex to review Claude’s work and make changes to it with follow up prompts.

![How my IDE looks like](/images/posts/my-poors-man-ai-coding-setup/extensions.png)

*IDE Extensions! Blasphemy! Get out of here! 😂 stay  with me!*

### Codex GPT 5.2 (thinking high)

Codex doesn’t require a lot of context, planning or complex prompts it usually gets it right first time with the right pointers but it is **very, very slow!**

**I use it mostly for complex tasks that require deep thinking:**

- Complex bugs

- Strong types 

- Strong data accuracy (convert or scrape data without hallucinations)

- Code review

- Refactors.

- Explaining the codebase or the code

### Favourite Follow up Prompts:

- Is there anything we should refactor?

- Simplify this file

- This works but are there any maintenance, security, architecture issues

- This works but is there a better way of achieving the same outcome? show me options

### Claude Code / Opus 4.5

Claude Code with Opus 4.5 is very fast and accurate. It sometimes requires more handholding than codex. It will be very eager to start implementation and will sometimes ask you questions and add a “plan”. You can also trigger “plan mode” and create it manually. I have mixed results using plan mode, I like it, but for established codebases I prefer smaller encapsulated changes + Codex usually works better even without a plan.

**I use it for most coding tasks:**

- New features 

- Adding tests / types

- Creating React Components

- Quick prototypes

**Favourite Prompts:**

- Design an interface for a library

- Implement a similar method based on this pattern

- Create a component to do X (it will one shot it with great UX)

- Rename this function / file and update all references and tests

## Claude Code and Codex CLIs

![Claude and Codex CLIs](/images/posts/my-poors-man-ai-coding-setup/claude-codex-cli.png)

I also have the CLIs installed! Allegedly they have a more powerful harness and some features make it first to the CLIs and the IDE extensions lag behind.

Working with the IDE extensions is a single threaded task where you need to steer the models constantly, look at every single line of code produced, make inline changes to the code test and verify. The limitation is you can only have one concurrent session at the time (unless you clone the repo into different folder and have a separate IDE window, which I do sometimes)

With the CLIs you can do more **parallel hands off work** (don’t confuse this with “Vibe coding” you still need to verify, read the code and ensure it does what is intended) 

They also require you to think about conflicts and branching / worktrees stuff if you have them working concurrently on the same codebase. Surprisingly sometimes they stay clear of each other but is not always the case. I find this a faff and avoid it unless I really want to push to do a lot of things at the same time.

**Not all types of work and repositories are suited for parallel coding with CLIs**

### I have found them useful in the following cases:

- Throw away POCs

- Migrations (see Ralph Loop coding)

- As a starting point before transferring to hands on in the editor

- Well defined work in projects with strong verification loops (tests)

## Ralph Loop Coding

The technique everyone is talking about... I started experimenting with it and it seems like the end game for hands off / parallel automated work. 

Codex is really good at one shot single prompt small migrations but for longer, more complex and repeatable tasks (think what codemods used to do poorly) running the CLIs in a loop could produce incredible results. 

The trick is to make the model work on one single thing at the time stopping, starting a new session (after committing and saving context), picking the next thing and so on. effectively **“hacking the context window”**. The main prerequisite is a **strong verification loop (tests)** a well defined problem with a clear outcome and a very detailed plan (PRD style doc) that splits the work into small chunks. without these, this technique is not only not effective at all but also very **wasteful and token inefficient!**

I tried the claude code built-in plugin... and was very disappointed! It kept **killing my memory** even when restarting and during the first iteration!

{% twitter 2008511712060993564 %}

But the Claude plugin doesn't make it justice... If you want to see the comparison between the two and really understand the subtle but big difference when running the loop inside the harness vs outside watch this great video from Chief Wiggum himself, creator or Ralph:

{% youtube https://www.youtube.com/watch?v=O2bBWDoxO4s %}

## Miscellaneous / Tips and Tricks

- **What about MCPs?** (use them only when needed. i.e the chrome / playwright when writing frontend code, Context7 for documentation etc)

- **What about Cursor Rules, Agents.md, Claude.md?** Models are getting better at finding the right context themselves but if they keep making the same mistake over and over, then it is time to add it to the .MD rules files. (theres' a nice gh action that could be triggered during code review to update those)

- **Voice Mode:** I started using Wisprflow more but still like typing so I can order my thoughts 

- **Context Window:** you shouldn’t worry too much these days (Codex is very good, Claude has auto-compact) but I recommend starting a new session as many times as possible to reset your context window (without loosing context of course)

- **Automate repetitive tasks:** Claude Code supports slash commands and subagents to automate repetitive tasks (push commit, review, tests etc)

## Caveats / Constraints Working with Production Software

The way I use AI to code on a greenfield project, differs significantly from coding on old / production codebases. Models can now work effectively in large codebases, but there are constraints we should aware of and improvements to the code itself that you can make and could increase speed and output considerably.

### Spaghetti Code

Models that have to traverse large parts of unrelated code bloats the context window, is slow and token inefficient. Reducing circular dependencies and encapsulating components, functions, modularity, great boundaries and architecture has ever been more important!

If your application is rotten, it will also rot your context!

### To Rewrite or Not Rewrite

When models context windows fill, they use something called **"context compaction"**. I can use the same analogy with old codebases, when they fill up with tech debt and old decisions that are no longer relevant, sometimes is better to capture the intent, summarise the current state and commit it into a new session (some people call this a "rewrite") and guess what! it's never been cheaper to rewrite something!

### Missing Verification Loop

Models that cannot verify their work, require more steering and cannot work continuously. Human verification is ever more important but that verification needs to be committed and saved (via tests, lint rules, type checking, agent context) for future changes. Models are very good at writing tests! but they will not replace the true verification which is when humans decide if the system is "correct" or not.

### Testing Chicken and Egg paradox

Code that is not modular is hard to test, missing tests break the verification loop which produces code that is difficult to change and test. To break this vicious cycle, the code needs to be tested (human verified and that committed) and closing the verification loop to ensure new code and improvements can be safely added by humans and coding agents in the future.

### Code is not the bottleneck anymore, verification is!

> “If your pull request doesn’t contain evidence that it works, you’re not shipping faster - you’re just moving work downstream”  - Addy Osmani

Agents can produce reliable code fast, ensuring that code is correct and it does what is intended without breaking the rest of the system is now the bottleneck. The major culprits include code reviews, manual testing and slow automated testing. Improvements to spedup and unblock these areas will improve the velocity of shipping code to production.

### The Kitchen Sink paradox
Models are like humans if they see a dirty sink they will just add another plate on top!. Models will not refactor and make the code better unless you tell them to. Every time you make a change, also ask the model to ship an improvement to that part of the code especially around verification loops (test, types etc)

### Risk of change is a limiting factor

Code is cheap now, we should try more things and not be afraid of significant changes and improving existing code just because it is “old” or too long / complex to understand. The problem with changing too many things in a established codebase / product is the risk of regressions. Tight verification loops are key and could mitigate the risk. But even with excellent testing practices (which are rare) more code, more changes, means more bugs, more risks which businesses need to accept.

## Conclusion

You are not behind, keep it simple, just give it a go and improve everyday... anyway... it sounds better when it comes from Sunil:

{% twitter 2007842239012126805 %}



## Recommended Reading

[Boris Claude Code Setup](https://x.com/bcherny/status/2007179832300581177)

[where good ideas come from for coding agents](https://sunilpai.dev/posts/seven-ways/)

[Just Talk To It - the no-bs Way of Agentic Engineering](https://steipete.me/posts/just-talk-to-it)

[How to Ralph](https://www.aihero.dev/tips-for-ai-coding-with-ralph-wiggum)

[AI writes code faster. Your job is still to prove it works](https://addyosmani.com/blog/code-review-ai/)
