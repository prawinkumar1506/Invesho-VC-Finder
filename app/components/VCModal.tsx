"use client"

import type React from "react"

import { useEffect } from "react"
import { X, Mail, ExternalLink, Linkedin, MapPin, Building2, User, Briefcase } from "lucide-react"
import type { VCProfile } from "../lib/types"

interface VCModalProps {
  vc: VCProfile
  isOpen: boolean
  onClose: () => void
}

/**
 * Modal component displaying detailed VC information
 */
export default function VCModal({ vc, isOpen, onClose }: VCModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom-4 duration-300">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                {vc.logoUrl ? (
                  <img
                    src={vc.logoUrl || "/placeholder.svg"}
                    alt={`${vc.firmName} logo`}
                    className="w-12 h-12 object-contain rounded-lg"
                  />
                ) : (
                  <Building2 className="w-8 h-8 text-white" />
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{vc.firmName}</h2>
                <p className="text-gray-600 dark:text-gray-300">{vc.industryFocus} Specialist</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Contact Person */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            <div className="flex items-center mb-3">
              <User className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Key Contact</h3>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-gray-900 dark:text-white">{vc.contactPerson.name}</p>
              <p className="text-gray-600 dark:text-gray-300 flex items-center">
                <Briefcase className="w-4 h-4 mr-2" />
                {vc.contactPerson.designation}
              </p>
              {vc.contactPerson.bio && (
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mt-3">{vc.contactPerson.bio}</p>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <MapPin className="w-5 h-5 mr-3 text-blue-600" />
            <span>{vc.location}</span>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">About</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{vc.description}</p>
          </div>

          {/* Investment Sectors */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Investment Focus</h3>
            <div className="flex flex-wrap gap-2">
              {vc.sectors.map((sector, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                >
                  {sector}
                </span>
              ))}
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-gray-600 dark:text-gray-300">{vc.email}</span>
                </div>
                <button
                  onClick={() => (window.location.href = `mailto:${vc.email}`)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Send Email
                </button>
              </div>

              {vc.websiteUrl && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <ExternalLink className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-600 dark:text-gray-300">Website</span>
                  </div>
                  <button
                    onClick={() => window.open(vc.websiteUrl, "_blank", "noopener,noreferrer")}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-500 hover:border-gray-400 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors"
                  >
                    Visit Site
                  </button>
                </div>
              )}

              {vc.linkedinUrl && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Linkedin className="w-5 h-5 text-blue-600 mr-3" />
                    <span className="text-gray-600 dark:text-gray-300">LinkedIn</span>
                  </div>
                  <button
                    onClick={() => window.open(vc.linkedinUrl, "_blank", "noopener,noreferrer")}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-500 hover:border-gray-400 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors"
                  >
                    View Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
