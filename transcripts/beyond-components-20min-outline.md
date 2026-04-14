# Beyond Components: 20-Minute Rewrite

## Core Thesis

LLMs are already good enough to generate useful interface code. The real design question is no longer "can AI build UI?" but "how much of the interface should the model control?" The answer is not binary. There is a spectrum:

1. Static components: the model fills data and parameters.
2. Declarative UI: the model chooses structure from a constrained language.
3. Generative UI: the model authors the interface itself.

The job of the builder is to choose the right level of freedom for the task.

## What Changes From The Original

- Shorter intro, much faster arrival at the thesis.
- One clean through-line instead of multiple side branches.
- Stronger product framing: when each pattern wins.
- Q&A insights moved into the main talk.
- More concrete examples at the end.
- Less taxonomy debate, more decision-making guidance.

## 20-Minute Structure

### Slide 1 - Title

**Title:** Beyond Components  
**Subtitle:** Choosing how much UI an LLM should generate

**Time:** 0:00-0:20

**Speaker notes:**

"I want to talk about something very specific: not whether AI can write front-end code, but how that changes the way we design interfaces."

---

### Slide 2 - Hook: The Capability Shift

**Title:** Two prompts changed my mental model

**Visual:** Side-by-side
- 2023: "build a loading component"
- 2025: "build a search bar"

**Time:** 0:20-1:40

**Speaker notes:**

"Two years ago I asked a model to build a loading component. I was impressed it compiled.  
Last year I asked for a search bar with almost no guidance, and I shipped it.  
That changed the question for me.  
If models can already write UI this well, why are we still surrounding them with mostly static interfaces?"

**Why this works better:**
- Gets to the thesis in under 90 seconds.
- Keeps your personal story.
- Removes reliance on the joke landing.

---

### Slide 3 - The Real Question

**Title:** The interface problem has changed

**Visual:** One sentence, large:
"The question is not 'chat or no chat?' The question is: what should the model render?"

**Time:** 1:40-2:20

**Speaker notes:**

"We keep debating whether chat is the interface for AI. I think that's the wrong level of abstraction.  
The more useful question is: what is the model actually rendering?  
Data? Layout? Or the interface itself?"

---

### Slide 4 - Why Static AI UX Feels Incomplete

**Title:** Powerful models, weak surfaces

**Visual:** Three bullets
- Natural input is improving fast
- Output is still mostly fixed widgets
- We are underusing the model on the presentation layer

**Time:** 2:20-3:20

**Speaker notes:**

"Input is changing fast: text, voice, images, multimodal context.  
But on the output side, most AI products still collapse back to text plus a few fixed widgets.  
That mismatch is why so many AI experiences still feel like prototypes."

---

### Slide 5 - The Spectrum

**Title:** Three levels of AI-driven UI

**Visual:** A horizontal spectrum
- Static components
- Declarative UI
- Generative UI

**Time:** 3:20-4:10

**Speaker notes:**

"I think there are three useful levels here.  
This is the framework for the rest of the talk."

---

### Slide 6 - Level 1: Static Components

**Title:** Level 1: The model fills props

**Visual:** Simple diagram
Agent -> tool call -> predefined component

**Time:** 4:10-5:40

**Speaker notes:**

"This is the most common pattern today.  
The model decides that a widget should appear, but the widget already exists.  
The model is not writing the interface. It's selecting it and filling it."

**Examples to say out loud:**
- Weather card
- Calendar event preview
- Order status widget
- Known data visualizations from a fixed catalog

**Key line:**
"This is not less valuable because it's less magical. It's often the right answer."

---

### Slide 7 - Level 2: Declarative UI

**Title:** Level 2: The model chooses structure

**Visual:** Diagram
Agent -> JSON or schema -> renderer -> constrained UI

**Time:** 5:40-7:40

**Speaker notes:**

"At level two, the model gets more freedom.  
It does not just pass data. It describes the interface in a constrained language: JSON, schema, layout DSL, remote DOM, whatever form you prefer.  
Then a rendering system turns that into real UI."

**Examples to say out loud:**
- Product comparison card assembled from a component catalog
- Support workflow that changes based on issue type
- Booking or shopping flows that need dynamic structure but consistent branding

**Key insight:**
"This is where a lot of real products will land because it balances dynamism with consistency."

---

### Slide 8 - Level 3: Generative UI

**Title:** Level 3: The model authors the interface

**Visual:** Diagram
Agent -> HTML/CSS/JS or React -> sandbox -> rendered UI

**Time:** 7:40-9:20

**Speaker notes:**

"At level three, the model is actually producing the interface code.  
Not the props. Not the schema. The UI itself."

"This is where people get excited, and also where all the hard questions start:
security, quality, consistency, accessibility, latency."

**Key line:**
"The point is not that everything should be fully generated. The point is that this is now a legitimate design option."

---

### Slide 9 - Decision Rule

**Title:** The tradeoff is freedom vs reliability

**Visual:** Two-axis or sliding scale
- More freedom -> more novelty, exploration, long-tail fit
- More constraints -> more consistency, speed, branding, trust

**Time:** 9:20-10:20

**Speaker notes:**

"This is the most important slide in the talk.  
The choice is not static versus innovative.  
The choice is how much freedom you can afford."

"If the task is repeated, regulated, brand-sensitive, or accessibility-critical, move left.  
If the task is exploratory, one-off, or impossible to prebuild economically, move right."

---

### Slide 10 - Demo

**Title:** One example of generative UI

**Visual:** Your weather demo only

**Time:** 10:20-12:30

