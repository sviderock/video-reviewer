"use client"

import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface DashboardHeaderProps {
  totalVideos: number
  unwatchedVideos: number
}

export function DashboardHeader({ totalVideos, unwatchedVideos }: DashboardHeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-card p-6 rounded-lg border shadow-sm">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Video Review Dashboard</h1>
        <p className="text-muted-foreground">Track your daily video reviews</p>
        <p className="text-sm text-muted-foreground">
          Total videos: {totalVideos} | Unwatched: {unwatchedVideos}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Input type="search" placeholder="Search videos..." className="w-full sm:w-auto" />
        <Button variant="outline" size="icon" className="hover:bg-secondary">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>
      </div>
    </header>
  )
}

