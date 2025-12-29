---
title: "Is React Going Anywhere?"
excerpt: "React will turn 10 years old soon. As applications built with React age, they accumulate problems. But are these issues inherent to React itself?"
date: "2022-11-23"
tags:
  - React
  - JavaScript
  - Architecture
readingTime: "6 min read"
---

<figure>
  <img src="/images/posts/is-react-going-anywhere/byereact.png" alt="Is React going anywhere? cover" />
</figure>

<p>Earlier this year I had an interesting conversation with a CTO of a price comparison website (e-commerce) and he mentioned that <strong>they are moving away from React.</strong></p>



<p>&#8220;Wait, what?&#8221;&#8230; was my Reaction (pun &#x1f44a; intended)&#8230; please tell me more!</p>



<blockquote class="wp-block-quote"><p>&#8220;Yeah, it is not working for us, we are moving away for performance reasons, e-commerce is a really competitive market and we need to ensure our site is 100% performant to beat the competition&#8221;</p></blockquote>



<p>Ok, fair enough, I thought&#8230; </p>



<p>You must have found a considerably better framework right? so where are you moving to?  </p>



<p>Vue? Svelte?  SolidJS? Qwick? Astro? (cough, heavens forbid) PHP?</p>



<blockquote class="wp-block-quote"><p> &#8220;No, we are just keeping React for server-side rendering for now and using <strong>Vanilla JavaScript</strong> in the frontend&#8221;</p></blockquote>



<p>That was not the answer I was expecting and unfortunately I didn&#8217;t have time to enquire more about their decision, but it got me thinking.</p>



<p>Is this going to become more common now? are people moving away from React the same way we saw the mass migration out of AngularJS back in 2014/2015?</p>



<h2>React is Getting Old</h2>



<p>React will be<strong> 10 years old on the 29th of May 2023</strong> (finally recruiters are able to ask for 10 years of experience, without being a laughing stock)</p>



<figure class="wp-block-image size-full"><a href="/images/posts/is-react-going-anywhere/download.jpeg"><img loading="lazy" width="506" height="493" src="/images/posts/is-react-going-anywhere/download.jpeg" alt="" class="wp-image-573" /></a></figure>



<p></p>



<p>This means that applications are also starting to get old, and when applications start to get old, you start finding issues, loads of them. </p>



<ul><li>A hard-to-maintain codebase</li><li>Legacy patterns </li><li>Old and new code mixed</li><li>Multiple or old state management libraries</li><li>CSS-in-JS</li></ul>



<p>Something very important to note here before we continue is that none of the problems listed above has anything to do with React itself &#x1f914;</p>



<h2>So is React the problem? </h2>



<p>I have observed something really interesting and is that we as developers like to find culprits, but when the culprits are not very obvious, for example, when the issues are related to processes, company culture or just bad practices, we turn the blind eye on those issues that are affecting our applications the most and convince ourselves that the problem must be the technology because it is something we have somewhat control over.</p>



<p>It is easier for engineers to suggest and convince leaders in organisations that if we change the technology we will somehow magically solve all the other problems. So when a new technology or framework promises to fix some issues that we might have, (<strong>but are not the main issue</strong>), we start focusing on them and start suffering from &#8220;tunnel vision&#8221;.</p>



<p>For example, in terms of performance which is one of the main reasons, people start looking at alternatives to React, in most cases, the framework is only responsible for a small fraction of a bad user experience. Most of the time they are caused by bad practices, incorrect abstractions and bad ideas terribly implemented.</p>



<p>When we compare performance benchmarks between different frameworks we usually create an application that is not close anywhere near to the real world, and I am not talking about the type of application. Some demos are better than others and you can create a really comprehensive UI that is not a &#8220;Todo App&#8221;, but even with that, it has been created in a &#8220;lab environment&#8221; following the best practices, with no constraints, tech debt or cutting corners to make it to the next release. </p>



<p>Applications in the real world are not built like that, they are messy, often rushed, and developed by multiple people, so for us to fight for the last millisecond is pointless when our network latency, backend APIs and bundle size (cough cough SPAs) are the main culprits.</p>



<p>It is all a matter of what percentages of your problems are caused by React itself and what is important for your application. In the case of that CTO, they did as much as they could to fix their issues, and then came to the conclusion that React was to blame for the performance so they had to change it, but it is one of those rare cases, especially in e-commerce where profit margins are so slim that every millisecond counts.</p>



