'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, FolderKanban, BookOpen, Mail, Sparkles } from 'lucide-react'
import { useAnimation } from '../context/AnimationContext'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { animationsEnabled, toggleAnimations } = useAnimation()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Function to scroll to a section
  const scrollToSection = (id: string) => {
    closeMenu()
    
    // Check if we're on a different page
    if (!window.location.pathname.startsWith('/blog')) {
      const element = document.getElementById(id)
      if (element) {
        const headerOffset = 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.scrollY - headerOffset
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    } else {
      // If on blog page, navigate to homepage with hash
      window.location.href = `/#${id}`
    }
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-background-primary/90 shadow-lg backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-xl sm:text-2xl font-display font-bold">
          <span className="gradient-text">Louis </span>
          <span className="text-text-primary">DeLozier</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection('projects')}
            className="text-text-primary hover:text-accent-primary transition-colors cursor-pointer flex items-center gap-2"
          >
            <FolderKanban className="h-5 w-5" />
            Projects
          </button>
          
          <Link 
            href="/blog"
            className="text-text-primary hover:text-accent-primary transition-colors flex items-center gap-2"
          >
            <BookOpen className="h-5 w-5" />
            Blog
          </Link>
          
          <button
            onClick={() => scrollToSection('contact')}
            className="text-text-primary hover:text-accent-primary transition-colors cursor-pointer flex items-center gap-2"
          >
            <Mail className="h-5 w-5" />
            Contact
          </button>

          {/* Animation Toggle Button */}
          <button
            onClick={toggleAnimations}
            className={`transition-colors cursor-pointer flex items-center gap-2 ${animationsEnabled ? 'text-accent-primary' : 'text-text-primary/50'}`}
            aria-label={animationsEnabled ? "Disable animations" : "Enable animations"}
          >
            <Sparkles className="h-5 w-5" />
          </button>
        </nav>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-text-primary"
          onClick={toggleMenu}
          aria-label="Toggle mobile menu"
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 top-[72px] z-40 bg-background-primary/95 backdrop-blur-md animate-fade-in">
            <nav className="flex flex-col items-center justify-center h-full space-y-8 p-4">
              <Link
                href="/"
                className="text-2xl font-medium text-text-primary hover:text-accent-primary transition-colors flex items-center gap-3"
                onClick={closeMenu}
              >
                Home
              </Link>
              <button
                onClick={() => scrollToSection('projects')}
                className="text-2xl font-medium text-text-primary hover:text-accent-primary transition-colors cursor-pointer bg-transparent border-none flex items-center gap-3"
              >
                <FolderKanban className="h-6 w-6" />
                Projects
              </button>
              <Link
                href="/blog"
                className="text-2xl font-medium text-text-primary hover:text-accent-primary transition-colors flex items-center gap-3"
                onClick={closeMenu}
              >
                <BookOpen className="h-6 w-6" />
                Blog
              </Link>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-2xl font-medium text-text-primary hover:text-accent-primary transition-colors cursor-pointer bg-transparent border-none flex items-center gap-3"
              >
                <Mail className="h-6 w-6" />
                Contact
              </button>
              {/* Mobile Animation Toggle Button */}
              <button
                onClick={toggleAnimations}
                className={`text-2xl font-medium transition-colors cursor-pointer bg-transparent border-none flex items-center gap-3 ${animationsEnabled ? 'text-accent-primary' : 'text-text-primary/50'}`}
                aria-label={animationsEnabled ? "Disable animations" : "Enable animations"}
              >
                <Sparkles className="h-6 w-6" />
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
} 