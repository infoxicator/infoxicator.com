---
title: "Rethinking UI in Agent-Driven Systems"
excerpt: "Chat interfaces are expressive, but agent-driven workflows often need richer UI. This article explores first-party, third-party, and generative UI strategies."
date: "2025-07-24"
tags:
  - AI
  - Agents
  - UI
  - MCP
readingTime: "8 min read"
---

Chat interfaces have surged in popularity, becoming a common entry point to intelligent systems. But while text excels at expressiveness and simplicity, it's often limiting for structured interactions. Booking a meeting, selecting options, or reviewing results all demand more than just words. The immediate solution that comes to mind is to **render traditional user interfaces (components)** inside the agentic system, but what does that look like in practice?

**What are the viable strategies for embedding UI into chat-driven workflows?** And even better: **should you be embedding UI at all?** If so, will these new approaches eventually replace traditional interfaces, or simply augment them?

In this article, we are going to look at the three emerging strategies for returning UI from agents:

1. First-party UI: Component rendering from within the agent’s codebase
2. Third-Party UI: Server-generated and delivered via MCP
3. Generative UI: Let the LLM create interfaces on the fly

These modes reflect not just technical choices but broader design philosophies about how software should be delivered when the interface becomes a dialogue, not a static representation of data.

Each approach solves the "how do I show a button" problem differently. In fact, they solve different problems altogether, but it’s easy to mix and confuse these approaches due to their similarities.


## 1. First-Party UI Rendering: Components from Within

This is the simplest to understand and implement if you own both the agent and the application frontend.

The tool (or function) returns a UI descriptor that directly maps to a component you already have in the client codebase. In some systems, this means passing back a component name and props. In others, it may be fully serialised  elements.

```js
// Example: a tool response returning a UI
{
  type: "tool-response",
  tool: "getUserApproval",
  content: ["ok", {...}, {
    type: "custom",
    component: "ApprovalBanner",
    props: { user: "alice", reason: "dangerous command" }
  }]
}
```


![Approval Ui](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/huoyn0ms6ac10j29wzkk.png)



This flexibility not only allows for reusing and rendering existing UI, but also unlocks new interaction patterns like **"driving the UI from the agentic system."**

Here is an example of what this looks like in practice:

![video of ai driven ui](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hkrcn9dm65skdzbfc8v5.gif)

This demo showcases the agent driving the user interface like if it was a human agent. It opens a requests in a new tab, changes some scripts, sends the request and then displays the results in a nicely formatted component.

