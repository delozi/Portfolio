import dynamic from 'next/dynamic'
import Image from 'next/image'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero'
import CompanyLogo from './components/CompanyLogo'
import SchoolLogo from './components/SchoolLogo'
import CertificateIcon from './components/CertificateIcon'
import FixedNavArrow from './components/FixedNavArrow'
import { HeroBackground, ProjectsBackground, SkillsBackground, BlogBackground, ContactBackground, TriangleBackground } from './components/AnimatedBackgrounds'
import Link from 'next/link'

// Lazy load components that are below the fold
const SwiperProjectCarousel = dynamic(() => import('./components/SwiperProjectCarousel'), {
  loading: () => <div className="h-96 flex items-center justify-center"><p>Loading projects...</p></div>
})

const SwiperBlogCarousel = dynamic(() => import('./components/SwiperBlogCarousel'), {
  loading: () => <div className="h-96 flex items-center justify-center"><p>Loading articles...</p></div>
})

const ContactForm = dynamic(() => import('./components/ContactForm'), {
  loading: () => <div className="h-96 flex items-center justify-center"><p>Loading contact form...</p></div>
})

// Define blog post type
interface BlogPost {
  title: string
  slug: string
  excerpt: string
  featuredImage: string
  publishDate: string
  readTime: string
  categories: string[]
}

// Blog posts data with type
const blogPosts: BlogPost[] = []

// Placeholder for data fetching (would come from Payload CMS)
const featuredProjects = [
  {
    title: 'Tyson Storybook',
    slug: 'tyson-storybook',
    summary: 'Contributed to Storybook reusable component library with 25+ UI elements',
    projectType: 'web',
    technologies: ['React', 'Storybook', 'ElasticSearch', 'Figma'],
    featuredImage: '/tysonstorybook.png',
    externalUrl: 'https://storybook.tyson.com',
  },
  {
    title: 'Tyson Tastemakers',
    slug: 'tyson-tastemakers',
    summary: 'Developed responsive showcase for Tyson\'s premium meal kit line and dinner experiences through Amazon Fresh partnership.',
    projectType: 'web',
    technologies: ['React', 'Gatsby', 'PWA', 'Schema.org'],
    featuredImage: '/tysontastemakers.png',
    externalUrl: 'https://tysontastemakers.com',
  },
  {
    title: 'Monogatari Novels',
    slug: 'monogatari-novels',
    summary: 'Developed Spanish-language publishing e-commerce using Next.js and Strapi headless CMS, later migrated to WordPress/Astra.',
    projectType: 'web',
    technologies: ['Next.js', 'Strapi', 'WordPress', 'Astra'],
    featuredImage: '/MonogatariNovels.jpg',
    externalUrl: 'https://monogatari-novels.com',
  },
]

// Experience data
const experienceData = [
  {
    company: 'Monogatari Media Editorial',
    logo: '/Monogatari.png',
    location: 'United States',
    position: 'Software Engineer (Internship)',
    period: 'August 2021-Present'
  },
  {
    company: 'Tyson Foods',
    logo: '/Tyson.png',
    location: 'United States',
    position: 'Mobile Applications Engineer (Internship)',
    period: 'July 2020-July 2021'
  },
  {
    company: 'Tyson Foods',
    logo: '/Tyson.png',
    location: 'United States',
    position: 'Ecommerce Analyst (Internship)',
    period: 'August 2019-June 2020'
  },
  {
    company: 'Tyson Foods',
    logo: '/Tyson.png',
    location: 'United States',
    position: 'Frontend Developer (Internship)',
    period: 'June 2018-July 2019'
  }
]

// Skills data
const skillsData = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'GraphQL', 'MongoDB', 'PostgreSQL',
  'React Native', 'Flutter', 'Redux', 'Firebase', 'AWS', 'CI/CD', 'Tailwind CSS', 'Responsive Design'
]

// Education data
const educationData = [
  {
    degree: 'Bachelor of Science in Computer Science',
    institution: 'Western Governors University',
    logo: '/wgu.png',
    location: 'United States',
    period: 'Expected: June 2026'
  },
  {
    degree: 'Bachelor of Business Administration',
    institution: 'Southeast University (东南大学)',
    logo: '/Southeast-University.png',
    location: 'Nanjing, China',
    period: 'Expected: June 2026'
  }
]

// Certifications data
const certificationData = [
  {
    title: 'ITIL 4 Foundation - IT Service Management Certification',
    description: 'Business certification in service value systems, incident management, change control processes, and IT-business alignment.'
  },
  {
    title: 'Linux Professional Institute - Linux Essentials',
    description: 'Foundation certification in command-line operations, file navigation, and package management across Linux distributions.'
  },
  {
    title: 'Microsoft Office Specialist',
    description: 'Certifications for Microsoft Word, PowerPoint, Excel, and Access. Skills in formatting, data visualization (similar to Tableau and Power BI), data analysis, and automated reporting.'
  }
]

