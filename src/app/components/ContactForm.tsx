'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import emailjs from '@emailjs/browser'

// Initialize EmailJS with your public key
emailjs.init("QXyABccD4HidQAyBw")

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean
    message?: string
  }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Send email using EmailJS
      const result = await emailjs.send(
        "service_3nttcfr", 
        "template_qgw3rny",
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_email: "louisdelozier@gmail.com",
        }
      )
      
      if (result.status === 200) {
        setSubmitStatus({
          success: true,
          message: 'Message sent successfully! I\'ll get back to you soon.',
        })
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        })
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'Something went wrong. Please try again.',
      })
      console.error('Contact form error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="glass-card p-8 md:p-10">
      <h3 className="text-2xl font-display font-bold mb-6">Get In Touch</h3>
      
      {submitStatus.success ? (
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-6">
          <p className="text-green-400">{submitStatus.message}</p>
        </div>
      ) : submitStatus.message ? (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
          <p className="text-red-400">{submitStatus.message}</p>
        </div>
      ) : null}
      
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