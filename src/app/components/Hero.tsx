'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Github, Instagram, Linkedin, Twitter } from 'lucide-react'

// Company logos for the showcase
const companyLogos = [
  { name: 'Tyson Foods', logo: '/Tyson.png' },
  { name: 'Monogatari Media', logo: '/Monogatari.png' },
]

// Create a truly infinite loop by duplicating the logos enough times
// We need to duplicate the array so that when the animation repeats, it's seamless
const repeatedCompanyLogos = [...companyLogos, ...companyLogos, ...companyLogos, ...companyLogos, ...companyLogos, ...companyLogos]

// Animation speeds in seconds (for configuration)
const ANIMATION_SPEEDS = {
  nyancatSpeed: 1, // Default speed multiplier (1 = normal, 0.5 = faster, 2 = slower)
  fallingStarsDuration: { min: 8, max: 12 }, // Duration range in seconds
  fallingStarsDelay: { min: 0, max: 15 }, // Delay range in seconds
  totalStars: 20 // Number of stars to display at once
}

export default function Hero() {
  // Loading state for animation
  const [isLoaded, setIsLoaded] = useState(false)
  const starsContainerRef = useRef<HTMLDivElement>(null)
  const [stars, setStars] = useState<React.ReactNode[]>([])
  
  // Initialize stars and add a new star when one finishes
  useEffect(() => {
    if (!isLoaded) return
    
    // Initial stars
    createInitialStars()
    
    // Setup observer to detect when stars are no longer visible
    // and create new stars to maintain 5-10 stars on screen
    const starObserver = new MutationObserver((mutations) => {
      const currentStarCount = starsContainerRef.current?.children.length || 0
      if (currentStarCount < 5) {
        // Add more stars to reach minimum
        const starsToAdd = Math.max(5, Math.floor(Math.random() * 5) + 5) - currentStarCount
        for (let i = 0; i < starsToAdd; i++) {
          createStar()
        }
      }
    })
    
    if (starsContainerRef.current) {
      starObserver.observe(starsContainerRef.current, { 
        childList: true,
        subtree: true
      })
    }
    
    return () => {
      starObserver.disconnect()
    }
  }, [isLoaded])
  
  // Create initial stars
  const createInitialStars = () => {
    const initialStarCount = Math.floor(Math.random() * 5) + 5 // 5-10 stars
    const initialStars = []
    
    for (let i = 0; i < initialStarCount; i++) {
      initialStars.push(createStarElement(i))
    }
    
    setStars(initialStars)
  }
  
  // Create a single star
  const createStar = () => {
    const newStar = createStarElement(Date.now())
    setStars(prev => [...prev, newStar])
    
    // Remove star when animation completes
    setTimeout(() => {
      setStars(prev => {
        // Remove the first star to maintain performance
        if (prev.length > ANIMATION_SPEEDS.totalStars) {
          return prev.slice(1)
        }
        return prev
      })
    }, ANIMATION_SPEEDS.fallingStarsDuration.max * 1000)
  }
  
  // Create a star element
  const createStarElement = (key: number) => {
    // Generate random color (gold or white)
    const starColor = Math.random() > 0.5 ? 'text-yellow-300' : 'text-white'
    const leftPosition = `${Math.random() * 100}%`
    const duration = Math.random() * 
      (ANIMATION_SPEEDS.fallingStarsDuration.max - ANIMATION_SPEEDS.fallingStarsDuration.min) + 
      ANIMATION_SPEEDS.fallingStarsDuration.min
    const delay = Math.random() * 
      (ANIMATION_SPEEDS.fallingStarsDelay.max - ANIMATION_SPEEDS.fallingStarsDelay.min)
    
    return (
      <div 
        key={key}
        className={`absolute w-6 h-6 ${starColor} animate-falling-star animate-pulse-glow`}
        style={{
          left: leftPosition,
          top: `-50px`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        }}
      >
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 24 24" 
          fill="currentColor"
          className="pixel-diamond"
        >
          <use href="/pixel-diamond.svg#diamond" />
          <path d="M10,2 h4 v2 h2 v2 h2 v4 h-2 v2 h-2 v2 h-4 v-2 h-2 v-2 h-2 v-4 h2 v-2 h2 z" />
        </svg>
      </div>
    )
  }

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center py-12 sm:py-16 md:py-24 mt-4 sm:mt-8 md:mt-12 relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="flex flex-col justify-center h-full lg:pl-4 xl:pl-8 2xl:pl-12">
          {/* Animated content */}
          <h1 
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-tight mb-3 md:mb-4 ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`}
            style={{ animationDelay: '150ms' }}
          >
            <span className="text-text-primary">Louis </span>
            <span className="text-text-primary">DeLozier's </span>
            <span className="gradient-text"><br/>Digital </span>
            <span className="gradient-text">Portfolio </span>
          </h1>
          
          <h2 
            className={`text-lg sm:text-xl md:text-2xl text-text-secondary font-medium mb-3 md:mb-6 ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`}
            style={{ animationDelay: '300ms' }}
          >
            Creating modern digital experiences
          </h2>
          
          <p
            className={`text-text-secondary max-w-2xl mb-6 md:mb-8 text-base md:text-lg ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`}
            style={{ animationDelay: '450ms' }}
          >
           I develop digital solutions that connect business goals with technical implementation. Focused on creating applications that deliver measurable results while enhancing user experience and organizational efficiency.
          </p>

          {/* CTA buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-3 md:gap-4 mb-8 md:mb-4 ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`}
            style={{ animationDelay: '600ms' }}
          >
            <button
              onClick={() => {
                const projectsSection = document.getElementById('projects')
                if (projectsSection) {
                  const headerOffset = 80
                  const elementPosition = projectsSection.getBoundingClientRect().top
                  const offsetPosition = elementPosition + window.scrollY - headerOffset
                  
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  })
                }
              }}
              className="btn-primary flex items-center justify-center gap-2 min-w-[160px] sm:min-w-[180px] py-3 md:py-4"
            >
              View My Work <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => {
                const contactSection = document.getElementById('contact')
                if (contactSection) {
                  const headerOffset = 80
                  const elementPosition = contactSection.getBoundingClientRect().top
                  const offsetPosition = elementPosition + window.scrollY - headerOffset
                  
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  })
                }
              }}
              className="btn-secondary flex items-center justify-center gap-2 min-w-[160px] sm:min-w-[180px] py-3 md:py-4"
            >
              Get In Touch
            </button>
          </div>

          {/* Social links */}
          <div
            className={`flex gap-4 ${isLoaded ? 'animate-slide-up' : 'opacity-0'}`}
            style={{ animationDelay: '750ms' }}
          >
            <a
              href="https://github.com/delozi"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent-primary transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="h-5 w-5 md:h-6 md:w-6" />
            </a>
            <a
              href="https://linkedin.com/in/louis-delozier"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent-primary transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="h-5 w-5 md:h-6 md:w-6" />
            </a>
            <a
              href="https://www.instagram.com/louisdelozier"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-accent-primary transition-colors"
              aria-label="Instagram Profile"
            >
              <Instagram className="h-5 w-5 md:h-6 md:w-6" />
            </a>
          </div>
        </div>
        
        <div className={`lg:pr-4 xl:pr-8 2xl:pr-12 ${isLoaded ? 'animate-fade-in animate-float' : 'opacity-0'}`} style={{ animationDelay: '900ms' }}>
          {/* Nyan Cat Animation */}
          <div className="relative aspect-[16/10] max-w-lg mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 rounded-full blur-3xl"></div>
            <div>
              {/* Nyan Cat container with stars */}
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Container for falling stars */}
                <div ref={starsContainerRef} className="absolute inset-0 overflow-hidden">
                  {stars}
                </div>
                
                {/* Nyan Cat - centered vertically */}
                <div className="relative w-96 h-64 flex items-center justify-center">
                  <Image 
                    src="/nyancat.gif" 
                    alt="Nyan Cat" 
                    width={400}
                    height={200}
                    className="object-contain"
                    style={{
                      animationDuration: `${ANIMATION_SPEEDS.nyancatSpeed}s`
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Company logo showcase - "Employed by" */}
      <div className={`mt-12 md:mt-16 px-4 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '1000ms' }}>
        <p className="text-text-secondary text-center text-sm mb-6">Employed by</p>
        
        {/* Company icons infinite scroll */}
        <div className="w-full overflow-hidden">
          <div className="flex animate-scroll-x">
            {repeatedCompanyLogos.map((company, index) => (
              <div 
                key={`${company.name}-${index}`} 
                className="flex-none w-32 sm:w-40 mx-4 sm:mx-8"
              >
                <div className="h-24 w-24 sm:h-32 sm:w-32 flex items-center justify-center transition-colors duration-300 p-4">
                  <img 
                    src={company.logo} 
                    alt={`${company.name} logo`} 
                    className="max-w-full max-h-full object-contain grayscale" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Custom styles */}
      <style jsx global>{`
        .pixel-diamond {
          image-rendering: pixelated;
          filter: drop-shadow(0 0 8px currentColor);
        }
        
        @keyframes scroll-x {
          0% {
            transform: translateX(0);
          }
          100% {
            /* Move exactly the width of the first set of logos */
            transform: translateX(calc(-100% / ${companyLogos.length * 2}));
          }
        }
        
        .animate-scroll-x {
          /* Slow it down a bit for smoother transition */
          animation: scroll-x 20s linear infinite;
          /* Double the width to ensure there's always content visible */
          width: calc(200% + 2rem);
          display: flex;
        }
      `}</style>
    </div>
  )
}