'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, Calendar, Clock, ArrowRight } from 'lucide-react'

// Blog post type definition
type BlogPost = {
  title: string
  slug: string
  excerpt: string
  featuredImage: string
  publishDate: string
  readTime: string
  categories: string[]
}

interface BlogCarouselProps {
  posts: BlogPost[]
}

export default function BlogCarousel({ posts }: BlogCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const slideRef = useRef<HTMLDivElement>(null)
  const visiblePosts = 3

  // Ensure the posts array has at least visiblePosts items
  const displayPosts = posts.length < visiblePosts
    ? [...posts, ...Array(visiblePosts - posts.length).fill(null)].map((post, i) => 
        post || {
          title: `Placeholder Post ${i + 1}`,
          slug: `placeholder-${i + 1}`,
          excerpt: 'This is a placeholder for a future blog post.',
          featuredImage: '',
          publishDate: 'Coming soon',
          readTime: '0 min read',
          categories: ['Upcoming']
        }
      )
    : posts

  const maxPage = Math.ceil(displayPosts.length / visiblePosts) - 1
  
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

  const visiblePostsSlice = displayPosts.slice(currentIndex * visiblePosts, (currentIndex * visiblePosts) + visiblePosts)

  return (
    <div className="relative">
      {/* Main carousel */}
      <div 
        ref={slideRef}
        className="relative overflow-hidden"
      >
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)`, display: 'grid' }}
        >
          {visiblePostsSlice.map((post) => (
            <article key={post.slug} className="glass-card hover-card overflow-hidden flex flex-col h-full">
              <div className="h-48 bg-background-secondary relative">
                <div className="absolute inset-0 flex items-center justify-center text-text-muted">
                  [Blog Image]
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.categories.slice(0, 1).map((category: string, index: number) => (
                    <span
                      key={index}
                      className="bg-accent-primary/20 text-accent-primary text-xs px-2 py-1 rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                  <div className="flex items-center text-text-muted text-xs">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{post.publishDate}</span>
                  </div>
                </div>
                
                <h2 className="text-xl font-display font-semibold mb-3">
                  <Link href={`/blog/${post.slug}`} className="hover:text-accent-primary transition-colors">
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-text-secondary mb-4 flex-grow">{post.excerpt}</p>
                
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center text-text-muted text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                  
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-accent-primary hover:text-accent-secondary font-medium inline-flex items-center text-sm"
                  >
                    Read More
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Controls */}
      {currentIndex > 0 && (
        <button 
          className="absolute top-1/2 -left-4 transform -translate-y-1/2 bg-background-primary/80 hover:bg-background-primary p-2 rounded-full text-text-primary z-10"
          onClick={goToPrev}
          aria-label="Previous posts"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}
      
      {currentIndex < maxPage && (
        <button 
          className="absolute top-1/2 -right-4 transform -translate-y-1/2 bg-background-primary/80 hover:bg-background-primary p-2 rounded-full text-text-primary z-10"
          onClick={goToNext}
          aria-label="Next posts"
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