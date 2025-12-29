import { jsxs, jsx } from "react/jsx-runtime";
import { useRouter, useMatch, rootRouteId, ErrorComponent, Link, createRootRoute, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import * as React from "react";
function DefaultCatchBoundary({ error }) {
  const router2 = useRouter();
  const isRoot = useMatch({
    strict: false,
    select: (state) => state.id === rootRouteId
  });
  console.error("DefaultCatchBoundary Error:", error);
  return /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1 p-4 flex flex-col items-center justify-center gap-6", children: [
    /* @__PURE__ */ jsx(ErrorComponent, { error }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2 items-center flex-wrap", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
          },
          className: `px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold`,
          children: "Try Again"
        }
      ),
      isRoot ? /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: `px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold`,
          children: "Home"
        }
      ) : /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: `px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold`,
          onClick: (e) => {
            e.preventDefault();
            window.history.back();
          },
          children: "Go Back"
        }
      )
    ] })
  ] });
}
function NotFound({ children }) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2 p-2", children: [
    /* @__PURE__ */ jsx("div", { className: "text-gray-600 dark:text-gray-400", children: children || /* @__PURE__ */ jsx("p", { children: "The page you are looking for does not exist." }) }),
    /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2 flex-wrap", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => window.history.back(),
          className: "bg-emerald-500 text-white px-2 py-1 rounded-sm uppercase font-black text-sm",
          children: "Go back"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: "bg-cyan-600 text-white px-2 py-1 rounded-sm uppercase font-black text-sm",
          children: "Start Over"
        }
      )
    ] })
  ] });
}
const ThemeContext = React.createContext(void 0);
const themes = [
  { id: "light", name: "Light" },
  { id: "dark", name: "Dark" },
  { id: "dracula", name: "Dracula" },
  { id: "nord", name: "Nord" },
  { id: "monokai", name: "Monokai" }
];
function ThemeProvider({ children }) {
  const [theme, setThemeState] = React.useState("light");
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme && themes.some((t) => t.id === savedTheme)) {
      setThemeState(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const defaultTheme = prefersDark ? "dark" : "light";
      setThemeState(defaultTheme);
      document.documentElement.setAttribute("data-theme", defaultTheme);
    }
  }, []);
  const setTheme = (newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };
  if (!mounted) {
    return null;
  }
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value: { theme, setTheme, themes }, children });
}
function useTheme() {
  const context = React.useContext(ThemeContext);
  if (context === void 0) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
function ThemeSwitcher() {
  const { theme, setTheme, themes: themes2 } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const currentTheme = themes2.find((t) => t.id === theme);
  return /* @__PURE__ */ jsxs("div", { className: "relative", ref: dropdownRef, children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setIsOpen(!isOpen),
        className: "flex items-center gap-2 px-3 py-1.5 text-sm bg-secondary rounded border border-theme hover:bg-tertiary transition-colors",
        "aria-label": "Select theme",
        children: [
          /* @__PURE__ */ jsx(ThemeIcon, { theme }),
          /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: currentTheme?.name }),
          /* @__PURE__ */ jsx(
            "svg",
            {
              className: `w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`,
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" })
            }
          )
        ]
      }
    ),
    isOpen && /* @__PURE__ */ jsx("div", { className: "absolute right-0 mt-2 w-36 bg-secondary rounded border border-theme shadow-lg z-50", children: themes2.map((t) => /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => {
          setTheme(t.id);
          setIsOpen(false);
        },
        className: `w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-tertiary transition-colors first:rounded-t last:rounded-b ${theme === t.id ? "text-accent" : "text-primary"}`,
        children: [
          /* @__PURE__ */ jsx(ThemeIcon, { theme: t.id }),
          t.name,
          theme === t.id && /* @__PURE__ */ jsx("svg", { className: "w-3 h-3 ml-auto", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx(
            "path",
            {
              fillRule: "evenodd",
              d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",
              clipRule: "evenodd"
            }
          ) })
        ]
      },
      t.id
    )) })
  ] });
}
function ThemeIcon({ theme }) {
  const colors = {
    light: "#f8f9fa",
    dark: "#1a1a2e",
    dracula: "#bd93f9",
    nord: "#88c0d0",
    monokai: "#f92672"
  };
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: "w-3 h-3 rounded-full border border-theme",
      style: { backgroundColor: colors[theme] || colors.light }
    }
  );
}
const appCss = "/assets/app-DqOgknlc.css";
const seo = ({
  title,
  description,
  keywords,
  image
}) => {
  const tags = [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:creator", content: "@tannerlinsley" },
    { name: "twitter:site", content: "@tannerlinsley" },
    { name: "og:type", content: "website" },
    { name: "og:title", content: title },
    { name: "og:description", content: description },
    ...image ? [
      { name: "twitter:image", content: image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "og:image", content: image }
    ] : []
  ];
  return tags;
};
const Route$4 = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      ...seo({
        title: "Infoxicator | Ruben Casas",
        description: "Personal blog and portfolio of Ruben Casas - Software Engineer, Micro Frontend enthusiast, and lifelong learner."
      })
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png"
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" }
    ],
    scripts: [
      {
        children: `
          (function() {
            const theme = localStorage.getItem('theme');
            if (theme) {
              document.documentElement.setAttribute('data-theme', theme);
            } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
              document.documentElement.setAttribute('data-theme', 'dark');
            }
          })();
        `
      }
    ]
  }),
  errorComponent: (props) => {
    return /* @__PURE__ */ jsx(RootLayout, { children: /* @__PURE__ */ jsx(DefaultCatchBoundary, { ...props }) });
  },
  notFoundComponent: () => /* @__PURE__ */ jsx(NotFound, {}),
  component: RootComponent
});
function RootComponent() {
  return /* @__PURE__ */ jsx(RootLayout, { children: /* @__PURE__ */ jsx(Outlet, {}) });
}
function RootLayout({ children }) {
  return /* @__PURE__ */ jsxs("html", { children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { className: "min-h-screen flex flex-col", children: [
      /* @__PURE__ */ jsxs(ThemeProvider, { children: [
        /* @__PURE__ */ jsx(Header, {}),
        /* @__PURE__ */ jsx("main", { className: "flex-1 w-full max-w-3xl mx-auto px-6 py-8", children }),
        /* @__PURE__ */ jsx(Footer, {})
      ] }),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function Header() {
  return /* @__PURE__ */ jsx("header", { className: "w-full border-b border-theme", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-6 py-4 flex items-center justify-between", children: [
    /* @__PURE__ */ jsx(Link, { to: "/", className: "text-lg font-semibold text-primary hover:text-accent transition-colors", children: "~/infoxicator" }),
    /* @__PURE__ */ jsxs("nav", { className: "flex items-center gap-6", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: "text-sm text-muted hover:text-primary transition-colors",
          activeProps: { className: "text-sm text-accent" },
          activeOptions: { exact: true },
          children: "home"
        }
      ),
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/blog",
          className: "text-sm text-muted hover:text-primary transition-colors",
          activeProps: { className: "text-sm text-accent" },
          children: "blog"
        }
      ),
      /* @__PURE__ */ jsx(ThemeSwitcher, {})
    ] })
  ] }) });
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "w-full border-t border-theme", children: /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted", children: [
    /* @__PURE__ */ jsxs("span", { children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " Ruben Casas"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://twitter.com/infoxicator",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "hover:text-primary transition-colors",
          children: "twitter"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://github.com/infoxicator",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "hover:text-primary transition-colors",
          children: "github"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "https://linkedin.com/in/ACoAABJb0mgBc6L_x1w-l_cGNMY4VpnDPZ2vEQQ",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "hover:text-primary transition-colors",
          children: "linkedin"
        }
      )
    ] })
  ] }) });
}
const $$splitComponentImporter$3 = () => import("./blog-9Hd3AP52.js");
const Route$3 = createFileRoute("/blog")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./index-Ds1guswI.js");
const Route$2 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./blog.index-D7fmgsgd.js");
const Route$1 = createFileRoute("/blog/")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitNotFoundComponentImporter = () => import("./blog._postId-B0VL1MAr.js");
const $$splitComponentImporter = () => import("./blog._postId-DAqKpxDy.js");
const Route = createFileRoute("/blog/$postId")({
  component: lazyRouteComponent($$splitComponentImporter, "component"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
const BlogRoute = Route$3.update({
  id: "/blog",
  path: "/blog",
  getParentRoute: () => Route$4
});
const IndexRoute = Route$2.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$4
});
const BlogIndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => BlogRoute
});
const BlogPostIdRoute = Route.update({
  id: "/$postId",
  path: "/$postId",
  getParentRoute: () => BlogRoute
});
const BlogRouteChildren = {
  BlogPostIdRoute,
  BlogIndexRoute
};
const BlogRouteWithChildren = BlogRoute._addFileChildren(BlogRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  BlogRoute: BlogRouteWithChildren
};
const routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  const router2 = createRouter({
    routeTree,
    defaultPreload: "intent",
    defaultErrorComponent: DefaultCatchBoundary,
    defaultNotFoundComponent: () => /* @__PURE__ */ jsx(NotFound, {}),
    scrollRestoration: true
  });
  return router2;
}
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  NotFound as N,
  Route as R,
  router as r
};
