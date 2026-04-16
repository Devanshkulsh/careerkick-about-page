import { motion } from "framer-motion";
import { ExternalLink, PlayCircle } from "lucide-react";
import { memo, useMemo, useState } from "react";

const YOUTUBE_CHANNELS = [
  {
    id: "jee-channel",
    name: "CareerKick JEE",
    description:
      "Counseling explainers, round-wise strategy, and rank analysis for JEE aspirants.",
    subscribers: "2,00,000+",
    channelUrl: "https://www.youtube.com",
  },
  {
    id: "neet-channel",
    name: "CareerKick NEET",
    description:
      "Medical admission guidance with detailed coverage of NEET counseling updates and options.",
    subscribers: "2,00,000+",
    channelUrl: "https://www.youtube.com",
  },
  {
    id: "mba-channel",
    name: "CareerKick MBA",
    description:
      "MBA college insights, selection strategy, and profile-building guidance for management aspirants.",
    subscribers: "2,00,000+",
    channelUrl: "https://www.youtube.com",
  },
];

const VIDEOS = [
  { id: "1", title: "Video 1", youtubeId: "b2nw5IYVT1c" },
  { id: "2", title: "Video 2", youtubeId: "9R3OiaPeKeU" },
  { id: "3", title: "Video 3", youtubeId: "Ssj6qK3NYpM" },
];

function YouTubeChannelsComponent() {
  const [activeVideo, setActiveVideo] = useState(VIDEOS[0].youtubeId);

  const channelNodes = useMemo(() => {
    return YOUTUBE_CHANNELS.map((channel, index) => (
      <motion.div
        key={channel.id}
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: index * 0.15,
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="text-center"
      >
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
          <PlayCircle size={26} />
        </div>

        <h3 className="mt-4 text-lg font-semibold text-white">
          {channel.name}
        </h3>

        <p className="text-sm text-gray-400">
          {channel.subscribers} subscribers
        </p>

        <p className="mt-2 text-sm text-gray-400">{channel.description}</p>

        <a
          href={channel.channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm text-white/80 hover:text-red-400"
        >
          Visit Channel <ExternalLink size={14} />
        </a>
      </motion.div>
    ));
  }, []);

  return (
    <section className="relative w-full bg-black py-28 px-6 text-white overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,0,0,0.08),transparent_60%)]" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* ✅ CENTERED HEADING */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Our YouTube Ecosystem
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Learn, explore, and stay updated through our expert video content.
          </p>
        </motion.div>

        {/* ✅ CHANNELS */}
        <div className="mt-12 grid gap-8 md:grid-cols-3">{channelNodes}</div>

        {/* ✅ LAPTOP MOCKUP */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-20 flex justify-center"
        >
          <div className="relative w-full max-w-3xl">
            {/* Laptop Frame */}
            <div className="rounded-2xl bg-neutral-900 p-3 border border-white/10 shadow-2xl">
              {/* Screen */}
              <div className="aspect-video rounded-xl overflow-hidden bg-black">
                <iframe
                  key={activeVideo}
                  src={`https://www.youtube.com/embed/${activeVideo}`}
                  className="w-full h-full"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Base */}
            <div className="h-3 w-3/4 mx-auto bg-neutral-800 rounded-b-xl mt-1" />
          </div>
        </motion.div>

        {/* ✅ VIDEO THUMBNAILS */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {VIDEOS.map((video) => (
            <motion.div
              key={video.id}
              whileHover={{ scale: 1.05 }}
              onClick={() => setActiveVideo(video.youtubeId)}
              className="cursor-pointer group"
            >
              <div className="relative rounded-xl overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  className="w-full h-40 object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition" />

                {/* Play Icon */}
                <PlayCircle className="absolute inset-0 m-auto text-white w-10 h-10" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(YouTubeChannelsComponent);
