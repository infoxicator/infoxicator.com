---
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
