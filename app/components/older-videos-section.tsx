"use client"

import { useState } from "react"
import { VideoSection } from "./video-section"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

interface Video {
  id: number
  title: string
  duration: string
  watched: boolean
}

interface Section {
  date: string
  videos: Video[]
}

interface OlderVideosSectionProps {
  sections: Section[]
}

export function OlderVideosSection({ sections }: OlderVideosSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="mt-8">
      <Button onClick={() => setIsExpanded(!isExpanded)} variant="outline" className="w-full mb-4">
        {isExpanded ? (
          <>
            <ChevronUp className="mr-2 h-4 w-4" />
            Hide Older Videos
          </>
        ) : (
          <>
            <ChevronDown className="mr-2 h-4 w-4" />
            Show Older Videos
          </>
        )}
      </Button>
      {isExpanded && (
        <div className="space-y-8">
          {sections.map((section) => (
            <VideoSection key={section.date} date={section.date} videos={section.videos} />
          ))}
        </div>
      )}
    </div>
  )
}

