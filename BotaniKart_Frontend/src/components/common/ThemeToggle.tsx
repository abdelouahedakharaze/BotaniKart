import React from 'react'
import { useTheme } from '../../hooks/useTheme'
import { Button } from './Button'

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button onClick={toggleTheme} variant="secondary" size="small">
      {theme === 'light' ? '🌙' : '☀️'}
    </Button>
  )
}

export default ThemeToggle