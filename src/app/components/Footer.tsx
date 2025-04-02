import Link from 'next/link'
import { Github, Linkedin, Twitter, Instagram, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background-secondary/50 backdrop-blur-md border-t border-white/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Logo and brief description */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <span className="text-xl font-display font-bold gradient-text">If you are reading this...</span>
            </Link>
            <p className="text-text-secondary max-w-md mb-6">
              Give me an add and let's talk some more!
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/delozi"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent-primary transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/louis-delozier"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent-primary transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/louisdelozier"
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-accent-primary transition-colors"
                aria-label="Instagram Profile"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-text-primary font-medium text-lg mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-text-secondary hover:text-accent-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-text-secondary hover:text-accent-primary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-text-primary font-medium text-lg mb-4">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-accent-primary mt-1" />
                <a
                  href="mailto:louisdelozier@gmail.com"
                  className="text-text-secondary hover:text-accent-primary transition-colors"
                >
                 louisdelozier@gmail.com
                </a>
              </div>
              <p className="text-text-secondary">
                Currently looking for internships and full-time positions.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 mt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center">
          <p className="text-text-muted text-sm mb-4 md:mb-0">
            © {currentYear} Louis DeLozier. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 