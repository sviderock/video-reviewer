"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Play, Pause } from "lucide-react";

interface VideoCardProps {
  id: number;
  title: string;
  duration: string;
  watched: boolean;
  thumbnail: string;
  videoUrl: string;
}

export function VideoCard({ id, title, duration, watched, thumbnail, videoUrl }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const video = document.getElementById(`video-${id}`) as HTMLVideoElement;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Card className="border-border hover:border-primary/50 flex h-full flex-col transition-colors">
      <CardHeader>
        <CardTitle className="text-foreground text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="relative flex-grow">
        <div className="relative aspect-video">
          {isPlaying ? (
            <video
              id={`video-${id}`}
              src={videoUrl}
              className="h-full w-full rounded-md object-cover"
              controls
              onEnded={() => setIsPlaying(false)}
            />
          ) : null
          // <img
          //   src={thumbnail || "/placeholder.svg"}
          //   alt={title}
          //   className=""
          //   layout="fill"
          //   objectFit="cover"
          //   className="rounded-md"
          // />
          }
          <Button
            variant="secondary"
            size="icon"
            className="absolute bottom-2 right-2"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>
        <div className="text-muted-foreground mt-2 flex items-center text-sm">
          <Clock className="mr-1 h-4 w-4" />
          {duration}
        </div>
      </CardContent>
      <CardFooter>
        <Badge
          variant={watched ? "secondary" : "default"}
          className={watched ? "bg-primary/10 text-primary hover:bg-primary/20" : ""}
        >
          {watched ? "Watched" : "Unwatched"}
        </Badge>
      </CardFooter>
    </Card>
  );
}
