'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'

// Project type definition
type Project = {
  title: string
  slug: string
  summary: string
  projectType: string
  technologies: string[]
  featuredImage: string
  externalUrl?: string
}

interface ProjectCarouselProps {
  projects: Project[]
}

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const slideRef = useRef<HTMLDivElement>(null)
  const visibleProjects = 3

  // Ensure the projects array has at least visibleProjects items
  const displayProjects = projects.length < visibleProjects
    ? [...projects, ...Array(visibleProjects - projects.length).fill(null)].map((project, i) => 
        project || {
          title: `Placeholder Project ${i + 1}`,
          slug: `placeholder-${i + 1}`,
          summary: 'This is a placeholder for a future project.',
          projectType: 'web',
          technologies: ['Coming Soon'],
          featuredImage: '',
          externalUrl: '#'
        }
      )
    : projects

  const maxPage = Math.ceil(displayProjects.length / visibleProjects) - 1
  
  const goToNext = () => {
    if (isAnimating || currentIndex >= maxPage) return
    setIsAnimating(true)
    setCurrentIndex(prev => prev + 1)
  }

  const goToPrev = () => {
    if (isAnimating || currentIndex <= 0) return
    setIsAnimating(true)
    setCurrentIndex(prev => prev - 1)
  }

  const goToPage = (index: number) => {
    if (isAnimating || index === currentIndex) return
    setIsAnimating(true)
    setCurrentIndex(index)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [currentIndex])

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < maxPage) {
        goToNext()
      } else {
        setCurrentIndex(0)
        setIsAnimating(true)
      }
    }, 7000)

    return () => clearInterval(interval)
  }, [currentIndex, maxPage])

  const visibleProjectsSlice = displayProjects.slice(
    currentIndex * visibleProjects, 
    (currentIndex * visibleProjects) + visibleProjects
  )

  return (
    <div className="relative">
      {/* Main carousel */}
      <div 
        ref={slideRef}
        className="relative overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleProjectsSlice.map((project) => (
            <div 
              key={project.slug} 
              className="glass-card hover-card overflow-hidden flex flex-col h-full"
            >
              <div className="h-48 bg-background-secondary relative">
                <div className="absolute inset-0 flex items-center justify-center text-text-muted">
                  [Project Image]
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-display font-semibold mb-3">{project.title}</h3>
                <p className="text-text-secondary mb-4 flex-grow">{project.summary}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech: string) => (
                    <span 
                      key={tech} 
                      className="bg-background-tertiary px-3 py-1 rounded-full text-xs text-text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                <a 
                  href={project.externalUrl || `#${project.slug}`} 
                  target={project.externalUrl ? "_blank" : "_self"}
                  rel={project.externalUrl ? "noopener noreferrer" : ""}
                  className="btn-primary inline-flex items-center justify-center gap-2"
                >
                  View Project
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      {currentIndex > 0 && (
        <button 
          className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-background-primary/80 hover:bg-background-primary p-2 rounded-full text-text-primary z-10"
          onClick={goToPrev}
          aria-label="Previous projects"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}
      
      {currentIndex < maxPage && (
        <button 
          className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-background-primary/80 hover:bg-background-primary p-2 rounded-full text-text-primary z-10"
          onClick={goToNext}
          aria-label="Next projects"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}

      {/* Indicators */}
      {maxPage > 0 && (
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {Array.from({ length: maxPage + 1 }).map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-accent-primary w-6' 
                  : 'bg-text-muted/30 hover:bg-text-muted/50'
              }`}
              onClick={() => goToPage(index)}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
} 