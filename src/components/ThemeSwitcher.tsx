import * as React from 'react'
import { useTheme } from './ThemeProvider'

export function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme()
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const currentTheme = themes.find((t) => t.id === theme)

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm bg-secondary rounded border border-theme hover:bg-tertiary transition-colors"
        aria-label="Select theme"
      >
        <ThemeIcon theme={theme} />
        <span className="hidden sm:inline">{currentTheme?.name}</span>
        <svg
          className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-secondary rounded border border-theme shadow-lg z-50">
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTheme(t.id)
                setIsOpen(false)
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-tertiary transition-colors first:rounded-t last:rounded-b ${
                theme === t.id ? 'text-accent' : 'text-primary'
              }`}
            >
              <ThemeIcon theme={t.id} />
              {t.name}
              {theme === t.id && (
                <svg className="w-3 h-3 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function ThemeIcon({ theme }: { theme: string }) {
  const colors: Record<string, string> = {
    light: '#f8f9fa',
    dark: '#1a1a2e',
    dracula: '#bd93f9',
    nord: '#88c0d0',
    monokai: '#f92672',
  }

  return (
    <span
      className="w-3 h-3 rounded-full border border-theme"
      style={{ backgroundColor: colors[theme] || colors.light }}
    />
  )
}
