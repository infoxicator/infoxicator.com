import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { b as getAllPosts } from "./posts-nSWHB6eP.js";
function BlogIndex() {
  const posts = getAllPosts();
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxs("header", { className: "space-y-4", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold text-primary", children: "Blog" }),
      /* @__PURE__ */ jsx("p", { className: "text-secondary", children: "Thoughts on software engineering, web development, and building things." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "space-y-6", children: posts.map((post) => /* @__PURE__ */ jsx("article", { className: "group p-4 -mx-4 rounded hover:bg-secondary transition-colors", children: /* @__PURE__ */ jsxs(Link, { to: "/$postId", params: {
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
      /* @__PURE__ */ jsx("h2", { className: "text-xl font-medium text-primary group-hover:text-accent transition-colors", children: post.title }),
      /* @__PURE__ */ jsx("p", { className: "text-secondary", children: post.excerpt }),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2 pt-2", children: post.tags.map((tag) => /* @__PURE__ */ jsx("span", { className: "text-xs px-2 py-1 bg-tertiary rounded text-muted", children: tag }, tag)) })
    ] }) }, post.id)) })
  ] });
}
export {
  BlogIndex as component
};
