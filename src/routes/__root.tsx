/// <reference types="vite/client" />
import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import * as React from 'react'
import { DefaultCatchBoundary } from '~/components/DefaultCatchBoundary'
import { NotFound } from '~/components/NotFound'
import { ThemeProvider } from '~/components/ThemeProvider'
import { ThemeSwitcherButton, ThemeSwitcherPanel, ThemeSwitcherProvider } from '~/components/ThemeSwitcher'
import appCss from '~/styles/app.css?url'
import { seo } from '~/utils/seo'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      ...seo({
        title: 'Infoxicator | Ruben Casas',
        description:
          'Personal blog and portfolio of Ruben Casas - Software Engineer, Micro Frontend enthusiast, and lifelong learner.',
      }),
    ],
    links: [
      { rel: 'stylesheet', href: appCss },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest', color: '#fffff' },
      { rel: 'icon', href: '/favicon.ico' },
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
        `,
      },
    ],
  }),
  errorComponent: (props) => {
    return (
      <RootLayout>
        <DefaultCatchBoundary {...props} />
      </RootLayout>
    )
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  )
}

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <ThemeSwitcherProvider>
            <ThemeSwitcherPanel />
            <Header />
            <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-8">
              {children}
            </main>
            <Footer />
          </ThemeSwitcherProvider>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}

function Header() {
  return (
    <header className="w-full border-b border-theme">
      <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-lg font-semibold text-primary hover:text-accent transition-colors">
          ~/infoxicator
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm text-muted hover:text-primary transition-colors"
            activeProps={{ className: 'text-sm text-accent' }}
            activeOptions={{ exact: true }}
          >
            home
          </Link>
          <Link
            to="/blog"
            className="text-sm text-muted hover:text-primary transition-colors"
            activeProps={{ className: 'text-sm text-accent' }}
          >
            blog
          </Link>
          <ThemeSwitcherButton />
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="w-full border-t border-theme">
      <div className="max-w-3xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
        <span>&copy; {new Date().getFullYear()} Ruben Casas</span>
        <div className="flex items-center gap-4">
          <a
            href="https://twitter.com/infoxicator"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            twitter
          </a>
          <a
            href="https://github.com/infoxicator"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            github
          </a>
          <a
            href="https://linkedin.com/in/ACoAABJb0mgBc6L_x1w-l_cGNMY4VpnDPZ2vEQQ"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            linkedin
          </a>
        </div>
      </div>
    </footer>
  )
}