👉 [Full resolution Video](https://youtu.be/Ph5BBBuEYV0) 

### Pros

- **Total control:** You can render any UI the client app already supports.
- **Feature parity:** Complex interactivity (modals, animations, hooks) are possible.
- **Simple for internal tools:** Tools can assume the client knows how to handle specific components.

### Cons

- **Tight coupling:** Bespoke and custom-built. It only works in the client that implements it.
- **Hard to externalise:** You cannot expose these tools to third-party systems via MCP or otherwise.
- **State and serialisation:** To reconstruct the UI from previous conversations, components must be stateless. They need to rebuild state from the data stored in the conversation and be passed as props.

### Ideal for:

- Web apps shipping their own agentic interfaces inside their product
- Agents that need to “drive” the UI and take steps on the user’s behalf

### Examples:

- Postman Agent Mode
- Cursor
- TLDraw Agent Mode

---

## 2. Third-Party UI: Server-Generated UI Delivered via MCP

The rise of the MCP protocol has made it easier for third-party tools to plug into assistant ecosystems, enabling remote invocation and integration. However, one limitation is that most implementations today focus on returning plain text. That works well for many workflows, but it quickly breaks down when richer user interaction is needed.

**What if a third-party MCP tool wants to return a map, an interactive widget, or a custom data viewer? That's where third-party UI comes in.**

Instead of returning components, the tool responds with plain HTML or **structured and serialised components** that describe what should be rendered. The client, which speaks the schema format, interprets and renders the UI. This adds an interactive layer on top of otherwise text-only conversations, unlocking a much richer experience.

Frameworks like **mcp-ui**, **Adaptive Cards**, and **Remote DOM** are converging here:

> The server describes the *what*, and the client decides *how*.

**Plain text example:**

```json
{
  "type": "resource",
  "resource": {
    "uri": "ui://my-component/instance-1",
    "mimeType": "text/html",
    "text": "<p>Hello World</p>"
  }
}
```

**Remote resource example:**

```json
{
  "type": "resource",
  "resource": {
    "uri": "ui://analytics-dashboard/main",
    "mimeType": "text/uri-list",
    "text": "https://my.analytics.com/dashboard/123"
  }
}
```

**Remote DOM example:**

```json
{
  "type": "resource",
  "resource": {
    "uri": "ui://remote-component/action-button",
    "mimeType": "application/vnd.mcp-ui.remote-dom+javascript; framework=react",
    "text": "\n  const button = document.createElement('ui-button');\n  button.setAttribute('label', 'Click me for a tool call!');\n  button.addEventListener('press', () => {\n    window.parent.postMessage({ type: 'tool', payload: { toolName: 'uiInteraction', params: { action: 'button-click', from: 'remote-dom' } } }, '*');\n  });\n  root.appendChild(button);\n"
  }
}
```

> *This schema uses the official MCP specification. There is a [proposal under discussion](https://github.com/orgs/modelcontextprotocol/discussions/287) to add a specific type of resource for UI, however the `mcp-ui` library is full spec compliant.*

The client receives the response from an MCP tool invocation, reconstructs the UI, and renders it in the agent’s host using the preferred rendering method. The client ensures the UI is mounted inside a secure and sandboxed environment like an iframe or a worker.

To match styling, reuse component libraries, and support frontend frameworks of choice, tools like Remote DOM help bridge the gap while keeping the server implementation generic.


![video of mcp ui](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jryehyj89qgie47wtvmr.gif)

This demo uses the `mcp-ui` library to send UI components from a shopify store via the Model Context Protocol (MCP)

👉 [Full resolution video here](https://youtu.be/OINfHJF5aEc)

### Pros

- **Extensible:** Builds on top of existing schema and technologies.
- **Stateless:** UI components can be serialised and sent across the network.
- **Client agnostic:** As long as the client supports the schema, tools that return UI can be used by any client.

### Cons

- **Limited expressiveness:** App-specific interactions are difficult to support.
- **Styling constraints:** Custom theming and layout are limited and harder to implement.
- **Authoring complexity:** The MCP server must serialise components to comply with the schema.

### Ideal for:

- Existing MCP tools that want to enhance user experience beyond text.
- Products with plugin ecosystems.
- E-commerce and agentic systems where tools don’t have direct access to the frontend.

### Examples:

- **MCP-UI:** Shopify Store Front MCP servers
- **Postman MCP Inspector**

---

## 3. Generative UI:

This is the most speculative and also the most exciting approach. Instead of explicitly returning UI, the LLM generates it directly from the conversation context, injecting the data into interactive elements, not just for display, but for action.

What makes generative UI especially powerful is how it mirrors the trend of **vibe coding** where users or agents compose small applications on the fly to solve personalised tasks. This goes beyond prompting or one-off responses. It becomes a way of assembling functionality contextually.

With the right schema and execution model, generative UI isn’t just a mockup, it becomes a live surface inside the agentic loop: capable of executing functions, calling tools, validating input, and even interacting with third-party systems via the MCP protocol.

Imagine a scenario where the agent, based on context and goals, produces a multi-step workflow UI part form, part calendar, part dashboard. The user fills it in, submits it, and the agent takes action, all within a single conversational pass.

This bridges the gap between unstructured input and structured actions. It unlocks a middle layer of interaction too fluid for hardcoded UIs and too structured for plain text.

> User: "I want to send flowers to someone in Berlin on Tuesday"

The LLM could generate a UI like so:


![generated ui for flowers](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/pkp62iqdhy1vf1pzo7la.png)



Generative UI will most likely be implemented as an extension of first-party UI due to the control and sandboxing requirements involved in running generated code safely. An interesting approach could involve using **[“sampling”](https://modelcontextprotocol.io/docs/concepts/sampling)** from the Context Model Protocol specification to dynamically request UI from the active agent.

That said, third-party tools can also leverage generative UI. Backend systems can use LLMs to create UIs on the fly and return the resulting schema or code as a valid response—so long as it complies with what the client expects.

This demo by [Evan Bacon](https://x.com/Baconbrix) uses an LLM to interpret natural language queries and determine which components to display based on the responses.

{% youtube https://www.youtube.com/watch?si=E0UTGOFKL-ufC2Pp&t=677&v=djhEgxQf3Kw&feature=youtu.be&sttick=0 %}


### Pros

- **Flexible:** The same agent can generate different UIs based on context.
- **Emergent UX:** Users help shape the flow rather than being constrained by predefined templates.
- **Integrated orchestration:** Enables LLMs to drive workflows with third-party tools via standard protocols.

### Cons

- **Validation overhead:** Generated UIs must be schema-validated for safety.
- **Fragility:** LLMs may hallucinate structure or mislabel schema fields.
- **Debugging challenges:** Behavior is non-deterministic and hard to trace.

### Ideal for:

- **Visualizations:** Let users view data in a format that suits them.
- **Flexible interaction:** Move beyond static forms to dynamic UIs tailored in real time.

---

## Choosing a Strategy

You don't need to pick one. These strategies are complementary and solve different use cases.

At Postman, the agentic system we’re building supports a mix of all three:

- **First-party UI:** React components in Postman Agent Mode display code editors, visualizations, approval flows, and deterministic workflows via tool call chaining.
- **Third-party UI:** Using the `mcp-ui` package to render UI from MCP servers. This supports both our Agent Mode and the MCP Inspector tool for debugging UI responses.
- **Generative UI:** We're exploring this space with our “Flows agent” that dynamically generates UI consumed by our Agent Mode.

---

## Final Thoughts

Just like  designers had to rethink shape and granularity in the age of mobile, we now need to rethink UI in the age of agents.

Not every assistant needs to return UI. But once it does, the architecture behind that decision becomes a core part of your product surface. It affects what tools you can build, how partners can extend your system, and how safely and reliably users can interact with it.

Ooops! nearly forgot… I didn’t dive deep into the question **should you be embedding UI at all?** That probably deserves a separate article.

---

## Further Reading & Inspirations

- [The Case Against Conversational Interfaces](https://julian.digital/2025/03/27/the-case-against-conversational-interfaces/) by Julian Lehr
- [Embedding UI with Language Agents](https://aifoc.us/embedding/) by Venkatesh Rao
- [MCP-UI](https://mcpui.dev/) by [Liad Yousef](https://x.com/liadyosef) and [Ido Salomon](https://x.com/idosal1)

