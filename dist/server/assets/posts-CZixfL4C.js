const __vite_glob_0_0 = "---\ntitle: \"Building a Loading Component Using ChatGPT\"\nexcerpt: \"A fun exercise to stretch the limits of ChatGPT and how far it can go in creating entire components and UI. Can AI write a progress bar component for me?\"\ndate: \"2023-01-28\"\ntags:\n  - React\n  - ChatGPT\n  - AI\nreadingTime: \"6 min read\"\n---\n\nHave you ever seen the red progress bar on Youtube or the blue progress bar on GitHub when navigating from one page to the next?\n\n![youtube loading bar](https://user-images.githubusercontent.com/17012976/215293411-0e52235e-77ce-4077-ba6b-c6297f27f381.gif)\n\n\n![github progress bar](https://user-images.githubusercontent.com/17012976/215293185-b5dc15c9-c20f-4b57-acb6-2723d720201b.gif)\n\n\nI like that little component; it's elegant and subtle and perfectly fits with Remix and React Router transitions.\n\nSo I decided to build my own\n\n\n![That was easy](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/90g1l5od3ieh73lylmeu.jpeg)\n\nHere are the rules:\n\n- I am really lazy! Can ChatGPT write for me?\n- I want to use React, no vanilla JS\n- No external dependencies (duh)\n- It needs to support animations\n\nHere we go! 💪\n\n## ChatGPT first attempt:\n\n### Prompt:\n\"Write a react component that creates a red bar 3px in height with a dynamic width that starts at 0% and start incrementing every 10ms and dissapears when it reaches 100% width with a fade out animation. Reply with code blocks\"\n\n```js\nimport React, { useState, useEffect } from 'react';\nimport './ProgressBar.css';\n\nconst ProgressBar = () => {\n  const [width, setWidth] = useState(0);\n\n  useEffect(() => {\n    const intervalId = setInterval(() => {\n      setWidth(prevWidth => (prevWidth >= 100 ? 100 : prevWidth + 1));\n    }, 10);\n\n    return () => clearInterval(intervalId);\n  }, []);\n\n  return (\n    <div\n      className={`progress-bar ${width === 100 ? 'fade-out' : ''}`}\n      style={{ width: `${width}%`, height: '3px' }}\n    />\n  );\n};\n\nexport default ProgressBar;\n```\n\n```css\n.progress-bar {\n  background-color: red;\n}\n\n.fade-out {\n  animation: fade-out 0.5s;\n}\n\n@keyframes fade-out {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n```\n\nThat was a good start!\n \n![loader](https://user-images.githubusercontent.com/17012976/215224365-cf907d69-abf8-45e4-a944-c3df9a006e0b.gif)\n\n### Next Prompt:\n\n\"Now, I want the progress bar to conditional render and mount an unmount when a condition is true or false, when it is unmounted it should fill the width to 100% and then fade out and disappear.\"\n\n```js\nexport const ProgressBar2 = ({ show }) => {\n  const [width, setWidth] = useState(0);\n  const [isAnimating, setIsAnimating] = useState(false);\n\n  useEffect(() => {\n    let intervalId;\n    if (show && !isAnimating) {\n      setIsAnimating(true);\n      intervalId = setInterval(() => {\n        setWidth((prevWidth) => {\n          if (prevWidth >= 100) {\n            return prevWidth;\n          }\n          return prevWidth + 1;\n        });\n      }, 10);\n    }\n    return () => clearInterval(intervalId);\n  }, [show, isAnimating]);\n\n  useEffect(() => {\n    if (!show && width === 100) {\n      setTimeout(() => {\n        setWidth(0);\n        setIsAnimating(false);\n      }, 500);\n    }\n  }, [show, width]);\n\n  if (!show) {\n    return null;\n  }\n\n  return (\n    <div\n      className={`progress-bar ${width === 100 ? 'fade-out' : ''}`}\n      style={{\n        width: `${width}%`,\n        height: '3px',\n        position: 'fixed',\n        top: 0,\n        left: 0,\n      }}\n    />\n  );\n};\n```\nPrompt:\n\"What? That doesn't work at all! the bar never appears!\"\n\nChatGPT:\nI apologize for the confusion, it looks like my previous response did not include the necessary CSS for the animation.\n\n...\n\n### What CSS? That code doesn't even make sense!\n\n...\n\nMany prompts later... an increasing list of `useEffect` functions, and a  very apologetic ChatGPT, I decided to give up and build it myself.\n\nBoy, that was a big mistake!\n\n## Random trickle:\n\nThe width increments were gradual every 10ms, but I want to add some randomness to the bar progress to give the impression that some non-deterministic async operation is actually happening... (Seriously, the bar is an illusion! It doesn't have anything to do with how long the operation takes 😂)\n\n```js\nconst Bar = (props: ProgressBarProps) => {\n  const [width, setWidth] = useState(0);\n  const progressSpeed = 10;\n\n  useEffect(() => {\n    const interval = setInterval(() => {\n      setWidth((prevValue: number) => {\n        const random = Math.random() / 100;\n        if (prevValue + random >= 0.95) {\n          clearInterval(interval);\n          return prevValue;\n        }\n        return prevValue + random;\n      });\n    }, progressSpeed);\n    \n    return () => clearInterval(interval);\n  }, [progressSpeed]);\n...\n```\nThat was easy wasn't it?\n\n## React Animations\n\nYou know what's not easy? Animations in React\n\n\n![Animations in React ](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cbj75pfk5a7qrdn5i3p9.jpeg)\n\n\nIt turns out that Animations in React are a pain!\n\nWhen the component is unmounted, I want to fill the bar to 100% then show a fade animation. \n\nIn good old JQuery is a one-liner, as simple as:\n```js\n$('#progress-bar').fadeOut(300, function(){ $(this).remove();});\n```\nOh, but not React; React wants you to suffer! (unless you use a library like [react-transition-group](https://github.com/reactjs/react-transition-group/tree/v1-stable), of course.\n\n**But the rules are the rules, and I said no libraries...** 😅\n\nSo after consulting with ChatGPT's arch enemy and more reliable predecessor, StackOverflow. I found that you can wrap your component in a container and use a method called [onAnimationEnd](https://reactjs.org/docs/events.html#animation-events) to detect when the animation finishes and then hide the element.\n\nSo here is the result:\n\n```js\nimport React, { useEffect, useState } from 'react';\nimport './progress-bar.css';\n\ninterface ProgressBarProps {\n  show: boolean;\n}\n\nexport const ProgressBar = (props: ProgressBarProps) => {\n  const { show } = props;\n  const [shouldRender, setRender] = useState(show);\n\n  useEffect(() => {\n    if (show) setRender(true);\n  }, [show]);\n\n  const onAnimationEnd = () => {\n    if (!show) {\n      setRender(false);\n    }\n  };\n\n  return (\n    shouldRender && (\n      <div\n        aria-label=\"progress-bar-container\"\n        style={{\n          animation: `${show ? '' : 'fadeOut 0.5s'}`,\n        }}\n        onAnimationEnd={onAnimationEnd}\n      >\n        <Bar {...props} show={show} />\n      </div>\n    )\n  );\n};\n\nconst Bar = (props: ProgressBarProps) => {\n  const { show } = props;\n  const [width, setWidth] = useState(0);\n  const progressSpeed = 10;\n\n  useEffect(() => {\n    const interval = setInterval(() => {\n      setWidth((prevValue: number) => {\n        const random = Math.random() / 100;\n        if (prevValue + random >= 0.95) {\n          clearInterval(interval);\n          return prevValue;\n        }\n        return prevValue + random;\n      });\n    }, progressSpeed);\n\n    return () => clearInterval(interval);\n  }, [progressSpeed, show]);\n\n  return (\n    <div\n      aria-label=\"progress-bar\"\n      style={{\n        position: 'fixed',\n        top: 0,\n        left: 0,\n        zIndex: 2147483647,\n        backgroundColor: '#FF0000',\n        height: '3px',\n        width: `${10 + width * 90}%`,\n        transition: `width ${progressSpeed}ms`,\n        transform: 'translate3d(0, 0, 0)',\n      }}\n    />\n  );\n};\n```\n\n**It works!**\n\n![loading bar](https://user-images.githubusercontent.com/17012976/215228399-c6c85dbf-acf2-4c8b-9386-9d52a654ad65.gif)\n\nExcept it doesn't! There is an annoying \"flashing glitch\" when the component unmounts that I couldn't be bothered finding out why (I am lying; I spent way too long trying but then gave up)\n\n## Conclusion\nUse [nProgress](https://www.npmjs.com/package/nprogress) 😂\n\nThat's it!\n\n## Real Conclusion:\n\nThis was a fun exercise to stretch the limits of ChatGPT and how far it can go in creating entire components and UI. It did very well with the basics, but when you start adding more complex interactions, it just goes round and round in circles spitting out incoherent and repetitive code. (not without apologising, of course 😅)\n\nWorth noting that I couldn't make the component work 100% either!, mainly due to lack of time (or lack of React expertise 😂).\n\nIf anyone wants to judge my midnight coding and fix the bug, and let me know why the glitch happens, here is the link to the code:\nhttps://stackblitz.com/edit/github-9eintn-ru5xtl?file=src%2Fprogress-bar.tsx\n\n## My Conclusion:\n\nI need to get better at React animations.\n\n";
const __vite_glob_0_1 = '---\ntitle: "Is React Going Anywhere?"\nexcerpt: "React will turn 10 years old soon. As applications built with React age, they accumulate problems. But are these issues inherent to React itself?"\ndate: "2022-11-23"\ntags:\n  - React\n  - JavaScript\n  - Architecture\nreadingTime: "6 min read"\n---\n\n<figure>\n  <img src="/images/posts/is-react-going-anywhere/byereact.png" alt="Is React going anywhere? cover" />\n</figure>\n\n<p>Earlier this year I had an interesting conversation with a CTO of a price comparison website (e-commerce) and he mentioned that <strong>they are moving away from React.</strong></p>\n\n\n\n<p>&#8220;Wait, what?&#8221;&#8230; was my Reaction (pun &#x1f44a; intended)&#8230; please tell me more!</p>\n\n\n\n<blockquote class="wp-block-quote"><p>&#8220;Yeah, it is not working for us, we are moving away for performance reasons, e-commerce is a really competitive market and we need to ensure our site is 100% performant to beat the competition&#8221;</p></blockquote>\n\n\n\n<p>Ok, fair enough, I thought&#8230; </p>\n\n\n\n<p>You must have found a considerably better framework right? so where are you moving to?  </p>\n\n\n\n<p>Vue? Svelte?  SolidJS? Qwick? Astro? (cough, heavens forbid) PHP?</p>\n\n\n\n<blockquote class="wp-block-quote"><p> &#8220;No, we are just keeping React for server-side rendering for now and using <strong>Vanilla JavaScript</strong> in the frontend&#8221;</p></blockquote>\n\n\n\n<p>That was not the answer I was expecting and unfortunately I didn&#8217;t have time to enquire more about their decision, but it got me thinking.</p>\n\n\n\n<p>Is this going to become more common now? are people moving away from React the same way we saw the mass migration out of AngularJS back in 2014/2015?</p>\n\n\n\n<h2>React is Getting Old</h2>\n\n\n\n<p>React will be<strong> 10 years old on the 29th of May 2023</strong> (finally recruiters are able to ask for 10 years of experience, without being a laughing stock)</p>\n\n\n\n<figure class="wp-block-image size-full"><a href="/images/posts/is-react-going-anywhere/download.jpeg"><img loading="lazy" width="506" height="493" src="/images/posts/is-react-going-anywhere/download.jpeg" alt="" class="wp-image-573" /></a></figure>\n\n\n\n<p></p>\n\n\n\n<p>This means that applications are also starting to get old, and when applications start to get old, you start finding issues, loads of them. </p>\n\n\n\n<ul><li>A hard-to-maintain codebase</li><li>Legacy patterns </li><li>Old and new code mixed</li><li>Multiple or old state management libraries</li><li>CSS-in-JS</li></ul>\n\n\n\n<p>Something very important to note here before we continue is that none of the problems listed above has anything to do with React itself &#x1f914;</p>\n\n\n\n<h2>So is React the problem? </h2>\n\n\n\n<p>I have observed something really interesting and is that we as developers like to find culprits, but when the culprits are not very obvious, for example, when the issues are related to processes, company culture or just bad practices, we turn the blind eye on those issues that are affecting our applications the most and convince ourselves that the problem must be the technology because it is something we have somewhat control over.</p>\n\n\n\n<p>It is easier for engineers to suggest and convince leaders in organisations that if we change the technology we will somehow magically solve all the other problems. So when a new technology or framework promises to fix some issues that we might have, (<strong>but are not the main issue</strong>), we start focusing on them and start suffering from &#8220;tunnel vision&#8221;.</p>\n\n\n\n<p>For example, in terms of performance which is one of the main reasons, people start looking at alternatives to React, in most cases, the framework is only responsible for a small fraction of a bad user experience. Most of the time they are caused by bad practices, incorrect abstractions and bad ideas terribly implemented.</p>\n\n\n\n<p>When we compare performance benchmarks between different frameworks we usually create an application that is not close anywhere near to the real world, and I am not talking about the type of application. Some demos are better than others and you can create a really comprehensive UI that is not a &#8220;Todo App&#8221;, but even with that, it has been created in a &#8220;lab environment&#8221; following the best practices, with no constraints, tech debt or cutting corners to make it to the next release. </p>\n\n\n\n<p>Applications in the real world are not built like that, they are messy, often rushed, and developed by multiple people, so for us to fight for the last millisecond is pointless when our network latency, backend APIs and bundle size (cough cough SPAs) are the main culprits.</p>\n\n\n\n<p>It is all a matter of what percentages of your problems are caused by React itself and what is important for your application. In the case of that CTO, they did as much as they could to fix their issues, and then came to the conclusion that React was to blame for the performance so they had to change it, but it is one of those rare cases, especially in e-commerce where profit margins are so slim that every millisecond counts.</p>\n\n\n\n<p>One thing I can say about React is it exacerbated other problems by being &#8220;unopinionated&#8221; and not providing some guidelines. It didn&#8217;t provide a way for developers to fall into the &#8220;pit of success&#8221;. Multiple competing patterns emerged that in hindsight have been really bad for our React applications&#8230; but oh well, we didn&#8217;t know what we didn&#8217;t know back in 2015.</p>\n\n\n\n<h2>To Migrate or Not to Migrate</h2>\n\n\n\n<p>A lot of companies are late to the party and they are still thinking about migrating to React, not away from it. It is easy to get into our little bubble and not realise that most companies don&#8217;t move near as fast as in our industry and they are still a lot of them (especially banks) that have not started or are still in the process of migrating.</p>\n\n\n\n<p>For those who have been using React for a while, I sense that there is little appetite for another &#8220;AngularJS&#8221; style migration in the near future. (if you are one of those like me who led an AngularJS migration at our companies, congratulations! we completed our rite of passage &#x1f37e;)</p>\n\n\n\n<p>It was a big investment, millions of dollars, countless of engineering hours, hundreds of billions of&#8230; you get the idea&#8230; it was expensive!</p>\n\n\n\n<p>Good luck trying to convince decision-makers to do that style of migration again.</p>\n\n\n\n<blockquote class="wp-block-quote"><p>The only thing a big bang rewrite guarantees, is a big bang</p><cite>&#8211; Martin Folwer</cite></blockquote>\n\n\n\n<p>What I am hearing is that companies are not thinking about doing a big bang migration again, but they are updating their React codebases, using better patterns that have emerged recently and removing a lot of the tech debt that is causing most of the issues of applications that are getting old.</p>\n\n\n\n<p><strong>Stockholm Syndrome</strong></p>\n\n\n\n<p>React is not perfect, there are really good Javascript <s>frameworks</s> libraries out there that can offer a lot of features that are considered better than the ones that React provides. So why is React still so popular?</p>\n\n\n\n<p>Is this a case of Stockholm syndrome?</p>\n\n\n\n<blockquote class="wp-block-quote"><p><em>Stockholm syndrome is <strong>a coping mechanism to a captive or abusive situation</strong>. People develop positive feelings toward their captors or abusers over time</em></p><cite>&#8211; Wikipedia</cite></blockquote>\n\n\n\n<p>I think so, and it is not just React, the same can be said about JavaScript as well (and React is just JavaScript right?)</p>\n\n\n\n<p>It is not that bad! we can get the job done, it is flexible it is popular and most of us owe our careers to them. </p>\n\n\n\n<h2>I<strong>s React going to be here in the Next 5 years?</strong></h2>\n\n\n\n<p>Short and easy answer&#8230; yes! we will see people adopting new frameworks for new projects but I expect React to remain as the market leader JavaScript <s>Framework</s> library.</p>\n\n\n\n<h2>What about in 10 years?</h2>\n\n\n\n<p>I firmly believe that React is not going to be replaced by one of the slightly better alternatives, I believe that there will be a complete transformation in the near future. </p>\n\n\n\n<p>What that is going to look like? no idea but something interesting is that we are still using user interfaces and peripherals from the 70s, we still write code in a very similar way just with slightly better patterns and tools. Things like resumability, islands architecture, progressive enhancement and all those fancy new patterns are just a slightly better more efficient way to achieve the same goal with a better architecture but there hasn&#8217;t been a major shift in how we write or produce software or frontend user interfaces.</p>\n\n\n\n<p>This theoretical new tool that will replace React is going to change the game completely, it will change the way we interact with computers and software. It could be in the form of AI, conversational UI, Server Driven UI with infinite personalisation powered by ML, holograms ala Star Wars or &lt;Insert your favourite SciFi film here>.</p>\n\n\n\n<p>One thing is sure, even with the recent updates of React and even if you don&#8217;t agree with the direction they are taking, <strong>React is not going anywhere</strong>. You don&#8217;t need to replace React today, what you need are better processes, best practices, decoupled systems and improved organisation structures and pay your tech debt. </p>\n\n\n\n<p>If you want to get into the &#8220;milliseconds war&#8221;, ensure that you fix your other more important problems first and that millisecond is worth making you switch to another Javascript framework.</p>\n\n\n\n<p>This article has been inspired and is the result of really great conversations with <a href="https://twitter.com/kentcdodds" target="_blank" rel="noreferrer noopener">Kent C. Dodds</a>, <a href="https://twitter.com/_jayphelps" target="_blank" rel="noreferrer noopener">Jay Phelps</a>, <a href="https://twitter.com/BenLesh" target="_blank" rel="noreferrer noopener">Ben Lesh</a>, <a href="https://twitter.com/nialljoemaher" target="_blank" rel="noreferrer noopener">Niall Maher</a>, <a href="https://twitter.com/jh3yy" target="_blank" rel="noreferrer noopener">Jhey Thompkins</a> and all those amazing attendees of the &#8220;Conference that shall not be named&#8221; All the credit to them.</p>\n\n\n\n<p></p>\n\n\n\n<p></p>\n';
const __vite_glob_0_2 = '---\ntitle: "Micro-Frontends FAQs"\nexcerpt: "Questions I fielded after my React Advanced London 2021 presentation on Micro-Frontends Performance and Centralised Data Caching."\ndate: "2021-10-27"\ntags:\n  - Micro Frontends\n  - Architecture\nreadingTime: "5 min read"\nimage: "https://www.infoxication.net/wp-content/uploads/2021/10/React-Advanced-London-2021-The-Brewery-Simon-Callaghan-Photography-282-scaled-e1635890210219.jpeg"\n---\n\n<figure>\n  <img src="/images/posts/micro-frontends-faqs/React-Advanced-London-2021-The-Brewery-Simon-Callaghan-Photography-282-scaled-e1635890210219.jpeg" alt="Micro-Frontends FAQs cover" />\n</figure>\n\n<p>These are some of the questions I received after my presentation &#8220;Micro-Frontends Performance and Centralised Data Caching&#8221; at React Advanced London 2021.</p>\n\n\n\n<blockquote class="wp-block-quote"><p>Are Micro-Frontends mainly used for large organisations and when you have multiple teams working on the same page/site or are there any benefits for small teams and solo devs?</p></blockquote>\n\n\n\n<p>That&#8217;s correct, Micro-Frontends are the answer to an organisational problem, if you don&#8217;t have that problem then you probably don&#8217;t need Micro-Frontends. They are useful when you encounter scaling issues and your teams have grown to the point where you start getting friction and your deployments to production have become painful and slow.</p>\n\n\n\n<p>There could be some benefits for small teams, for example, if you arrange your application so each developer owns a certain part of the UI and they deploy that independently. I don&#8217;t think there are any benefits for Solo Devs because it will add unnecessary complexity to a small project.</p>\n\n\n\n<blockquote class="wp-block-quote"><p>How do you share global state?</p></blockquote>\n\n\n\n<p>The answer is you don&#8217;t. Global state could cause coupling between Micro-Frontends and add a central dependency that could block or stop independent deployments. The best recommendation when working Micro-Frontends is to avoid coupling at all costs because if you don&#8217;t you might end up with a distributed monolith and none of the benefits of Micro-Frontends.</p>\n\n\n\n<p>Now, how do you communicate between them? The key is to keep the messages small and to a minimum, respect the system boundaries and have strong contracts that guarantee the encapsulation of your Micro-Frontends. A good example of this is using the Pub / Sub model and the <code>postMessage()</code> API.</p>\n\n\n\n<blockquote class="wp-block-quote"><p>How do you maintain coding style and conventions over multiple Micro-Frontends and teams working on them?</p></blockquote>\n\n\n\n<p>People think Micro-Frontends are bad for consistency, however, this is not an issue related to this architectural pattern; this is an organisational issue and as such, your company and teams are responsible for keeping coding standards and maintaining style consistency by implementing something like a Design System. Micro-Frontends could be good for consistency by allowing you to reuse certain parts of the application like the header and the footer.</p>\n\n\n\n<blockquote class="wp-block-quote"><p>How do you share common components? Do you create them as Micro-Frontends or do you create a component libary and consume it as a normal npm dependency?</p></blockquote>\n\n\n\n<p>I would recommend a component library, however, the key to making it work well with Micro-Frontends is to have well defined atomic components instead of large pieces of UI. Also, it is important that the library is stable (not in active development) to avoid coupling. If you are constantly making changes to the base components, all your Micro-Frontends will need to consume those updates which create a bottleneck and slows down independent deployments.</p>\n\n\n\n<blockquote class="wp-block-quote"><p>How do you ensure all teams update to the latest version of a shared dependency at the same time?</p></blockquote>\n\n\n\n<p>If this is a dependency, then you just follow the normal process of communicating the update to your consumers and they will have to install and deploy their codebases to reflect the latest changes.</p>\n\n\n\n<p>If you want to update a Micro-Frontend and you want all your users to consume the same version, for example, if you want them to consume the same version of the header or footer then you can use two different approaches.</p>\n\n\n\n<p>The first one is the &#8220;evergreen&#8221; approach, where all your consumers always point to the latest version as soon as it is published.</p>\n\n\n\n<p>The second approach is the &#8220;managed&#8221; approach, where you publish your Micro-Frontend and follow the rules of Semantic Versioning so consumers can choose what version to use; the difference of this approach from a standard npm dependency is that you can start consuming the new version at runtime without the need to install and deploy a new version of the application that is consuming it.</p>\n';
const __vite_glob_0_3 = `---
title: "My Experience at React Summit Amsterdam"
excerpt: "My first time at the biggest JavaScript Festival and React Conference in the world. Conversations with Ryan Carniato, Tobias Koppers, Dominik from React Query, Evan Bacon, and more!"
date: "2024-06-20"
tags:
  - React
  - Conference
  - Community
readingTime: "8 min read"
---

This was my first time at the biggest JavaScript Festival and React Conference in the world (not an exaggeration). It was also my first time as an attendee and I enjoyed not having to worry about giving a talk and just experiencing the conference!

Apart from photobombing the stage TVs every single time I had a chance 😅, I was also lucky enough to have **1 on 1 conversations** with the smartest and most influential speakers and library authors in our industry. 

### Here's what we talked about!

![My profile pic on the tv screens](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ye312n4sw8730gutq49d.jpg)

## Ryan Carniato, Creator of SolidJS

Ryan and I discussed the “**missing link**” in the evolution of client-side applications. There is still a gap between Multiple Page applications (MPAs) and Single Page Applications (SPAs) with client-side routing where we are still forced to choose one or the other. There have been improvements with Astro and React Server Components but they still have a performance degradation element that stops it from being complete. My question to him was if the current stack is not enough for most use cases (sites that are not e-commerce and so sensitive to performance impact) his answer was (paraphrasing): **"Mediocrity should not stop progress".**

He is doing some work on Solid Start that might bring a breakthrough in this area, so I am really excited about what he's cooking 👀. We also discussed migrations, how difficult it is for a company to adopt a new technology and how the landscape is very different from when React came out. Applications are getting old and we are due to a new wave of technologies that use the best parts of what we learned in the past 10 years.

{% twitter 1801517170850967767 %}


## Tobias K, Creator of Webpack

I had a long chat with Tobias about improving chunking in large applications to reduce bundle size. We also discussed the lack of a visualisation tool to represent the module graph. I am using the tool he created [https://webpack.github.io/analyse/](https://webpack.github.io/analyse/) but it hasn't been maintained for a while and he acknowledged it doesn’t work well with large stats files.

I also asked of course, **what's the status of TurboPack**, his thoughts on RSPack and support for Module Federation. He was very diplomatic and asked me to keep an eye out for later this year.



## Dominik, Maintainer of React Query

Spend a lot of time with Dominik walking around Amsterdam and **helping him #FreeSuspense 😂**. Apart from having fun, missing the walking tour and trying to find presents for our kids, we also had the chance to talk about Local First applications, State Management in large apps, how we at Postman are pushing React Query to the limit and our custom implementation of "Mobx Query" and "Broadcast client". He asked me to write some articles about those usages of React Query that we could showcase and share with the community. It was also great to be there during the conversation with Sathya from the React Core team at Meta when the decision was made to hold React 19 to ensure the client-side suspense data fetching story was correctly implemented. **React history was made and I was there for it!**

(Special thanks to Dominik for recommending me the best present for my daughter, what a legend!)

{% twitter 1801669381182685508 %}

## Evan Bacon, Creator of Expo Router

Had a great long chat with Evan. Went over so many topics including, Generative UI, Full Self Driving, Expo router, how to make cool demos, Apple and how they are good at marketing but not so good at execution. We talked about the difficulties in the distribution of native applications, multiple versions, backward compatibility, major version policy, rollbacks and forward. He also mentioned the cool features of Expo that help with the distribution of Native Apps.

We also discussed his demo of React Server Components generated by Ai and streamed to React Native, the future after the Demo what it means for **Server Driven UI, personalisation and the usefulness of generative UI beyond cool demos.**

{% twitter 1801630044030111889 %}


## Brooks Lybrand, Devrel React Router (Remix)
I watched Brooks talk about bringing React Router and the newer features of React to existing CRA and Webpack apps. React Router v7 and the migration path look very promising and it aligns with the architecture I have been working on which will make it so simple to eventually upgrade to React 19. My only complaint was he didn't have any spare Limited Edition Remix hoodies to give away. I also helped him design the new React Router Remix logo but Ryan got very mad at us 😂

{% twitter 1801624394466476066 %}


## Juri S, Developer Relations, NX

Juri and I talked about how we are using the NX monorepo at Postman and how it would be a good idea to showcase the architecture and improvements we made to NX for Micro-Frontends and independent app deployments as a case study. I also gave him a demo of the breaking change detection system that my colleague Patrick and our team created to suggest semantic versioning package versions and that it would be awesome to include it in the NX release command.

## Mo Khazali

I discussed with Mo and Evan about bringing Module Federation to React Native, Evan is not that keen since it is an “organisational issue” not a user-facing or a DX issue but it was interesting to show our perspective on where it could be useful to send runtime modules over the air for native apps when multiple teams are deploying different parts of a large React Native Application. After our chat I found out that Module Federation is already supported in React Native if you use [Re-Pack](https://re-pack.dev/docs/module-federation)

## Una Kravets
It was great to meet Una in person finally. I watched her talk at C3 DevFest and even though I had seen the ThunderCats intro before it was still really funny. I hope she doesn't remember my name because I am in trouble with the Google Developer Experts program for not reporting my engagements... oops 😅


## Special Mentions 

These are just summaries of what I remember, some conversations went off for hours sometimes. I should have a hidden microphone and release these chats as a podcast series.

Thanks to [Niall Maher](https://x.com/nialljoemaher), Carolina, [Jesse Hall](https://x.com/codeSTACKr) and the Irish mafia for putting up with me for 3 days straight. 

[Daniel A(l)fonso](https://x.com/danieljcafonso), [Atila](https://x.com/AtilaFassina), Mi Parcero [Erick Wendel](https://x.com/erickwendel_) and [David K](https://x.com/DavidKPiano) for hanging out with me as the infiltrated non-speaker and for giving me free food truck tokens.

Finally thanks [Josh Goldberg](https://x.com/JoshuaKGoldberg), for being a great friend and listening to me yapping until 2 AM. We didn't talk about tech at all but we talked about so many things! Next time he's going to convince me TypeScript is not considered self-harm at this point 😂

{% twitter 1802131541687927171 %}


## One last thing... The Conference!

This is the best frontend conference, full stop. I have been going to GitNation events for a while and it is always a pleasure to be part of this community. Rob, Daria, Anna, Alex, Lera and the rest of the crew are amazing at what they do and they really care about the details and the community. Congratulations on another amazing event! and see you at React Advanced London.


![Arriving at the conf by bike](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jfed9wl6ksiivrchs28i.jpeg)`;
const __vite_glob_0_4 = `---
title: "React Router 6.4 Code-Splitting"
excerpt: "React Router 6.4 introduced Data Routers with parallel data fetching capabilities, but bundling all loaders at the top level creates performance issues. Here's how to solve it."
date: "2022-10-06"
tags:
  - React
  - React Router
  - Performance
  - Code Splitting
readingTime: "7 min read"
---
<figure>
  <img src="/images/posts/react-router-6-4-code-splitting/xy2km3wsql2sq9jzdkgm.jpeg" alt="React Router 6.4 Code-Splitting cover" />
</figure>

<p>The Remix team have released the new &#8220;Data Routers&#8221; in their <code>6.4</code> update that brings all of the great features of Remix over to React Router. With this update, Single Page Applications that are unable to migrate can benefit from all of the goodies &#x1f381; that Remix provides.</p>



<p>The best feature by far is parallel data fetching, removing the &#8220;Spinnageddon&#8221; network waterfall and improving page loads.</p>



<figure class="wp-block-image"><img src="/images/posts/react-router-6-4-code-splitting/xy2km3wsql2sq9jzdkgm.jpeg" alt="Parallel bars in network waterfall"/></figure>



<p>These parallel green bars look awesome! and your users will be delighted too:</p>



<ul><li>No Content Layout Shift</li><li>Faster data loading.</li><li>A single loading spinner (unavoidable without Remix because of Client Side Rendering, but that&#8217;s better than multiple ones).</li></ul>



<p>It all sounds great, so what&#8217;s missing?</p>



<p>The new Data Router and routes that need data upfront have to define their loaders and components at the top level of the application and that puts the entire app into a single massive bundle &#x1f914;</p>



<p>Hundreds of MBs of JavaScript when you land on the page is a no-no for performance so… how do we codesplit a Data Router application while keeping the benefits of parallel data fetching and no Content Layout Shift?</p>



<h2>Option 1</h2>



<h3>Route Modules with Loaders and Components in the same file:</h3>



<p>This option follows the Remix file conventions where every route exports both the <code>Component</code> and the <code>Loader</code> from the same file, then it uses a <code>Route Module</code> file to lazy load and dynamic import these files to enable code-splitting.</p>



<pre class="wp-block-code"><code lang="javascript" class="language-javascript">export async function loader(args) {
  let actualLoader = await import("./actualModule").loader;
  return actualLoader(args);
}

export const Component = React.lazy(() =&gt; import("./actualModule").default);</code></pre>



<pre class="wp-block-code"><code lang="javascript" class="language-javascript">import * as Tasks from "./tasks.route";

// ...
&lt;Route
  path="/tasks"
  element={
     &lt;React.Suspense fallback="loading..."&gt;
       &lt;Tasks.Component /&gt;
     &lt;/React.Suspense&gt;
  }
  loader={Tasks.loader}
/&gt;;</code></pre>



<p>This resulting network waterfall:</p>



<p><br><img src="/images/posts/react-router-6-4-code-splitting/yoro7oq746jygrf775dn.png" alt="Network waterfall with two bars"></p>



<p><strong>Pros:</strong></p>



<ul><li>This is a really clean pattern and can be encapsulated to build your own route configuration.</li><li>Closer to Remix file conventions so it would be easier to migrate in the future.</li></ul>



<p><strong>Cons:</strong></p>



<ul><li>The data loading and <code>fetch</code> are delayed until the Component bundle is loaded.</li><li>Content Layout Shift occurs because of the suspense boundary.</li></ul>



<h2>Option 2</h2>



<h3>&nbsp;Moving loaders into their own separate file</h3>



<p>Separating the loader out of the Component file allows you to code split the Component and fetch it from the loader while the data is loading, eliminating the sequential download and making the most of parallelisation.</p>



<figure class="wp-block-image"><img src="/images/posts/react-router-6-4-code-splitting/f8qdoz0jqn9zbj81nohp.png" alt="Network waterfall with two bars"/></figure>



<p>Move <code>actual-loader</code> to a separate file.</p>



<pre class="wp-block-code"><code class="">export async function loader() {
  // import the Component here but don't await it
  import("./actualModule");
  return await fetch('/api');
}</code></pre>



<p>When React.lazy actually mounts and calls its own<br><code>import('./actualModule')</code>, it should latch onto the existing download.</p>



<blockquote class="wp-block-quote"><p></p><p>Disclaimer: Most modern bundlers should support the theory above, but it is not guaranteed.</p></blockquote>



<p><strong>Pros:</strong></p>



<ul><li>The Component and Loader can be code-split into separate files.</li><li>The Component&#8217;s javascript bundle and the data fetching start at the same time, this is particularly useful for heavy components that might take a while to load from the network.</li></ul>



<p><strong>Cons:</strong></p>



<ul><li>This approach moves away from Remix file conventions so a small refactoring to move the loaders could be needed if migrating to Remix</li><li>Content Layout Shift still occurs even though the component lazy import promise could have potentially resolved when the loader is finished, the suspense boundary still needs to unwrap the resolved value.</li></ul>



<h2>Removing Content Layout Shift</h2>



<p>Both options have their benefits, however, both suffer from Content Layout Shift. Removing CLS is one of the main performance benefits of React Router and Remix but now that we have introduced code-splitting it makes CLS unavoidable… or does it?</p>



<p><a href="https://twitter.com/brophdawg11">Matt</a> from the Remix team put together a really cool trick on how to remove CLS when code-splitting and the best part is that it works for both of the solutions mentioned above.</p>



<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// Assume you want to do this in your routes, which are in the critical path JS bundle
&lt;Route path="lazy" loader={lazyLoader} element={&lt;Lazy /&gt;} /&gt;

// And assume you have two files containing your actual load and component:
// lazy-loader.ts -&gt; exports the loader
// lazy-component.ts -&gt; exports the component

// We'll render the component via React.lazy()
let LazyActual = React.lazy(() =&gt; import("./lazy-component"));

function Lazy() {
  return (
    &lt;React.Suspense fallback={&lt;p&gt;Loading component...&lt;/p&gt;}&gt;
      &lt;LazyActual /&gt;
    &lt;/React.Suspense&gt;
  );
}

// The loader is where things get interesting, we need to load the JS chunk 
// containing our actual loader code - BUT we also want to get a head start 
// on downloading the component chunk instead of waiting for React.lazy() to 
// kick it off.  Waterfalls are bad!  This opens up the possibility of the 
// component chunk finishing _before_ the loader chunk + execution.  If that 
// happens we don't want to see a small CLS flicker from Suspense since the 
// component _is already downloaded_!
export async function lazyLoader(...args) {
  let controller = new AbortController();

  /*
   * Kick off our component chunk load but don't await it
   * This allows us to parallelise the component download with loader 
   * download and execution.
   *
   * Normal React.lazy()
   * 
   *   load loader.ts     execute loader()   load component.ts
   *   -----------------&gt; -----------------&gt; -----------------&gt;
   *
   * Kicking off the component load _in_ your loader()
   * 
   *   load loader.ts     execute loader()   
   *   -----------------&gt; -----------------&gt; 
   *                      load component.ts
   *                      -----------------&gt;
   *
   * Kicking off the component load _alongside_ your loader.ts chunk load
   * 
   *   load loader.ts     execute loader()   
   *   -----------------&gt; -----------------&gt; 
   *   load component.ts
   *   -----------------&gt;
   */
  import("./lazy-component").then(
    (componentModule) =&gt; {
      if (!controller.signal.aborted) {
        // We loaded the component _before_ our loader finished, so we can
        // blow away React.lazy and just use the component directly.  This 
        // avoids the flicker we'd otherwise get since React.lazy would need 
        // to throw the already-resolved promise up to the Suspense boundary 
        // one time to get the resolved value
        LazyActual = componentModule.default;
      }
    },
    () =&gt; {}
  );

  try {
    // Load our loader chunk
    let { default: loader } = await import("./lazy-loader");
    // Call the loader
    return await loader(...args);
  } finally {
    // Abort the controller when our loader finishes.  If we finish before the 
    // component chunk loads, this will ensure we still use React.lazy to 
    // render the component since it's not yet available.  If the component 
    // chunk finishes first, it will have overwritten Lazy with the legit 
    // component so we'll never see the suspense fallback
    controller.abort();
  }
}</code></pre>



<p><a href="https://gist.github.com/brophdawg11/03a475e26922e09aa35ca8b5900a4fb4">Source Code</a></p>



<p>Thanks again to <a href="https://twitter.com/brophdawg11">Matt</a> from Remix for helping me to figure this one out! all the credit goes to him.</p>
`;
const __vite_glob_0_5 = `---
title: "React Router 6 Deferred Fetch"
excerpt: "Exploring React Router 6's deferred API for managing data fetching—allowing developers to await critical data while deferring optional information."
date: "2022-11-04"
tags:
  - React
  - React Router
  - Performance
readingTime: "5 min read"
---

<figure>
  <img src="/images/posts/react-router-6-deferred-fetch/noworlater-1024x681-1.jpeg" alt="React Router 6 Deferred Fetch cover" />
</figure>

<h2>Deferred Data</h2>



<p>Sometimes you want to retrieve some optional data without blocking the rest of the page that contains the critical data of your application. Examples of this optional data are comments on a blog post that render after the main content, recommended products on a shopping cart, recent searches, etc.</p>



<p>React Router 6 introduced the &#8220;<a href="https://reactrouter.com/en/main/guides/deferred" target="_blank" rel="noreferrer noopener">deferred</a>&#8221; API that allows you to &#8220;await&#8221; for critical data and &#8220;defer&#8221; optional data when calling your loaders.</p>



<p>The best part is that you can switch between one mode or the other by just adding or removing the <code>await</code> keyword from the promise that resolves the data. <a href="https://twitter.com/ryanflorence" target="_blank" rel="noreferrer noopener">Ryan Florence</a> gave an excellent explanation of this mechanism in his talk &#8220;<a href="https://www.youtube.com/watch?v=95B8mnhzoCM" target="_blank" rel="noreferrer noopener">When to Fetch</a>&#8221; (seriously, it is an amazing talk, If you haven&#8217;t watched, bookmark it and watch it after you have finished reading this post!)</p>



<p>I took a look at the deferred demo app from the <a href="https://github.com/remix-run/react-router/tree/main/examples/data-router" target="_blank" rel="noreferrer noopener">React Router examples</a> folder and <a href="https://reactrouter.com/en/main/guides/deferred" target="_blank" rel="noreferrer noopener">the documentation</a> to discover all its potential, however, I couldn&#8217;t find an example with <code>fetch</code> so I decided to give it a go and play around with it, here is what I found.</p>



<h2>Using Defer with Fetch</h2>



<p>I created a <a href="https://mswjs.io/">mock server with MSW</a> to simulate a fetch delay as well as display the same text from the original defer example.</p>



<p>Here is my first naive attempt:</p>



<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// Don't copy paste! bad code! keep on reading...
export const loader = async () => {

    return defer({
      critical1: await fetch('/test?text=critical1&amp;delay=250').then(res => res.json()),
      critical2: await fetch('/test?text=critical2&amp;delay=500').then(res => res.json()),
      lazyResolved: fetch('/test?text=lazyResolved&amp;delay=0').then(res => res.json()),
      lazy1: fetch('/test?text=lazy1&amp;delay=1000').then(res => res.json()),
      lazy2: fetch('/test?text=lazy2&amp;delay=1500').then(res => res.json()),
      lazy3: fetch('/test?text=lazy3&amp;delay=2000').then(res => res.json()),
      lazyError: fetch('/test?text=lazy3&amp;delay=2500').then(res => { 
        throw Error('Oh noo!')
      }),
    });
}</code></pre>



<p>So what are we doing here?</p>



<p>First, returning a &#8220;naked fetch&#8221; from a normal loader works because that&#8217;s what loaders expect and React Router will unwrap the response for you, however, <code>defer</code> accepts <strong>values</strong> or <strong>promises</strong> that resolve to values, so to get the values we need to unwrap the fetch response manually.</p>



<p>Fetch is great! however, you have to do some additional work, including throwing errors and unwrapping the promise as we have done above. Use the platform! &#x1f605;</p>



<p></p>



<p>Here is the result:</p>



<figure class="wp-block-image"><img src="/images/posts/react-router-6-deferred-fetch/199835920-3ec5d9e4-0136-46ac-9622-e6fd9b247d8f.gif" alt="Defer 1"/></figure>



<p>It all looked great until I opened the network tab and <strong>something didn&#8217;t look quite right</strong> &#x1f914;</p>



<figure class="wp-block-image"><img src="/images/posts/react-router-6-deferred-fetch/199839685-5b713e31-e822-415c-bb68-32c27eecc82f.gif" alt="Kapture 2022-11-03 at 21 39 00"/></figure>



<p>The first two requests for critical data use the await keyword are happening in a waterfall, not in parallel like the rest! in fact, if you add await to all the calls in the defer object they all happen in a waterfall, what gives!</p>



<p>&#8212; Did <a href="https://twitter.com/ryanflorence">Ryan</a> lie to us?</p>



<p>&#8212; is this a bug? &#x1f41b;</p>



<p>&#8212; Does critical data need to happen in a waterfall? &#x1f6bf;</p>



<p>Nope!, of course not! it turns out that I forgot<strong> how Javascript works</strong>&#x2122;&#xfe0f;</p>



<figure class="wp-block-image"><img src="/images/posts/react-router-6-deferred-fetch/gjk71443yajb35e1p42e.jpeg" alt="Image description"/></figure>



<p>The waterfall occurs because every time you create a separate <code>await</code>, it will pause execution before continuing to the next line and before firing the next fetch.</p>



<p>What we want to do to avoid the waterfall is fire all those fetch requests at the same time and only <code>await</code> for the response not the actual <code>fetch</code>.</p>



<blockquote class="wp-block-quote"><p>“The earlier you initiate a fetch, the better, because the sooner it starts, the sooner it can finish”</p></blockquote>



<p>— <a href="https://twitter.com/TkDodo">@TkDodo</a></p>



<p>To achieve this we can declare and fire all the fetch requests and then add the <code>await</code> for critical data in the defer object later.</p>



<pre class="wp-block-code"><code lang="javascript" class="language-javascript">// You can copy this one if you want
export const loader = async () =&gt; {

// fire them all at once  
  const critical1Promise = fetch('/test?text=critical1&amp;delay=250').then(res =&gt; res.json());
  const critical2Promise = fetch('/test?text=critical2&amp;delay=500').then(res =&gt; res.json());
  const lazyResolvedPromise = fetch('/test?text=lazyResolved&amp;delay=100').then(res =&gt; res.json());
  const lazy1Promise = fetch('/test?text=lazy1&amp;delay=500').then(res =&gt; res.json());
  const lazy2Promise = fetch('/test?text=lazy2&amp;delay=1500').then(res =&gt; res.json());
  const lazy3Promise = fetch('/test?text=lazy3&amp;delay=2500').then(res =&gt; res.json());
  const lazyErrorPromise = fetch('/test?text=lazy3&amp;delay=3000').then(res =&gt; { 
        throw Error('Oh noo!')
  });

// await for the response
  return defer({
      critical1: await critical1Promise,
      critical2: await critical2Promise,
      lazyResolved: lazyResolvedPromise,
      lazy1: lazy1Promise,
      lazy2: lazy2Promise,
      lazy3: lazy3Promise,
      lazyError: lazyErrorPromise
  })
}</code></pre>



<p><em>You can also do <code>Promise.all()</code> but with the above example, it is easier to understand what&#8217;s going on.</em></p>



<p></p>



<p>Here is what the network tab looks like now, beautiful <strong>parallel</strong> green bars.</p>



<figure class="wp-block-image"><img src="/images/posts/react-router-6-deferred-fetch/199844432-2ef6e085-c141-4637-a735-ff0d92998ce0.gif" alt="parallel fetch"/></figure>



<p>Now that we fixed the waterfall, let&#8217;s play around with the delay and explore a couple of interesting features of defer</p>



<h2>Critical Data</h2>



<p>The critical data uses the &#8216;await&#8217; keyword so the loader and React Router until the data is ready before the first render (no loading spinners &#x1f389;).</p>



<p>What happens if critical data (using await) returns an error? &#x1f914; well, the loader will throw and bubble up to the nearest error boundary and destroy the entire page or that entire route segment.</p>



<figure class="wp-block-image"><img src="/images/posts/react-router-6-deferred-fetch/199847444-46212db9-50f1-45ca-9fd1-d65137afa9dd.gif" alt="Kapture 2022-11-03 at 22 35 24"/></figure>



<p>If you want to fail gracefully and don&#8217;t want to destroy the entire page then remove <code>await</code> which is basically telling React Router, hey! I don&#8217;t care if this data fails, it is not that important (critical) so display a localised error boundary instead. That&#8217;s exactly what the <code>lazyError</code> is doing in our first example.</p>



<h2>Lazy Resolved</h2>



<p>We are not using an <code>await</code> on the <code>lazyResolved</code> field, however, we don&#8217;t see a loading spinner at all. How is that? This is an amazing feature of <code>defer</code>, if your optional data is fast (faster than your critical data) then you won&#8217;t see a spinner at all because your promise will be resolved by the time the critical data finishes and the first render occurs:</p>



<p>The slowest critical data delay is <code>500ms</code> but the <code>lazyResolved</code> data takes only <code>100ms</code> so by the time <code>critical2</code> is resolved, the <code>lazyResolved</code> promise has already been resolved and the data is immediately available.</p>



<figure class="wp-block-image"><img src="/images/posts/react-router-6-deferred-fetch/199848509-f3a66bd6-37c7-452f-8691-0a6d6aaeae4e.gif" alt="Kapture 2022-11-03 at 22 41 40"/></figure>



<p>The best thing about defer is that you don&#8217;t have to choose when to fetch your data, <strong>it will display optional data immediately if it is fast or shows a loading spinner if it is slow.</strong></p>



<p></p>



<p>You can play around changing the delays and increasing/reducing the time critical to see if the spinners are shown or not.</p>



<h2><strong>Conclusion</strong></h2>



<p>Defer is a great API, it took me a while to understand it and make it work with fetch but it is an amazing tool to improve performance, reliability of your pages and developer experience.</p>



<p></p>



<p>The source code for the examples is available here:</p>



<p><a href="https://github.com/infoxicator/react-router-defer-fetch" target="_blank" rel="noreferrer noopener">https://github.com/infoxicator/react-router-defer-fetch</a><a href=""></a></p>
`;
const __vite_glob_0_6 = '---\ntitle: "The Risks of Micro-Frontends"\nexcerpt: "Architecture is a series of decisions and trade-offs. Here are the common risks of Micro-Frontends and how to mitigate them."\ndate: "2021-11-09"\ntags:\n  - Micro Frontends\n  - Architecture\nreadingTime: "6 min read"\n---\n\n<figure>\n  <img src="/images/posts/the-risks-of-micro-frontends/photo-1558939608-7e8f4c8336d2-copy.jpg" alt="The Risks of Micro-Frontends cover" />\n</figure>\n\n<p>If you are working on a large scale application and the friction between your teams is exponentially increasing as your application grows larger, you are probably considering if the Micro-Frontend pattern is a good fit for you and your organisation. Architecture is a series of decisions and trade-offs, and you want to make the right choice and avoid creating an even bigger problem.</p>\n\n\n\n<p>So here are some common Micro-Frontends risks and disadvantages you should be aware of:</p>\n\n\n\n<h2><a href="https://dev.to/infoxicator/the-risks-of-micro-frontends-4pgh-temp-slug-5699823?preview=04c5a3959f90f0b37176c36e131fe9aaf36ae28bdb41685e1deb6732e935cbf79f7ea2617ce716a5ab8ae13d51052d2edf7886b3d69572c536cb0ee6#the-browser"></a>The Browser</h2>\n\n\n\n<p>Microservices allow a deeper level of encapsulation by using containerisation to ensure the same piece of software runs consistently on any infrastructure, however, with Micro-Frontends, there is a platform that we cannot avoid: The Browser. As a result, we have to deal with the different variations and ensure that we optimise for performance without compromising on the flexibility of independent deployments.</p>\n\n\n\n<p>Following best practices, keeping bundle sizes small and implementing container applications (also called shells) that are in charge of composition and configuration should help solve most of the quirks of running &#8220;Microservices&#8221; inside the browser.</p>\n\n\n\n<h2><a href="https://dev.to/infoxicator/the-risks-of-micro-frontends-4pgh-temp-slug-5699823?preview=04c5a3959f90f0b37176c36e131fe9aaf36ae28bdb41685e1deb6732e935cbf79f7ea2617ce716a5ab8ae13d51052d2edf7886b3d69572c536cb0ee6#too-many-microfrontends"></a>Too many Micro-Frontends</h2>\n\n\n\n<p>I have seen so many Micro-Frontends implementations that fall for this trap; splitting your modules too thin produces exponential complexity, discoverability issues, more infrastructure to maintain and unnecessary overhead.</p>\n\n\n\n<p>The key to splitting Micro-Frontends is to avoid having single entities that require other modules to function, instead, you should divide them into different <a href="https://martinfowler.com/bliki/BoundedContext.html">Bounded Contexts</a> and follow Domain Driven Design patterns. This ensures explicit relationships, clear boundaries and improved communication between teams.</p>\n\n\n\n<h2><a href="https://dev.to/infoxicator/the-risks-of-micro-frontends-4pgh-temp-slug-5699823?preview=04c5a3959f90f0b37176c36e131fe9aaf36ae28bdb41685e1deb6732e935cbf79f7ea2617ce716a5ab8ae13d51052d2edf7886b3d69572c536cb0ee6#multiple-implementations"></a>Multiple Implementations</h2>\n\n\n\n<p>A downside of Micro-Frontends is that there isn&#8217;t a single implementation, there are many ways of achieving independent deployments and architectures vary depending on the company applying them. This can cause confusion and a steeper learning curve for developers trying to adopt this architecture.</p>\n\n\n\n<p>&#8220;Patterns that cause you to ask more questions than they answer are not good patterns&#8221;. However, in the case of Micro-Frontends, this is an unfortunate side effect of the nature of the problem they are trying to solve. They are an answer to an organisational problem, and all organisations are different, so something that works for company A might cause a lot of issues at company B. The lack of standardisation and variability leads to a lot of questions. It doesn&#8217;t mean that some approaches taken by companies implementing this architecture are not correct or that the Micro-Frontend pattern is not valid, quite the opposite, they intend to solve a very specific problem that requires personalised solutions.</p>\n\n\n\n<h2><a href="https://dev.to/infoxicator/the-risks-of-micro-frontends-4pgh-temp-slug-5699823?preview=04c5a3959f90f0b37176c36e131fe9aaf36ae28bdb41685e1deb6732e935cbf79f7ea2617ce716a5ab8ae13d51052d2edf7886b3d69572c536cb0ee6#scale-and-organisational-structures"></a>Scale and Organisational Structures</h2>\n\n\n\n<p>The Micro-Frontend pattern heavily relies on organisational structures and they are an answer to scaling problems that are the result of a quick expansion in the application and the number of developers who maintain it. Because organisational structures vary so much, some patterns like vertical ownership of end to end features or The BFF (Backend for Frontend) pattern might not make sense to your organisation. The good news is Micro-Frontends are very flexible and you don&#8217;t have to adopt those patterns to get the benefits. As long as you can achieve independent deployments of properly divided pieces of frontend functionality, the rest is up to your organisation to decide what works best for your teams.</p>\n\n\n\n<h2><a href="https://dev.to/infoxicator/the-risks-of-micro-frontends-4pgh-temp-slug-5699823?preview=04c5a3959f90f0b37176c36e131fe9aaf36ae28bdb41685e1deb6732e935cbf79f7ea2617ce716a5ab8ae13d51052d2edf7886b3d69572c536cb0ee6#%C2%A0microfrontend-frameworks"></a>&nbsp;Micro-Frontend Frameworks</h2>\n\n\n\n<p><a href="https://itnext.io/11-micro-frontends-frameworks-you-should-know-b66913b9cd20">&#8220;11 Micro-Frontend Frameworks you should know&#8221;</a>&nbsp;&#x1f644;</p>\n\n\n\n<p>As a result of the lack of standard implementations, several frameworks have emerged to provide you with the building blocks and guide you on how to use Micro-Frontends. I am not saying these Frameworks are not valuable or helpful, however, if you decide to use them, just remember that you are automatically accepting all their opinions and trade-offs that were the results of the experience and requirements at their companies. Micro-Frontends are the solution to scaling and an organisational issue, if you apply a framework tailored to another organisation that is not yours, it might not solve your particular problem and could cause even more issues.</p>\n\n\n\n<h2><a href="https://dev.to/infoxicator/the-risks-of-micro-frontends-4pgh-temp-slug-5699823?preview=04c5a3959f90f0b37176c36e131fe9aaf36ae28bdb41685e1deb6732e935cbf79f7ea2617ce716a5ab8ae13d51052d2edf7886b3d69572c536cb0ee6#conclusion"></a>Conclusion</h2>\n\n\n\n<p>Should you adopt Micro-Frontends? Ask yourself first, do I have a problem?. If the answer is yes and you are part of a big organisation working on a large scale application, you can assess the benefits and risks of this architectural pattern and decide if it is going to help you solve your particular problem. You can reach out to other companies for inspiration and example architectures that worked well for their specific context but bear in mind that your solution might look very different.</p>\n\n\n\n<p>Remember, an architecture is only as good as its implementation.</p>\n';
const __vite_glob_0_7 = '---\ntitle: "What are Micro-Frontends? Really..."\nexcerpt: "There are widespread misconceptions about micro-frontends. Let me explain what they are not, and what they actually are."\ndate: "2022-04-18"\ntags:\n  - Micro Frontends\n  - Architecture\nreadingTime: "5 min read"\n---\n\n<figure>\n  <img src="/images/posts/what-are-micro-frontends-really/Screenshot-2022-04-18-at-21.45.46-copy.jpg" alt="What are Micro-Frontends? Really... cover" />\n</figure>\n\n<p>Every single conference talk or blog post regarding this topic contains the following phrase:</p>\n\n\n\n<blockquote class="wp-block-quote"><p>&#8220;But first, what are Micro-Frontends?&#8221; </p></blockquote>\n\n\n\n<p>Followed by this definition from Cam Jackson in his article <a href="https://martinfowler.com/articles/micro-frontends.html" target="_blank" rel="noreferrer noopener">Micro Frontends</a>:</p>\n\n\n\n<blockquote class="wp-block-quote"><p><em>&#8220;An architectural style where independently deliverable frontend applications are composed into a greater whole&#8221;</em></p></blockquote>\n\n\n\n<p>This is a great definition and encompasses the essence of what Micro-Frontends are, however, time and time and again I find a lot of confusion about what Micro-Frontends really are and what they are meant to solve. Here is my take on what Micro-Frontends are by discovering <strong>what they are not</strong>.</p>\n\n\n\n<h2>The Naming is Unfortunate and Confusing</h2>\n\n\n\n<p></p>\n\n\n\n<p>This architectural pattern is not that new, it has been around for a long time and it was also known as MicroUI, however, the community settled on the term Micro-Frontends (or &#8220;microfrontends&#8221;, or &#8220;micro frontends&#8221; or &#8220;micro-frontends&#8221;?&#8230; see why the naming is unfortunate?) in 2016 after Thought Works added it to the Technology Radar.</p>\n\n\n\n<p>After the success of Microservices, the idea was to replicate the same architectural pattern on the frontend, hence, the term Micro-Frontend was adopted to keep the familiarity. However, several other definitions and misconceptions about this pattern have caused the meaning to deviate from its original intent and focus more on things like the size because of the word &#8220;micro&#8221; and also the fact that microservices are &#8220;technology agnostic&#8221; people immediately assume that is also the case with Micro-Frontends. </p>\n\n\n\n<p>I have also found other issues with the naming related to abbreviations and acronyms like MFEs and MFE which tends to be confused with Module Federation.</p>\n\n\n\n<h2>They Are Not a Technology</h2>\n\n\n\n<p>A really common misconception is that Micro-Frontends and Module Federation are the same things. Micro-Frontends are an architectural pattern, not a technology that can be implemented to solve a technical problem. It is a pattern that aims to fix an organizational problem that requires techniques to enable independent deployments and achieve business agility. On the other hand, Module Federation is a tool that enables code composition and delivery at runtime and it could be used to achieve this goal, however, it is not the only way of implementing Micro-Frontends, nor the best one for all use cases.</p>\n\n\n\n<p></p>\n\n\n\n<h2>They Are Not About Multiple Frontend Frameworks</h2>\n\n\n\n<p>One of the claimed benefits of Microservices is that they can be language agnostic, so the teams building them have the freedom to choose whatever technology stack or language they feel more familiar with to deliver the service. The most common myth about Micro-Frontends is that they are meant to enable the same freedom for frontend developers eager to experiment or work with their favourite framework of choice. However, unlike microservices, enabling this freedom comes at a higher cost. Micro-Frontends cannot be encapsulated 100% and are not deterministic pieces of software due to the dependency on the underlying platform, the browser. This creates a higher performance cost of having multiple languages and frameworks operating and sharing the same platform and removes most of the benefits of being language agnostic.</p>\n\n\n\n<p>There are certain limited use cases where having more than one JavaScript Framework could be beneficial for the architecture that could offset some of the performance tradeoffs. For example, a third party company or a team joining as a result of an acquisition might want to keep their existing choice of framework and tools and integrate with the main application using composition at runtime. Another example is when there is a transition between an existing legacy system to a new framework or technology by applying the &#8220;Strangler Pattern&#8221;.</p>\n\n\n\n<p>These are exceptions and not the rule, I personally don&#8217;t recommend having multiple frameworks on the same page through Micro-Frontends not just because of the performance drawbacks but also because the lack of unity and uniformity in frontend teams could impede the reuse of code, tools and knowledge across the company. </p>\n\n\n\n<h2>They are Not Components</h2>\n\n\n\n<p>Micro-Frontends can be made up of a collection of components, however, the key difference is that components don&#8217;t usually hold any application logic and Micro-Frontends are modelled around a business domain that can be deployed independently by an autonomous team. This line is very blurry for someone just getting familiar with this pattern, but it becomes clear once the challenges of going too granular start to appear. Distributed components are an antipattern in the Micro-Frontend architectural implementation due to their increase in overhead and maintenance which is the opposite of the goal of business agility and autonomy that the Micro-Frontend pattern is meant to achieve.</p>\n\n\n\n<p>Sometimes when people hear about Micro-Frontends, they also associate them with the Web Components specification and although Micro-Frontends could make use of this technology to achieve encapsulation and composition to enable independent delivery, they are two different things altogether. Micro-Frontends are a pattern, WebComponents (and Module Federation) are the web tools to aid this pattern.</p>\n\n\n\n<h2>Conclusion</h2>\n\n\n\n<p>So what are Micro-Frontends really? </p>\n\n\n\n<p>They are an architectural pattern, they can take multiple shapes and forms depending on the company applying them and the technology used to implement them in practice. This pattern emerged from a specific need of large companies to improve their business agility and solve organizational issues caused by scaling and multiple teams, due to the specific nature of the issues and the variety of solutions from company to company, the definition has been affected by ambiguity. Hope this article helped clarify those ambiguities and improve the reputation and image of this pattern in the frontend community. </p>\n\n\n\n<p></p>\n\n\n\n<p></p>\n';
function parseFrontMatter(content) {
  const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontMatterRegex);
  if (!match) {
    throw new Error("Invalid frontmatter format");
  }
  const [, frontMatterStr, body] = match;
  const frontMatter = {};
  const lines = frontMatterStr.split("\n");
  let currentKey = null;
  let inArray = false;
  let arrayValues = [];
  for (const line of lines) {
    if (line.startsWith("  - ")) {
      if (inArray && currentKey) {
        arrayValues.push(line.replace("  - ", "").trim());
      }
    } else if (line.includes(":")) {
      if (inArray && currentKey) {
        frontMatter[currentKey] = arrayValues;
        arrayValues = [];
        inArray = false;
      }
      const colonIndex = line.indexOf(":");
      const key = line.slice(0, colonIndex).trim();
      const value = line.slice(colonIndex + 1).trim();
      if (value === "") {
        currentKey = key;
        inArray = true;
        arrayValues = [];
      } else {
        frontMatter[key] = value.replace(/^["']|["']$/g, "");
      }
    }
  }
  if (inArray && currentKey) {
    frontMatter[currentKey] = arrayValues;
  }
  return {
    frontMatter,
    body: body.trim()
  };
}
const postFiles = /* @__PURE__ */ Object.assign({
  "../content/posts/building-a-loading-component-using-chatgpt.md": __vite_glob_0_0,
  "../content/posts/is-react-going-anywhere.md": __vite_glob_0_1,
  "../content/posts/micro-frontends-faqs.md": __vite_glob_0_2,
  "../content/posts/my-experience-at-react-summit-amsterdam.md": __vite_glob_0_3,
  "../content/posts/react-router-6-4-code-splitting.md": __vite_glob_0_4,
  "../content/posts/react-router-6-deferred-fetch.md": __vite_glob_0_5,
  "../content/posts/the-risks-of-micro-frontends.md": __vite_glob_0_6,
  "../content/posts/what-are-micro-frontends-really.md": __vite_glob_0_7
});
const blogPosts = Object.entries(postFiles).map(([path, content]) => {
  const fileName = path.split("/").pop()?.replace(".md", "") || "";
  const { frontMatter, body } = parseFrontMatter(content);
  return {
    id: fileName,
    title: frontMatter.title,
    excerpt: frontMatter.excerpt,
    content: body,
    date: frontMatter.date,
    tags: frontMatter.tags,
    readingTime: frontMatter.readingTime
  };
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
function getPostById(id) {
  return blogPosts.find((post) => post.id === id);
}
function getRecentPosts(count = 3) {
  return blogPosts.slice(0, count);
}
function getAllPosts() {
  return blogPosts;
}
export {
  getAllPosts as a,
  getPostById as b,
  getRecentPosts as g
};
