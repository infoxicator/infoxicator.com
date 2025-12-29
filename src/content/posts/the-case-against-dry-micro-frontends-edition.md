---
title: "The case against DRY, Micro-Frontends edition."
excerpt: "\"Don't Repeat Yourself\" How does a modular architectural approach affect the DRY principle?"
date: "2021-02-25"
tags:
  - architecture
  - microfrontends
readingTime: "5 min read"
---

<figure>
  <img src="/images/posts/the-case-against-dry-micro-frontends-edition/Screenshot-2021-02-25-at-23.39.31.png" alt="The case against DRY, Micro-Frontends edition. cover" />
</figure>

<p>We have been told again and again that one of the golden rules of software engineering is the famous &#8220;<a rel="noreferrer noopener" href="https://en.wikipedia.org/wiki/Don%27t_repeat_yourself" data-type="URL" data-id="https://en.wikipedia.org/wiki/Don%27t_repeat_yourself" target="_blank">Don&#8217;t Repeat Yourself</a>&#8220;; if you find code that is repetitive you should try to abstract it, however, <strong>how does a modular architectural approach affect the <code>DRY</code> principle?</strong></p>



<p>Let&#8217;s imagine that you are building a new section of a modular frontend application, you have the freedom to release to production as many times as needed without needing intervention from other teams, however, you start noticing a pattern, some of the features you are building are so similar across all modules that you decide to abstract them into their own dependency. </p>



<blockquote class="wp-block-quote"><p>What seems like a perfect application of the `DRY`principle quickly becomes a bottleneck. </p></blockquote>



<p>Let me expand on that&#8230; if the code that you abstracted is rapidly changing and your main module&#8217;s functionality depends on it, you will have to ensure you deploy that code before it can be used in your module and instead of having the freedom of one deployment, now we have to deploy two different codebases to achieve a working feature. </p>



<p>Let&#8217;s add something else on top of it, the second team who wants to reuse the same library that you extracted have also added some &#8220;extra features&#8221; to adjust the library to their own use case and now you find yourself quickly maintaining more and more features that were not part of the original requirements. </p>



<p>Finally, we end up with larger codebases and more complex code to adjust for all edge cases or even worse we might end up with a smaller inferior solution because we had to settle for the minimum set of features that apply to both use cases but leaving personalised use cases behind.</p>



<figure class="wp-block-image size-large"><a href="/images/posts/the-case-against-dry-micro-frontends-edition/reuse-Page-3.jpg"><img loading="lazy" width="731" height="375" src="/images/posts/the-case-against-dry-micro-frontends-edition/reuse-Page-3.jpg" alt="" class="wp-image-474" /></a></figure>



<blockquote class="wp-block-quote"><p>Reusing is very difficult! in some cases the cost of reusing is higher than building the feature twice.</p></blockquote>



<h2><em>Three strikes&#8230; reuse</em>!</h2>



<p>Ok, so that&#8217;s if you have only 2 similar features, but what about the &#8220;<a rel="noreferrer noopener" href="https://en.wikipedia.org/wiki/Rule_of_three_(computer_programming)" target="_blank">Rule of three</a>&#8220;, surely that is when you should think about an abstraction, right? well, like in most things in software development, it depends&#8230;</p>



<p>One of the main benefits of a modular &#8220;Micro-Frontend&#8221; architecture (and one of the most difficult to apply) is to decouple different modules to allow for independent deployments. If we start adding abstractions that break this pattern and tightly couple the different modules back together we end up back on square one and we negate this benefit resulting in a &#8220;distributed monolith&#8221;. </p>



<h2>It&#8217;s all about the simple things</h2>



<p>So hold on, are you saying that we must reinvent the wheel again and again?&#8230; Of course not! reuse is very useful when you try to abstract <strong>small</strong>, <strong>atomic</strong> and <strong>static</strong> things. Component libraries and design language systems are the best examples of how to reuse code effectively without breaking the freedoms of independent deployments&#8230; so don&#8217;t worry I am not suggesting that you should re-create the same button 100 times.</p>



<p></p>



<h2>Reusability is a nice &#x201C;side effect&#x201D; not the target</h2>



<p>Features and user experiences that are not static or atomic are very different when it comes to reusing code and not repeating yourself. It is definitely possible but harder and it might come with a cost. The recommendation is not to force the reuse and let it naturally occur, having a clear contract between the reused features and the consumers and preserving the ability to deploy independently to avoid blockers.</p>



<p>A great example of code reuse in a Micro-frontend application is the header and the footer; they are features that contain an entire user experience that is present in most of the pages of the website. After transitioning to independent deployments and using a vertical slice approach, each team might find themselves building and providing the same header and footer. This could lead to multiple copies that are not synchronized, affecting consistency and creating issues because there isn&#8217;t a centralised place to update or manage each copy.</p>



<figure class="wp-block-image size-large"><a href="/images/posts/the-case-against-dry-micro-frontends-edition/reuse-Page-1.jpg"><img loading="lazy" width="1021" height="458" src="/images/posts/the-case-against-dry-micro-frontends-edition/reuse-Page-1.jpg" alt="" class="wp-image-470" /></a></figure>



<p>The key to reusing these user experiences is to allow for horizontal slicing of the application where an individual team can deploy the header and footer independently and other teams will just consume them, with a clear contract for required communication (like showing the login or logout button depending on the user session for example). </p>



<figure class="wp-block-image size-large"><a href="/images/posts/the-case-against-dry-micro-frontends-edition/reuse-page-2-1.jpg"><img loading="lazy" width="720" height="501" src="/images/posts/the-case-against-dry-micro-frontends-edition/reuse-page-2-1.jpg" alt="" class="wp-image-469" /></a></figure>



<h2><strong>Conclusion</strong></h2>



<p>Reusing features or entire user experiences is very difficult! When approached by the temptation of abstracting an entire user experience I usually ask myself the following questions:</p>



<ol><li>Is the feature something that doesn&#8217;t change very often?</li><li>Is this feature present in more than three places? (<a href="https://en.wikipedia.org/wiki/Rule_of_three_(computer_programming)">Rule Of Three</a>)</li><li>Is the code made up of simple atomic things like components?</li><li>Can the feature be owned by an independent team?</li><li>Can I deploy the feature independently without tightly coupling it to other features?</li></ol>



<p>If the answer to most of the questions above is &#8220;Yes&#8221;! then &#8220;<strong>Don&#8217;t Repeat Yourself</strong>!&#8221;</p>
