---
title: "Dark Mode Is Not Enough! Here is an alternative..."
excerpt: "These days most websites have an option to toggle Dark mode, but what if I wanted more?"
date: "2020-11-29"
tags:
  - nextjs
  - react
readingTime: "7 min read"
---

<figure>
  <img src="/images/posts/dark-mode-is-dead-here-is-an-alternative/dark-mode-dead.png" alt="Dark Mode Is Not Enough! Here is an alternative&#x2026; cover" />
</figure>

<p>These days most websites have an option to toggle <code>Dark mode</code>, and if you find one without it, you will be screaming: &#8220;How dare you burn my retinas!&#8221;. But what if I wanted more than a light and a dark colour scheme and you had the option to use &#8220;Gray Mode&#8221;, or &#8220;Christmas Mode&#8221; or &#8220;My Favorite movie/video game mode&#8221;?</p>



<h2>Creating a Multi theme Switcher with React</h2>



<figure class="wp-block-image"><img src="/images/posts/dark-mode-is-dead-here-is-an-alternative/100543720-ad835980-3249-11eb-826f-296b559f1837.gif" alt="100543720-ad835980-3249-11eb-826f-296b559f1837.gif (1307&#xD7;431)"/></figure>



<p>Here are the features I am looking for:</p>



<ul><li>Switch between an infinite number of themes</li><li>The current theme should be available to all react components in the application.</li><li>Default Dark and Light modes depending on the user&#8217;s Operating System or browser preference.</li><li>The chosen theme should be persisted on the user&#8217;s browser</li><li>No &#8220;Flash of Death&#8221; on hard refresh for static rendered sites</li></ul>



<p>For this tutorial, I will be using <code>Next.js</code> but if you are using <code>Gatsby</code>, there is a nice present for you at the end of the article &#x1f609;</p>



<p>Let&#8217;s start with the standard <code>Next.js</code> blog template that comes with Tailwind included, however, this solution should work with any styling library of your choice including <code>styled-components</code> and <code>CSS Modules</code>.</p>



<pre class="wp-block-code"><code lang="bash" class="language-bash">npx create-next-app --example blog-starter blog-starter-app </code></pre>



<p></p>



<h2>Adding Theme Colours</h2>



<p>We are going to use <a rel="noreferrer noopener" href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties" target="_blank">CSS variables</a> to add colours to our site and a global CSS class to set our theme.</p>



<p>Open your <code>index.css</code> file and add a new class for every theme that you want to add, for example: </p>



<pre class="wp-block-code"><code lang="css" class="language-css line-numbers">.theme-twitter {
    --color-bg-primary: #15202B;
    --color-bg-primary-light: #172D3F;
    --color-bg-accent: #1B91DA; 
    --color-bg-accent-light: #1B91DA; 
    --color-bg-secondary: #657786;
    --color-text-link: #1B91DA;    
    --color-bg-compliment: #112b48;
    --color-bg-default: #192734;
    --color-bg-inverse: #1B91DA;
    --color-text-primary: #fff;
    --color-text-secondary: #f2f2f2;
    --color-text-default: #e9e9e9;
    --color-text-default-soft: #6a6a6a;
    --color-text-inverse: #1B91DA;
    --color-text-inverse-soft: #1B91DA;
  }

.theme-midnightgreen {
  --color-bg-primary: #004953;
  --color-bg-primary-light: #E7FDFF;
  --color-bg-accent: #DE7421; 
  --color-bg-accent-light: #DE7421; 
  --color-bg-secondary: #E7FDFF;
  --color-text-link: #008ca0;
  --color-bg-compliment: #f5f5ff;
  --color-bg-default: #f5f5f5;
  --color-bg-inverse: #d77d4d;
  --color-text-primary: #f5f5f5;
  --color-text-secondary: #004953;
  --color-text-default: #303030;
  --color-text-default-soft: #484848;
  --color-text-inverse: #008ca0;
  --color-text-inverse-soft: #ffffffb3;
}

.theme-my-favourite-colors {
 ...
}</code></pre>



<p>Open your <code>tailwind.config.js</code> file and extend the colour classes with the CSS variables that you created in the previous step. Example:</p>



<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">module.exports = {
  purge: ['./components/**/*.js', './pages/**/*.js'],
  theme: {
    extend: {
      colors: {
        'accent-1': 'var(--color-bg-primary)',
        'accent-2': 'var(--color-bg-secondary)',
        'accent-7': 'var(--color-bg-accent)',
        success: '#0070f3',
        cyan: '#79FFE1',
      },
      textColor: {
        white: "var(--color-text-primary)",
        grey: "var(--color-text-link)",
        black: "var(--color-text-secondary)",
      },
    },
  },
}
</code></pre>



