---
title: "How I translated my Next.js Blog"
excerpt: "English is my second language and before I was proficient, I always found it really difficult to find tech resources in my own language. That's why I decided to translate my blog and make all my content available in Spanish. Internationalization with Next.js Next.js has made Internationalization (i18n) a breeze with one of the most [...]"
date: "2021-01-20"
tags:
  - nextjs
  - react
readingTime: "4 min read"
---

<figure>
  <img src="/images/posts/how-i-translated-my-next-js-blog/intl2.png" alt="How I translated my Next.js Blog cover" />
</figure>

<p>English is my second language and before I was proficient, I always found it really difficult to find tech resources in my own language. That&#8217;s why I decided to translate my blog and make all my content available in Spanish.</p>



<figure class="wp-block-image"><img src="/images/posts/how-i-translated-my-next-js-blog/105107793-c02f4780-5ab0-11eb-86d9-586b8781df42.gif" alt="translate-gif"/></figure>



<h2>Internationalization with <code>Next.js</code></h2>



<p><code>Next.js</code> has made Internationalization <a href="https://en.wikipedia.org/wiki/Internationalization_and_localization#Naming" target="_blank" rel="noreferrer noopener">(i18n)</a> a breeze with one of the most recent advanced features available in version 10: <a href="https://nextjs.org/docs/advanced-features/i18n-routing" target="_blank" rel="noreferrer noopener">Internationalized Routing</a>.</p>



<p>From the <a href="https://nextjs.org/docs/advanced-features/i18n-routing#locale-strategies" target="_blank" rel="noreferrer noopener">two options</a> provided by Next.js, I have decided to use Sub-path Routing instead of Domain Routing since I don&#8217;t want to create a subdomain for the Spanish version of my blog.</p>



<h2>Basic Configuration</h2>



<p><code>next.config.js</code></p>



<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">module.exports = {
    i18n: {
      locales: ['en', 'es'],
      defaultLocale: 'en',
    },
  }</code></pre>



<p>This is the only setup required to enable &#8220;<a href="https://nextjs.org/docs/advanced-features/i18n-routing#automatic-locale-detection" target="_blank" rel="noreferrer noopener">Automatic Language Detection</a>&#8220;.</p>



<p>The <a href="https://nextjs.org/docs/advanced-features/i18n-routing#automatic-locale-detection" target="_blank" rel="noreferrer noopener">automatic language detection system</a> provided by <code>Next.js</code> will redirect users to the <code>/es</code> path prefix if their browsers are set to Spanish (or any of its regional variations) as their default language. <code>Next.js</code> will look at the <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language" target="_blank" rel="noreferrer noopener"><code>Accept-Language</code></a> HTTP Header and try to set the correct language, however, if the language doesn&#8217;t match, it will use the default language. For example, if users have German (DE-de) as their browser language, it will set the current language to English (en).</p>



<h2>Managing Locale Files</h2>



<p><code>Next.js</code> doesn&#8217;t prescribe a way of managing your locale data or what <code>i18n</code> library you should use (or if you need a library at all).</p>



<p>For small projects (like in my case) a simple key-value pair JSON file does the job, however, for a large application, a more robust solution is recommended to avoid things like a bloated bundle size.</p>



<p>I have created a folder called <code>locale</code> and created a single JSON file per language. i.e. <code>locale/en.json</code> and <code>locale/es.json</code></p>



<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">{
  "greeting": "Hola amigos!"
}</code></pre>



<p>We could use the <code>key</code> to render the value of the translated language without any library, however, I want to use <a href="https://formatjs.io/docs/getting-started/installation/" target="_blank" rel="noreferrer noopener"><code>react-intl</code></a> since it is one of the most popular <code>i18n</code> libraries out there.</p>



<p>Add the following configuration to your _<code>app.js</code></p>



<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">import '../styles/index.css'
import { IntlProvider } from 'react-intl';
import { useRouter } from "next/router"

