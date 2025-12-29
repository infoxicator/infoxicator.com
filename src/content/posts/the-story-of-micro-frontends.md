---
title: "The Story of Micro Frontends"
excerpt: "A quick look at the evolution of front-end development and the natural transition to the micro frontend architecture..."
date: "2020-09-07"
tags:
  - architecture
  - microfrontends
readingTime: "4 min read"
---

<figure>
  <img src="/images/posts/the-story-of-micro-frontends/Screenshot-2020-09-07-at-22.49.22-e1606584531149.png" alt="The Story of Micro Frontends cover" />
</figure>

<h1 id="6bec">A Familiar Scenario</h1>



<p>It is 5:30 pm on a Friday and you must deploy a very important fix to the frontend of your application; you kick off the deployment process and wait for the 50K unit and integration tests to run. Just before the tests are done, you receive a message from another team telling you that the commit they pushed last week to enable &#x201C;Dark Mode&#x201D; hasn&#x2019;t been approved yet and because it is bundled with your fix, you must stop the entire deployment process. At this point, you just want to go home and even consider changing careers.</p>



<p>Sounds familiar? If you have been in this situation, you might benefit from a &#x201C;paradigm switch&#x201D;.</p>



<h2 id="9b2d">Enter the next generation in front end architecture: Microservices for the frontend!</h2>



<h1 id="b36e">But First, a Bit of History&#x2026;</h1>



<p>Not long ago our web applications were built as a huge&nbsp;<strong>&#x201C;monolith&#x201D;</strong>; backend and frontend bundled together; but as applications started to grow, we decided to &#x201C;split&#x201D; the backend and frontend and we saw the rise of&nbsp;<strong>Single Page Applications</strong>&nbsp;that communicate via APIs. The backend teams had their evolution and also &#x201C;split&#x201D; their applications into&nbsp;<strong>Microservices.&nbsp;</strong>Back in the frontend realm, the concept of &#x201C;<strong>components</strong>&#x201D; was introduced by popular libraries like React that provided composition and reusability to our codebases. Now, why did the frontend stop there? here is where the new concept of&nbsp;<strong>Microfrontends</strong>&nbsp;is introduced as the next step in the evolution of web development.</p>



<h1 id="8858">What are Microfrontends?</h1>



<figure class="wp-block-image size-large"><img loading="lazy" width="731" height="561" src="/images/posts/the-story-of-micro-frontends/Micro-UI.jpg" alt="" class="wp-image-258" /></figure>



<p>The Microfrontend architecture is a new paradigm that allows you to split the &#x201C;frontend monolith&#x201D; into small, reusable and independent user experiences.</p>



<p>These experiences have their&nbsp;<strong>own repositories</strong>, their own&nbsp;<strong>CI/CD pipeline&nbsp;</strong>and can be&nbsp;<strong>deployed and tested independently.</strong></p>



<h1 id="2aeb">Benefits</h1>



<h2 id="4ded">Independent Deployments &#x1f680;</h2>



<ul><li><strong>Reduced Risk</strong>: You are only deploying what has changed instead of the entire application.&nbsp;<em>&#x201C;If it is not broken don&#x2019;t fix it&#x201D;</em></li><li><strong>Quick fixes to production:</strong>&nbsp;Avoiding dependencies on other teams or code allows you to ship critical fixes faster.</li><li><strong>Simplified testing:&nbsp;</strong>Run tests for the individual frontends with defined boundaries and guarantee their functionality by following the single responsibility approach.</li></ul>



<h2 id="5171">Independent Teams &#x1f468;&#x200d;&#x1f3eb;</h2>



<ul><li><strong>Full ownership</strong>: Vertical slicing could be applied to the team structure to deliver features end to end, owning the entire tech stack.</li><li><strong>Avoid dependencies:&nbsp;</strong>The team&#x2019;s autonomy helps to reduce the need for coordination and helps avoid interference/blockers.</li><li><strong>Faster time to market:&nbsp;</strong>Increased velocity and autonomy to push features out of the door faster.</li></ul>



<h2 id="f159">Decoupled Codebases &#x270d;&#xfe0f;</h2>



<ul><li><strong>Developer Experience:&nbsp;</strong>Improvements in productivity and focus.</li><li><strong>Reduced Scope:</strong>&nbsp;Helps developers to understand the code better and prevents being overwhelmed by a huge codebase</li><li><strong>Avoid accidental coupling:&nbsp;</strong>Developers only interact with specific parts of the code when developing new features and because there are set boundaries, this stops the need for connecting components that should not know about each other.</li></ul>



<h2 id="2a92">Reusability &#x1f5c3;</h2>



<ul><li><strong>Encapsulated Experiences:</strong>&nbsp;Features built as independent user experiences can be easily reused throughout the application.</li><li><strong>Composition</strong>: similar to the reusability of components achieved by composition this approach can also be applied to micro frontends.</li><li><strong>Reuse by other applications:&nbsp;</strong>Because micro frontends have their own CI/CD pipeline, they can be deployed to different applications and even be shared as &#x201C;plug and play&#x201D; solutions that contain all the business logic and UI presentation required to fulfil multiple use cases.</li></ul>



<h2 id="acf7">Trade-Offs &#x1f61e;</h2>



<ul><li>Single developer?</li><li>Small team?</li><li>Small application?</li></ul>



<p>The micro frontend architecture might not be a good fit and it is better suited to medium to large applications with multiple teams that need to work independently.</p>



<p>As with microservices, with the micro frontend pattern, you will find an increased number of moving parts that have to be managed and configured increasing the overall complexity of the application. These issues, however, are not a direct product of this pattern but an inherited side effect that comes with scaling and when operating with large applications and multiple teams. Some training might also be required and the need for new tools to help to orchestrate all the pieces and bundle them together.</p>



<h1 id="4bc3"><strong>Conclusion</strong></h1>



<p>As your applications start to scale, and you start adding more developers to the project and new teams are created, it might be the right time to break the &#x201C;frontend monolith&#x201D; and give your teams the autonomy they need to deliver features faster to your users.</p>



<iframe loading="lazy" width="100%" height="375" src="https://www.youtube.com/embed/Cbju5GSF1KU" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
