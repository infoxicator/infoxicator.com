---
title: "Verification Loop Debt Is the New Tech Debt"
excerpt: "When people I respect keep saying the same thing, I pay attention. A strong verification loop is more than testing, and without it even the best coding agents fall apart."
date: "2026-01-08"
tags:
  - AI
  - Agents
  - Verification
readingTime: "6 min read"
---

When I hear a similar opinion coming from multiple people I admire, I pay attention immediately.

We are onto something.

I heard similar takes from Gergely Orosz and Sunil Pai.

Gergely put it bluntly in a [LinkedIn post](https://www.linkedin.com/posts/gergelyorosz_how-it-started-ai-vibe-coding-tools-will-activity-7353807156850171905-kr-p): “Never trust the agent; verify every step it takes.”

Sunil’s version, in [where good ideas come from (for coding agents)](https://sunilpai.dev/posts/seven-ways/), is that agents only become reliably useful when you give them constraints, context, an oracle, and a loop. Teams with a solid verification culture get leverage. Teams without it get a chaos multiplier.

My mind went to testing, of course. Tests, CI, the usual safety net. But verification is more than testing.

---

## What I mean by a strong verification loop

A strong verification loop is how a team takes human context, a snapshot of the system, and commits it to long term storage.

So the next person, or the next machine, can see the state, understand why it is that way, and change it without breaking everything.

That includes:

- Testing 101, the boring stuff that still works
- Not asserting on implementation details
- Code reviews
- The context we leave behind for the next run

LLMs need our context to produce the desired outcome. Without it they will happily produce something that looks finished and is not.

---

## Ralph without verification does not work

There is a lot of excitement around long running agent loops. Let the model try, fail, try again, until something passes.

Here is the thing. A loop with nothing trustworthy to check against is just an expensive way to wander.

Ralph Wiggum without verification does not work.

The model can repeat itself forever and still miss the point, because it never had a clear signal for “this is actually correct.”

---

## Why coding agents look so good

One of the reasons LLMs are so good at coding is that they can verify their work automatically.

Run the tests. Typecheck. Lint. Start the app. See if it compiled. See if the assertion failed.

Other sciences do not get that for free. They need more manual verification and a human in the loop. Software got lucky. The compiler and the test suite are a built-in critic.

That maps to what Block described in their post on a [testing pyramid for AI agents](https://engineering.block.xyz/blog/testing-pyramid-for-ai-agents). The layers are no longer just about unit, integration and UI. They are about how much uncertainty you are willing to tolerate. The bottom still asks a simple question: did we write correct software? Higher up, a single run tells you almost nothing. And at the top they even test vibes on purpose, because if they do not, their users will.

If the agent can run the checks, the quality of those checks becomes the whole game.

---

## The new debt

Hot take: tech debt does not exist anymore.

Okay, that is a slight exaggeration. The messy code is still there.

But the debt that actually hurts you now is verification loop debt.

It is the missing test. The review nobody wrote down. The context that lived in someone’s head and never made it into the repo. The CI that is green because it is not looking at the right thing.

You can generate code faster than ever. You cannot generate trust that fast, not unless the loop is strong.

---

## Final thought

If people I respect keep circling the same idea, I do not think it is a coincidence.

Build the loop. Store the context. Let the machines check their own work, then check the checker.

Otherwise we are just shipping vibes.
