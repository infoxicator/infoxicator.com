---
title: "Micro-Frontends FAQs"
excerpt: "Questions I fielded after my React Advanced London 2021 presentation on Micro-Frontends Performance and Centralised Data Caching."
date: "2021-10-27"
tags:
  - Micro Frontends
  - Architecture
readingTime: "5 min read"
image: "https://www.infoxication.net/wp-content/uploads/2021/10/React-Advanced-London-2021-The-Brewery-Simon-Callaghan-Photography-282-scaled-e1635890210219.jpeg"
---

<figure>
  <img src="/images/posts/micro-frontends-faqs/React-Advanced-London-2021-The-Brewery-Simon-Callaghan-Photography-282-scaled-e1635890210219.jpeg" alt="Micro-Frontends FAQs cover" />
</figure>

<p>These are some of the questions I received after my presentation &#8220;Micro-Frontends Performance and Centralised Data Caching&#8221; at React Advanced London 2021.</p>



<blockquote class="wp-block-quote"><p>Are Micro-Frontends mainly used for large organisations and when you have multiple teams working on the same page/site or are there any benefits for small teams and solo devs?</p></blockquote>



<p>That&#8217;s correct, Micro-Frontends are the answer to an organisational problem, if you don&#8217;t have that problem then you probably don&#8217;t need Micro-Frontends. They are useful when you encounter scaling issues and your teams have grown to the point where you start getting friction and your deployments to production have become painful and slow.</p>



<p>There could be some benefits for small teams, for example, if you arrange your application so each developer owns a certain part of the UI and they deploy that independently. I don&#8217;t think there are any benefits for Solo Devs because it will add unnecessary complexity to a small project.</p>



<blockquote class="wp-block-quote"><p>How do you share global state?</p></blockquote>



<p>The answer is you don&#8217;t. Global state could cause coupling between Micro-Frontends and add a central dependency that could block or stop independent deployments. The best recommendation when working Micro-Frontends is to avoid coupling at all costs because if you don&#8217;t you might end up with a distributed monolith and none of the benefits of Micro-Frontends.</p>



<p>Now, how do you communicate between them? The key is to keep the messages small and to a minimum, respect the system boundaries and have strong contracts that guarantee the encapsulation of your Micro-Frontends. A good example of this is using the Pub / Sub model and the <code>postMessage()</code> API.</p>



<blockquote class="wp-block-quote"><p>How do you maintain coding style and conventions over multiple Micro-Frontends and teams working on them?</p></blockquote>



<p>People think Micro-Frontends are bad for consistency, however, this is not an issue related to this architectural pattern; this is an organisational issue and as such, your company and teams are responsible for keeping coding standards and maintaining style consistency by implementing something like a Design System. Micro-Frontends could be good for consistency by allowing you to reuse certain parts of the application like the header and the footer.</p>



<blockquote class="wp-block-quote"><p>How do you share common components? Do you create them as Micro-Frontends or do you create a component libary and consume it as a normal npm dependency?</p></blockquote>



<p>I would recommend a component library, however, the key to making it work well with Micro-Frontends is to have well defined atomic components instead of large pieces of UI. Also, it is important that the library is stable (not in active development) to avoid coupling. If you are constantly making changes to the base components, all your Micro-Frontends will need to consume those updates which create a bottleneck and slows down independent deployments.</p>



<blockquote class="wp-block-quote"><p>How do you ensure all teams update to the latest version of a shared dependency at the same time?</p></blockquote>



<p>If this is a dependency, then you just follow the normal process of communicating the update to your consumers and they will have to install and deploy their codebases to reflect the latest changes.</p>



<p>If you want to update a Micro-Frontend and you want all your users to consume the same version, for example, if you want them to consume the same version of the header or footer then you can use two different approaches.</p>



<p>The first one is the &#8220;evergreen&#8221; approach, where all your consumers always point to the latest version as soon as it is published.</p>



<p>The second approach is the &#8220;managed&#8221; approach, where you publish your Micro-Frontend and follow the rules of Semantic Versioning so consumers can choose what version to use; the difference of this approach from a standard npm dependency is that you can start consuming the new version at runtime without the need to install and deploy a new version of the application that is consuming it.</p>
