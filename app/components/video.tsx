import { useState } from "react";
import { ChevronDown, ChevronUp, Clock, Pause, Play } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Video {
  id: number;
  title: string;
  duration: string;
  watched: boolean;
  thumbnail: string;
  videoUrl: string;
}

interface VideoSectionProps {
  date: string;
  videos: Video[];
  defaultExpanded: boolean;
}

export function VideoSection({ date, videos, defaultExpanded }: VideoSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <section className="mb-8">
      <div
        className="mb-4 flex cursor-pointer items-center justify-between rounded-lg bg-secondary p-4 transition-colors hover:bg-secondary/80"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-xl font-semibold text-secondary-foreground">{date}</h2>
        <div className="flex items-center text-sm text-secondary-foreground/80">
          <span className="mr-2">{videos.length} videos</span>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </div>
      </div>
      {isExpanded && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {videos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      )}
    </section>
  );
}

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
    <Card className="flex h-full flex-col border-border transition-colors hover:border-primary/50">
      <CardHeader>
        <CardTitle className="text-lg text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent className="relative flex-grow">
        <div className="relative aspect-video">
          {isPlaying ? (
            <video
              id={`video-${id}`}
              src={videoUrl}
              className="h-full w-full rounded-md object-fill"
              controls
              onEnded={() => setIsPlaying(false)}
            />
          ) : (
            <img src={thumbnail || "/placeholder.svg"} alt={title} className="rounded-md object-cover" />
          )}
          <Button
            variant="secondary"
            size="icon"
            className="absolute bottom-2 right-2"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>
        <div className="mt-2 flex items-center text-sm text-muted-foreground">
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