<blockquote class="wp-block-quote"><p>Note: If you are not using Tailwind, you can configure your styling solution using the same CSS variables, the rest of the steps in this tutorial should remain the same.</p></blockquote>



<p>Assign the CSS class to the document body tag to apply your custom styles. Open your <code>_document.js</code> file and add hardcode your default theme for now</p>



<pre class="wp-block-code"><code lang="jsx" class="language-jsx">&lt;body className="theme-twitter"&gt;
  &lt;Main /&gt;
  &lt;NextScript /&gt;
&lt;/body&gt;</code></pre>



<p>Refresh the page and you should see the theme colours for the class that you have selected.</p>



<h2>Theme State</h2>



<p>To manage state, make the theme available globally to all our components and switch between different themes; we are going to use the <a href="https://reactjs.org/docs/context.html">React Context API</a> to create a theme context and provider.</p>



<p>Create a new file under <code>context/theme-context.js</code></p>



<pre class="wp-block-code"><code lang="jsx" class="language-jsx line-numbers">import React from "react";
import useLocalStorage from "./context/use-local-storage";

const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) =&gt; {
  const [theme, setTheme] = useLocalStorage("theme", null);
  const switchTheme = (newTheme) =&gt; {
    // eslint-disable-next-line no-undef
    const root = document.body;
    root.classList.remove(theme);
    root.classList.add(newTheme);
    setTheme(newTheme);
  };
  return (
    &lt;ThemeContext.Provider value={{ theme, switchTheme }}&gt;
      {children}
    &lt;/ThemeContext.Provider&gt;
  );
};

export default ThemeContext;
</code></pre>



<p>I am using the <code>useLocalStorage</code> hook to persist the theme value under the &#8220;theme&#8221; key. The source code for this hook can be found here: https://github.com/infoxicator/use-theme-switcher/blob/master/src/use-local-storage.js</p>



<p>The initial value will be <code>null</code> if local storage is empty, more on this later.</p>



<p>The <code>switchTheme</code> hook will replace the value of the CSS class we added to the body with the new value passed to this function as well as persisting the value in Local Storage.</p>



<p>Add the new provider to <code>_app.js</code></p>



<pre class="wp-block-code"><code lang="jsx" class="language-jsx line-numbers">import '../styles/index.css'
import { ThemeProvider } from '../context/theme-context';

export default function  MyApp({ Component, pageProps }) {
  return &lt;ThemeProvider&gt;
      &lt;Component {...pageProps} /&gt;
    &lt;/ThemeProvider&gt;
}</code></pre>



<h2>Theme Picker</h2>



<p>Let&#8217;s create a very basic theme picker component that will toggle between the available themes.</p>



<pre class="wp-block-code"><code lang="jsx" class="language-jsx line-numbers">import React from "react";

const myThemes = [
    {
        id: "theme-midnightgreen",
        name: "Midnight Green",
    },
    {
        id: "theme-spacegray",
        name: "Space Gray",
    },
    {
        id: "theme-twitter",
        name: "Twitter Dark",
    }
]

const ThemePicker = ({ theme, setTheme }) =&gt; {
    if (theme) {
        return (
            &lt;div&gt;
            {myThemes.map((item, index) =&gt; {
                const nextTheme = myThemes.length -1 === index ? myThemes[0].id : myThemes[index+1].id;
                
                return item.id === theme ? (
                    &lt;div key={item.id} className={item.id}&gt;
                    &lt;button
                        aria-label={`Theme ${item.name}`}
                        onClick={() =&gt; setTheme(nextTheme)}
                    &gt;
                        {item.name}
                    &lt;/button&gt;
                    &lt;/div&gt;
                ) : null;
                    }
                )}
            &lt;/div&gt;
        );
    }
    return null;
};

export default ThemePicker;</code></pre>



<p>This component, will take an array of available themes and render a button that will set the next available theme on click. This is a very basic implementation of the theme switcher component, but you can add your custom logic and design, like selecting from a drop down or rendering a list instead.</p>



<p>Render the <code>ThemeSwitcher</code> component at the top of the site. Open <code>layout.js</code> and add the following:</p>



<p></p>



<pre class="wp-block-code"><code lang="jsx" class="language-jsx line-numbers">import ThemePicker from './theme-picker';
import React, { useContext } from "react"
import ThemeContext from '../context/theme-context';

export default function Layout({ preview, children }) {
  const { theme, switchTheme } = useContext(ThemeContext);
  return (
    &lt;&gt;
      &lt;Meta /&gt;
      &lt;div className="min-h-screen bg-accent-1 text-white"&gt;
        &lt;Alert preview={preview} /&gt;
        &lt;ThemePicker theme={theme ? theme : 'theme-midnightgreen'} setTheme={switchTheme} /&gt;
        &lt;main&gt;{children}&lt;/main&gt;
      &lt;/div&gt;
      &lt;Footer /&gt;
    &lt;/&gt;
  )
}</code></pre>



