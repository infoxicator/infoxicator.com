---
title: "Verification Loop Debt Is the New Tech Debt"
excerpt: "When people I respect keep saying the same thing, I pay attention. A strong verification loop is more than testing, and without it even the best coding agents fall apart."
date: "2026-02-18"
tags:
  - AI
  - Agents
  - Verification
readingTime: "8 min read"
---

When I hear a similar opinion coming from multiple people I admire, I pay attention immediately.

Gergely Orosz, Sunil Pai, Ryan Lopololo have been going on about "verification loops"

Sunil Pai's great article [where good ideas come from (for coding agents)](https://sunilpai.dev/posts/seven-ways/), is that agents only become reliably useful when you give them constraints, context, an oracle, and a loop. Teams with a solid verification culture get leverage. Teams without it get a "chaos multiplier".

My mind went to testing, of course. Tests, CI, the usual stuff. But good agent verification is more than testing.

---

## What's a strong verification loop?

its is how a team takes human context, a snapshot of the system, and commits it to long term storage.

So the next person, or the next machine, can see the state, understand why it is that way, and change it without breaking everything.

That includes:

- Testing 101, the boring stuff that still works
- Not asserting on implementation details
- Code reviews
- The context we leave behind for the next run
- the codebase itself!

To make LLMs produce the desired outcome, you need to let them verify their own work.

---

## Agent Loops without verification doesn't work

There is a lot of excitement around long running agent loops. Let the model try, fail, try again, until something passes.

But a loop with nothing trustworthy to check against is just an expensive way to set tokens on fire.

The model can "guess" and come up with a pausible solution, because it never had a clear signal for “this is actually correct.” and when it is "done", it produces that a "guess".

---

## Why LLMs are so good at software?

One of the reasons LLMs are so good at coding is that they can verify their work automatically. Run the tests. Typecheck. Lint. Start the app. See if it compiled. See if the assertion failed.

Other sciences do not get that for free. They need more manual verification and a human in the loop. Us software engineers got lucky (or unlucky?). We already had base line verification like a compiler, the test suite, etc.

---

## Two pyramids

If you have been in software for a while, you probably seen the testing pyramid like this:

![The testing pyramid](/images/posts/verification-loop-debt/classic-testing-pyramid.png)

That is the shape Martin Fowler proposed: Lots of cheap unit tests at the bottom. A smaller pile of integration tests in the middle. A thin layer of end to end tests at the top, because those were slower, flakier, and more expensive.

The model was about test types, and about where to spend your time. As you go up the pyramid, you write fewer tests.

Then Kent C. pushed on that shape. His [testing trophy](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications) said the real return was not in hoarding unit tests. It was in integration tests, the ones that give you more confidence for the time you spend. Static checks at the base, some unit tests, a big middle of integration, and fewer end to end tests at the top. Write tests. Not too many. Mostly integration.

Then later applied to the Ai agents era by [Angie Jones wrote at Block](https://engineering.block.xyz/blog/testing-pyramid-for-ai-agents) about a testing pyramid for AI agents.

The levels in the pyramid shifted, they are no longer about unit versus integration versus E2E. They are about how much uncertainty you are willing to tolerate.

At the bottom, they still ask a simple question: did we write correct software? Mock the model. Keep it deterministic.

In the middle they record reality and replay it. Real tools. Real MCP sessions. Not because they trust the outside world to stay still, but because you want a fixture they can check against.

Higher up, a single run tells you almost nothing. They measure success rates over many runs.

And at the top they even test vibes on purpose, with rubrics and a judge, because if they do not, their users will

---

## The bottleneck moves

Here is my prediction:

As we get better at writing tests that are actually worth running, the bottleneck will not be inference anymore.

It will be compute. CI/CD. The unglamorous infrastructure that has to execute all of that verification, again and again, every time something changes.

![The bottleneck moves from inference to compute, CI/CD, and infrastructure](/images/posts/verification-loop-debt/verification-bottleneck.png)

You save tokens, which is great. You stop burning money asking the model to guess whether it was right.

But you create a different bottleneck. The loop still has to run somewhere. Pipelines get slower. Runners get more expensive. Someone has to pay for the machines that keep the loop running.

---

## The new debt

**Hot take:** tech debt does not exist anymore, producing software of good quality is cheaper than ever, migrating to a new language is now possible in days not months.

The messy code is still there. But the debt that actually hurts you now is verification loop debt. It is the missing test,  the review nobody wrote down. The context that lived in someone’s head and never made it into the repo. The CI that is green because it is testing the wrong right thing, and the actual thing that is broken is there, untested.
