"use client"

import type React from "react"

import { useState } from "react"
import { Mail, ExternalLink, Building2, MapPin } from "lucide-react"
import type { VCProfile } from "../lib/types"

interface VCCardProps {
  profile: VCProfile
  onClick: () => void
}

/**
 * Individual VC profile card component
 */
export default function VCCard({ profile, onClick }: VCCardProps) {
  const [showFullDescription, setShowFullDescription] = useState(false)

  const handleEmailClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    window.location.href = `mailto:${profile.email}`
  }

  const handleWebsiteClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(profile.websiteUrl, "_blank", "noopener,noreferrer")
  }

  const truncatedDescription =
    profile.description.length > 120 ? profile.description.substring(0, 120) + "..." : profile.description

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 
                 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer group"
    >
      {/* Card Header */}
      <div className="p-6">
        {/* Logo and Firm Name */}
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
            {profile.logoUrl ? (
              <img
                src={profile.logoUrl || "/placeholder.svg"}
                alt={`${profile.firmName} logo`}
                className="w-12 h-12 object-contain rounded-lg"
              />
            ) : (
              <Building2 className="w-8 h-8 text-white" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {profile.firmName}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{profile.contactPerson.name}</p>
            <p className="text-gray-500 dark:text-gray-400 text-xs">{profile.contactPerson.designation}</p>
          </div>
        </div>

        {/* Industry Tag */}
        <div className="mb-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {profile.industryFocus}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center mb-4 text-gray-600 dark:text-gray-300">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">{profile.location}</span>
        </div>

        {/* Description */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            {showFullDescription ? profile.description : truncatedDescription}
          </p>
          {profile.description.length > 120 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                setShowFullDescription(!showFullDescription)
              }}
              className="text-blue-600 dark:text-blue-400 text-sm font-medium mt-2 hover:underline"
            >
              {showFullDescription ? "Read less" : "Read more"}
            </button>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-100 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <button
            onClick={handleEmailClick}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 text-sm font-medium shadow-sm hover:shadow-md"
          >
            <Mail className="w-4 h-4" />
            <span>Contact</span>
          </button>

          {profile.websiteUrl && (
            <button
              onClick={handleWebsiteClick}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-500 hover:border-gray-400 dark:hover:border-gray-400 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white rounded-lg transition-colors duration-200 text-sm font-medium bg-white dark:bg-gray-800 shadow-sm hover:shadow-md"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Website</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
