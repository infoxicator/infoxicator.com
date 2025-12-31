---
title: "Side Projects? I don't have time for that!"
excerpt: "."
date: "2025-12-31"
tags:
  - AI
  - Agents
  - UI
readingTime: "8 min read"
---

## The importance of Side Projects

When I was doing my Masters degree I used to come back from my part time job at 7pm and start working on side projects until 11pm. I didn't even have time for cooking so I used to get a chinese takeaway and start playing with whatever new technology I was interested in.

Proof of how many fortune cookies I collected in those days in a single week 😅
![Fortune Cookies](public/images/posts/side-projects-i-dont-have-time/fortune-cookies.JPG)

That's why I recommend to anyone getting started in tech to do things on the side, I learned more from side projects than the stuff I learned during my Master's degree which I had to pay £13k for!

## Time? I don't know that Pokemon!

Fast forward a few jobs and a family and I found less and less time to do things on the side, I kept blogging and learning things but not at the same pace and consistency than those early days. It is not like I didn't want to, I felt guilty sometimes but I also learned that you should prioritise family and other things which are more important.

{% twitter 1965143376422207757 %}

However, this year I found the joy of building things, I still don't have time but thanks to Ai and coding agents I found that spending only a few hours has a great compounding effect!

Gergely from The Pragmatic Engineer puts it nicely: 

| "I get a lot more work done on my side projects, with fare less effort" 

{% twitter 2006301134236135708 %}

The tipping point for me was the release of Codex (and Claude Code). All I needed was an idea (not even a good one, just some half baked thoughts) and a few hours some time just a few minutes each night to achieve great outcomes. 

All of those unfinished projects from the wishlist finally found someone who could complete them (the clanklers... not me!)

{% twitter 1989473815983001613 %}

## Too Much Talk, Show me the stuff!

Here are the things I ship, with some small amount of effort in the second half of this year. Working be"tween 10pm and 12am while my wife and the kids are asleep and still spending an unhealthy amount of time on twitter:

### 1. Weather Agent with MCP-Ui

I have been playing with MCP-UI since it was launched and wanted to sprinkle a little bit of generative UI on top. So I built a weather agent that gets the current temperature and styles it on the fly with any style provided by the user i.e Windows 95 retro

![Weather Agent](public/images/posts/side-projects-i-dont-have-time/weather-agent.jpeg)

**Tech Stack**: 
- Postman Flows
- MCP-UI
- Weather API