const languages = {
  en: require('../locale/en.json'),
  es: require('../locale/es.json')
};

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const { locale, defaultLocale } = router;
  const messages = languages[locale];
  return &lt;IntlProvider messages={messages} locale={locale} defaultLocale={defaultLocale}&gt;
      &lt;Component {...pageProps} /&gt;
      &lt;/IntlProvider&gt;
}

export default MyApp</code></pre>



<p>In the snippet above, we are wrapping our entire application with the <code>IntlProvider</code> and passing the <code>messages</code> and the <code>locale</code> that we obtained from the <code>useRouter()</code> hook. Now we can use <code>react-intl</code> components like <code>FormatedMessage</code> throughout our application.</p>



<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">import { FormattedMessage } from 'react-intl'

export default function Greeting() {
return (
  &lt;h1&gt;&lt;FormattedMessage id="greeting" /&gt;&lt;/h1&gt;
)}</code></pre>



<p></p>



<h2>Changing The Language</h2>



<p>When switching languages, I want to persist the user&#8217;s selection so if they visit my blog again it will set the language to their preferred language rather than the locale detected automatically by <code>Next.js</code>.</p>



<p>To achieve this, we can use the <a href="https://nextjs.org/docs/advanced-features/i18n-routing#leveraging-the-next_locale-cookie" target="_blank" rel="noreferrer noopener"><code>Next.js Locale Cookie</code></a>:</p>



<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">import { useRouter } from "next/router"
import { useCookies } from 'react-cookie';

export default function LanguageSwitcher() {
  const [ cookie, setCookie ] = useCookies(['NEXT_LOCALE']);
  const router = useRouter();
  const { locale } = router;

  const switchLanguage = (e) =&gt; {
    const locale = e.target.value;
    router.push('/','/', { locale });
    if(cookie.NEXT_LOCALE !== locale){
      setCookie("NEXT_LOCALE", locale, { path: "/" });
    }
  }

  return (
    &lt;select
      onChange={switchLanguage}
      defaultValue={locale}
    &gt;
      &lt;option value="en"&gt;EN&lt;/option&gt;
      &lt;option value="es"&gt;ES&lt;/option&gt;
    &lt;/select&gt;
  );
}</code></pre>



<h2><code>getStaticProps</code> For Each Locale</h2>



<p>To render the list of blog posts in the selected language, the <code>locale</code> parameter will be available in <code>getStaticProps</code> so I can pass it to my data fetching function.</p>



<p><strong>For Example:</strong></p>



<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">export async function getStaticProps({ locale }) {
  const allPosts = await getAllPostsForHome(locale)
  return {
    props: { allPosts },
  }
}</code></pre>



<h2>Search Engine Optimization</h2>



<p><code>Next.js</code> will add a global <code>lang</code> HTML attribute to your site with the current locale, however, if you have a custom <code>_document.js</code> file make sure that you remove any hardcoded <code>lang</code> values you might have set there.</p>



<p>To tell search engines about alternative versions of your posts in different languages, we must set a <code>hreflang</code> meta tag for each language (including the original language) to the <code>head</code> section of our blog posts page.</p>



<p><strong>For Example:</strong></p>



<pre class="wp-block-code"><code lang="javascript" class="language-javascript line-numbers">import Head from 'next/head'

export default function Post({ post }) {
return (
...
  &lt;article&gt;
    &lt;Head&gt;
        &lt;link rel="alternate" hreflang={locale} href={`${SITE_URL}${locale}/${post?.slug}`} /&gt;
        &lt;link rel="alternate" hreflang={altLocale} href={`${SITE_URL}${altLocale}/${altPost?.slug}`} /&gt;
    &lt;/Head&gt;
  &lt;/article&gt;
...
)}</code></pre>



<h2>Conclusion</h2>



<p>Internationalization <code>(i(18 letters)n)</code> used to be a complex task, however, with the aid of Meta-Frameworks like <code>Next.js</code> and tools like <code>react-intl</code>, providing localised text and translated data to our users has never been easier!.</p>



<p>I hope you enjoy my (translated) content and to my Spanish speaking friends out there, nos vemos pronto!.</p>
