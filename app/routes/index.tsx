// app/routes/index.tsx
import * as fs from "node:fs";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard-header";
import { VideoSection } from "@/components/video-section";

// Helper function to format date
function formatDate(daysAgo: number): string {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

// This would typically come from a database or API
function getVideosData() {
  const actualVideos = [
    {
      id: 1,
      title: "Big Buck Bunny",
      duration: "10:34",
      watched: false,
      thumbnail: "https://peach.blender.org/wp-content/uploads/bbb-splash.png",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4"
    },
    {
      id: 2,
      title: "Jellyfish",
      duration: "1:00",
      watched: true,
      thumbnail: "https://test-videos.co.uk/user/pages/images/jellyfish.jpg",
      videoUrl: "https://test-videos.co.uk/vids/jellyfish/mp4/h264/720/Jellyfish_720_10s_1MB.mp4"
    },
    {
      id: 3,
      title: "Sintel Trailer",
      duration: "0:52",
      watched: false,
      thumbnail: "https://durian.blender.org/wp-content/uploads/2010/05/sintel_trailer_480p.jpg",
      videoUrl: "https://test-videos.co.uk/vids/sintel/mp4/h264/720/Sintel_720_10s_1MB.mp4"
    },
    {
      id: 4,
      title: "Caminandes: Llama Drama",
      duration: "1:30",
      watched: true,
      thumbnail:
        "https://sjc.microlink.io/msEWfrZ-yDVBaaElgcjq8KCmVheH1qlBAJ9AUXxmtVdlOHUD1_6wPeFPY4-UY8JG7vyO-qk5DmDidem3DrVLjg.jpeg",
      videoUrl: "https://test-videos.co.uk/vids/caminandes/mp4/h264/720/Caminandes_720_10s_1MB.mp4"
    }
  ];

  const generateMockVideos = (count: number, startId: number) =>
    Array.from({ length: count }, (_, i) => ({
      id: startId + i,
      title: `Mock Video ${startId + i}`,
      duration: `${Math.floor(Math.random() * 30 + 5)}:${Math.floor(Math.random() * 60)
        .toString()
        .padStart(2, "0")}`,
      watched: Math.random() > 0.5,
      thumbnail: "/placeholder.svg",
      videoUrl: "#"
    }));

  const sections = [
    { date: "Today", videos: [...actualVideos.slice(0, 2), ...generateMockVideos(3, 100)] },
    { date: "Yesterday", videos: [...actualVideos.slice(2, 4), ...generateMockVideos(2, 200)] },
    { date: formatDate(2), videos: [...actualVideos.slice(0, 1), ...generateMockVideos(4, 300)] },
    { date: formatDate(3), videos: generateMockVideos(5, 400) },
    { date: formatDate(4), videos: generateMockVideos(3, 500) },
    { date: formatDate(5), videos: generateMockVideos(4, 600) },
    { date: formatDate(6), videos: generateMockVideos(2, 700) },
    { date: formatDate(7), videos: generateMockVideos(3, 800) },
    { date: formatDate(8), videos: generateMockVideos(4, 900) },
    { date: formatDate(9), videos: generateMockVideos(3, 1000) },
    { date: formatDate(10), videos: generateMockVideos(5, 1100) },
    { date: formatDate(11), videos: generateMockVideos(2, 1200) },
    { date: formatDate(12), videos: generateMockVideos(4, 1300) },
    { date: formatDate(13), videos: generateMockVideos(3, 1400) }
  ];

  return sections;
}
export const Route = createFileRoute("/")({
  component: Home
});

function Home() {
  console.log("Fetching video data...");
  const videosData = getVideosData();
  console.log("Video data fetched:", videosData);

  const totalVideos = videosData.reduce((sum, section) => sum + section.videos.length, 0);
  const unwatchedVideos = videosData.reduce(
    (sum, section) => sum + section.videos.filter((video) => !video.watched).length,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <DashboardHeader totalVideos={totalVideos} unwatchedVideos={unwatchedVideos} />
      <main className="mt-8">
        {videosData.map((section, index) => (
          <VideoSection
            key={section.date}
            date={section.date}
            videos={section.videos}
            defaultExpanded={index < 2}
          />
        ))}
      </main>
    </div>
  );
}
