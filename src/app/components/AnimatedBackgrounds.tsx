'use client'

import { useEffect, useState, useRef } from 'react'

// Falling Stars Background Component
export function FallingStarsBg({ opacity = 0.3 }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const starsContainerRef = useRef<HTMLDivElement>(null)
  const [stars, setStars] = useState<React.ReactNode[]>([])
  
  // Create a single star element
  const createStarElement = (key: number) => {
    const starColor = Math.random() > 0.5 ? 'text-yellow-300' : 'text-white'
    const leftPosition = `${Math.random() * 100}%`
    const duration = Math.random() * 4 + 8 // 8-12 seconds
    const delay = Math.random() * 5 // 0-5 seconds delay
    const size = Math.random() * 4 + 2 // 2-6px
    
    return (
      <div 
        key={key}
        className={`absolute w-${size} h-${size} ${starColor} animate-falling-star animate-pulse-glow pointer-events-none`}
        style={{
          left: leftPosition,
          top: `-20px`,
          width: `${size}px`,
          height: `${size}px`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          opacity: opacity,
        }}
      >
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 24 24" 
          fill="currentColor"
          className="pixel-diamond"
        >
          <path d="M10,2 h4 v2 h2 v2 h2 v4 h-2 v2 h-2 v2 h-4 v-2 h-2 v-2 h-2 v-4 h2 v-2 h2 z" />
        </svg>
      </div>
    )
  }
  
  // Create initial stars
  useEffect(() => {
    if (!isLoaded) {
      setIsLoaded(true)
      return
    }
    
    // Create initial stars (increase from 15 to 30)
    const initialStars = []
    for (let i = 0; i < 50; i++) {
      initialStars.push(createStarElement(i))
    }
    setStars(initialStars)
    
    // Create new stars periodically
    const starInterval = setInterval(() => {
      setStars(prev => {
        if (prev.length > 50) {
          return [...prev.slice(1), createStarElement(Date.now())]
        }
        return [...prev, createStarElement(Date.now())]
      })
    }, 500)
    
    return () => clearInterval(starInterval)
  }, [isLoaded])
  
  return (
    <div ref={starsContainerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars}
    </div>
  )
}

// Hero Section Background
export function HeroBackground() {
  const [isLoaded, setIsLoaded] = useState(false)
  
  useEffect(() => {
    setIsLoaded(true)
  }, [])
  
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background-primary via-background-primary to-background-secondary opacity-90"></div>
      
      {/* Geometric elements */}
      <div className="absolute inset-0">
        {/* White/gold geometric shapes */}
        <div className="absolute top-[10%] left-[5%] w-24 h-24 bg-white/5 rounded-lg rotate-12 blur-xl"></div>
        <div className="absolute top-[25%] left-[30%] w-16 h-16 bg-white/10 rotate-45 blur-sm"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-10"></div>
        
        {/* Animated floating shapes */}
        <div className={`absolute top-[15%] right-[35%] w-8 h-8 bg-yellow-400/20 rounded-full blur-sm transition-all duration-5000 ease-in-out ${isLoaded ? 'animate-float-slow' : ''}`}></div>
        <div className={`absolute bottom-[25%] left-[40%] w-12 h-12 bg-white/10 rounded-lg rotate-45 blur-sm transition-all duration-7000 ease-in-out ${isLoaded ? 'animate-float' : ''}`}></div>
      </div>
      
      {/* Add falling stars */}
      <FallingStarsBg opacity={0.3} />
    </div>
  )
}

