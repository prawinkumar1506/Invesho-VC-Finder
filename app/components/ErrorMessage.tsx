import { AlertCircle } from "lucide-react"

interface ErrorMessageProps {
  message: string
}

/**
 * Error message component for displaying user-friendly error messages
 */
export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
        <div className="flex items-center">
          <AlertCircle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0" />
          <p className="text-red-800 font-medium">{message}</p>
        </div>
      </div>
    </div>
  )
}
