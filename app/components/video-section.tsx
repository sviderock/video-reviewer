"use client"

import { useState } from "react"
import { VideoCard } from "@/components/video-card"
import { ChevronDown, ChevronUp } from "lucide-react"

interface Video {
  id: number
  title: string
  duration: string
  watched: boolean
  thumbnail: string
  videoUrl: string
}

interface VideoSectionProps {
  date: string
  videos: Video[]
  defaultExpanded: boolean
}

export function VideoSection({ date, videos, defaultExpanded }: VideoSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  if (!videos || videos.length === 0) {
    return null
  }

  return (
    <section className="mb-8">
      <div
        className="flex justify-between items-center mb-4 p-4 bg-secondary rounded-lg cursor-pointer hover:bg-secondary/80 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-xl font-semibold text-secondary-foreground">{date}</h2>
        <div className="flex items-center text-sm text-secondary-foreground/80">
          <span className="mr-2">{videos.length} videos</span>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </div>
      {isExpanded && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {videos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      )}
    </section>
  )
}