// Projects Section Background
export function ProjectsBackground() {
  const [isLoaded, setIsLoaded] = useState(false)
  
  useEffect(() => {
    setIsLoaded(true)
  }, [])
  
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Light background base */}
      <div className="absolute inset-0 bg-white opacity-95"></div>
      
      {/* Subtle patterns and accents */}
      <div className="absolute inset-0">
        {/* Soft color accents */}
        <div className="absolute top-[10%] right-[10%] w-72 h-72 bg-gradient-to-r from-accent-primary/10 to-accent-secondary/10 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-[5%] left-[5%] w-96 h-96 bg-gradient-to-r from-accent-secondary/10 to-accent-primary/10 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
        
        {/* Subtle accent shapes */}
        <div className="absolute top-[30%] left-[15%] w-20 h-20 bg-accent-secondary/10 rounded-lg rotate-45 blur-xl"></div>
        <div className="absolute bottom-[40%] right-[20%] w-16 h-16 bg-accent-primary/15 rounded-full blur-md"></div>
        
        {/* Grid pattern overlay with offset */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-10" style={{ backgroundPosition: '10px 10px' }}></div>
        
        {/* Animated floating elements */}
        <div className={`absolute top-[45%] left-[25%] w-6 h-6 bg-accent-primary/15 rounded-full blur-sm ${isLoaded ? 'animate-float' : ''}`} style={{ animationDuration: '4s' }}></div>
        <div className={`absolute bottom-[35%] right-[30%] w-10 h-10 bg-accent-secondary/15 rounded-lg rotate-12 blur-sm ${isLoaded ? 'animate-float-slow' : ''}`} style={{ animationDuration: '6s' }}></div>

        {/* Subtle gradient edges */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </div>
    </div>
  )
}

// Skills Section Background
export function SkillsBackground() {
  const [isLoaded, setIsLoaded] = useState(false)
  
  useEffect(() => {
    setIsLoaded(true)
  }, [])
  
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Light gray gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100"></div>
      
      {/* Subtle particle effect */}
      <div className="absolute inset-0 bg-[url('/dot-pattern.svg')] bg-repeat opacity-20"></div>
      
      {/* Accent patterns */}
      <div className="absolute inset-0">
        {/* Circular glows */}
        <div className="absolute -top-[10%] left-[20%] w-96 h-96 bg-yellow-400/15 rounded-full blur-3xl animate-pulse-glow" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-[0%] right-[10%] w-80 h-80 bg-yellow-300/15 rounded-full blur-3xl animate-pulse-glow" style={{ animationDuration: '10s', animationDelay: '1s' }}></div>
        
        {/* Animated floating squares */}
        <div className={`absolute top-[20%] right-[25%] w-8 h-8 bg-yellow-400/15 rotate-45 blur-sm ${isLoaded ? 'animate-float-slow' : ''}`}></div>
        <div className={`absolute bottom-[30%] left-[15%] w-12 h-12 bg-yellow-400/15 rotate-12 blur-md ${isLoaded ? 'animate-float' : ''}`} style={{ animationDelay: '1s' }}></div>
        <div className={`absolute top-[60%] left-[40%] w-6 h-6 bg-yellow-300/15 rotate-45 blur-sm ${isLoaded ? 'animate-float-slow' : ''}`} style={{ animationDelay: '0.5s' }}></div>

        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-gray-100/50"></div>
      </div>
      
      {/* Add falling stars */}
      <FallingStarsBg opacity={0.3} />
    </div>
  )
}

// Blog Section Background
export function BlogBackground() {
  const [isLoaded, setIsLoaded] = useState(false)
  
  useEffect(() => {
    setIsLoaded(true)
  }, [])
  
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Dark background base */}
      <div className="absolute inset-0 bg-gradient-to-br from-background-primary to-background-secondary"></div>
      
      {/* Subtle patterns and accents */}
      <div className="absolute inset-0">
        {/* Subtle accent shapes */}
        <div className="absolute top-[40%] right-[25%] w-16 h-16 bg-accent-primary/15 rounded-full blur-xl"></div>
        <div className="absolute bottom-[35%] left-[30%] w-24 h-24 bg-accent-secondary/15 rounded-lg rotate-45 blur-xl"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-15"></div>
        
        {/* Animated floating elements */}
        <div className={`absolute top-[30%] left-[40%] w-8 h-8 bg-accent-primary/15 rounded-full blur-sm ${isLoaded ? 'animate-float' : ''}`} style={{ animationDuration: '5s' }}></div>
        <div className={`absolute bottom-[25%] right-[35%] w-10 h-10 bg-accent-secondary/15 rounded-lg rotate-12 blur-sm ${isLoaded ? 'animate-float-slow' : ''}`} style={{ animationDuration: '7s' }}></div>
      </div>
      
      {/* Add falling stars */}
      <FallingStarsBg opacity={0.3} />
    </div>
  )
}

