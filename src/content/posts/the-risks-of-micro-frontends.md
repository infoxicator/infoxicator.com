---
title: "The Risks of Micro-Frontends"
excerpt: "Architecture is a series of decisions and trade-offs. Here are the common risks of Micro-Frontends and how to mitigate them."
date: "2021-11-09"
tags:
  - Micro Frontends
  - Architecture
readingTime: "6 min read"
---

<figure>
  <img src="/images/posts/the-risks-of-micro-frontends/photo-1558939608-7e8f4c8336d2-copy.jpg" alt="The Risks of Micro-Frontends cover" />
</figure>

<p>If you are working on a large scale application and the friction between your teams is exponentially increasing as your application grows larger, you are probably considering if the Micro-Frontend pattern is a good fit for you and your organisation. Architecture is a series of decisions and trade-offs, and you want to make the right choice and avoid creating an even bigger problem.</p>



<p>So here are some common Micro-Frontends risks and disadvantages you should be aware of:</p>



<h2><a href="https://dev.to/infoxicator/the-risks-of-micro-frontends-4pgh-temp-slug-5699823?preview=04c5a3959f90f0b37176c36e131fe9aaf36ae28bdb41685e1deb6732e935cbf79f7ea2617ce716a5ab8ae13d51052d2edf7886b3d69572c536cb0ee6#the-browser"></a>The Browser</h2>



<p>Microservices allow a deeper level of encapsulation by using containerisation to ensure the same piece of software runs consistently on any infrastructure, however, with Micro-Frontends, there is a platform that we cannot avoid: The Browser. As a result, we have to deal with the different variations and ensure that we optimise for performance without compromising on the flexibility of independent deployments.</p>



<p>Following best practices, keeping bundle sizes small and implementing container applications (also called shells) that are in charge of composition and configuration should help solve most of the quirks of running &#8220;Microservices&#8221; inside the browser.</p>



<h2><a href="https://dev.to/infoxicator/the-risks-of-micro-frontends-4pgh-temp-slug-5699823?preview=04c5a3959f90f0b37176c36e131fe9aaf36ae28bdb41685e1deb6732e935cbf79f7ea2617ce716a5ab8ae13d51052d2edf7886b3d69572c536cb0ee6#too-many-microfrontends"></a>Too many Micro-Frontends</h2>



<p>I have seen so many Micro-Frontends implementations that fall for this trap; splitting your modules too thin produces exponential complexity, discoverability issues, more infrastructure to maintain and unnecessary overhead.</p>



<p>The key to splitting Micro-Frontends is to avoid having single entities that require other modules to function, instead, you should divide them into different <a href="https://martinfowler.com/bliki/BoundedContext.html">Bounded Contexts</a> and follow Domain Driven Design patterns. This ensures explicit relationships, clear boundaries and improved communication between teams.</p>



<h2><a href="https://dev.to/infoxicator/the-risks-of-micro-frontends-4pgh-temp-slug-5699823?preview=04c5a3959f90f0b37176c36e131fe9aaf36ae28bdb41685e1deb6732e935cbf79f7ea2617ce716a5ab8ae13d51052d2edf7886b3d69572c536cb0ee6#multiple-implementations"></a>Multiple Implementations</h2>



<p>A downside of Micro-Frontends is that there isn&#8217;t a single implementation, there are many ways of achieving independent deployments and architectures vary depending on the company applying them. This can cause confusion and a steeper learning curve for developers trying to adopt this architecture.</p>



<p>&#8220;Patterns that cause you to ask more questions than they answer are not good patterns&#8221;. However, in the case of Micro-Frontends, this is an unfortunate side effect of the nature of the problem they are trying to solve. They are an answer to an organisational problem, and all organisations are different, so something that works for company A might cause a lot of issues at company B. The lack of standardisation and variability leads to a lot of questions. It doesn&#8217;t mean that some approaches taken by companies implementing this architecture are not correct or that the Micro-Frontend pattern is not valid, quite the opposite, they intend to solve a very specific problem that requires personalised solutions.</p>



<h2><a href="https://dev.to/infoxicator/the-risks-of-micro-frontends-4pgh-temp-slug-5699823?preview=04c5a3959f90f0b37176c36e131fe9aaf36ae28bdb41685e1deb6732e935cbf79f7ea2617ce716a5ab8ae13d51052d2edf7886b3d69572c536cb0ee6#scale-and-organisational-structures"></a>Scale and Organisational Structures</h2>



<p>The Micro-Frontend pattern heavily relies on organisational structures and they are an answer to scaling problems that are the result of a quick expansion in the application and the number of developers who maintain it. Because organisational structures vary so much, some patterns like vertical ownership of end to end features or The BFF (Backend for Frontend) pattern might not make sense to your organisation. The good news is Micro-Frontends are very flexible and you don&#8217;t have to adopt those patterns to get the benefits. As long as you can achieve independent deployments of properly divided pieces of frontend functionality, the rest is up to your organisation to decide what works best for your teams.</p>



<h2><a href="https://dev.to/infoxicator/the-risks-of-micro-frontends-4pgh-temp-slug-5699823?preview=04c5a3959f90f0b37176c36e131fe9aaf36ae28bdb41685e1deb6732e935cbf79f7ea2617ce716a5ab8ae13d51052d2edf7886b3d69572c536cb0ee6#%C2%A0microfrontend-frameworks"></a>&nbsp;Micro-Frontend Frameworks</h2>



<p><a href="https://itnext.io/11-micro-frontends-frameworks-you-should-know-b66913b9cd20">&#8220;11 Micro-Frontend Frameworks you should know&#8221;</a>&nbsp;&#x1f644;</p>



<p>As a result of the lack of standard implementations, several frameworks have emerged to provide you with the building blocks and guide you on how to use Micro-Frontends. I am not saying these Frameworks are not valuable or helpful, however, if you decide to use them, just remember that you are automatically accepting all their opinions and trade-offs that were the results of the experience and requirements at their companies. Micro-Frontends are the solution to scaling and an organisational issue, if you apply a framework tailored to another organisation that is not yours, it might not solve your particular problem and could cause even more issues.</p>



<h2><a href="https://dev.to/infoxicator/the-risks-of-micro-frontends-4pgh-temp-slug-5699823?preview=04c5a3959f90f0b37176c36e131fe9aaf36ae28bdb41685e1deb6732e935cbf79f7ea2617ce716a5ab8ae13d51052d2edf7886b3d69572c536cb0ee6#conclusion"></a>Conclusion</h2>



<p>Should you adopt Micro-Frontends? Ask yourself first, do I have a problem?. If the answer is yes and you are part of a big organisation working on a large scale application, you can assess the benefits and risks of this architectural pattern and decide if it is going to help you solve your particular problem. You can reach out to other companies for inspiration and example architectures that worked well for their specific context but bear in mind that your solution might look very different.</p>



<p>Remember, an architecture is only as good as its implementation.</p>