// Group Tyson Foods positions
const groupedExperience = experienceData.reduce((acc, job) => {
  if (!acc[job.company]) {
    acc[job.company] = [];
  }
  acc[job.company].push(job);
  return acc;
}, {} as Record<string, typeof experienceData>);

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Header />
      <main className="flex-grow perspective-1000">
        {/* Hero Section - DARK */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <HeroBackground />
          <Hero />
        </section>

        {/* Projects Section - DARK */}
        <section id="projects" className="relative py-24 scroll-mt-24 overflow-hidden">
          <BlogBackground />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col items-center mb-6">
              <h2 className="section-heading gradient-text">Featured Projects</h2>
              <p className="text-text-secondary text-center max-w-2xl">
                A selection of my recent work. These projects showcase my skills and experience.
              </p>
            </div>

            <div className="max-w-6xl mx-auto mb-16">
              <SwiperProjectCarousel projects={featuredProjects} initialSlide={1} />
            </div>
          </div>
        </section>

        {/* Experience Section - LIGHT to DARK */}
        <section id="experience" className="relative py-24 scroll-mt-24 overflow-hidden bg-background-primary">
          <TriangleBackground />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col items-center mb-6">
              <h2 className="section-heading gradient-text">Professional Experience</h2>
              <p className="text-text-secondary text-center max-w-2xl">
                My work history and accomplishments in the tech industry.
              </p>
            </div>

            <div className="max-w-5xl mx-auto space-y-12">
              {Object.entries(groupedExperience).map(([company, jobs]) => (
                <div key={company} className="flex flex-col md:flex-row gap-8">
                  {/* Company logo placeholder - only once per company */}
                  <div className="flex-shrink-0 md:w-32 flex justify-center">
                    <Image 
                      src={jobs[0].logo} 
                      alt={`${company} logo`} 
                      className="max-w-full max-h-full object-contain grayscale" 
                      loading="lazy"
                      width={128}
                      height={128}
                    />
                  </div>
                  
                  {/* Jobs at this company */}
                  <div className="flex-grow space-y-6">
                    {jobs.map((job, index) => (
                      <div 
                        key={`${job.position}-${index}`} 
                        className="glass-card p-6 sm:p-8 bg-background-secondary/50 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:scale-[1.02] hover:border-yellow-600/30"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                          <div>
                            <h3 className="text-xl font-display font-semibold text-text-primary">{job.position}</h3>
                            <p className="text-accent-primary font-medium">
                              {company} • {job.location}
                            </p>
                          </div>
                          <span className="text-text-secondary text-sm whitespace-nowrap">{job.period}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications Section - LIGHT to DARK */}
        <section id="certifications" className="relative py-24 scroll-mt-24 overflow-hidden bg-background-primary">
          <TriangleBackground />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col items-center mb-6">
              <h2 className="section-heading gradient-text">Certifications</h2>
              <p className="text-text-secondary text-center max-w-2xl">
                Professional certifications I've earned to enhance my technical and business skills.
              </p>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              {certificationData.map((cert) => (
                <div 
                  key={cert.title} 
                  className="glass-card p-6 sm:p-8 bg-background-secondary/50 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:scale-[1.05] hover:border-yellow-600/30 flex flex-col h-full"
                >
                  <div className="flex items-center justify-center mb-6 mx-auto text-accent-primary">
                    <CertificateIcon />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-text-primary text-center mb-4">{cert.title}</h3>
                  <p className="text-text-secondary text-center mt-auto">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education Section - DARK */}
        <section id="education" className="relative py-24 scroll-mt-24 overflow-hidden bg-background-primary">
          <BlogBackground />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col items-center mb-6">
              <h2 className="section-heading gradient-text">Education</h2>
              <p className="text-text-secondary text-center max-w-2xl">
                My academic background and ongoing educational pursuits.
              </p>
            </div>

            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
              {educationData.map((edu) => (
                <div 
                  key={edu.institution} 
                  className="glass-card p-6 sm:p-8 border border-white/10 backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(234,179,8,0.5)] hover:border-yellow-600/50"
                >
                  <div className="flex justify-center mb-6">
                    <Image 
                      src={edu.logo} 
                      alt={`${edu.institution} logo`}
                      className="w-12 h-12 object-contain" 
                      loading="lazy"
                      width={48}
                      height={48}
                    />
                  </div>
                  <div className="flex flex-col gap-1 mb-4">
                    <h3 className="text-xl font-display font-semibold text-text-primary text-center">{edu.degree}</h3>
                    <p className="text-accent-primary font-medium text-center">{edu.institution}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-1 mt-2">
                      <p className="text-text-secondary text-center">{edu.location}</p>
                      <span className="hidden sm:inline mx-2 text-text-secondary">•</span>
                      <span className="text-text-muted text-center">{edu.period}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Section - LIGHT to DARK */}
        <section id="blog" className="relative py-24 overflow-hidden scroll-mt-24 bg-background-primary">
          <TriangleBackground />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col items-center mb-6">
              <h2 className="section-heading gradient-text">Latest Articles</h2>
              <p className="text-text-secondary text-center max-w-2xl">
                Thoughts, tutorials, and insights about web development and design.
              </p>
            </div>

            <div className="max-w-6xl mx-auto mb-16">
              {blogPosts.length > 0 ? (
                <SwiperBlogCarousel posts={blogPosts} initialSlide={1} />
              ) : (
                <div className="glass-card p-8 text-center">
                  <p className="text-text-primary text-lg mb-2">No blogs currently available</p>
                  <p className="text-text-secondary">Check back soon for new articles!</p>
                </div>
              )}
            </div>

            <div className="mt-20 text-center">
              <Link href="/blog" className="btn-primary">
                Read All Articles
              </Link>
            </div>
          </div>
        </section>

        {/* Contact Section - BLACK */}
        <section id="contact" className="relative py-24 scroll-mt-24 overflow-hidden bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
            <div className="text-center mb-6">
              <h2 className="section-heading text-white">Get In Touch</h2>
              <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                Interested in working together? Fill out the form below and I'll get back to you as soon as possible.
              </p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>
      {/* Fixed navigation arrow */}
      <FixedNavArrow />
    </div>
  )
} 