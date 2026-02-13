---
title: "Chrome Just Dropped Web MCP (and That’s Kind of a Big Deal)"
excerpt: "Chrome added experimental Web MCP support, What does it mean for the future of User Interaction?"
date: "2026-02-10"
tags:
  - WebMCP
  - Agents
  - Generative-UI
readingTime: "8 min read"
---

The Chrome team announced experimental support for Web MCP landing in Chrome 146

{% twitter 2020903127428313461 %}

WebMCP is one of those things that sound super niche… until you realise it’s implications for the future of user / machine interaction are bigger than you think!

> *“agents can now use the web like we do, but faster and more efficiently!”* 🤖

But wait... Ai agents can already use websites today using automation tools like Playwright or Puppeteer, so what's the problem?

- We’ve spent decades polishing UX for humans.
- Now suddenly Agents are using UX that wasn't built for them!

---

## What even is Web MCP?

I would like to explain this with a great video I found of a Robotic Arm landing a plane!

{% youtube https://youtu.be/WkbIGjYwKA0 %}

It works! but it is not efficient because the machine is using human controls... a more efficient way is let the computers control the plane directly (autopilot) because the computer doesn't need levers and buttons like humans do.

So Web MCP is basically a plane **autopilot for the web**. It allows web application to expose functionality as "tools" with natural language descriptions and structured schemas that can be invoked by AI agents. This interaction model is more efficient than expensive and brittle direct DOM manipulation.

> Yes web automation... like Playwright but removing the workarounds and "DOM levers" and creating a better standardised **Agent Experience**

---

## I’ve been playing with this concept since “February last year” (~ 7 Ai years ago)

Last February at Postman (Which in AI time is… basically a geological era. 😅) one of my colleagues created a POC where he connected the Postman User Interface to Cursor via MCP.

{% twitter 1950588464480555218 %}

The way this worked was by exposing an MCP Server in our Electron Desktop application that agents could connect to directly. The tools exposed had callbacks that performed side effects on the UI (opening a new tab, sending a request, typing in an input box)

The limitation here is that we needed a "server" to expose the tools and this server had to be connected to a running local instance of the application.

**Web MCP solves the need for a server** and let's the frontend (JavaScript) register these tools. The concept is very similar to our POC and also is very heavily inspired by MCP itself.

---

## Demo vibes: “driving the UI” is cool, but what's the end game here?

Yes, watching an agent drive a UI is cool.  
Yes, it makes for great tweets.  
Yes, it feels a bit like magic the first time.

But the real question is:

**What does this mean for the future of user interaction?**

Because this isn’t just a new automation trick; it’s a **bridge** toward the kind of human machine collaboration I’m envisioning. Web MCP isn’t the destination, but it makes the transition possible.

---

## The mobile boom déjà vu

I remember when the iPhone exploded in the late 2000s, suddenly every business had a hard choice:

> Make your site mobile-friendly... Or slowly leak users and revenue

The funny part? We *still* have websites in 2026 that are not mobile friendly! and work only on desktop and internal enterprise tools are the slowest worst offenders.

So when people say:

> “Every website will just add AI / agent support.”

Or in this case... **every website will add WebMCP support**... My reaction is: maybe. But also… **probably not.**

Web MCP is exciting. I just don’t think the future is to “retrofit every website with agent UX.”

---

## The real shift: Collapsing Layers

My version of the future of user interaction is all about **collapsing layers**.

Less:

- Human → Agent → UI → Backend → Database

More:

- Intent → System → Result

Sometimes with a UI.  
Sometimes without.  
Sometimes with a UI that’s more like a *visualisation* than a control surface.

Let me break this into three buckets.

---

## 1) Some websites (and UIs) just… shouldn’t exist

Hot take, but:

> “The best interface is no interface.”

If something the OpenClaw craze taught us is that Agents today can "**just do things**"

If an agent can:

- Call an API directly
- Or fetch structured data
- Or trigger a workflow

…then why making it click through 7 screens of UI? Or call 7 different client side tools? that is just latency with extra steps? Those steps were needed for humans, but machines can get the job done without the extra fluff.

However...

This doesn’t mean **all** UI disappears.

Sometimes:

- A button click is faster than a prompt
- A form is safer than a fuzzy instruction
- A visual overview beats a wall of text

The reality is: UI becomes *optional*, not default.

---

## 2) Go straight to the API (because agents can actually do things)

Everything is an API.  
Or at least, everything *should* be.

{% twitter 2020049883311534415 %}

WebMCP is great and much better than the current browser automation tools, but in a hypothetical world where architecture is not purely driven by tradeoffs, costs and business constraints...

Then the more interesting future is:

- Agent talks to the backend API directly
- Backend exposes real capabilities
- Frontend becomes a reactive, visual layer

Think:

- Sync engines
- Local First - state-driven UIs
- The UI as a projection, not the source of truth

The UI is no longer “the thing you operate.”  
It’s “the thing you look at while things happen.”

But what about "client state"?

I don't think there will be a huge portion of surviving "client only state", it will either not be needed or there will be alternatives like "Local first" with a sync engine.

This future is elegant and exciting... I can only dream!

---

## 3) True human machine collaboration

This is the part I’m actually most excited about. Not everything is just a visualisation or an action.

Not:

> “You do everything for me.”

But:

> “You do some things. I do some things. We meet in the middle.”

I think we’ll see the rise of:

- Ai native apps
- Interfaces designed *for* machine / human collaboration
- Tools where the agent and the human share context, state, and intent

Not just automation. Not just chat. Not just pretty visualisations.

More like a shared workspace with two kinds of brains in it. A native collaborative canvas.

A great example of this direction is the recent release of the Excalidraw MCP App:

{% twitter 2021284377506742331 %}
I love this example because it is where I see the most value in Ui that is not just useful but crucial to unlock the power of machines that will come from a combined collaborative effort.

---

## How Web MCP fits into this

If the sections above sounded like I was arguing *against* Web MCP, here’s the twist: I’m not. I’m arguing that it’s a **necessary bridge**, a needed improvement, not the destination. It’s how we move from today’s click-driven web to a world of capabilities, APIs, and collaboration. And we can do it without waiting for a perfect rewrite that’s unlikely to happen anytime soon.

WebMCP is the perfect tool to align the current web with the new reality of not just humans consuming it.

But the future of the web and the future of user interaction goes beyond what we can imagine today. Ask someone in the 20s to describe what the future would look like in 100 years because we’re famously bad at predicting real discontinuities they would paint a picture that resembles their current understanding of the world... not today's reality where machines became a fundamental part of our lives.
