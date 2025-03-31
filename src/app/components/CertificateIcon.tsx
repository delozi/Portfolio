'use client'

import { Award } from 'lucide-react'

export default function CertificateIcon() {
  return (
    <div className="flex items-center justify-center h-16 w-16 bg-accent-primary/20 rounded-xl transition-all duration-300 group hover:bg-accent-primary/30">
      <Award className="h-8 w-8 text-accent-primary group-hover:text-accent-secondary transition-colors grayscale-icon" />
    </div>
  )
} 