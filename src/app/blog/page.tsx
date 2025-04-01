import Link from 'next/link'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

// Define the blog post type
type BlogPost = {
  title: string
  slug: string
  excerpt: string
  featuredImage: string
  publishDate: string
  readTime: string
  categories: string[]
}

// Mock function to simulate fetching blog posts
// In a real app, this would fetch from Payload CMS
async function getBlogPosts(): Promise<BlogPost[]> {
  // Mock data for now
  return [
    // {
    //   title: 'Building a Portfolio with Payload CMS',
    //   slug: 'building-a-portfolio',
    //   excerpt: 'A comprehensive guide to creating a portfolio website using Payload CMS and Next.js.',
    //   featuredImage: '/blog-placeholder-1.jpg',
    //   publishDate: '2023-06-12',
    //   readTime: '8 min read',
    //   categories: ['Web Development', 'CMS'],
    // },
    // {
    //   title: 'Optimizing React Applications for Performance',
    //   slug: 'react-performance-optimization',
    //   excerpt: 'Learn how to identify and fix performance bottlenecks in your React applications.',
    //   featuredImage: '/blog-placeholder-2.jpg',
    //   publishDate: '2023-05-28',
    //   readTime: '6 min read',
    //   categories: ['React', 'Performance'],
    // },
    // {
    //   title: 'Introduction to Tailwind CSS',
    //   slug: 'introduction-to-tailwind',
    //   excerpt: 'Discover how Tailwind CSS can streamline your styling workflow and improve productivity.',
    //   featuredImage: '/blog-placeholder-3.jpg',
    //   publishDate: '2023-05-14',
    //   readTime: '5 min read',
    //   categories: ['CSS', 'Web Development'],
    // },
    // {
    //   title: 'Using TypeScript with React',
    //   slug: 'typescript-with-react',
    //   excerpt: 'A beginner-friendly guide to integrating TypeScript into your React projects.',
    //   featuredImage: '/blog-placeholder-4.jpg',
    //   publishDate: '2023-04-30',
    //   readTime: '7 min read',
    //   categories: ['TypeScript', 'React'],
    // },
    // {
    //   title: 'Modern Authentication Strategies',
    //   slug: 'modern-authentication',
    //   excerpt: 'Exploring different authentication methods for web applications in 2023.',
    //   featuredImage: '/blog-placeholder-5.jpg',
    //   publishDate: '2023-04-16',
    //   readTime: '9 min read',
    //   categories: ['Security', 'Web Development'],
    // },
    // {
    //   title: 'Building Accessible Web Applications',
    //   slug: 'web-accessibility',
    //   excerpt: 'Best practices for creating inclusive web experiences that work for everyone.',
    //   featuredImage: '/blog-placeholder-6.jpg',
    //   publishDate: '2023-04-02',
    //   readTime: '10 min read',
    //   categories: ['Accessibility', 'UX'],
    // },
  ]
}

export default async function BlogPage() {
  const posts = await getBlogPosts()
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display gradient-text">
              Blog
            </h1>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Thoughts, tutorials, and insights about web development, design, and technology.
            </p>
          </div>
          
          {/* Blog posts grid */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {posts.map((post) => (
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
          ) : (
            <div className="glass-card p-12 text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-display font-bold text-text-primary mb-4">
                No blogs currently available
              </h2>
              <p className="text-text-secondary mb-6">
                We're working on creating some amazing content. Check back soon for new articles!
              </p>
              <Link href="/" className="btn-primary inline-block">
                Return Home
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
} 