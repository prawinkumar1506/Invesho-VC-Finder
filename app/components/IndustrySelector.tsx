"use client"

import { Sparkles } from "lucide-react"

interface IndustrySelectorProps {
  onIndustrySelect: (industry: string) => void
  selectedIndustry: string | null
}

/**
 * Industry selection component with clickable chips
 */
export default function IndustrySelector({ onIndustrySelect, selectedIndustry }: IndustrySelectorProps) {
  const industries = [
    { name: "Fintech", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
    { name: "Healthcare", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
    { name: "Automotive", color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
    { name: "Fashion", color: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200" },
    { name: "EdTech", color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" },
    { name: "SaaS", color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200" },
    { name: "E-commerce", color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" },
    { name: "AI/ML", color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200" },
    { name: "Blockchain", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" },
    { name: "CleanTech", color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200" },
  ]

  return (
    <div className="text-center">
      <div className="flex items-center justify-center mb-8">
        <Sparkles className="w-6 h-6 text-blue-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Select an Industry</h2>
      </div>
      <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
        {industries.map((industry) => (
          <button
            key={industry.name}
            onClick={() => onIndustrySelect(industry.name)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg ${
              selectedIndustry === industry.name ? "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-gray-900" : ""
            } ${industry.color}`}
          >
            {industry.name}
          </button>
        ))}
      </div>
    </div>
  )
}