**Speaker notes:**

"This demo is intentionally simple. I don't want to prove that AI can make a weather widget.  
I want to show the distinction: the model is not just filling a card. It's generating the card."

"Notice what changes when I ask for a style preference like Windows 95 or Art Deco.  
That is not a theme toggle in a predefined component library. The interface itself is being authored on demand."

**Important:**
- Use one host only if possible.
- Avoid dual-demo waiting time.
- Record it if live Wi-Fi is risky.

---

### Slide 11 - Where This Is Actually Useful

**Title:** Good use cases for each level

**Visual:** Three columns

**Time:** 12:30-15:30

**Speaker notes:**

"This is where the framework becomes practical."

**Static components**
- Dashboards with known widgets
- Payments, settings, account management
- Enterprise tools with strict consistency requirements

**Declarative UI**
- E-commerce assistants
- Travel and booking experiences
- Internal copilots that adapt workflow based on context
- Branded agent experiences

**Generative UI**
- Exploratory data analysis
- Ad hoc operational dashboards
- Debugging and developer tools
- Long-tail task interfaces that are too expensive to prebuild
- Temporary interfaces for collaboration with an agent

**Key line:**
"Generative UI is strongest where the interface is ephemeral."

---

### Slide 12 - Where It Breaks

**Title:** Where full generation is the wrong tool

**Visual:** Four bullets
- Brand consistency
- Accessibility guarantees
- Trust-critical actions
- Repeated high-volume flows

**Time:** 15:30-16:50

**Speaker notes:**

"If you're designing checkout, healthcare intake, identity verification, or anything users do every day, full generative UI is usually the wrong default.  
People need stable mental models.  
Brands need consistency.  
Accessibility cannot be treated as an aspiration."

This is where your Q&A point on branding belongs.

---

### Slide 13 - The Input / Output Split

**Title:** Input is collapsing. Output still matters.

**Visual:** Left side "intent capture", right side "artifact / collaboration / control"

**Time:** 16:50-18:10

**Speaker notes:**

"A lot of interface is going to disappear on the input side.  
Instead of navigating five menus, we'll increasingly just state intent in text, voice, image, or a mix of modalities."

"But the output side does not disappear.  
We still need artifacts, review surfaces, collaboration spaces, and controls.  
That is where generative UI becomes interesting."

This imports the strongest insight from your final Q&A answer.

---

### Slide 14 - Closing

**Title:** The future is not one UI pattern

**Visual:** Return to the three-level spectrum

**Time:** 18:10-19:30

**Speaker notes:**

"I don't think the future is one super-app or one universal interface pattern.  
I think the future is that builders become explicit about how much UI they let the model control."

"So the question I would leave you with is not:
'Should I use generative UI?'

It's:
'What is the highest-leverage layer I can safely let the model render?'"

---

### Slide 15 - Final Takeaway

**Title:** Ask one question

**Visual:** Large text
"What should the model render?"

**Time:** 19:30-20:00

**Speaker notes:**

"If the model renders data, you get static components.  
If it renders structure, you get declarative UI.  
If it renders the interface, you get generative UI.  
And choosing between those is becoming a core product decision."

## Suggested Speaker Script For The First 2 Minutes

Use this instead of the current intro.

"Two years ago I asked a model to build a loading component. I was impressed it compiled.

Last year I asked for a search bar with almost no guidance, and I shipped it.

That changed the question for me.

If models can already write UI this well, why are we still surrounding them with mostly static interfaces?

We spend a lot of time arguing about whether chat is the interface for AI. I think the more useful question is simpler:

What should the model render?

Should it render data into a fixed component?
Should it render structure into a constrained layout system?
Or should it render the interface itself?

That spectrum is what I want to explore today, because I think it is becoming a real product decision, not just a demo trend."

## What To Remove From The Original

- The delayed self-introduction gag.
- The Mac Mini bit.
- Most of the "new computer" section except one sentence of framing.
- The two-host live demo sequence.
- The speculative architecture optimization.
- The definitional debate about whether something is "truly" generative UI.

## What To Add

### Add 1: The practical decision framework

Make it explicit:

- Choose static when you need reliability.
- Choose declarative when you need adaptability with control.
- Choose generative when the UI is exploratory, temporary, or too long-tail to prebuild.

### Add 2: Stronger concrete examples near the end

You said you wanted this. These are the best examples to use:

- **Static:** account settings, invoice summary, flight status, payments
- **Declarative:** shopping assistant, travel booking assistant, enterprise support workflow
- **Generative:** incident investigation workspace, custom analytics explainer, temporary internal ops panel, debugging interface assembled around one issue

### Add 3: One line on branding and trust

"The more a surface carries brand, trust, or accessibility obligations, the more you should constrain the model."

This is one of your strongest ideas. It should be in the main talk, not only in Q&A.

## Delivery Notes

- Speak more declaratively. The material is stronger than the hedge words around it.
- Reduce "is this really generative UI?" energy. It weakens authority.
- Treat the talk as a framework talk, not a taxonomy talk.
- Use pauses after the key sentences instead of adding more qualifiers.
- If the room is senior, your strongest move is to sound like you are naming a design space, not pitching a feature.

## Backup Slides

Keep these after the main talk in case you need them:

1. First-party vs third-party UI distribution
2. Sandboxing and runtime architecture
3. Sampling/tool-call optimization idea
4. Extra examples from Goose, MCP Apps, or Vercel JSON renderer

## One-Sentence Version

"The future of AI interfaces is not fully generated UI everywhere; it's choosing, with intent, how much of the interface the model should control."
