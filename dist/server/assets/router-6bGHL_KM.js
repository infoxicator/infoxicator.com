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
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center min-h-[60vh] text-center px-4", children: [
    /* @__PURE__ */ jsx("div", { className: "text-8xl md:text-9xl font-light text-primary mb-6", children: ":(" }),
    /* @__PURE__ */ jsx("h1", { className: "text-2xl md:text-4xl font-semibold text-primary mb-2", children: children || "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "text-muted text-sm md:text-base mb-6", children: "Your coding agent hallucinated a link" }),
    /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "text-lg md:text-xl text-accent hover:text-accent-hover underline underline-offset-4 transition-colors",
        children: "Go Home"
      }
    )
  ] });
}
const ThemeContext = React.createContext(void 0);
const themes = [
  { id: "light", name: "Light" },
  { id: "dark-side", name: "Dark Side" },
  { id: "terminal-green", name: "Terminal" },
  { id: "vibe-code", name: "Vibe Code" }
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
      const defaultTheme = prefersDark ? "vibe-code" : "light";
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
const themeConfig = {
  light: { bg: "#ffffff", accent: "#0066cc", isLight: true },
  "dark-side": { bg: "#040405", accent: "#FF2A2A", isLight: false },
  "terminal-green": { bg: "#020806", accent: "#00FF9C", isLight: false },
  "vibe-code": { bg: "#0C0616", accent: "#6E1AE9", isLight: false }
};
const ThemeSwitcherContext = React.createContext(void 0);
function ThemeSwitcherProvider({ children }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = React.useCallback(() => setIsOpen((prev) => !prev), []);
  return /* @__PURE__ */ jsx(ThemeSwitcherContext.Provider, { value: { isOpen, setIsOpen, toggle }, children });
}
function useThemeSwitcher() {
  const context = React.useContext(ThemeSwitcherContext);
  if (!context) {
    throw new Error("useThemeSwitcher must be used within ThemeSwitcherProvider");
  }
  return context;
}
function ThemeSwitcherButton() {
  const { toggle } = useThemeSwitcher();
  return /* @__PURE__ */ jsx(
    "button",
    {
      onClick: toggle,
      className: "flex items-center justify-center w-9 h-9 bg-secondary rounded hover:bg-tertiary transition-colors",
      "aria-label": "Select theme",
      children: /* @__PURE__ */ jsx(
        "svg",
        {
          className: "w-5 h-5",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: 1.5,
          viewBox: "0 0 24 24",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              d: "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
            }
          )
        }
      )
    }
  );
}
function ThemeSwitcherPanel() {
  const { theme, setTheme, themes: themes2 } = useTheme();
  const { isOpen, setIsOpen } = useThemeSwitcher();
  const panelRef = React.useRef(null);
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        const button = event.target.closest('[aria-label="Select theme"]');
        if (!button) {
          setIsOpen(false);
        }
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, setIsOpen]);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref: panelRef,
      className: "w-full overflow-hidden transition-all duration-300 ease-in-out",
      style: { maxHeight: isOpen ? "100px" : "0px" },
      children: /* @__PURE__ */ jsx("div", { className: "w-full border-b border-theme bg-secondary", children: /* @__PURE__ */ jsx("div", { className: "max-w-3xl mx-auto px-6 py-3 flex items-center justify-end gap-3", children: themes2.map((t) => {
        const config = themeConfig[t.id];
        const isSelected = theme === t.id;
        return /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => {
              setTheme(t.id);
              setIsOpen(false);
            },
            className: "flex flex-col items-center gap-1 group",
            "aria-label": t.name,
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `relative w-10 h-10 rounded-full transition-transform group-hover:scale-110 ${isSelected ? "ring-2 ring-offset-2 ring-[var(--accent)]" : ""}`,
                  style: {
                    backgroundColor: config.bg,
                    borderWidth: 2,
                    borderStyle: "solid",
                    borderColor: config.accent
                  },
                  children: config.isLight ? /* @__PURE__ */ jsx(
                    "svg",
                    {
                      className: "w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                      fill: "none",
                      stroke: config.accent,
                      strokeWidth: 1.5,
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          d: "M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                        }
                      )
                    }
                  ) : /* @__PURE__ */ jsx(
                    "svg",
                    {
                      className: "w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                      fill: "none",
                      stroke: config.accent,
                      strokeWidth: 1.5,
                      viewBox: "0 0 24 24",
                      children: /* @__PURE__ */ jsx(
                        "path",
                        {
                          strokeLinecap: "round",
                          strokeLinejoin: "round",
                          d: "M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                        }
                      )
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: `text-xs transition-colors ${isSelected ? "text-accent" : "text-muted group-hover:text-primary"}`,
                  children: t.name
                }
              )
            ]
          },
          t.id
        );
      }) }) })
    }
  );
}
const appCss = "/assets/app-CQLbm2vX.css";
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
const Route$3 = createRootRoute({
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
      /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsxs(ThemeSwitcherProvider, { children: [
        /* @__PURE__ */ jsx(ThemeSwitcherPanel, {}),
        /* @__PURE__ */ jsx(Header, {}),
        /* @__PURE__ */ jsx("main", { className: "flex-1 w-full max-w-3xl mx-auto px-6 py-8", children }),
        /* @__PURE__ */ jsx(Footer, {})
      ] }) }),
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
      /* @__PURE__ */ jsx(ThemeSwitcherButton, {})
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
const $$splitNotFoundComponentImporter = () => import("./_postId-CLasFhqp.js");
const $$splitComponentImporter$2 = () => import("./_postId-F-3qpf38.js");
const Route$2 = createFileRoute("/$postId")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component"),
  notFoundComponent: lazyRouteComponent($$splitNotFoundComponentImporter, "notFoundComponent")
});
const $$splitComponentImporter$1 = () => import("./index-KXf9vgCp.js");
const Route$1 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./blog.index-CieYw1OV.js");
const Route = createFileRoute("/blog/")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const PostIdRoute = Route$2.update({
  id: "/$postId",
  path: "/$postId",
  getParentRoute: () => Route$3
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$3
});
const BlogIndexRoute = Route.update({
  id: "/blog/",
  path: "/blog/",
  getParentRoute: () => Route$3
});
const rootRouteChildren = {
  IndexRoute,
  PostIdRoute,
  BlogIndexRoute
};
const routeTree = Route$3._addFileChildren(rootRouteChildren)._addFileTypes();
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
  Route$2 as R,
  router as r
};
