import * as React from 'react'
import { useTheme, Theme } from './ThemeProvider'

const themeConfig: Record<Theme, { bg: string; accent: string; isLight: boolean }> = {
  light: { bg: '#ffffff', accent: '#0066cc', isLight: true },
  'dark-side': { bg: '#040405', accent: '#FF2A2A', isLight: false },
  'terminal-green': { bg: '#020806', accent: '#00FF9C', isLight: false },
  'vibe-code': { bg: '#0C0616', accent: '#6E1AE9', isLight: false },
}

interface ThemeSwitcherContextType {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  toggle: () => void
}

const ThemeSwitcherContext = React.createContext<ThemeSwitcherContextType | undefined>(undefined)

export function ThemeSwitcherProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const toggle = React.useCallback(() => setIsOpen((prev) => !prev), [])

  return (
    <ThemeSwitcherContext.Provider value={{ isOpen, setIsOpen, toggle }}>
      {children}
    </ThemeSwitcherContext.Provider>
  )
}

function useThemeSwitcher() {
  const context = React.useContext(ThemeSwitcherContext)
  if (!context) {
    throw new Error('useThemeSwitcher must be used within ThemeSwitcherProvider')
  }
  return context
}

export function ThemeSwitcherButton() {
  const { toggle } = useThemeSwitcher()

  return (
    <button
      onClick={toggle}
      className="flex items-center justify-center w-9 h-9 bg-secondary rounded hover:bg-tertiary transition-colors"
      aria-label="Select theme"
    >
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
        />
      </svg>
    </button>
  )
}

export function ThemeSwitcherPanel() {
  const { theme, setTheme, themes } = useTheme()
  const { isOpen, setIsOpen } = useThemeSwitcher()
  const panelRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        const button = (event.target as Element).closest('[aria-label="Select theme"]')
        if (!button) {
          setIsOpen(false)
        }
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, setIsOpen])

  return (
    <div
      ref={panelRef}
      className="w-full overflow-hidden transition-all duration-300 ease-in-out"
      style={{ maxHeight: isOpen ? '100px' : '0px' }}
    >
      <div className="w-full border-b border-theme bg-secondary">
        <div className="max-w-3xl mx-auto px-6 py-3 flex items-center justify-end gap-3">
          {themes.map((t) => {
            const config = themeConfig[t.id]
            const isSelected = theme === t.id
            return (
              <button
                key={t.id}
                onClick={() => {
                  setTheme(t.id)
                  setIsOpen(false)
                }}
                className="flex flex-col items-center gap-1 group"
                aria-label={t.name}
              >
                <div
                  className={`relative w-10 h-10 rounded-full transition-transform group-hover:scale-110 ${
                    isSelected ? 'ring-2 ring-offset-2 ring-[var(--accent)]' : ''
                  }`}
                  style={{
                    backgroundColor: config.bg,
                    borderWidth: 2,
                    borderStyle: 'solid',
                    borderColor: config.accent,
                  }}
                >
                  {config.isLight ? (
                    <svg
                      className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      fill="none"
                      stroke={config.accent}
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      fill="none"
                      stroke={config.accent}
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
                      />
                    </svg>
                  )}
                </div>
                <span
                  className={`text-xs transition-colors ${
                    isSelected ? 'text-accent' : 'text-muted group-hover:text-primary'
                  }`}
                >
                  {t.name}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
