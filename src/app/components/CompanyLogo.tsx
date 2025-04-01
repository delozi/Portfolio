'use client'

import { useState } from 'react'

interface CompanyLogoProps {
  company: string
  logo?: string
}

export default function CompanyLogo({ company, logo }: CompanyLogoProps) {
  // Use initials as fallback if no logo is provided
  const initials = company
    .split(' ')
    .map(word => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
  
  // Track image loading status
  const [imgError, setImgError] = useState(false)
  
  return (
    <div className="w-36 h-36 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center overflow-hidden transition-all duration-300 hover:bg-accent-primary/20 group">
      {logo && !imgError ? (
        <img 
          src={logo} 
          alt={`${company} logo`} 
          className="max-w-[80%] max-h-[80%] object-contain"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="text-text-muted text-3xl font-display group-hover:text-accent-primary transition-colors">
          {initials}
        </div>
      )}
    </div>
  )
} 