** Youtube Video**: [https://www.youtube.com/watch?v=z1fD9-1R_rw](https://www.youtube.com/watch?v=z1fD9-1R_rw)

### 2. Time Machine with Nano Banana!

The Launch of Nano banana definitely changed my Vibe Coding game, I built most of my prototypes with it and pushed my imagination. I built a website that allows you to transport you back in time just by uploading your picture:

![Nano Banana Time Machine](public/images/posts/side-projects-i-dont-have-time/nano-banana-time-machine.jpeg)


**Website**: [www.iwasthere.today](https://iwasthere.today/)
** Youtube Video**: [https://www.youtube.com/watch?v=y9dDVLVIGTA](https://www.youtube.com/watch?v=y9dDVLVIGTA)

**Tech Stack** 
- React + TypeScript
- Cloudflare Workers + R2 Storage
- Postman Flows
- Nano Banana (Gemini Flash Image 2.5)

### 3. Shopify Store MCP-Ui.shop

I didn't think that in 2025 I would launch my own e-commerce store, but here we are! One of the most compelling use cases of MCP-Ui (MCP Apps) is e-commerce. so I decided to launch my own shop to sell t-shirts that can be purchased using MCP and any of the clients that support MCP-UI

![t-shirts from the shop](public/images/posts/side-projects-i-dont-have-time/mcp-ui-shop.jpeg)


**Website**: [https://mcp-ui.shop/](https://mcp-ui.shop/)
** Youtube Video**: [https://www.youtube.com/watch?v=cM6nYANYxFc](https://www.youtube.com/watch?v=cM6nYANYxFc)

**Tech Stack** 
- Shopify
- MCP StoreFront
- MCP-Ui
- Goose

### 4. Children's Book: "The Adventures of Fluffy"

I vibecoded a book from scratch for my 4 year old who's obsessed with her stuffed dog. She came up with the story, the locations, we generated the images together and then stitched it up using Canva. This was a great time bonding with my kiddo and showing her what's possible (anything) with technology. We have created 3 books now!

![The Adventures of Fluffy in Japan](public/images/posts/side-projects-i-dont-have-time/adventures-of-fluffy.jpeg)


**Tech Stack** 
- Nano Banana
- Gemini Pro
- ChatGPT
- Canva

### 5. TBPN Video Generator

My friend [Tobin South](https://x.com/TobinSouth) nerd snipped me one night, after he created a picture of the tbpn style announcements for [Liad](https://x.com/liadyosef) and [Ido](https://x.com/idosal1) joining Monday.com so I decided to build a TBPN generator but not for images but for video! 
![Tobin Slack Thread](public/images/posts/side-projects-i-dont-have-time/tbpn-tobin.png)


It creates a comedy story for when someone joins a company and generates a slide show on the fly using "generative UI / Video". I also ended up adding a bunch of templates including one for when you [attend a conference](https://tbpn-video-generator.vercel.app/react-summit) and you meet someone in person.

**Website**: [https://tbpn-video-generator.vercel.app/](https://tbpn-video-generator.vercel.app/)
** Youtube Video**: [https://www.youtube.com/watch?v=42B_ia64QZU&t=4s](https://www.youtube.com/watch?v=42B_ia64QZU&t=4s)

**Tech Stack** 
- React + Typescript
- React Router
- Remotion
- Postman Flows
- Nano Banana

### 6. ChatGPT App to buy T-Shirts

When ChatGPT launched apps, was a great moment of validation for MCP-UI! I decided to build my first app on top of my Shopify Store and allow people not just to buy the t-shirts, but also try them on, with some Ai magic ✨

![ChatGPT Apps](public/images/posts/side-projects-i-dont-have-time/chatgpt-app-t-shirt.png)

** Youtube Video**: [https://www.youtube.com/watch?v=XHgxGczwERo](https://www.youtube.com/watch?v=XHgxGczwERo)

**Tech Stack** 
- NextJS
- ChatGPT Apps SDK
- Postman Flows
- Nano Banana
- Shopify Headless CMS

### 7. Postman Welcome Video

After building the TBPN Video generator, I decided to make something a bit more useful with it. So when someone new joins postman, there is a welcome message that gets posted in one of the public slack channels. When I add the 📽️ emoji reaction to the message. An automated workflow takes the person who joined information (profile picture, job title, etc) summarises the message and creates a personalised welcome video.

![Example Welcome Video](public/images/posts/side-projects-i-dont-have-time/sterling-postman.png)

**Website**: [https://postman-new-hire-video.vercel.app](https://tbpn-https://postman-new-hire-video.vercel.app/share/d50704b2-8e56-4a42-87c4-b59148f78c9c)

**Tech Stack** 
- React + Typescript
- React Router
- Remotion
- Postman Flows
- Nano Banana
- Slack API

### 8. City Quest: The First Original ChatGPT Game!

I joined the TanStack Start Hackathon as the push I needed to finally build an idea I came up with during my first visit to NYC early in the year. The result was this ChatGPT App game, which I think is the first of its kind. It helps players discover their city with ChatGPT as their companion while collecting quests and getting a personalised Instagram ready to share video at the end.

I played it with [Erik from Code Rabbit](https://x.com/esthor) and a few friends after AI Engineer conference and we had a ton of fun! we even rescued people stuck in a lift and ended up singing Karaoke.

A newly added feature was "Kitze Mode" to conquer all the fast food places in America with [TheKitze](https://x.com/thekitze) as your coach! 😂

![City Quest](public/images/posts/side-projects-i-dont-have-time/city-quest-thumb.png)

**Website**: [https://city-quest.netlify.app](https://city-quest.netlify.app)
** Youtube Video**: [https://www.youtube.com/watch?v=MJ5RtWxOiZc&t=30s](https://www.youtube.com/watch?v=MJ5RtWxOiZc&t=30s)

**Tech Stack** 
- TanStack Start
- ChatGPT Apps SDK
- Convex
- Nano Banana



## Conclusion

**There are a few learnings and a few caveats:**

- ** Compounding is powerful!**
Every project builds on top of the one before... the stack the learnings the ideas can be combined.

- **Don't over do it!**
I started to over do it sometimes... even vibecoded on a plane at some point but it was because I was enjoying it too much. Suffice to say it could become a problem, always prioritise family and other things...

![Vibe Coding on a Plane](public/images/posts/side-projects-i-dont-have-time/vibe-coding-on-plane.jpeg)

- There's always time!

During the holidays I decided to intentionally take a break so I could play *Ghost of Yotēi* so it is always about what you want to prioritise and what's important

{% twitter 1996343569456697721 %}

I finished the game now, so don't worry my Vibe Coding career is safe! and onto 2026!