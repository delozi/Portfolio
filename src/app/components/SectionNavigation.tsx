'use client'

import { ChevronDown } from 'lucide-react'

interface SectionNavigationProps {
  nextSectionId: string
  isDarkMode?: boolean
}

export default function SectionNavigation({ nextSectionId, isDarkMode = false }: SectionNavigationProps) {
  const scrollToNextSection = () => {
    const nextSection = document.getElementById(nextSectionId)
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <button 
      onClick={scrollToNextSection}
      className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 
        ${isDarkMode 
          ? 'bg-background-secondary/50 hover:bg-accent-primary/20 border border-white/10' 
          : 'bg-white/50 hover:bg-accent-primary/20 border border-gray-200'} 
        rounded-full p-3 transition-all duration-300 animate-bounce z-20`}
      aria-label={`Scroll to ${nextSectionId} section`}
    >
      <ChevronDown className={`h-6 w-6 ${isDarkMode ? 'text-text-secondary' : 'text-gray-700'}`} />
    </button>
  )
} 