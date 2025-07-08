/**
 * TypeScript interfaces for the application
 */

export interface ContactPerson {
  name: string
  designation: string
  bio?: string
}

export interface VCProfile {
  id: string
  firmName: string
  logoUrl?: string
  industryFocus: string
  contactPerson: ContactPerson
  email: string
  websiteUrl?: string
  linkedinUrl?: string
  location: string
  description: string
  sectors: string[]
}
