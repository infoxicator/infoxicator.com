import * as React from 'react'

export function ScrollProgressBar() {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(scrollPercent)
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()

    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1" style={{ backgroundColor: 'var(--border)' }}>
      <div
        className="h-full transition-[width] duration-75 ease-out"
        style={{ width: `${progress}%`, backgroundColor: 'var(--accent)' }}
      />
    </div>
  )
}
