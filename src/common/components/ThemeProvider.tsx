import React from 'react'

type Props = {
  children: React.ReactNode
}

export function ThemeProvider({ children }: Props) {
  React.useEffect(() => {
    const saved = localStorage.getItem('ui-theme')
    const root = document.documentElement
    if (saved === 'dark') root.classList.add('dark')
    else if (saved === 'light') root.classList.remove('dark')
    else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      root.classList.toggle('dark', prefersDark)
      localStorage.setItem('ui-theme', 'system')
    }
  }, [])
  return <>{children}</>
}
