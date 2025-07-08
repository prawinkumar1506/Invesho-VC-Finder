"use client"

import { useState } from "react"
import Navbar from "./components/Navbar"
import HeroSection from "./components/HeroSection"
import IndustrySelector from "./components/IndustrySelector"
import VCGrid from "./components/VCGrid"
import VCModal from "./components/VCModal"
import ChatbotButton from "./components/ChatbotButton"
import ChatbotModal from "./components/ChatbotModal"
import LoadingSpinner from "./components/LoadingSpinner"
import Footer from "./components/Footer"
import { fetchVCsByIndustry } from "./lib/api"
import type { VCProfile } from "./lib/types"

export default function Home() {
  const [vcProfiles, setVcProfiles] = useState<VCProfile[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null)
  const [selectedVC, setSelectedVC] = useState<VCProfile | null>(null)
  const [isVCModalOpen, setIsVCModalOpen] = useState(false)
  const [isChatbotOpen, setIsChatbotOpen] = useState(false)

  /**
   * Handles industry selection and fetches relevant VC profiles
   */
  const handleIndustrySelect = async (industry: string) => {
    setLoading(true)
    setSelectedIndustry(industry)

    try {
      const profiles = await fetchVCsByIndustry(industry)
      // ✅ Ensure profiles is always an array
      setVcProfiles(Array.isArray(profiles) ? profiles : [])
    } catch (error) {
      console.error("Failed to fetch VC profiles:", error)
      setVcProfiles([])
    } finally {
      setLoading(false)
    }
  }

  /**
   * Opens VC detail modal
   */
  const handleVCCardClick = (vc: VCProfile) => {
    setSelectedVC(vc)
    setIsVCModalOpen(true)
  }

  /**
   * Closes VC detail modal
   */
  const handleCloseVCModal = () => {
    setIsVCModalOpen(false)
    setSelectedVC(null)
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 transition-colors duration-300">
        {/* Navigation */}
        <Navbar />

        {/* Hero Section */}
        <HeroSection />

        {/* Industry Selection */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <IndustrySelector onIndustrySelect={handleIndustrySelect} selectedIndustry={selectedIndustry} />
          </div>
        </section>

        {/* Loading State */}
        {loading && (
            <div className="py-16">
              <LoadingSpinner />
            </div>
        )}

        {/* VC Results */}
        {!loading && Array.isArray(vcProfiles) && vcProfiles.length > 0 && (
            <section className="py-16 px-4">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    {selectedIndustry} VCs & Investors
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    Found {vcProfiles.length} investor{vcProfiles.length !== 1 ? "s" : ""} specializing in{" "}
                    {selectedIndustry}
                  </p>
                </div>
                <VCGrid profiles={vcProfiles} onCardClick={handleVCCardClick} />
              </div>
            </section>
        )}

        {/* No Results Message */}
        {!loading && selectedIndustry && Array.isArray(vcProfiles) && vcProfiles.length === 0 && (
            <section className="py-16 px-4">
              <div className="max-w-7xl mx-auto text-center">
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  No VCs found for {selectedIndustry}. Try selecting a different industry.
                </p>
              </div>
            </section>
        )}

        {/* VC Detail Modal */}
        {selectedVC && (
            <VCModal vc={selectedVC} isOpen={isVCModalOpen} onClose={handleCloseVCModal} />
        )}

        {/* Chatbot Button */}
        <ChatbotButton onClick={() => setIsChatbotOpen(true)} />

        {/* Chatbot Modal */}
        <ChatbotModal isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />

        {/* Footer */}
        <Footer />
      </div>
  )
}
