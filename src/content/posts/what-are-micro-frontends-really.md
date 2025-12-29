---
title: "What are Micro-Frontends? Really..."
excerpt: "There are widespread misconceptions about micro-frontends. Let me explain what they are not, and what they actually are."
date: "2022-04-18"
tags:
  - Micro Frontends
  - Architecture
readingTime: "5 min read"
---

<figure>
  <img src="/images/posts/what-are-micro-frontends-really/Screenshot-2022-04-18-at-21.45.46-copy.jpg" alt="What are Micro-Frontends? Really... cover" />
</figure>

<p>Every single conference talk or blog post regarding this topic contains the following phrase:</p>



<blockquote class="wp-block-quote"><p>&#8220;But first, what are Micro-Frontends?&#8221; </p></blockquote>



<p>Followed by this definition from Cam Jackson in his article <a href="https://martinfowler.com/articles/micro-frontends.html" target="_blank" rel="noreferrer noopener">Micro Frontends</a>:</p>



<blockquote class="wp-block-quote"><p><em>&#8220;An architectural style where independently deliverable frontend applications are composed into a greater whole&#8221;</em></p></blockquote>



<p>This is a great definition and encompasses the essence of what Micro-Frontends are, however, time and time and again I find a lot of confusion about what Micro-Frontends really are and what they are meant to solve. Here is my take on what Micro-Frontends are by discovering <strong>what they are not</strong>.</p>



<h2>The Naming is Unfortunate and Confusing</h2>



<p></p>



<p>This architectural pattern is not that new, it has been around for a long time and it was also known as MicroUI, however, the community settled on the term Micro-Frontends (or &#8220;microfrontends&#8221;, or &#8220;micro frontends&#8221; or &#8220;micro-frontends&#8221;?&#8230; see why the naming is unfortunate?) in 2016 after Thought Works added it to the Technology Radar.</p>



<p>After the success of Microservices, the idea was to replicate the same architectural pattern on the frontend, hence, the term Micro-Frontend was adopted to keep the familiarity. However, several other definitions and misconceptions about this pattern have caused the meaning to deviate from its original intent and focus more on things like the size because of the word &#8220;micro&#8221; and also the fact that microservices are &#8220;technology agnostic&#8221; people immediately assume that is also the case with Micro-Frontends. </p>



<p>I have also found other issues with the naming related to abbreviations and acronyms like MFEs and MFE which tends to be confused with Module Federation.</p>



<h2>They Are Not a Technology</h2>



<p>A really common misconception is that Micro-Frontends and Module Federation are the same things. Micro-Frontends are an architectural pattern, not a technology that can be implemented to solve a technical problem. It is a pattern that aims to fix an organizational problem that requires techniques to enable independent deployments and achieve business agility. On the other hand, Module Federation is a tool that enables code composition and delivery at runtime and it could be used to achieve this goal, however, it is not the only way of implementing Micro-Frontends, nor the best one for all use cases.</p>



<p></p>



<h2>They Are Not About Multiple Frontend Frameworks</h2>



<p>One of the claimed benefits of Microservices is that they can be language agnostic, so the teams building them have the freedom to choose whatever technology stack or language they feel more familiar with to deliver the service. The most common myth about Micro-Frontends is that they are meant to enable the same freedom for frontend developers eager to experiment or work with their favourite framework of choice. However, unlike microservices, enabling this freedom comes at a higher cost. Micro-Frontends cannot be encapsulated 100% and are not deterministic pieces of software due to the dependency on the underlying platform, the browser. This creates a higher performance cost of having multiple languages and frameworks operating and sharing the same platform and removes most of the benefits of being language agnostic.</p>



<p>There are certain limited use cases where having more than one JavaScript Framework could be beneficial for the architecture that could offset some of the performance tradeoffs. For example, a third party company or a team joining as a result of an acquisition might want to keep their existing choice of framework and tools and integrate with the main application using composition at runtime. Another example is when there is a transition between an existing legacy system to a new framework or technology by applying the &#8220;Strangler Pattern&#8221;.</p>



<p>These are exceptions and not the rule, I personally don&#8217;t recommend having multiple frameworks on the same page through Micro-Frontends not just because of the performance drawbacks but also because the lack of unity and uniformity in frontend teams could impede the reuse of code, tools and knowledge across the company. </p>



<h2>They are Not Components</h2>



<p>Micro-Frontends can be made up of a collection of components, however, the key difference is that components don&#8217;t usually hold any application logic and Micro-Frontends are modelled around a business domain that can be deployed independently by an autonomous team. This line is very blurry for someone just getting familiar with this pattern, but it becomes clear once the challenges of going too granular start to appear. Distributed components are an antipattern in the Micro-Frontend architectural implementation due to their increase in overhead and maintenance which is the opposite of the goal of business agility and autonomy that the Micro-Frontend pattern is meant to achieve.</p>



<p>Sometimes when people hear about Micro-Frontends, they also associate them with the Web Components specification and although Micro-Frontends could make use of this technology to achieve encapsulation and composition to enable independent delivery, they are two different things altogether. Micro-Frontends are a pattern, WebComponents (and Module Federation) are the web tools to aid this pattern.</p>



<h2>Conclusion</h2>



<p>So what are Micro-Frontends really? </p>



<p>They are an architectural pattern, they can take multiple shapes and forms depending on the company applying them and the technology used to implement them in practice. This pattern emerged from a specific need of large companies to improve their business agility and solve organizational issues caused by scaling and multiple teams, due to the specific nature of the issues and the variety of solutions from company to company, the definition has been affected by ambiguity. Hope this article helped clarify those ambiguities and improve the reputation and image of this pattern in the frontend community. </p>



<p></p>



<p></p>