<p>One thing I can say about React is it exacerbated other problems by being &#8220;unopinionated&#8221; and not providing some guidelines. It didn&#8217;t provide a way for developers to fall into the &#8220;pit of success&#8221;. Multiple competing patterns emerged that in hindsight have been really bad for our React applications&#8230; but oh well, we didn&#8217;t know what we didn&#8217;t know back in 2015.</p>



<h2>To Migrate or Not to Migrate</h2>



<p>A lot of companies are late to the party and they are still thinking about migrating to React, not away from it. It is easy to get into our little bubble and not realise that most companies don&#8217;t move near as fast as in our industry and they are still a lot of them (especially banks) that have not started or are still in the process of migrating.</p>



<p>For those who have been using React for a while, I sense that there is little appetite for another &#8220;AngularJS&#8221; style migration in the near future. (if you are one of those like me who led an AngularJS migration at our companies, congratulations! we completed our rite of passage &#x1f37e;)</p>



<p>It was a big investment, millions of dollars, countless of engineering hours, hundreds of billions of&#8230; you get the idea&#8230; it was expensive!</p>



<p>Good luck trying to convince decision-makers to do that style of migration again.</p>



<blockquote class="wp-block-quote"><p>The only thing a big bang rewrite guarantees, is a big bang</p><cite>&#8211; Martin Folwer</cite></blockquote>



<p>What I am hearing is that companies are not thinking about doing a big bang migration again, but they are updating their React codebases, using better patterns that have emerged recently and removing a lot of the tech debt that is causing most of the issues of applications that are getting old.</p>



<p><strong>Stockholm Syndrome</strong></p>



<p>React is not perfect, there are really good Javascript <s>frameworks</s> libraries out there that can offer a lot of features that are considered better than the ones that React provides. So why is React still so popular?</p>



<p>Is this a case of Stockholm syndrome?</p>



<blockquote class="wp-block-quote"><p><em>Stockholm syndrome is <strong>a coping mechanism to a captive or abusive situation</strong>. People develop positive feelings toward their captors or abusers over time</em></p><cite>&#8211; Wikipedia</cite></blockquote>



<p>I think so, and it is not just React, the same can be said about JavaScript as well (and React is just JavaScript right?)</p>



<p>It is not that bad! we can get the job done, it is flexible it is popular and most of us owe our careers to them. </p>



<h2>I<strong>s React going to be here in the Next 5 years?</strong></h2>



<p>Short and easy answer&#8230; yes! we will see people adopting new frameworks for new projects but I expect React to remain as the market leader JavaScript <s>Framework</s> library.</p>



<h2>What about in 10 years?</h2>



<p>I firmly believe that React is not going to be replaced by one of the slightly better alternatives, I believe that there will be a complete transformation in the near future. </p>



<p>What that is going to look like? no idea but something interesting is that we are still using user interfaces and peripherals from the 70s, we still write code in a very similar way just with slightly better patterns and tools. Things like resumability, islands architecture, progressive enhancement and all those fancy new patterns are just a slightly better more efficient way to achieve the same goal with a better architecture but there hasn&#8217;t been a major shift in how we write or produce software or frontend user interfaces.</p>



<p>This theoretical new tool that will replace React is going to change the game completely, it will change the way we interact with computers and software. It could be in the form of AI, conversational UI, Server Driven UI with infinite personalisation powered by ML, holograms ala Star Wars or &lt;Insert your favourite SciFi film here>.</p>



<p>One thing is sure, even with the recent updates of React and even if you don&#8217;t agree with the direction they are taking, <strong>React is not going anywhere</strong>. You don&#8217;t need to replace React today, what you need are better processes, best practices, decoupled systems and improved organisation structures and pay your tech debt. </p>



<p>If you want to get into the &#8220;milliseconds war&#8221;, ensure that you fix your other more important problems first and that millisecond is worth making you switch to another Javascript framework.</p>



<p>This article has been inspired and is the result of really great conversations with <a href="https://twitter.com/kentcdodds" target="_blank" rel="noreferrer noopener">Kent C. Dodds</a>, <a href="https://twitter.com/_jayphelps" target="_blank" rel="noreferrer noopener">Jay Phelps</a>, <a href="https://twitter.com/BenLesh" target="_blank" rel="noreferrer noopener">Ben Lesh</a>, <a href="https://twitter.com/nialljoemaher" target="_blank" rel="noreferrer noopener">Niall Maher</a>, <a href="https://twitter.com/jh3yy" target="_blank" rel="noreferrer noopener">Jhey Thompkins</a> and all those amazing attendees of the &#8220;Conference that shall not be named&#8221; All the credit to them.</p>



<p></p>



<p></p>
