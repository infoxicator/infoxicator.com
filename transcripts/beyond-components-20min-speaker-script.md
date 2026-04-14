# Beyond Components: 20-Minute Speaker Script

This version is designed for a 20-minute slot with no Q&A. It keeps the stronger framework from the rewrite, restores the platform-shift framing from the original, and adds a more forward-looking ending.

## Slide 1

**Title:** Beyond Components  
**Time:** 0:00-0:20

**Script**

"I want to talk about something very specific today: not whether AI can write front-end code, but how that changes the way we design interfaces."

Pause. Let the title sit for a beat.

## Slide 2

**Title:** Two prompts changed my mental model  
**Time:** 0:20-1:25

**Script**

"Two years ago I asked a model to build a loading component. I was impressed it compiled.

Last year I asked for a search bar with almost no guidance, and I shipped it.

That changed the question for me.

If models can already write UI this well, why are we still surrounding them with mostly static interfaces?

That is the shift I want to talk about. The capability jump is real. We are no longer in the phase where the novelty is that the code works at all. We are increasingly in the phase where the code is fast, useful, and sometimes better than what we would have written under time pressure ourselves."

**Delivery note**

Keep this grounded and calm. The point is not to brag about the models. The point is to establish that the premise is now operationally real.

## Slide 3

**Title:** LLMs are a new computer  
**Time:** 1:25-2:25

**Script**

"I also think this matters because LLMs are not just another API. They are a new kind of computer.

And right now, most of our interaction with that computer still looks like the terminal era.

Text in. Text out.

That is why so much AI UX still feels provisional.

We have the compute. We have the intelligence. But we are still early in figuring out what the GUI layer of this new computer looks like."

## Slide 4

**Title:** The interface problem has changed  
**Time:** 2:25-3:00

**Script**

"So for me the useful question is not whether chat is the interface for AI. That is too narrow.

The more useful question is: what should the model render?

Should it render data into a fixed component?
Should it render structure into a constrained layout system?
Or should it render the interface itself?

That is the design space. And once you look at it that way, a lot of current product decisions become much clearer."

## Slide 5

**Title:** Patterns are already emerging  
**Time:** 3:00-3:50

**Script**

"Even if we have not figured out the final form yet, patterns are already emerging.

One pattern is injecting AI into existing interfaces. Cursor is the obvious example. The product owns the host, so it embeds the agent into the application.

The other pattern is injecting UI into the agent or chat surface. MCP apps, ChatGPT apps, and similar systems do the reverse: they let products send UI into the model's environment.

And inside those patterns, we are already seeing different levels of generation."

## Slide 6

**Title:** Three levels of AI-driven UI  
**Time:** 3:50-4:25

**Script**

"I think there are three useful levels here.

Level one: static components. The model fills data and parameters.

Level two: declarative UI. The model chooses structure from a constrained language.

Level three: generative UI. The model authors the interface itself.

This is the framework for the rest of the talk."

## Slide 7

**Title:** Level 1: The model fills props  
**Time:** 4:25-5:35

**Script**

"Level one is the most common pattern today.

The model decides that a widget should appear, but the widget already exists. The component is predefined. The model is really doing orchestration: selecting the right surface and filling it with the right data.

Think weather cards, order status widgets, account summaries, known chart types, calendar previews.

This is not less valuable because it is less magical. In many cases it is the right answer.

If you need reliability, speed, testability, accessibility guarantees, and stable user expectations, this pattern is excellent. A lot of production AI UI should stay here."

**Transition**

"But then we can give the model a bit more room."

## Slide 8

**Title:** Level 2: The model chooses structure  
**Time:** 5:35-6:55

**Script**

"At level two, the model is no longer just filling props. It is generating a representation of the interface: JSON, schema, layout descriptors, remote DOM, whatever constrained language you want to use.

Then a renderer turns that structure into real UI.

This pattern is interesting because it gives the model meaningful freedom, but inside rails that you control.

That makes it extremely attractive for real products.

If I am building a shopping assistant, a travel assistant, a support workflow, or an internal copilot that needs to adapt the shape of a workflow based on context, this is often where I want to be.

The model can rearrange sections, prioritize content, choose different layouts, and adapt to intent. But the actual building blocks, styling, spacing, accessibility, and brand system are still mine.

That balance matters. And I suspect this middle layer is where a lot of serious product work will land."

## Slide 9

**Title:** Level 3: The model authors the interface  
**Time:** 6:55-8:15

**Script**

"At level three, the model is actually producing the interface code.

Not the props. Not the schema. The interface itself.

HTML, CSS, JavaScript, React, whatever runtime you allow.

This is where people get excited, because it feels much closer to the science-fiction version of adaptive computing.

But this is also where the hard questions start.

Security.
Quality.
Latency.
Accessibility.
Consistency.

So the point of this slide is not that everything should become fully generated. The point is that fully generated UI is now a legitimate design option for the right class of problems."

## Slide 10

**Title:** The tradeoff is freedom vs reliability  
**Time:** 8:15-9:10

**Script**

"This is the most important slide in the talk.

The choice is not static versus innovative. The choice is how much freedom you can afford.

