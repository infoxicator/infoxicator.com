import * as React from 'react'

export type Theme = 'light' | 'dark-side' | 'terminal-green' | 'vibe-code'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  themes: { id: Theme; name: string }[]
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined)

const themes: { id: Theme; name: string }[] = [
  { id: 'light', name: 'Light' },
  { id: 'dark-side', name: 'Dark Side' },
  { id: 'terminal-green', name: 'Terminal' },
  { id: 'vibe-code', name: 'Vibe Code' },
]

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>(() => {
    if (typeof document === 'undefined') {
      return 'light'
    }

    const attrTheme = document.documentElement.getAttribute('data-theme') as Theme | null
    if (attrTheme && themes.some((t) => t.id === attrTheme)) {
      return attrTheme
    }

    const savedTheme = localStorage.getItem('theme') as Theme | null
    if (savedTheme && themes.some((t) => t.id === savedTheme)) {
      return savedTheme
    }

    return 'light'
  })

  React.useEffect(() => {
    if (typeof document === 'undefined') {
      return
    }

    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = React.useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
