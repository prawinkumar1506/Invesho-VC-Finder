"use client"

import VCCard from "./VCCard"
import type { VCProfile } from "../lib/types"

interface VCGridProps {
  profiles: VCProfile[]
  onCardClick: (vc: VCProfile) => void
}

/**
 * Grid component to display VC profile cards
 */
export default function VCGrid({ profiles, onCardClick }: VCGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {profiles.map((profile) => (
        <VCCard key={profile.id} profile={profile} onClick={() => onCardClick(profile)} />
      ))}
    </div>
  )
}
