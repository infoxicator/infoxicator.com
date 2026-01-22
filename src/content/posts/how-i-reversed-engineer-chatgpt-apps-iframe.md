---
title: "I reverse engineered ChatGPT Apps iframe sandbox"
excerpt: "I shipped a double iframe sandbox for MCP-UI under strict CSP, then reverse engineered ChatGPT Apps sandbox"
date: "2026-01-21"
tags:
  - MCP
  - CSP
  - Security
  - ChatGPT
readingTime: "6 min read"
---

## Before ChatGPT Apps, I Had to Solve The Same Problem!
 
When I was working on  the first MCP-UI Client in production at Postman, I hit a brick wall fast. MCP-UI apps render untrusted code inside an iframe, and most real-world production applications block third party content and enforce it via their [Content Security Policy (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP). If the host only whitelists known domains, how do you load arbitrary apps? You do not! That is the point! 😅

I've been fighting CSPs since my Amex days. We built a **dynamic CSP generator** for micro‑frontend apps at runtime so each page could assemble the right script-src/frame-src on the fly. That taught me early: **The CSP is never the easy part, but it's the part you can't dodge**.

 So I reached out to [Liad](https://x.com/liadyosef) and [Ido](https://x.com/idosal1) from MCPI-UI and worked with them to come up with a solution on how to allow untrusted third party apps (the point of MCP-UI) while ensuring the host application remained secure, keeping the host's CSP tight and without having to whitelist the whole internet. The solution was a **double iframe architecture** safe enough for production. 
 
 here's the demo!

{% youtube https://youtu.be/qfBlnl89kVM?si=bVaR80A9xvoLjFHh %}

## The ChatGPT Apps SDK

Fast forward to the ChatGPT Apps SDK release. I found a lot of gaps in the developer experience while building ChatGPT apps, i.e having to connect via an ngrok tunnel, setting up a CDN server that was available to the tunnel, caching issues etc. So my first thought was to **allow ChatGPT apps to render inside Postman** so you can build and debug them faster! (We are probably one of the only MCP Hosts where it makes sense to render ChatGPT apps outside of ChatGPT).



> This is the video of explaining the DX gaps and how Postman MCP inspector support for chatGPT apps solves the problem
{% youtube https://youtu.be/W-OCfM68354 %}


## Hmmm, that Looks familiar 🤔
For this I had to figure out how the ChatGPT Apps SDK client implementation worked, with no public facing documentation! (nobody apart from ChatGPT needs this! 😅). I started poking around the dev console inside ChatGPT and saw a very familiar setup. Same idea: **a sandbox proxy iframe wrapping an inner iframe**, with a message bridge in the middle! I had already built this once for MCP-UI, so I reverse engineered their flavor and used it to unlock ChatGPT Apps inside Postman.

## Iframes, ~~magnets~~ How do they work?

If your host enforces a CSP, you cannot just drop in any third-party iframe `frame-src` is an allowlist. An allowlist of "every MCP app that will ever exist" is not a thing.

Also, **you cannot just disable the CSP**. That is a non starter for security teams. So the only way out is a fixed, trusted domain that the host can allow, and then a controlled way to render the actual app behind it.

That is the core trick. Without this, MCP‑UI apps were basically dead in real enterprise hosts.

## The double-iframe trick

The proxy is not a real proxy server. It is a static HTML page hosted on its own origin different to the host's origin. The host only whitelists that one domain. Everything else is controlled by the sandbox iframe.

1. Host loads the proxy on an allowlisted domain.
2. Proxy signals ready; host posts HTML + CSP metadata.
3. Proxy creates the inner iframe, sends the HTML via `document.write()` and relays messages.

### Why the double iframe matters

You need two layers to make the security model work:

1) The outer iframe (sandbox proxy) is on a different origin and sandboxed with a configured CSP
2) The inner iframe hosts the untrusted app with a relaxed CSP

The CSP can also be enforceable per app. The MCP server (app) can provide a custom CSP to the sandbox.

![High Level Architecture](/images/posts/chat-gpt-double-iframe/double-iframe-csp.png)

## The spec caught up (and improved it)

With the launch of **MCP Apps**, this architecture is now formalised and accepted as the default security model for third party UI via MCP.

The MCP Apps working group took the learnings from MCP-UI and ChatGPT apps and added to the spec:

- Host and sandbox must be different origins
- Sandbox must be `allow-scripts allow-same-origin`
- Proxy must enforce CSP derived from UI metadata
- Proxy must forward messages between host and guest


The MCP Apps spec also added the use of metadata on UI resources so a server can declare what it needs:

- `connectDomains` for API calls
- `resourceDomains` for scripts, styles, images, fonts
- `frameDomains` for nested iframes
- `baseUriDomains` for base tags

The host then builds CSP headers from that list. If the list is empty, defaults are restrictive. 

## Conclusion

The CSP is annoying, but it is also the best guardrail we have for untrusted UI. You do not remove it. You configure it! and the double iframe trick was perfect for this use case!

> Disclaimer: This is by no means an obscure / innovative technique, it is what most of the industry uses in these cases for untrusted embedded UI. ChatGPT told me that during my research! 😂


If you want the deep docs, start here:

- [MCP-UI proxy flow and CSP details](https://github.com/MCP-UI-Org/mcp-ui/blob/main/docs/src/guide/client/using-a-proxy.md)
- [MCP Apps spec (sandbox proxy section)](https://github.com/modelcontextprotocol/ext-apps/blob/main/specification/draft/apps.mdx)