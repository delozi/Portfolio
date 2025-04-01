import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { Clock, Calendar, ArrowLeft, Tag } from 'lucide-react'

// Mock function to simulate fetching a blog post
// In a real app, this would fetch from Payload CMS
async function getBlogPost(slug: string) {
  // Mock data for now
  const posts = [
    {
      title: 'Building a Portfolio with Payload CMS',
      slug: 'building-a-portfolio',
      content: `
        <p>This is a comprehensive guide to creating a portfolio website using Payload CMS and Next.js. We'll cover setting up the CMS, creating collections, and building the frontend.</p>
        <h2>Getting Started with Payload CMS</h2>
        <p>Payload CMS is a headless content management system built with TypeScript and Express. It's flexible, developer-friendly, and perfect for portfolio websites.</p>
        <p>To get started, you'll need to install Payload in your Next.js project:</p>
        <pre><code>npm install payload</code></pre>
        <h2>Setting Up Your Collections</h2>
        <p>Collections in Payload are similar to content types in other CMS platforms. For a portfolio, you might want collections for projects, blog posts, and contact information.</p>
        <h2>Building the Frontend</h2>
        <p>With Next.js, you can create dynamic routes that fetch data from your Payload API. This allows you to create pages for each project or blog post.</p>
        <h2>Styling Your Portfolio</h2>
        <p>Tailwind CSS is a great choice for styling your portfolio. It's utility-first approach makes it easy to create a consistent design system.</p>
        <h2>Deployment</h2>
        <p>Once your portfolio is ready, you can deploy it to Vercel, Netlify, or any other hosting platform that supports Next.js.</p>
        <h2>Conclusion</h2>
        <p>Building a portfolio with Payload CMS and Next.js gives you complete control over your content and design. It's a powerful combination for developers who want to showcase their work.</p>
      `,
      featuredImage: '/blog-placeholder-1.jpg',
      publishDate: '2023-06-12',
      readTime: '8 min read',
      author: {
        name: 'Jane Doe',
        avatar: '/avatar-placeholder.jpg',
      },
      categories: ['Web Development', 'CMS'],
    },
    // More posts could be added here
  ]
  
  const post = posts.find(post => post.slug === slug)
  if (!post) {
    return null
  }
  
  return post
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)
  
  if (!post) {
    notFound()
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          {/* Back button */}
          <Link 
            href="/blog" 
            className="inline-flex items-center text-text-secondary hover:text-accent-primary mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to all articles
          </Link>
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((category, index) => (
                <span 
                  key={index}
                  className="bg-accent-primary/20 text-accent-primary text-xs px-3 py-1 rounded-full inline-flex items-center"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {category}
                </span>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
              {post.title}
            </h1>
            
            <div className="flex items-center text-text-secondary text-sm mb-8">
              <div className="flex items-center mr-6">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{post.publishDate}</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>{post.readTime}</span>
              </div>
            </div>
            
            <div className="glass-card overflow-hidden mb-8 h-72 md:h-96 relative">
              <div className="absolute inset-0 flex items-center justify-center text-text-muted">
                [Featured Image]
              </div>
            </div>
            
            {/* Author */}
            <div className="flex items-center mb-10">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-background-secondary mr-4 relative">
                <div className="absolute inset-0 flex items-center justify-center text-text-muted text-xs">
                  Avatar
                </div>
              </div>
              <div>
                <div className="font-medium text-text-primary">{post.author.name}</div>
                <div className="text-text-secondary text-sm">Author</div>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="prose prose-invert prose-headings:font-display prose-headings:font-bold prose-a:text-accent-primary hover:prose-a:text-accent-secondary prose-code:bg-background-tertiary prose-pre:bg-background-tertiary prose-pre:border prose-pre:border-white/10 max-w-none">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
          
          {/* Share links */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <span className="text-text-secondary">Share this article:</span>
              <div className="flex gap-4">
                <button className="btn-secondary-sm">
                  Twitter
                </button>
                <button className="btn-secondary-sm">
                  LinkedIn
                </button>
                <button className="btn-secondary-sm">
                  Facebook
                </button>
                <button className="btn-secondary-sm">
                  Copy Link
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
} 