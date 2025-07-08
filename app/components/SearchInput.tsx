"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"

interface SearchInputProps {
  onSearch: (industry: string) => void
  disabled?: boolean
}

/**
 * Search input component for industry selection
 * Supports both typing and predefined industry options
 */
export default function SearchInput({ onSearch, disabled = false }: SearchInputProps) {
  const [industry, setIndustry] = useState("")

  // Predefined industry options for quick selection
  const popularIndustries = [
    "Fintech",
    "Healthcare",
    "Automotive",
    "Fashion",
    "EdTech",
    "SaaS",
    "E-commerce",
    "AI/ML",
    "Blockchain",
    "CleanTech",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (industry.trim() && !disabled) {
      onSearch(industry.trim())
    }
  }

  const handleIndustrySelect = (selectedIndustry: string) => {
    setIndustry(selectedIndustry)
    onSearch(selectedIndustry)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Search Form */}
      <form onSubmit={handleSubmit} className="relative mb-6">
        <div className="relative">
          <input
            type="text"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            placeholder="Enter industry (e.g., fintech, healthcare, automotive...)"
            disabled={disabled}
            className="w-full px-6 py-4 pr-14 text-lg border-2 border-gray-200 rounded-full 
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 
                     disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-200
                     shadow-lg hover:shadow-xl"
          />
          <button
            type="submit"
            disabled={disabled || !industry.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 
                     bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 
                     text-white p-3 rounded-full transition-colors duration-200
                     disabled:cursor-not-allowed"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
      </form>

      {/* Popular Industries */}
      <div className="text-center">
        <p className="text-gray-600 mb-4 text-sm">Popular industries:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {popularIndustries.map((pop) => (
            <button
              key={pop}
              onClick={() => handleIndustrySelect(pop)}
              disabled={disabled}
              className="px-4 py-2 bg-white border border-gray-200 rounded-full 
                       hover:bg-blue-50 hover:border-blue-300 transition-colors duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium
                       shadow-sm hover:shadow-md"
            >
              {pop}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
