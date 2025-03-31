'use client'

import { useState, useEffect } from 'react'
import { Send } from 'lucide-react'
import emailjs from '@emailjs/browser'

// Initialize EmailJS with your public key
useEffect(() => {
  emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '')
}, [])

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmissionStatus(null)

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: 'louisdelozier@gmail.com'
        }
      )
      
      setSubmissionStatus('success')
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      })
    } catch (error) {
      console.error('Error sending email:', error)
      setSubmissionStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="glass-card p-8 md:p-10">
      <h3 className="text-2xl font-display font-bold mb-6">Get In Touch</h3>
      
      {submissionStatus === 'success' && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
          <p className="text-green-400">Message sent successfully! I'll get back to you soon.</p>
        </div>
      )}
      
      {submissionStatus === 'error' && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
          <p className="text-red-400">Something went wrong. Please try again.</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-background-tertiary border border-white/10 rounded-lg focus:ring-accent-primary focus:border-accent-primary text-text-primary"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-background-tertiary border border-white/10 rounded-lg focus:ring-accent-primary focus:border-accent-primary text-text-primary"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-text-secondary mb-2">
            Subject
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            required
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-background-tertiary border border-white/10 rounded-lg focus:ring-accent-primary focus:border-accent-primary text-text-primary"
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-background-tertiary border border-white/10 rounded-lg focus:ring-accent-primary focus:border-accent-primary text-text-primary resize-none"
          ></textarea>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'} 
          {!isSubmitting && <Send className="h-4 w-4" />}
        </button>
      </form>
    </div>
  )
} 