<p>The theme value is <code>null</code> for the first time and when the user hasn&#8217;t selected a custom theme yet, for that reason we are passing the default theme value to the <code>ThemePicker</code> component.</p>



<h2>Overcoming the &#8220;White Flash Of Death&#8221;</h2>



<p>Who would have thought that a simple bug like this would be so complex and so deeply connected to the different ways of rendering websites (Server Side Rendering, Static Site Generation, Client Side Rendering)? In a nutshell, the flash is caused by the timing when the initial HTML is rendered. When we use SSR or SSG with tools like <code>next.js</code> or <code>gatsby</code>, the HTML is rendered ahead of time before it reaches the client, so the initial theme value that comes from local storage will be different from the value that was rendered on the server producing a small &#8220;flash&#8221; while the correct theme is applied.</p>



<p>The key to fixing this problem is to use a &#8220;render blocking&#8221; script that will set the correct CSS class before the site content is rendered to the DOM.</p>



<p>Create a new file called <code>theme-script.js</code></p>



<pre class="wp-block-code"><code lang="jsx" class="language-jsx line-numbers">import React from "react";

function setColorsByTheme(
  defaultDarkTheme,
  defaultLightTheme,
  themeStorageKey
) {
  var mql = window.matchMedia("(prefers-color-scheme: dark)");
  var prefersDarkFromMQ = mql.matches;
  var persistedPreference = localStorage.getItem(themeStorageKey);
  var root = document.body;
  var colorMode = "";

  var hasUsedToggle = typeof persistedPreference === "string";

  if (hasUsedToggle) {
    colorMode = JSON.parse(persistedPreference);
  } else {
    colorMode = prefersDarkFromMQ ? defaultDarkTheme : defaultLightTheme;
    localStorage.setItem(themeStorageKey, JSON.stringify(colorMode));
  }

  root.classList.add(colorMode);
}

const ThemeScriptTag = () =&gt; {
  const themeScript = `(${setColorsByTheme})(
        'theme-twitter',
        'theme-midnightgreen',
        'theme',
      )`;
// eslint-disable-next-line react/no-danger
  return &lt;script dangerouslySetInnerHTML={{ __html: themeScript }} /&gt;;
};

export default ThemeScriptTag;</code></pre>



<p>This script should render before the rest of the content and &#8220;block&#8221; the rendering of the application until the value of the theme is determined. Add it to your <code>_document.js</code></p>



<pre class="wp-block-code"><code lang="jsx" class="language-jsx line-numbers">import Document, { Html, Head, Main, NextScript } from 'next/document'
import ThemeScriptTag from '../components/theme-script';

export default class MyDocument extends Document {
  render() {
    return (
      &lt;Html lang="en"&gt;
        &lt;Head&gt;
        &lt;/Head&gt;
        &lt;body&gt;
          &lt;ThemeScriptTag /&gt;
          &lt;Main /&gt;
          &lt;NextScript /&gt;
        &lt;/body&gt;
      &lt;/Html&gt;
    )
  }
}
</code></pre>



<p>If you want to dive deep into this issue and this solution, Josh W. Comau created a brilliant <a href="https://www.joshwcomeau.com/react/dark-mode/" target="_blank" rel="noreferrer noopener">blog post</a> analysing this issue step by step and coming up with this solution.</p>



<h2>Additional Resources</h2>



<p></p>



<iframe loading="lazy" width="100%" height="375" src="https://www.youtube.com/embed/dnvVr9bOR8I" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>



<h3>NPM Package</h3>



<p>I have created an npm package that wraps the components created in this tutorial so it is easier to add to your <code>Next.js</code> site:</p>



<p><a href="https://www.npmjs.com/package/use-theme-switcher" target="_blank" rel="noreferrer noopener">https://www.npmjs.com/package/use-theme-switcher</a></p>



<h3>Gatsby Plugin</h3>



<p>Gatsby and its great plugin system makes it super easy to add this theme switcher by installing: </p>



<p><a href="https://www.npmjs.com/package/gatsby-plugin-theme-switcher" target="_blank" rel="noreferrer noopener">https://www.npmjs.com/package/gatsby-plugin-theme-switcher</a></p>



<h2><strong>Conclusion</strong></h2>



<p>You can now reward your users with new customisable themes to your site, you could even create really creative theme switcher components like the one <a rel="noreferrer noopener" href="https://twitter.com/SamLarsenDisney" target="_blank">@SamLarsenDisney</a> added to his site <a rel="noreferrer noopener" href="https://sld.codes/" target="_blank">sld.codes</a>&#8230; look out for those easter eggs! &#x1f609;</p>



<p></p>



<p></p>



<p></p>
