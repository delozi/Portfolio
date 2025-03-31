'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Autoplay, Pagination, Navigation } from 'swiper/modules'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// Define the blog post type
export type BlogPost = {
  title: string
  slug: string
  excerpt: string
  featuredImage: string
  publishDate: string
  readTime: string
  categories: string[]
}

// Define the component props
export interface BlogCarouselProps {
  posts: BlogPost[]
  initialSlide?: number
}

// Sample placeholder posts if needed
const placeholderPosts: BlogPost[] = [
  {
    title: 'Building Modern Web Applications',
    slug: 'building-modern-web-applications',
    excerpt: 'Explore the latest techniques and frameworks for building performant web applications.',
    featuredImage: '/blog-placeholder-1.jpg',
    publishDate: '2023-07-20',
    readTime: '7 min read',
    categories: ['Web Development', 'React'],
  },
  {
    title: 'Mastering CSS Animations',
    slug: 'mastering-css-animations',
    excerpt: 'Learn how to create stunning animations using modern CSS techniques and properties.',
    featuredImage: '/blog-placeholder-2.jpg',
    publishDate: '2023-07-15',
    readTime: '5 min read',
    categories: ['CSS', 'Animation'],
  },
  {
    title: 'State Management in React',
    slug: 'state-management-in-react',
    excerpt: 'A comprehensive guide to different state management approaches in React applications.',
    featuredImage: '/blog-placeholder-3.jpg',
    publishDate: '2023-07-10',
    readTime: '8 min read',
    categories: ['React', 'State Management'],
  },
]

export default function SwiperBlogCarousel({ posts = [], initialSlide = 0 }: BlogCarouselProps) {
  const [isMounted, setIsMounted] = useState(false)
  
  // Ensure we have at least 3 posts for a good carousel experience
  const displayPosts = posts.length >= 3 ? posts : [...posts, ...placeholderPosts.slice(0, 3 - posts.length)]
  
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  if (!isMounted) {
    return null // Prevents hydration issues
  }
  
  return (
    <div className="swiper-blog-carousel relative">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        initialSlide={1}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="mySwiper"
      >
        {displayPosts.map((post, index) => (
          <SwiperSlide key={`${post.slug}-${index}`} className="py-12 px-2" style={{ width: '400px' }}>
            <div className="glass-card hover-card h-full overflow-hidden transition-all duration-300 bg-background-secondary/50 border border-white/10 backdrop-blur-sm">
              <div className="relative h-56 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-background-primary/90 to-transparent z-10"></div>
                {post.featuredImage ? (
                  <Image
                    src={post.featuredImage}
                    alt={`${post.title} preview`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-background-secondary flex items-center justify-center text-text-muted">
                    [Blog Image]
                  </div>
                )}
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
                
                <h2 className="text-xl font-display font-semibold mb-3 text-text-primary">
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
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom styling for Swiper */}
      <style jsx global>{`
        .swiper-blog-carousel {
          padding: 0rem 0;
        }
        
        .swiper-blog-carousel .swiper {
          width: 100%;
          padding-top: 0rem;
          padding-bottom: 4rem;
        }
        
        .swiper-blog-carousel .swiper-slide {
          transition: transform 0.3s ease;
          margin: 0 20px;
        }
        
        .swiper-blog-carousel .swiper-slide-active {
          transform: scale(1.05);
        }
        
        /* Pagination bullets style */
        .swiper-blog-carousel .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.2);
          opacity: 1;
          transition: all 0.3s ease;
        }
        
        .swiper-blog-carousel .swiper-pagination-bullet-active {
          background: var(--color-accent-primary);
          width: 30px;
          border-radius: 5px;
        }
        
        /* Navigation buttons style */
        .swiper-blog-carousel .swiper-button-next,
        .swiper-blog-carousel .swiper-button-prev {
          color: var(--color-accent-primary);
          background: rgba(0, 0, 0, 0.5);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          transform: translateY(-50%);
          transition: all 0.3s ease;
        }
        
        .swiper-blog-carousel .swiper-button-next:after,
        .swiper-blog-carousel .swiper-button-prev:after {
          font-size: 16px;
          font-weight: bold;
        }
        
        .swiper-blog-carousel .swiper-button-next:hover,
        .swiper-blog-carousel .swiper-button-prev:hover {
          background: var(--color-accent-primary);
          color: white;
        }
        
        @media (max-width: 768px) {
          .swiper-blog-carousel .swiper-slide {
            width: 320px;
          }
          
          .swiper-blog-carousel .swiper-button-next,
          .swiper-blog-carousel .swiper-button-prev {
            width: 30px;
            height: 30px;
          }
          
          .swiper-blog-carousel .swiper-button-next:after,
          .swiper-blog-carousel .swiper-button-prev:after {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  )
}
