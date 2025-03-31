'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Autoplay, Pagination, Navigation } from 'swiper/modules'
import { ExternalLink } from 'lucide-react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

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
  initialSlide?: number
}

export default function SwiperProjectCarousel({ projects, initialSlide = 0 }: ProjectCarouselProps) {
  const [mounted, setMounted] = useState(false)
  
  // Handle mounting to avoid hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Ensure enough projects for the carousel
  const displayProjects = projects.length < 3
    ? [...projects, ...Array(3 - projects.length).fill(null)].map((project, i) => 
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

  if (!mounted) {
    return <div className="h-80 glass-card animate-pulse rounded-2xl"></div>
  }

  return (
    <div className="swiper-project-carousel relative">
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
          dynamicBullets: true
        }}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="mySwiper"
      >
        {displayProjects.map((project, index) => (
          <SwiperSlide key={`${project.slug}-${index}`} className="py-12 px-2" style={{ width: '400px' }}>
            <div className="glass-card hover-card h-full overflow-hidden transition-all duration-300 bg-background-secondary/50 border border-white/10 backdrop-blur-sm">
              <div className="relative h-56 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-background-primary/90 to-transparent z-10"></div>
                {project.featuredImage ? (
                  <Image
                    src={project.featuredImage}
                    alt={`${project.title} preview`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 bg-background-secondary flex items-center justify-center text-text-muted">
                    [Project Image]
                  </div>
                )}
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-display font-semibold mb-3 text-text-primary">{project.title}</h3>
                <p className="text-text-secondary mb-4 flex-grow">{project.summary}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech: string, i: number) => (
                    <span 
                      key={`${tech}-${i}`} 
                      className="bg-accent-primary/20 text-accent-primary px-3 py-1 rounded-full text-xs"
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
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Custom styling for Swiper */}
      <style jsx global>{`
        .swiper-project-carousel {
          padding: 0rem 0;
        }
        
        .swiper-project-carousel .swiper {
          width: 100%;
          padding-top: 0rem;
          padding-bottom: 4rem;
        }
        
        .swiper-project-carousel .swiper-slide {
          transition: transform 0.3s ease;
        }
        
        .swiper-project-carousel .swiper-slide-active {
          transform: scale(1.05);
        }
        
        /* Pagination bullets style */
        .swiper-project-carousel .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: rgba(var(--text-muted), 0.3);
          opacity: 1;
          transition: all 0.3s ease;
        }
        
        .swiper-project-carousel .swiper-pagination-bullet-active {
          background: rgb(var(--accent-primary));
          width: 30px;
          border-radius: 5px;
        }
        
        /* Navigation buttons style */
        .swiper-project-carousel .swiper-button-next,
        .swiper-project-carousel .swiper-button-prev {
          color: rgb(var(--accent-primary));
          background: rgba(var(--background-primary), 0.7);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          transform: translateY(-50%);
          transition: all 0.3s ease;
        }
        
        .swiper-project-carousel .swiper-button-next:after,
        .swiper-project-carousel .swiper-button-prev:after {
          font-size: 16px;
          font-weight: bold;
        }
        
        .swiper-project-carousel .swiper-button-next:hover,
        .swiper-project-carousel .swiper-button-prev:hover {
          background: rgb(var(--accent-primary));
          color: white;
        }
        
        @media (max-width: 768px) {
          .swiper-project-carousel .swiper-slide {
            width: 320px;
          }
          
          .swiper-project-carousel .swiper-button-next,
          .swiper-project-carousel .swiper-button-prev {
            width: 30px;
            height: 30px;
          }
          
          .swiper-project-carousel .swiper-button-next:after,
          .swiper-project-carousel .swiper-button-prev:after {
            font-size: 14px;
          }
        }
      `}</style>
    </div>
  )
} 