If the task is repeated, regulated, trust-sensitive, accessibility-critical, or deeply tied to brand recognition, move left. Constrain the model more.

If the task is exploratory, one-off, long-tail, or too expensive to prebuild economically, move right. Give the model more room.

That is the decision rule.

The more a surface carries brand, trust, or accessibility obligations, the more you should constrain the model."

Pause here. This is one of the lines worth landing hard.

## Slide 11

**Title:** One example of generative UI  
**Time:** 9:10-11:00

**Script**

"Let me make this concrete.

In this example, I ask for the weather in Paris and I ask for it in a specific style, for example Windows 95 or Art Deco.

What matters here is not the weather card itself. That is almost trivial.

What matters is that the model is not selecting from a catalog of prebuilt themes. It is authoring the interface on demand.

It is deciding how that information should look, how it should be framed, and how the presentation should respond to the prompt.

That is the distinction.

And once you have that capability, the interesting question becomes: where is that worth doing in a real product, and where is it absolutely not worth doing?"

**Delivery note**

If you are live-demoing, keep the narration minimal. The demo should illustrate the definition, not become the center of the talk.

## Slide 12

**Title:** Good use cases for each level  
**Time:** 11:00-13:00

**Script**

"This is where the framework becomes practical.

For static components, the use cases are obvious and important: payments, account settings, invoice summaries, flight status, operational dashboards with known widget types. These are stable tasks. Users benefit from consistency.

For declarative UI, I would look at shopping assistants, travel booking assistants, enterprise support tools, and branded agent experiences. These need to adapt, but they also need to feel coherent. The middle layer is very strong here.

For fully generative UI, I think the best opportunities are where the interface is ephemeral.

Exploratory data analysis.
Incident investigation workspaces.
Ad hoc operational panels.
Debugging interfaces assembled around one problem.
Temporary collaboration surfaces between a human and an agent.
Shared diagram canvases, for example with something like Excalidraw MCP.

That is where prebuilding every possible interface is either impossible or economically irrational.

So if you want one sentence from this slide, it is this:

Generative UI is strongest where the interface is ephemeral."

## Slide 13

**Title:** Where full generation is the wrong tool  
**Time:** 13:00-14:10

**Script**

"There are also clear places where full generation is the wrong default.

Checkout.
Healthcare intake.
Identity verification.
Anything high volume that users do every day.

In those cases, stable mental models matter more than novelty.

Users need to recognize the system.
Brands need consistency.
Accessibility cannot be treated as an aspiration.

So when people ask whether generative UI applies to every app, my answer is clearly no.

The opportunity is real, but it is not universal."

## Slide 14

**Title:** What generative UI might become  
**Time:** 14:10-16:50

**Script**

"So what does this become if the models keep improving?

When people imagine the future of AI interfaces, the obvious reference is Jarvis: floating UI, holograms, panels appearing around you.

Maybe some of that is right.

But we should be careful not to overfit to the first obvious metaphor.

When television first appeared, a lot of early TV was basically radio with cameras. People had the new medium, but they were still using the language of the old one.

I think we may be in a similar moment with AI interfaces. We are still translating old UI patterns into a new medium.

I think at least three things happen.

First, we get more ephemeral task interfaces. Interfaces assembled for one task, one user, one moment, and then discarded.

Second, we get more collaborative canvases. Not just 'show me the result,' but 'work with me on the artifact.' The interface becomes part of the collaboration loop.

And this is where something like Excalidraw MCP becomes interesting. The system is no longer just visualizing an answer. It becomes a shared surface for thinking. The agent can sketch a flow, map a system, rearrange concepts, and the human can immediately push back, edit, annotate, and collaborate on the same artifact.

Third, we get more ambient and adaptive surfaces. The same underlying capability can present differently depending on context, modality, device, or the stage of the task.

And I think that also changes the input side. A lot of UI for intent capture probably disappears. We will type less, click less, navigate less. But the output side does not disappear. We still need artifacts, review surfaces, collaboration spaces, and controls.

So the future is not no UI.

It is less fixed UI, and more adaptive UI."

## Slide 15

**Title:** The future is not one UI pattern  
**Time:** 16:50-19:10

**Script**

"I do not think the future is one universal interface pattern.

I do not think every product becomes one giant chatbot.

And I do not think every surface becomes fully generated.

What I do think is that builders are going to become much more explicit about how much of the interface they let the model control.

So the question I would leave you with is not:
'Should I use generative UI?'

It is:
'What is the highest-leverage layer I can safely let the model render?'"

## Slide 16

**Title:** Ask one question  
**Time:** 19:10-20:00

**Script**

"If the model renders data, you get static components.

If it renders structure, you get declarative UI.

If it renders the interface, you get generative UI.

And choosing between those is becoming a core product decision.

Thank you."

## Rehearsal Notes

- Your strongest tone is analytical, not promotional. Keep it crisp and confident.
- The early "new computer" framing should feel like platform context, not a history lesson.
- Do not reopen the taxonomy debate near the end. The framework is stronger than the definition fight.
- If you run long, trim Slide 5 and Slide 11 first.
- If you want one line to memorize and repeat, use:
  "The question is not whether AI can build UI. The question is what the model should render."
