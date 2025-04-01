'use client'

import { useState } from 'react'
import Image from 'next/image'
import { GraduationCap } from 'lucide-react'

interface SchoolLogoProps {
  institution: string
  logo?: string
}

export default function SchoolLogo({ institution, logo }: SchoolLogoProps) {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="w-16 h-16 bg-accent-primary/10 rounded-xl flex items-center justify-center transition-all duration-300 group hover:bg-accent-primary/20 overflow-hidden">
      {logo && !imgError ? (
        <img 
          src={logo} 
          alt={`${institution} logo`}
          className="w-12 h-12 object-contain" 
          onError={() => setImgError(true)}
        />
      ) : (
        <GraduationCap className="h-8 w-8 text-accent-primary group-hover:text-accent-secondary transition-colors" />
      )}
    </div>
  )
} 