// Contact Section Background
export function ContactBackground() {
  const [isLoaded, setIsLoaded] = useState(false)
  
  useEffect(() => {
    setIsLoaded(true)
  }, [])
  
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Gradient background with more pronounced colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-gradient-start/15 via-background-primary to-gradient-end/15"></div>
      
      {/* Animated elements */}
      <div className="absolute inset-0">
        {/* Smaller floating elements */}
        <div className={`absolute top-[30%] right-[20%] w-12 h-12 bg-white/5 rounded-lg rotate-45 blur-md ${isLoaded ? 'animate-float-slow' : ''}`}></div>
        <div className={`absolute bottom-[20%] left-[25%] w-8 h-8 bg-accent-primary/10 rounded-full blur-sm ${isLoaded ? 'animate-float' : ''}`} style={{ animationDelay: '1s' }}></div>
        
        {/* Subtle grid overlay with larger spacing */}
        <div className="absolute inset-0 bg-[url('/grid-pattern-large.svg')] bg-repeat opacity-10"></div>
        
        {/* Diagonal line accent */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-white/2 to-transparent"></div>
        </div>
      </div>
    </div>
  )
}

// Abstract Triangle Background for light sections that are now dark
export function TriangleBackground() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [triangles, setTriangles] = useState<React.ReactNode[]>([])
  
  // Configuration for triangles
  const TRIANGLE_CONFIG = {
    count: 24,
    colors: ['rgba(255, 255, 255, 0.1)', 'rgba(234, 179, 8, 0.15)', 'rgba(255, 255, 255, 0.05)', 'rgba(202, 138, 4, 0.1)'],
    sizeRange: { min: 20, max: 120 },
    opacityRange: { min: 0.05, max: 0.2 },
    animationDuration: { min: 20, max: 40 }
  }
  
  // Create abstract triangle elements
  useEffect(() => {
    if (!isLoaded) return
    
    const initialTriangles = []
    
    for (let i = 0; i < TRIANGLE_CONFIG.count; i++) {
      initialTriangles.push(createTriangleElement(i))
    }
    
    setTriangles(initialTriangles)
  }, [isLoaded])
  
  // Create a triangle element
  const createTriangleElement = (key: number) => {
    const size = Math.random() * 
      (TRIANGLE_CONFIG.sizeRange.max - TRIANGLE_CONFIG.sizeRange.min) + 
      TRIANGLE_CONFIG.sizeRange.min
      
    const opacity = Math.random() * 
      (TRIANGLE_CONFIG.opacityRange.max - TRIANGLE_CONFIG.opacityRange.min) + 
      TRIANGLE_CONFIG.opacityRange.min
    
    const color = TRIANGLE_CONFIG.colors[Math.floor(Math.random() * TRIANGLE_CONFIG.colors.length)]
    
    const posX = `${Math.random() * 100}%`
    const posY = `${Math.random() * 100}%`
    
    const rotation = Math.random() * 360
    const animDuration = Math.random() * 
      (TRIANGLE_CONFIG.animationDuration.max - TRIANGLE_CONFIG.animationDuration.min) + 
      TRIANGLE_CONFIG.animationDuration.min
      
    const delay = Math.random() * 5
    
    return (
      <div 
        key={key}
        className="absolute triangle"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: posX,
          top: posY,
          opacity,
          transform: `rotate(${rotation}deg)`,
          animation: `float ${animDuration}s ease-in-out infinite, pulse 5s ease-in-out ${delay}s infinite`,
        }}
      >
        <svg 
          width="100%" 
          height="100%" 
          viewBox="0 0 100 100" 
          fill={color}
          strokeWidth="1"
          stroke="rgba(255,255,255,0.2)"
        >
          <polygon points="50,15 100,85 0,85" />
        </svg>
      </div>
    )
  }

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Dark background base */}
      <div className="absolute inset-0 bg-background-primary opacity-95"></div>
      
      {/* Subtle patterns and accents */}
      <div className="absolute inset-0">
        {/* Triangles */}
        {triangles}
      </div>
      
      <style jsx global>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(var(--rotation));
          }
          50% {
            transform: translateY(-20px) rotate(calc(var(--rotation) + 5deg));
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: var(--opacity);
          }
          50% {
            opacity: calc(var(--opacity) * 1.5);
          }
        }
        
        .triangle {
          --rotation: 0deg;
          --opacity: 0.2;
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  )
} 