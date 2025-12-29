---
title: "Rules of Micro-Frontends"
excerpt: "This is an opinionated list of best practices when designing applications that follow the Micro-frontend pattern"
date: "2020-12-29"
tags:
  - architecture
  - microfrontends
readingTime: "4 min read"
---

<figure>
  <img src="/images/posts/rules-of-micro-frontends/Screenshot-2020-12-29-at-17.39.07.png" alt="Rules of Micro-Frontends cover" />
</figure>

<p>I always wondered how large web applications were built! I discovered the secret a while back and it became my passion. After experiencing the advantages and pains of using Micro-Frontends at scale, I have decided to document this journey and share some of the &#x201C;best practices&#x201D;.</p>



<p>This is an opinionated list of best practices when designing applications that follow the Micro-frontend pattern. Each &#8220;rule&#8221; should be examined and its benefits/downsides evaluated against your specific use case.</p>



<h2>Zero coupling between Micro-frontends</h2>



<p>To achieve the benefits of this architecture, accidental coupling should be avoided as much as possible; this will unlock the flexibility and scalability that the Micro-Frontend pattern has to offer as well as future-proofing your applications by allowing incremental upgrades or future complete rewrites of parts of your application.</p>



<p>Each Micro-frontend should be able to render in isolation or inside a container application. The data required should be loaded by each Micro-Frontend and avoid data waterfalls.</p>



<p><strong>Do:</strong></p>



<ul><li>&#x2705; Share libraries that can be swapped without affecting other Micro-frontends.</li><li>&#x2705; Load all the data it needs to render.</li></ul>



<p><strong>Do Not:</strong></p>



<ul><li>&#x274c; Have a centralised store/share data across different Micro-Frontends.</li><li>&#x274c; Share libraries that are in active development.</li></ul>



<h2>Separate Code Bases</h2>



<p>Each Micro-Frontend should have its own codebase and the version control of choice shouldn&#8217;t have any impact on the way the project is developed or deployed. Having all projects under a single monorepo or individual repositories is fine.</p>



<p><strong>Do: </strong></p>



<ul><li>&#x2705; Use Monorepos.</li><li>&#x2705; Use individual repos.</li></ul>



<h2>Each Micro-frontend should be deployed independently</h2>



<p>Each Micro-Frontend should have it&#8217;s own CI / CD pipeline and be able to deploy to production on demand without any dependencies on other Micro-frontends. A common antipattern that should be avoided is &#8220;The deployment queue of hell&#8221; where different Micro-frontends are so tightly coupled that they need to be deployed in a specific order to avoid breaking the application.</p>



<p><strong>Do:</strong></p>



<ul><li>&#x2705; Have separate CI / CD pipelines.</li><li>&#x2705; Release on demand.</li></ul>



<p><strong>Do Not:</strong></p>



<ul><li>&#x274c; Have Release schedules.</li><li>&#x274c; Have incremental/sequential deployments that require previous versions.</li></ul>



<h2>Micro-Frontends should be tested Independently</h2>



<p>Because Micro-Frontends are required to render independently as well as inside a container application, it makes sense to also test them independently using unit and integration tests for both scenarios.</p>



<p><strong>Do</strong>:</p>



<ul><li>&#x2705; Have unit and integration tests for each Micro-Frontend rendering in isolation.</li><li>&#x2705; Run integration tests for Micro-Frontends rendering inside the container applications as part of end-to-end testing.</li></ul>



<h2>Micro-Frontends should be versioned</h2>



<p>When a new Micro-Fronted is deployed to production, the previous version should not be deleted and the new version should be tagged with a version number using semantic versioning or similar. It is up to the container applications to decide what specific version of a particular Micro-Frontend to use (<code>Managed</code>) or always use the latest version instead (<code>Evergreen</code>).</p>



<p><strong>Do</strong>:</p>



<ul><li>&#x2705; Use Semantic versioning.</li><li>&#x2705; Use a specific version or &#8220;latest&#8221;.</li></ul>



<p><strong>Do Not:</strong></p>



<ul><li>&#x274c; Require a global deployment to change versions.</li><li>&#x274c; Delete previous versions.</li></ul>



<h2>Minimal Communication</h2>



<p>Communication between Micro-Frontends should be minimal and simple, avoiding global state and framework-specific solutions as much as possible.</p>



<p>If two or more Micro-Frontends are sharing a lot of messages to provide their minimal functionality, they might be too tightly coupled and they could share a similar enough purpose that they should be considered to be integrated into one.</p>



<p><strong>Do: </strong></p>



<ul><li>&#x2705; Keep messages small and simple.</li><li>&#x2705; Avoid state and communication frameworks if possible.</li></ul>



<p><strong>Do Not:</strong></p>



<ul><li>&#x274c; Share state.</li><li>&#x274c; Have unnecessary communication.</li></ul>



<h2>CSS should be scoped</h2>



<p>CSS from loaded from one Micro-fronted should not affect others.</p>



<p><strong>Do:</strong></p>



<ul><li>&#x2705; Scope your CSS.</li><li>&#x2705; Use a CSS-in-JS or namespacing library (like CSS Modules).</li></ul>



<p><strong>Do Not:</strong></p>



<ul><li>&#x274c; Use global CSS.</li></ul>



<h2>Final Recommendations</h2>



<ul><li>&#x2705; Try to create autonomous teams.</li><li>&#x2705; Try to arrange your Micro-Frontends around business functionality.</li><li>&#x2705; Reusability is a nice &#8220;side effect&#8221; not the target.</li><li>&#x274c; Don&#8217;t Force this architectural style just because it is &#8220;new&#8221;.</li><li>&#x274c; You don&#8217;t need multiple javascript frameworks.</li><li>&#x274c; You don&#8217;t need a &#8220;micro-frontend framework&#8221;.</li><li>&#x274c; Micro-Frontends don&#8217;t have to be &#8220;micro&#8221;.</li></ul>
