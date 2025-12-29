import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { g as getPostById } from "./posts-CfSTh79L.js";
import { R as Route, N as NotFound } from "./router-6bGHL_KM.js";
import * as React from "react";
import { codeToHtml } from "shiki";
function MarkdownRenderer({ content }) {
  const [elements, setElements] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    parseContent(content).then((parsed) => {
      setElements(parsed);
      setIsLoading(false);
    });
  }, [content]);
  if (isLoading) {
    return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx("div", { className: "h-6 bg-secondary rounded animate-pulse" }),
      /* @__PURE__ */ jsx("div", { className: "h-4 bg-secondary rounded animate-pulse w-3/4" }),
      /* @__PURE__ */ jsx("div", { className: "h-4 bg-secondary rounded animate-pulse w-1/2" })
    ] });
  }
  return /* @__PURE__ */ jsx("div", { children: elements });
}
function looksLikeHtml(content) {
  return /<(p|h1|h2|h3|ul|ol|blockquote|figure|pre|img|a)\b/i.test(content);
}
async function parseContent(content) {
  if (looksLikeHtml(content)) {
    return parseHtml(content);
  }
  return parseMarkdown(content);
}
async function parseMarkdown(content) {
  const lines = content.trim().split("\n");
  const elements = [];
  let inCodeBlock = false;
  let codeContent = [];
  let codeLanguage = "";
  let blockStartIndex = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("```")) {
      if (!inCodeBlock) {
        inCodeBlock = true;
        codeLanguage = line.slice(3).trim() || "text";
        codeContent = [];
        blockStartIndex = i;
      } else {
        const code = codeContent.join("\n");
        const highlighted = await highlightCode(code, codeLanguage);
        elements.push(
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "my-4 rounded border border-theme overflow-hidden",
              children: [
                /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between px-4 py-2 bg-tertiary border-b border-theme", children: /* @__PURE__ */ jsx("span", { className: "text-xs text-muted font-medium uppercase", children: codeLanguage }) }),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "p-4 overflow-x-auto text-sm [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-0",
                    dangerouslySetInnerHTML: { __html: highlighted }
                  }
                )
              ]
            },
            blockStartIndex
          )
        );
        inCodeBlock = false;
        codeContent = [];
        codeLanguage = "";
      }
      continue;
    }
    if (inCodeBlock) {
      codeContent.push(line);
      continue;
    }
    if (!line.trim()) {
      continue;
    }
    const twitterMatch = line.match(/^\{%\s*twitter\s+(\d+)\s*%\}$/);
    if (twitterMatch) {
      const tweetId = twitterMatch[1];
      elements.push(/* @__PURE__ */ jsx(TwitterEmbed, { tweetId }, i));
      continue;
    }
    const imageMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imageMatch) {
      const [, alt, src] = imageMatch;
      elements.push(
        /* @__PURE__ */ jsxs("figure", { className: "my-6", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src,
              alt,
              className: "rounded border border-theme max-w-full",
              loading: "lazy"
            }
          ),
          alt && /* @__PURE__ */ jsx("figcaption", { className: "text-sm text-muted mt-2 text-center", children: alt })
        ] }, i)
      );
      continue;
    }
    if (line.startsWith("> ")) {
      elements.push(
        /* @__PURE__ */ jsx(
          "blockquote",
          {
            className: "border-l-4 border-accent pl-4 my-4 italic text-secondary",
            children: renderInlineElements(line.slice(2))
          },
          i
        )
      );
      continue;
    }
    if (line.startsWith("# ")) {
      elements.push(
        /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-primary mt-8 mb-4", children: line.slice(2) }, i)
      );
      continue;
    }
    if (line.startsWith("## ")) {
      elements.push(
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-primary mt-8 mb-3", children: line.slice(3) }, i)
      );
      continue;
    }
    if (line.startsWith("### ")) {
      elements.push(
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-primary mt-6 mb-2", children: line.slice(4) }, i)
      );
      continue;
    }
    if (line.startsWith("- ")) {
      elements.push(
        /* @__PURE__ */ jsx("li", { className: "text-secondary ml-4 my-1 list-disc", children: renderInlineElements(line.slice(2)) }, i)
      );
      continue;
    }
    if (/^\d+\.\s/.test(line)) {
      const text = line.replace(/^\d+\.\s/, "");
      elements.push(
        /* @__PURE__ */ jsx("li", { className: "text-secondary ml-4 my-1 list-decimal", children: renderInlineElements(text) }, i)
      );
      continue;
    }
    elements.push(
      /* @__PURE__ */ jsx("p", { className: "text-secondary my-4 leading-relaxed", children: renderInlineElements(line) }, i)
    );
  }
  return elements;
}
async function parseHtml(content) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  return renderHtmlNodes(Array.from(doc.body.childNodes), "html");
}
async function renderHtmlNodes(nodes, keyPrefix) {
  const elements = [];
  let index = 0;
  for (const node of nodes) {
    const rendered = await renderHtmlNode(node, `${keyPrefix}-${index}`);
    index += 1;
    if (rendered === null || rendered === void 0) {
      continue;
    }
    elements.push(rendered);
  }
  return elements;
}
async function renderHtmlNode(node, key) {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent ?? "";
    if (!text.trim()) {
      return null;
    }
    return text;
  }
  if (node.nodeType !== Node.ELEMENT_NODE) {
    return null;
  }
  const element = node;
  const tag = element.tagName.toLowerCase();
  switch (tag) {
    case "p": {
      const children = await renderHtmlNodes(Array.from(element.childNodes), key);
      if (children.length === 0) {
        return null;
      }
      return /* @__PURE__ */ jsx("p", { className: "text-secondary my-4 leading-relaxed", children }, key);
    }
    case "h1":
      return /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold text-primary mt-8 mb-4", children: element.textContent?.trim() }, key);
    case "h2":
      return /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-primary mt-8 mb-3", children: element.textContent?.trim() }, key);
    case "h3":
      return /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-primary mt-6 mb-2", children: element.textContent?.trim() }, key);
    case "ul": {
      const children = await renderHtmlNodes(Array.from(element.childNodes), key);
      if (children.length === 0) {
        return null;
      }
      return /* @__PURE__ */ jsx("ul", { className: "my-4 pl-5 list-disc space-y-1 text-secondary", children }, key);
    }
    case "ol": {
      const children = await renderHtmlNodes(Array.from(element.childNodes), key);
      if (children.length === 0) {
        return null;
      }
      return /* @__PURE__ */ jsx("ol", { className: "my-4 pl-5 list-decimal space-y-1 text-secondary", children }, key);
    }
    case "li": {
      const children = await renderHtmlNodes(Array.from(element.childNodes), key);
      if (children.length === 0) {
        return null;
      }
      return /* @__PURE__ */ jsx("li", { className: "text-secondary", children }, key);
    }
    case "blockquote": {
      const children = await renderHtmlNodes(Array.from(element.childNodes), key);
      if (children.length === 0) {
        return null;
      }
      return /* @__PURE__ */ jsx(
        "blockquote",
        {
          className: "border-l-4 border-accent pl-4 my-4 italic text-secondary",
          children
        },
        key
      );
    }
    case "cite": {
      const children = await renderHtmlNodes(Array.from(element.childNodes), key);
      if (children.length === 0) {
        return null;
      }
      return /* @__PURE__ */ jsx("cite", { className: "block text-sm text-muted mt-2", children }, key);
    }
    case "figure": {
      const children = await renderHtmlNodes(Array.from(element.childNodes), key);
      if (children.length === 0) {
        return null;
      }
      return /* @__PURE__ */ jsx("figure", { className: "my-6", children }, key);
    }
    case "img": {
      const src = element.getAttribute("src") || "";
      if (!src) {
        return null;
      }
      const alt = element.getAttribute("alt") || "";
      return /* @__PURE__ */ jsx(
        "img",
        {
          src,
          alt,
          className: "rounded border border-theme max-w-full",
          loading: "lazy"
        },
        key
      );
    }
    case "a": {
      const rawHref = element.getAttribute("href") || "";
      const href = rawHref.trim();
      const target = element.getAttribute("target") || void 0;
      const rel = element.getAttribute("rel") || (target === "_blank" ? "noreferrer noopener" : void 0);
      const children = await renderHtmlNodes(Array.from(element.childNodes), key);
      if (!href) {
        return children.length ? /* @__PURE__ */ jsx("span", { children }, key) : null;
      }
      return /* @__PURE__ */ jsx("a", { href, target, rel, className: "text-accent hover:underline", children: children.length ? children : href }, key);
    }
    case "pre": {
      const codeElement = element.querySelector("code");
      const code = codeElement?.textContent ?? element.textContent ?? "";
      const className = codeElement?.getAttribute("class") || element.getAttribute("class") || "";
      const langMatch = className.match(/language-([a-z0-9-]+)/i);
      const codeLanguage = langMatch ? langMatch[1] : "text";
      const highlighted = await highlightCode(code, codeLanguage);
      return /* @__PURE__ */ jsxs("div", { className: "my-4 rounded border border-theme overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between px-4 py-2 bg-tertiary border-b border-theme", children: /* @__PURE__ */ jsx("span", { className: "text-xs text-muted font-medium uppercase", children: codeLanguage }) }),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: "p-4 overflow-x-auto text-sm [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-0",
            dangerouslySetInnerHTML: { __html: highlighted }
          }
        )
      ] }, key);
    }
    case "code": {
      const text = element.textContent ?? "";
      return /* @__PURE__ */ jsx("code", { className: "px-1.5 py-0.5 bg-tertiary rounded text-sm text-accent", children: text }, key);
    }
    case "strong": {
      const children = await renderHtmlNodes(Array.from(element.childNodes), key);
      return /* @__PURE__ */ jsx("strong", { className: "font-semibold text-primary", children }, key);
    }
    case "em": {
      const children = await renderHtmlNodes(Array.from(element.childNodes), key);
      return /* @__PURE__ */ jsx("em", { className: "italic", children }, key);
    }
    case "s": {
      const children = await renderHtmlNodes(Array.from(element.childNodes), key);
      return /* @__PURE__ */ jsx("s", { children }, key);
    }
    case "br":
      return /* @__PURE__ */ jsx("br", {}, key);
    default: {
      const children = await renderHtmlNodes(Array.from(element.childNodes), key);
      return children.length ? /* @__PURE__ */ jsx("span", { children }, key) : null;
    }
  }
}
async function highlightCode(code, lang) {
  try {
    const langMap = {
      js: "javascript",
      ts: "typescript",
      tsx: "tsx",
      jsx: "jsx",
      sh: "bash",
      shell: "bash",
      yml: "yaml",
      text: "text"
    };
    const language = langMap[lang] || lang;
    const html = await codeToHtml(code, {
      lang: language,
      themes: {
        light: "github-light",
        dark: "github-dark"
      },
      defaultColor: false
    });
    return html;
  } catch {
    return `<pre><code>${escapeHtml(code)}</code></pre>`;
  }
}
function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
function TwitterEmbed({ tweetId }) {
  const containerRef = React.useRef(null);
  React.useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    const existingScript = document.querySelector(
      'script[src="https://platform.twitter.com/widgets.js"]'
    );
    if (!existingScript) {
      document.body.appendChild(script);
    } else if (window.twttr?.widgets?.load) {
      window.twttr.widgets.load(containerRef.current || void 0);
    }
    script.onload = () => {
      if (window.twttr?.widgets?.load) {
        window.twttr.widgets.load(containerRef.current || void 0);
      }
    };
    return () => {
      if (!document.querySelector('script[src="https://platform.twitter.com/widgets.js"]')) {
        script.remove();
      }
    };
  }, [tweetId]);
  return /* @__PURE__ */ jsx("div", { ref: containerRef, className: "my-6 flex justify-center", children: /* @__PURE__ */ jsx("blockquote", { className: "twitter-tweet", "data-theme": "dark", children: /* @__PURE__ */ jsx("a", { href: `https://twitter.com/x/status/${tweetId}`, children: "Loading tweet..." }) }) });
}
function renderInlineElements(text) {
  const parts = text.split(/(!\[[^\]]*\]\([^)]+\)|\[[^\]]+\]\([^)]+\)|`[^`]+`)/);
  return parts.map((part, i) => {
    const imageMatch = part.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imageMatch) {
      const [, alt, src] = imageMatch;
      return /* @__PURE__ */ jsx(
        "img",
        {
          src,
          alt,
          className: "inline-block rounded max-w-full my-2",
          loading: "lazy"
        },
        i
      );
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, linkText, href] = linkMatch;
      return /* @__PURE__ */ jsx(
        "a",
        {
          href,
          target: href.startsWith("http") ? "_blank" : void 0,
          rel: href.startsWith("http") ? "noopener noreferrer" : void 0,
          className: "text-accent hover:underline",
          children: linkText
        },
        i
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return /* @__PURE__ */ jsx("code", { className: "px-1.5 py-0.5 bg-tertiary rounded text-sm text-accent", children: part.slice(1, -1) }, i);
    }
    const boldParts = part.split(/(\*\*[^*]+\*\*)/);
    return boldParts.map((bp, j) => {
      if (bp.startsWith("**") && bp.endsWith("**")) {
        return /* @__PURE__ */ jsx("strong", { className: "font-semibold text-primary", children: bp.slice(2, -2) }, `${i}-${j}`);
      }
      return bp;
    });
  });
}
function ScrollProgressBar() {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollTop / docHeight * 100 : 0;
      setProgress(scrollPercent);
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);
  return /* @__PURE__ */ jsx("div", { className: "fixed top-0 left-0 right-0 z-50 h-1", style: { backgroundColor: "var(--border)" }, children: /* @__PURE__ */ jsx(
    "div",
    {
      className: "h-full transition-[width] duration-75 ease-out",
      style: { width: `${progress}%`, backgroundColor: "var(--accent)" }
    }
  ) });
}
function BlogPost() {
  const {
    postId
  } = Route.useParams();
  const post = getPostById(postId);
  if (!post) {
    return /* @__PURE__ */ jsx(NotFound, { children: "Post not found" });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ScrollProgressBar, {}),
    /* @__PURE__ */ jsxs("article", { className: "space-y-8", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/", className: "inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors", children: [
        /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "←" }),
        "Back to home"
      ] }),
      /* @__PURE__ */ jsxs("header", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-sm text-muted", children: [
          /* @__PURE__ */ jsx("time", { dateTime: post.date, children: new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          }) }),
          /* @__PURE__ */ jsx("span", { children: "·" }),
          /* @__PURE__ */ jsx("span", { children: post.readingTime })
        ] }),
        /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-primary", children: post.title }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: post.tags.map((tag) => /* @__PURE__ */ jsx("span", { className: "text-xs px-2 py-1 bg-tertiary rounded text-muted", children: tag }, tag)) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "prose", children: /* @__PURE__ */ jsx(MarkdownRenderer, { content: post.content }) }),
      /* @__PURE__ */ jsx("footer", { className: "pt-8 border-t border-theme", children: /* @__PURE__ */ jsxs(Link, { to: "/", className: "inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors", children: [
        /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "←" }),
        "Back to all posts"
      ] }) })
    ] })
  ] });
}
export {
  BlogPost as component
};
