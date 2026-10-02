---
title: "The obvious future of generative UI is probably wrong"
excerpt: "After my AI Engineer Europe talk, I want to expand on the part I rushed at the end: full generative UI, why it is not ready for every app, and why the real future might be collaborative artifacts instead of floating Jarvis windows."
date: "2026-06-15"
tags:
  - AI
  - Agents
  - UI
  - MCP
readingTime: "9 min read"
---

At AI Engineer Europe I gave a talk about generative UI.

The main point was simple: models are now good enough at writing front-end code that the interesting question is no longer "can AI build UI?"

It can.

Sometimes annoyingly well.

The better question is: **how much of the interface should the model control?**

In the talk I split this into three levels:

1. Static components: the model fills props.
2. Declarative UI: the model writes a schema.
3. Generative UI: the model writes the interface itself.

The last part is the one I want to expand on because it is where the conversation gets weird, expensive, and fun.

Also, this is where people start imagining Jarvis.

Floating windows everywhere. Holograms. UI materialising in front of you like Tony Stark ordered a dashboard from Deliveroo.

Hot take: that is probably the least interesting version of the future.

## The obvious future is too obvious

When a new medium appears, we usually start by copying the old one.

Early TV was basically radio with cameras.

The shape of the old medium survives because it is the only thing people know how to make. Then slowly, painfully, sometimes by accident, the new medium finds its own language.

I think AI UI is in that awkward phase.

We have this new computer. The model can reason, plan, write code, see images, call tools, and hold context across a workflow. But the interface language is still immature.

So we do the obvious things:

- We put chat inside every product.
- We put product widgets inside chat.
- We ask where the floating windows are.
- We recreate dashboards, forms, tables, and cards, but now with an agent somewhere in the loop.

None of this is bad. Most of it is useful.

But it also feels like radio with cameras.

The obvious prediction is that the future of generative UI is "the model generates your app screen on demand."

You ask for something, the model writes HTML, CSS, JavaScript, maybe React, and boom, custom UI.

That will happen.

It is already happening.

But I do not think that is the final form.

## What I mean by full generative UI

People use "generative UI" to mean a lot of different things.

Sometimes they mean the agent returned a chart.

Sometimes they mean the model chose a component from a known catalog.

Sometimes they mean a JSON renderer took a schema and mapped it to existing components.

All useful. All valid in normal conversation.

But when I say **full generative UI**, I mean something narrower:

> The model generates the actual interface code at runtime.

Not just data.

Not just props.

Not just a JSON description mapped to your design system.

The model creates the component, the layout, the styling, the interaction, and maybe the tiny bit of client-side logic needed to make it useful.

