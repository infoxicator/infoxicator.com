import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { g as getRecentPosts } from "./posts-CZixfL4C.js";
function Home() {
  const recentPosts = getRecentPosts(10);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-16", children: [
    /* @__PURE__ */ jsxs("section", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-primary", children: "Hi, I'm Ruben Casas" }),
      /* @__PURE__ */ jsx("p", { className: "text-lg text-secondary leading-relaxed", children: "Staff Vibe Engineer at Postman. Always exploring what's next: Currently playing with MCP and MCP Apps, AI-native developer tools, self-generating UIs, and the future of human + machine collaboration." }),
      /* @__PURE__ */ jsx("div", { className: "flex gap-4 text-sm", children: /* @__PURE__ */ jsxs(Link, { to: "/blog", className: "inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded border border-theme hover:bg-tertiary transition-colors", children: [
        "Read the blog",
        /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "→" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-primary", children: "Recent Posts" }),
        /* @__PURE__ */ jsx(Link, { to: "/blog", className: "text-sm text-muted hover:text-accent transition-colors", children: "View all →" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-6", children: recentPosts.map((post) => /* @__PURE__ */ jsx("article", { className: "group p-4 -mx-4 rounded hover:bg-secondary transition-colors", children: /* @__PURE__ */ jsxs(Link, { to: "/blog/$postId", params: {
        postId: post.id
      }, className: "block space-y-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-sm text-muted", children: [
          /* @__PURE__ */ jsx("time", { dateTime: post.date, children: new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric"
          }) }),
          /* @__PURE__ */ jsx("span", { children: "·" }),
          /* @__PURE__ */ jsx("span", { children: post.readingTime })
        ] }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-medium text-primary group-hover:text-accent transition-colors", children: post.title }),
        /* @__PURE__ */ jsx("p", { className: "text-secondary line-clamp-2", children: post.excerpt }),
        /* @__PURE__ */ jsx("div", { className: "flex gap-2 pt-2", children: post.tags.slice(0, 3).map((tag) => /* @__PURE__ */ jsx("span", { className: "text-xs px-2 py-1 bg-tertiary rounded text-muted", children: tag }, tag)) })
      ] }) }, post.id)) })
    ] })
  ] });
}
export {
  Home as component
};
