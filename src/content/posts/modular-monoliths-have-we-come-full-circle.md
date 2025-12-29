---
title: "Modular Monoliths: Have we come full circle?"
excerpt: "The promise to bring back the \"good old productivity win\" of monolithic frameworks like Ruby on Rails but keeping the modularity."
date: "2021-06-08"
tags:
  - architecture
readingTime: "4 min read"
---

<figure>
  <img src="/images/posts/modular-monoliths-have-we-come-full-circle/Screenshot-2021-06-08-at-18.44.13-copy.jpg" alt="Modular Monoliths: Have we come full circle? cover" />
</figure>

<h2>First an Apology&#x2026;</h2>



<p>This is a public apology to my friend Brandon <em><a href="https://twitter.com/flybayer" data-type="URL" data-id="https://twitter.com/flybayer" target="_blank" rel="noreferrer noopener">@flybayer</a></em>. Back in 2020 when he published <a href="https://blitzjs.com/">Blitz</a>, I replied to one of his tweets with something along the lines of:</p>



<blockquote class="wp-block-quote"><p>&#8220;I don&#8217;t understand why people want to go back to the monolith, especially on top of React, I thought we have gone past that and microservices + SPAs are the norm today&#8221;.</p></blockquote>



<p>I was wrong, very wrong&#x2026;</p>



<h2>Is There a Middle Ground?</h2>



<p>I have been exploring a lot of the new cool stuff that is coming to the JavaScript ecosystem lately, and I have noticed an interesting trend: developers want the flexibility and scalability of modular systems but without the maintenance and complexity overhead that it brings.</p>



<p>This is where backend tools like <a href="https://github.com/module-federation/MicroLib"><code>MicroLib</code></a> and Full Stack &#8220;meta-frameworks&#8221; like <a href="https://blitzjs.com/"><code>Blitz</code></a> and <a href="https://remix.run/"><code>Remix</code></a> promise to bring back the &#8220;good old productivity win&#8221; of monolithic frameworks like Ruby on Rails but keeping the modularity and component first approach of the modern web.</p>



<h2>Modular Monoliths</h2>



<p>This concept is not new and probably not very popular these days; It is an architectural style where you build applications in a modular fashion by enforcing strict boundaries between different domains and improving code reusability which makes code organization and dependency management easier. The key to a Modular monolith is that you keep the parts (modules) that compose the system as a single deploying unit, aka &#8220;monolith&#8221;.</p>



<h2>&nbsp;Why Would Anybody Use This?</h2>



<p>Being the middle ground between a traditional monolith and a full-blown microservices architecture, a modular monolith only brings limited benefits in terms of scalability, autonomous teams, and independent delivery, however, it could be a better approach than starting with microservices from day one. This follows the advice of Martin Fowler in his article <a href="https://martinfowler.com/bliki/MonolithFirst.html">&#8220;Monolith First&#8221;</a>.</p>



<p>The modular monolith could be implemented as a way of identifying the boundaries of the system while keeping the agility and low maintenance overhead of a monolith in order to increase development speed and quicker time to market.</p>



<p>This path could lead to an initial design of the system and serve as an intermediate state that can be sliced into individual microservices in the future, however, if the team already has the experience and are comfortable with microservices, there are clear system boundaries from day one and the infrastructure is already in place, then going straight to microservices should be considered instead.</p>



<h2>New Generation Modular Monoliths</h2>



<p>How are the new full-stack &#8220;meta-frameworks&#8221; like <code>blitz.js</code> (built on top of <code><a rel="noreferrer noopener" href="https://nextjs.org/" target="_blank">next.js</a></code> the new generation of modular monoliths?</p>



<p>The way a framework like <code>Blitz</code> works is by keeping the frontend separate in a Single Page Application fashion but connecting to the data layer without the use of REST/GraphQL APIs allowing for direct database access. It remains as a single deploying unit, however, it has clear boundaries that can be &#8220;peeled off&#8221; and moved to separate APIs like microservices or serverless functions in the future.</p>



<h2>Hexagons, Hexagons Everywhere!</h2>



<figure class="wp-block-image"><img src="/images/posts/modular-monoliths-have-we-come-full-circle/3cpljev4yrwoq4g5rxzb.png" alt="Alt Text"/></figure>



<p>If you want to keep your frontend and backends separate but you don&#8217;t want to pay the <a href="https://martinfowler.com/bliki/MicroservicePremium.html">&#8220;microservices premium&#8221;</a>, another interesting pattern that has emerged is libraries like <a href="https://github.com/module-federation/MicroLib">&#8220;MicroLib&#8221;</a>, built on top of <a href="https://webpack.js.org/concepts/module-federation/">Module Federation</a> and based on &#8220;hexagonal architecture&#8221; to create a &#8220;polylith&#8221;, a monolith comprised of multiple (what would otherwise be) microservices.</p>



<p>The key difference with a traditional &#8220;modular monolith&#8221; is that a &#8220;polylith&#8221; can independently deploy the multiple modules that comprise the system. This could be the &#8220;best of both worlds&#8221; in terms of manageability, reusability, and autonomy.</p>



<h2>Conclusion</h2>



<p>Senior Engineers learned the phrase &#8220;it depends&#8221; from Architects&#x2026; so should you implement a modular monolith? Well, it depends on your requirements and where you are in the lifecycle of your application. Big companies like Shopify have successfully scaled their monoliths by <a href="https://shopify.engineering/deconstructing-monolith-designing-software-maximizes-developer-productivity">implementing a modular monolith</a> and prove that the answer is not always microservices.</p>