HTML is the obvious starting point because it is the universal UI assembly language of the web. This is why I really liked the Claude Code team post on [the unreasonable effectiveness of HTML](https://claude.com/blog/using-claude-code-the-unreasonable-effectiveness-of-html). The argument is not "Markdown is dead" or some silly format war. The interesting part is that HTML is a much richer agent output format.

It can be a document, a dashboard, a mini tool, a prototype, a report, a diagram, an editor.

In other words: an artifact.

And artifacts are where this starts to get interesting.

## The demo version is easy

In my talk I showed a tiny weather demo.

The agent gets the weather from an API, asks another model to generate an interface for it, then returns raw HTML, CSS, and JavaScript to be rendered in an MCP app sandbox.

I could ask for:

"Show me the weather in Paris, Windows 95 style."

And it would create a small weird weather card with a joke and some styling that looked like it had been dug out of a floppy disk.

That demo is not impressive because the world needs more weather widgets.

Please, no.

The interesting bit is that the weather widget did not exist before the request.

There was no React component waiting for the right props. There was no design system mapping. There was no chart catalog.

The model generated the actual UI on demand.

That is the shift.

## The production version is not easy

Now for the annoying part.

Full generative UI has three immediate problems:

1. Cost
2. Speed
3. Consistency

There are more, of course. Security. Accessibility. Testing. Observability. Caching. Versioning. Taste. The usual software engineering parade of "oh no, reality exists."

But cost, speed, and consistency are the first wall you hit.

### Cost

Generating real UI code is token hungry.

A model writing a decent HTML artifact is not just returning `"temperature": 18`.

It is writing layout, styles, content, maybe scripts, maybe accessibility labels, maybe sample data transformations. That gets expensive quickly if you do it for every interaction.

Shaun's [Birch HTML benchmark report](https://evalstate-birch-html.hf.space/analysis/report.html) is a useful reality check here. What I like about it is not a single leaderboard number. It is the shape of the evaluation: completion, render checks, screenshot-based visual smoke tests, tokens, wall time, and tool calls.

That is exactly what this category needs.

If we are going to generate interfaces, we cannot only ask "does it look cool?"

We also need to ask:

- Did it render?
- Did it fit the viewport?
- Did it overflow?
- Did the controls work?
- How many tokens did it burn?
- How long did the user wait?
- Can we reproduce it when something goes wrong?

Very boring questions.

Also the questions that decide whether something ships.

### Speed

People tolerate waiting for a big artifact.

They do not tolerate waiting for every button.

If I ask an agent to analyse a codebase and produce an interactive report, I will happily wait a few seconds longer for a better artifact.

If I click "edit billing address" and the system pauses to contemplate the metaphysics of a form field, I am gone.

This is where generative UI needs a sense of scale.

Not every interaction deserves generation.

Some things should be boring, cached, deterministic, and instant.

The stack matters less than knowing which parts of the experience should be alive.

### Consistency

This is the one product people will care about most.

If you are Airbnb, Booking.com, Ticketmaster, Stripe, Postman, or any product where trust matters, you probably do not want the checkout button to appear on the left today and inside a spinning glass cube tomorrow.

Brand is not just colors.

Brand is familiarity.

It is where the button is.

It is the rhythm of the page.

It is knowing that the user can come back tomorrow and not feel like the product had a personality transplant overnight.

This is why I think declarative UI is the sweet spot for many real products today.

The model gets freedom to decide structure, but the rendering stays inside constraints.

It can generate JSON, YAML, Remote DOM, a schema, whatever. Then your renderer maps that to components, tokens, spacing, accessibility, and interaction patterns you already trust.

Less magic.

More useful.

## So when does full generative UI make sense?

Here is the short version:

Full generative UI makes sense when the value of a personalised surface is higher than the cost of generating it.

That sounds obvious, but it filters a lot.

I would not use full generative UI for:

- Login screens
- Checkout flows
- Settings pages
- Repeated admin workflows
- Anything regulated where consistency and auditability matter more than flexibility

I would absolutely explore it for:

- One-off analysis reports
- Visual explanations
- Data exploration
- Custom editors for a temporary task
- Prototypes
- Long-tail workflows that would never justify a hand-built screen
- Shared artifacts between a human and an agent

That last one is the big one.

## The future is not generated screens. It is generated workspaces.

The most interesting generative UI is not "make me a prettier answer."

It is "make me a place where we can work on this together."

This is why tools like [Flipbook](https://flipbook.page/) are interesting to me. The description is an "infinite visual browser generated entirely on demand in real time." That phrase sounds like a sci-fi product manager got loose, but the idea is important.

The interface is not a fixed destination.

It is a generated environment.

You do not just receive an output. You move through a generated space, inspect things, branch, compare, edit, and continue.

That maps much better to how agents actually help.

The agent should not only answer:

"Here is your report."

It should create the right surface for the next action:

- A comparison table when you need to decide.
- A timeline when sequence matters.
- A form when the next step requires structured input.
- A canvas when the idea is spatial.
- A simulator when parameters need tuning.
- A mini editor when text is not precise enough.

This is where I think the "Jarvis window" metaphor falls short.

Floating windows are still windows.

They are old UI with a bit of sci-fi perfume.

The more interesting future is a generated workspace that exists for the task, keeps the human in the loop, and disappears or evolves when the work changes.

## The artifact is the interface

The current AI product pattern is:

1. User asks something.
2. Agent thinks.
3. Agent replies with text.
4. Maybe a widget appears.

The next pattern might be:

1. User starts with intent.
2. Agent creates an artifact.
3. Human edits, clicks, drags, filters, annotates, or corrects it.
4. Agent uses those changes as context.
5. The artifact evolves.

That is a very different interaction model.

It is not chat versus UI.

It is not static versus generated.

It is a shared object.

This is why whiteboards, canvases, spreadsheets, diagrams, and editors matter so much. They are not just outputs. They are places where thinking happens.

A generated UI that only displays an answer is nice.

A generated UI that lets me steer the next step is much more powerful.

## MCP apps are a good delivery mechanism

If the model is generating interface code, you need a boundary.

You need containment.

You need sandboxing.

You need message passing between the UI and the agent.

You need auth and tool calls to be handled in a way that does not turn every generated widget into a tiny security incident.

This is why MCP apps matter.

Not because "MCP apps are generative UI." I do not think that is the right framing.

MCP apps are a delivery mechanism.

They are useful because they give us a sandboxed place to render interactive UI, whether that UI is first-party, third-party, declarative, or fully generated.

For full generative UI, that sandbox becomes even more important.

If I do not trust arbitrary third-party JavaScript, I definitely should not blindly trust JavaScript a model invented 400 milliseconds ago after reading my calendar.

The sandbox is not an implementation detail.

It is the product boundary.

## My prediction

I do not think most apps will become fully generated.

At least not in the short term.

The reliable parts of software will stay reliable. Checkout pages, account settings, core workflows, enterprise admin panels, the stuff where users need muscle memory and companies need compliance.

But around those reliable cores, we will see a new layer of generated artifacts.

Reports that are not just reports.

Dashboards that exist for one investigation.

Forms that assemble around the user's goal.

Editors that are created for one messy piece of data.

Canvases where a human and an agent can negotiate the shape of an idea.

That is the future I am more excited about.

Not "every screen is generated."

More like:

> Every task can get the interface it deserves.

Sometimes that interface is a boring button.

Sometimes it is a schema-rendered component.

Sometimes it is a full generated workspace.

The trick is knowing the difference.

## The decision framework

If you are building this stuff today, I would use a simple rule:

Move left when you need reliability.

Move right when you need imagination.

Static components are great when the workflow is known.

Declarative UI is great when the workflow is dynamic but the product surface needs control.

Full generative UI is great when the task is novel, temporary, exploratory, or too specific to justify a permanent screen.

That is the spectrum.

Not everything needs to be generated.

But more things can be generated than we used to think.

And that is the fun bit.

## Final thought

We are still in the radio-with-cameras phase.

Chat everywhere is part of that.

Widgets inside chat are part of that.

Generated weather cards in Windows 95 style are definitely part of that.

But the medium is starting to show its own shape.

I do not think the future of UI is just prettier AI outputs.

I think the future is collaborative, temporary, personalised workspaces generated around intent.

Less Jarvis.

More "make me the right tool for this exact moment."

And yes, sometimes that tool will probably have a ridiculous gradient and one button in the wrong place.

Ship it, learn, constrain it, and try again.
