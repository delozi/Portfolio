'use client'

import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

const SECTION_IDS = [
  'projects',
  'experience',
  'skills',
  'certifications',
  'education',
  'blog',
  'contact'
]

export default function FixedNavArrow() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [scrollY, setScrollY] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      
      // Determine which section we're currently in
      const sections = SECTION_IDS.map(id => {
        const element = document.getElementById(id)
        if (!element) return { id, top: 0, bottom: 0 }
        
        const rect = element.getBoundingClientRect()
        return {
          id,
          top: rect.top + window.scrollY - 100, // Reduced offset for better accuracy
          bottom: rect.bottom + window.scrollY,
        }
      })
      
      // Find the current section
      const currentIndex = sections.findIndex((section, index) => {
        const nextSection = sections[index + 1]
        
        // If we're before the first section
        if (index === 0 && window.scrollY < section.top) {
          return true
        }
        
        // If we're between this section and the next
        if (nextSection) {
          return window.scrollY >= section.top && window.scrollY < nextSection.top
        }
        
        // If we're in the last section
        return window.scrollY >= section.top
      })
      
      if (currentIndex !== -1) {
        setCurrentSection(currentIndex)
      }
      
      // Hide arrow at the bottom of the page
      const bottomOfPage = document.body.scrollHeight - window.innerHeight - 100
      setIsVisible(window.scrollY < bottomOfPage)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const scrollToNextSection = () => {
    setIsScrolling(true)
    
    // Get all sections
    const sections = SECTION_IDS.map(id => {
      const element = document.getElementById(id)
      if (!element) return null
      return {
        id,
        element,
        top: element.getBoundingClientRect().top + window.scrollY
      }
    }).filter(Boolean)

    // Find the next section to scroll to
    let targetSection
    
    // If we're at the top, always scroll to projects first
    if (window.scrollY < 100) {
      targetSection = sections.find(section => section?.id === 'projects')
    } else {
      // Find the first section that's below our current scroll position
      targetSection = sections.find(section => 
        section?.top > window.scrollY + 100
      )
      
      // If no section found (we're at the bottom), scroll to the first section
      if (!targetSection && sections.length > 0) {
        targetSection = sections[0]
      }
    }
    
    // Scroll to the target section
    if (targetSection?.element) {
      const headerOffset = 80
      const elementPosition = targetSection.element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - headerOffset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      
      // Reset scrolling state after animation
      setTimeout(() => {
        setIsScrolling(false)
      }, 1000)
    }
  }
  
  // Determine if we're over a dark or light section
  const isDarkSection = () => {
    // Simple logic: odd sections are dark, even are light, hero is dark
    if (scrollY < 100) return true // Hero
    if (currentSection % 2 === 0) return true // Dark sections
    return false // Light sections
  }
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (!isScrolling) {
      scrollToNextSection()
    }
  }
  
  if (!isVisible) return null
  
  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-8 right-8 z-50 p-3 rounded-full bg-background-secondary/80 backdrop-blur-sm border border-white/10 transition-all duration-300 
        hover:bg-background-secondary hover:border-accent-primary/50 hover:shadow-[0_0_15px_rgba(234,179,8,0.3)]
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
        ${isScrolling ? 'scale-90' : 'scale-100'}`}
      style={{ cursor: 'pointer' }}
      aria-label="Scroll to next section"
    >
      <ChevronDown className="w-6 h-6 text-accent-primary" />
    </button>
  )
} 