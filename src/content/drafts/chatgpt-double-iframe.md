
#intro

While working on shipping the first MCP-UI Client in production, I quickly found a major blocker. MCP-UI apps load inside an iframe in the host application. and most real world application block third party content by enforcing via their Content Security Policy. I started discussions with Liad and Ido and investigated a solution on how to allow arbitrary apps (the point of MCP-UI) while ensuring the host application remained secure and without touching their CSP (unpractical, how do you allow every single domain in the world?) the result was a double-iframe architecture that enforces security while allowing any content to be loaded.

Fast forward to the realease of Apps SDK in October and while poking around the dev console I saw a familiar implementation, turns out they also used a similar approach on their apps sdk sandbox to ensure third party apps load securely inside chatGPT.

Postman is an MCP Client to test applications. We are probably the only MCP Hosts where it made sense to support ChatGPT apps outside of ChatGPT to help developers debug their apps faster. given there were also a lot of gaps, i.e having to contect via an ngrok tunnel, setting up a CDN server that was a vailable to the tunnel. (This is the video of explaining the DX gaps and how postman mcp inspector support for chatGPT apps solves the problem)

For this I had to figure out how the chatgpt apps sdk client implementation worked, with no documentation and just the developer console. I ended up reverse engineering the double iframe architecture similar to what I'd done earlier with MCP-UI and a few quirks with how resource templates are fetched by the MCP server. 

## CSP how do they work

## solution (suggested by chatgpt) I asked chatgpt (codex) what would be the best of achieving this sandbox and it came back with the triple CSP double iframe sanbox injecting html via messages.

## architecture deep dive

## future for MCP Apps

this architecture is now been adopted and improved by the MCP apps working group and included in the MCP Apps spec.
