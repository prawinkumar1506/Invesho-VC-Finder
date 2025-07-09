"use client"

import { MessageCircle } from "lucide-react"

interface ChatbotButtonProps {
  onClick: () => void
}

/**
 * Floating chatbot button component
 * Positioned at bottom-left corner for easy access
 */
export default function ChatbotButton({ onClick }: ChatbotButtonProps) {
  return (
      <div className="fixed bottom-6 right-6 flex flex-col items-center z-40">
        {/* Label Text */}
        <span className="mb-2 text-sm font-semibold text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 px-2 py-1 rounded shadow">
        VC Assistant
      </span>

        <button
            onClick={onClick}
            className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
            aria-label="Open chatbot"
        >
          <MessageCircle className="w-6 h-6 group-hover:animate-pulse" />

          {/* Tooltip */}
          <div className="absolute right-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            Ask AI Assistant
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
          </div>
        </button>
      </div>
  )
}
