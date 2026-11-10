---
title: "Do tools still matter in the age of Code Mode?"
excerpt: "MCP tool design advice changed when clients learned to search for tools and execute code. What still matters, what moved to the client, and when a workflow tool is still the right choice."
date: "2026-10-10"
tags:
  - AI
  - Agents
  - MCP
  - Tool-Design
readingTime: "12 min read"
---

In 2025, the advice for building an MCP server sounded pretty clear: expose fewer tools, curate aggressively, and give the agent complete workflows.

Then tool search and Code Mode arrived.

Now the advice sounds almost reversed: expose the building blocks, let the agent find what it needs, and let it write code to combine them.

Cool. So did we spend a year learning the wrong lesson? 😅

This is the question behind my AgentCon Japan talk on MCP tool design. Tool design still matters. But clients can now take on more of the work that we previously pushed onto server authors.

And that changes which advice is useful.

## Everyone gets an MCP server

The first wave of MCP felt like a race to connect everything.

The [March 2025 specification revision](https://modelcontextprotocol.io/specification/2025-03-26/changelog) introduced Streamable HTTP and an authorization framework. Remote integrations became a much more interesting proposition, and the ecosystem had a very obvious next step: make an MCP server for your product.

![Everyone gets an MCP server. The Oprah meme from the talk.](/images/posts/do-tools-still-matter/everyone-gets-an-mcp-server.png)

Already have a REST API? Great. Convert every endpoint into a tool.

Already have an OpenAPI document? Even better. Generate the whole thing.

![FastMCP's OpenAPI converter, shown in the talk as an example of generating MCP tools from an existing API.](/images/posts/do-tools-still-matter/openapi-to-mcp.png)

From the producer's perspective, this looked brilliant. One conversion later, the agent could access the entire product. A large catalog looked like a large amount of capability.

Tick the box. Our AI strategy is sorted.

Then the agent connected.

## The context bill arrives before the work starts

Imagine loading every tool's name, description, and input schema into the model's working context before it has even seen the user's request.

That space also needs to hold the conversation and the actual task.

In [Anthropic's advanced tool use example](https://www.anthropic.com/engineering/advanced-tool-use), five servers exposed 58 tools with approximately 55,000 tokens of definitions. That was one illustrative setup, rather than an average for every MCP server, but it makes the cost visible.

And the problem goes beyond how many tokens you can fit.

Give the model `get_order`, `search_orders`, `get_order_details`, and `find_customer_orders`, and it needs to work out which operation matches the request. Similar names can hide different behavior. A schema can be structurally valid while the arguments are still wrong for the task.

Now ask:

> Where is my latest order?

An endpoint-shaped tool catalog might require the agent to:

1. Find the customer.
2. Carry the customer ID into a call that lists their orders.
3. Decide which order counts as the latest.
4. Fetch the order details.
5. Carry the shipment ID into a shipping-status lookup.

The agent has become the orchestration layer.

It can probably figure this out. But should it have to rediscover an established application workflow for every request?

In a traditional loop, each step can mean another model turn. Each intermediate response can become more text in the transcript. Each handoff adds another opportunity to choose the wrong ID, fetch too much data, or recover badly from an error.

We took logic that a developer would normally encode once and turned it into repeated runtime reasoning.

## The first correction: design for the agent

Jeremiah Lowin made this argument very clearly in [Stop Converting Your REST APIs to MCP](https://jlowin.dev/blog/stop-converting-rest-apis-to-mcp).

The interesting detail is that Jeremiah built FastMCP's OpenAPI converter. This criticism came from someone who understood why the shortcut was appealing.

His point: a human developer can discover an API once, write an integration, and reuse that knowledge. An agent working through individual tool calls can keep paying for discovery and orchestration.

![Jeremiah Lowin's talk, Your MCP Server Is Bad, which helped frame the first correction in MCP tool design.](/images/posts/do-tools-still-matter/jeremiah-lowin-talk.png)

That leads to a useful design lens: **an MCP server is an interface for an agent.**

We already care about user experience. We should care about the experience of a consumer that can misunderstand instructions and has a limited working context too.

The practical rules I took from [Jeremiah's talk](https://ai.engineer/talks/96G7FLab8xc-your-mcp-server-is-bad-you-should) were:

- **Outcomes over operations.** Give common tasks a clear entry point.
- **Flatten arguments.** Keep the input the agent must construct easy to understand.
- **Treat instructions and errors as context.** Explain how to use the tool and how to recover.
- **Respect the token budget.** Return the information the task needs.
- **Curate ruthlessly.** Every visible tool should earn its place.

Small catalogs, often around five to fifteen tools, became a useful starting point. Rough warnings about fifty visible tools also circulated. Those were heuristics for the clients of the time, rather than measured laws of model behavior.

One response was to offer different toolsets so users could choose a smaller surface for a particular task.

![Postman toolsets from the deck: Minimal, Code, Full, and Learn offer different surfaces for different tasks.](/images/posts/do-tools-still-matter/postman-toolsets.png)

That helped with context size. Workflow tools could also reduce the number of decisions the agent had to make.

## Workflow tools do useful work

There is a concrete example in [reShapr's comparison with the official GitHub MCP server](https://reshapr.io/blog/reshapr-vs-official-github-mcp/).

The task: list ten recent pull requests and collect their details, reviews, and changed files.

The primitive path needed one list call and three follow-up calls per pull request. Thirty-one agent-facing calls in total. A purpose-built workflow exposed the same task as one action.

![reShapr's comparison: a GitHub workflow with 31 agent-facing tool calls becomes one action.](/images/posts/do-tools-still-matter/workflow-tools-comparison.png)

There is an important caveat. The benchmark used `curl` to measure the MCP workflow directly and remove model variability. It demonstrates mechanical overhead, rather than proving that every model will perform better on every task.

Also, one action still has to do the underlying work. The backend calls have moved behind a stable interface, and the output can be shaped before the agent sees it.

That is useful engineering.

But these recommendations carried an assumption: the client loaded the catalog eagerly and moved through the workflow one model turn at a time.

**The server was compensating for the client.**

Then the client started getting better.

## Tool search changes discovery

Tool search lets the client retrieve relevant definitions on demand. The full catalog can remain available while the model initially sees a much smaller working set.

Anthropic reported an 85% reduction in token usage in its [Tool Search Tool comparison](https://www.anthropic.com/engineering/advanced-tool-use).

![Anthropic's context comparison for traditional tool loading and tool search. The figures describe its example setup.](/images/posts/do-tools-still-matter/tool-search-context.png)

There is still a cost: search adds a step, and the quality of the results matters. A small set of frequently used tools may need very little discovery machinery.

But a catalog with hundreds of capabilities no longer has to mean hundreds of definitions in the initial prompt.

That weakens the argument for shrinking a product's entire capability surface to fit an eager client.

## Code Mode changes iteration

Tool search addresses discovery. Code Mode addresses what happens after the agent finds the operations it needs.

![Wild Code Mode appeared! The meme used in the talk to introduce code execution.](/images/posts/do-tools-still-matter/code-mode-appeared.png)

The model writes a program that calls tools. An execution environment handles the loops, conditions, and data transformations. The program returns the result that the model needs to see.

The model still plans the work. It can express a sequence in code and let that sequence run without another inference pass between every operation. Cloudflare describes this approach in [Code Mode: the better way to use MCP](https://blog.cloudflare.com/code-mode/).

Consider a task that fetches hundreds of issues and counts their labels. A program can handle pagination, accumulate the counts, and return a small table. The model needs the table to answer the question. Reading every field from every issue adds little value.

![Direct tool calling versus Code Mode: intermediate calls and results stay in the execution environment, and the model receives the computed output.](/images/posts/do-tools-still-matter/code-mode-execution.png)

Diagram source: [Cloudflare's Code Mode article](https://blog.cloudflare.com/code-mode/).

In [Anthropic's Google Drive and Salesforce example](https://www.anthropic.com/engineering/code-execution-with-mcp), discovering tools as code and executing the workflow reduced token usage from 150,000 to 2,000. The article reports a 98.7% reduction for that example.

Cloudflare's [server-side implementation](https://blog.cloudflare.com/code-mode-mcp/) exposes over 2,500 API endpoints through two tools, `search` and `execute`, with an initial tool surface of roughly 1,000 tokens.

![Cloudflare's comparison of API and MCP schema sizes with the approximately 1,000-token Code Mode surface.](/images/posts/do-tools-still-matter/cloudflare-token-comparison.png)

Those numbers measure different things. The Cloudflare figure describes the exposed tool surface, rather than the total cost of completing every possible task. The Anthropic figure describes a particular workflow.

Still, both show why a fixed limit on visible tools starts to feel less useful.

Another example from [Sam Morrow's progressive discovery series](https://sam-morrow.com/blog/progressive-discovery-in-mcp-part-4): nine paginated calls collected 876 GitHub issues inside the sandbox. Roughly 5 MB of input became about 1 KB of label-distribution output.

![The compact label distribution from Sam Morrow's GitHub issue reduction example.](/images/posts/do-tools-still-matter/github-label-distribution.png)

The useful question becomes: **where does the data need to go?**

Tool search controls which definitions enter the context. Code execution controls how calls and intermediate data move through the workflow. They complement each other.

## So should MCP servers look more like APIs again?

Max Stoiber makes the case for that direction: as clients become capable of searching and composing tools, server authors can expose more granular operations.

![Max Stoiber's argument that MCP servers should look more like APIs as tool search and Code Mode become common.](/images/posts/do-tools-still-matter/max-stoiber-api-design.png)

Source: [Max Stoiber's post](https://x.com/mxstbr/status/2092630315831541817).

I understand the appeal.

Good primitives can serve tasks that nobody anticipated when building the server. The agent can combine billing data and customer information differently for different requests. You avoid creating a new workflow tool for every variation.

That matters when the work is exploratory. If the user is investigating something new, freezing one process into a tool may remove exactly the flexibility they need.

But composition and company knowledge are different problems.

An agent can work out how to fetch overdue invoices. Your team's policy for contacting customers still needs to come from somewhere. Which accounts require review? What counts as overdue? Is drafting an email enough, or does sending it require approval?

Code execution makes a chain cheaper to run. It doesn't establish the business rules for that chain.

And the people using these systems may want a stable workflow they can run repeatedly and inspect when something goes wrong.

So I still see value in both workflow tools and granular tools. The choice depends on the task and the knowledge the system needs to preserve.

## Who should own search and execution?

This is where the debate gets more interesting.

You can keep ordinary tools visible to the host and let the client provide search and Code Mode. Or you can hide the product's operations behind a server-owned `search` and `execute` interface.

![The deck's comparison of a longer tools/list response with a compact search and execute surface.](/images/posts/do-tools-still-matter/search-and-execute-surface.png)

Two visible tools sounds wonderfully simple.

But the model still needs to learn how to discover the operations behind them. That complexity exists somewhere, even when it disappears from the initial tool list.

In another post included in the talk, Max argues that every server implementing a private discovery interface creates more routing work for the model.

![Max Stoiber's criticism of every MCP server implementing its own tool search and Code Mode interface.](/images/posts/do-tools-still-matter/max-stoiber-search-routing.png)

A capable client can provide one discovery layer across connected servers. It can also keep individual calls visible to its inspection and approval controls.

I find that a strong argument for client-side ownership. A task may involve several products. A shared execution layer can compose those products without making the model learn a separate execution environment for each one.

[Sam Morrow's client experiments](https://sam-morrow.com/blog/progressive-discovery-in-mcp-part-1) illustrate this direction: different discovery and execution strategies route their actual MCP calls through the same harness. That gives the client a common place to observe and control invocations.

There is a practical counterargument, though: you have to support the clients people actually use.

Some hosts have better discovery and execution support than others. A server author cannot fix every host, and a product with hundreds of operations still needs a usable experience on a weaker client.

Server-side search and execution can protect that client from a huge catalog. They also give the server control over ranking and product-specific behavior. Keeping common tools directly visible while deferring the long tail can be a useful compromise.

The cost is duplication. If every vendor invents a different way to search and execute, the ecosystem gets more complicated.

My preference is to use server-side search and execution as a **compatibility option** when the client needs it. Where the host already offers good discovery and composition, I would expose tools that let the host use those capabilities.

That is a design preference. Cloudflare's implementation shows why a server-owned approach can also be effective. The right choice depends on the deployment and the clients you support.

## The advice I would use today

I would start with the shape of the work.

**For a known, repeatable workflow, use a curated workflow tool or a skill.**

A tool can enforce a stable operation. A skill can teach the agent a procedure while leaving individual actions visible. Decide how much of the process needs enforcement and how much needs guidance.

**For an exploratory task, expose useful primitives with progressive discovery.**

Let the agent find operations and combine them. Put care into names and descriptions so it can discover the right building blocks. Explain the output shape as well as the inputs.

**For a large reduction task, use code or shell execution where the environment supports it.**

Pagination, counting, filtering, and joining data are good reasons to keep intermediate results outside the model's context. Return the evidence needed to inspect the answer.

**For clients with uncertain capabilities, offer a compact core and a discovery fallback.**

Keep frequent actions easy to reach. Make the larger surface available in a form the client can use, and check the experience in the hosts you expect people to connect.

Across all of these, preserve explicit boundaries for consequential actions. Permissions and business rules still need enforcement. A generated program should pass through the same controls and audit trail as an individual tool call.

The rules about clear arguments, useful errors, and sensible output sizes still apply. Better orchestration gives the agent more ways to use a tool. It also gives a badly designed tool more ways to cause confusion.

## Do tools still matter?

Yes. Their design determines what the agent can discover, what it understands, and which actions it can perform reliably.

What changed is how much of the surrounding work a capable client can handle.

The old constraints remain: bounded context, ambiguous interfaces, latency, and failures. More of the responsibility for managing them can now sit in the host.

So before turning your entire product into five workflow tools, look at the client. Before hiding everything behind two generic tools, look at the client again.

Are we solving a product problem, or compensating for the client one more time?

That is the question I want to keep asking.

Who knows which advice will survive another few months.

See you in 2027. 👋
