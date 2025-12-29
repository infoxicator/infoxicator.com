---
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
