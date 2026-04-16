import { AnimatePresence, motion } from "framer-motion";
import { memo, useMemo, useState } from "react";
import {
  fadeUpVariants,
  staggerContainerVariants,
} from "../../constants/variants";
import type { BrandStoryContent } from "../../types/about.types";
import { SectionWrapper } from "../shared/SectionWrapper";

type StoryHighlightWithMedia = BrandStoryContent["highlights"][number] & {
  imageCaption?: string;
};

interface BrandStoryContentWithMedia extends Omit<
  BrandStoryContent,
  "highlights"
> {
  highlights: StoryHighlightWithMedia[];
}

const BRAND_STORY_CONTENT: BrandStoryContentWithMedia = {
  title: "Our Story: Transforming Admissions Into Confident Journeys",
  highlights: [
    {
      id: "founded",
      title: "Founded In 2017",
      description:
        "Started as a focused JEE counseling initiative and quickly scaled nationwide, guided by core principles of transparency and student-first advice.",
      imageUrl: "/brand-story/founded.png",
    },
    {
      id: "largest",
      title: "India's Largest Counseling Network",
      description:
        "Operational reach across digital and offline touchpoints with expert teams. We leverage data analytics from years of admission cycles.",
      imageUrl: "/brand-story/counseling.png",
    },
    {
      id: "trust",
      title: "Trusted By Families",
      description:
        "Long-term guidance model from exam prep stage to final admission decisions. We hold your hand through the entire high-stakes process.",
      imageUrl: "/brand-story/trust.png",
    },
  ],
};

function BrandStoryComponent() {
  // Initialize with the first highlight active by default
  const [activeTabId, setActiveTabId] = useState<string>(
    BRAND_STORY_CONTENT.highlights[0].id,
  );

  const activeContent = useMemo(() => {
    return BRAND_STORY_CONTENT.highlights.find(
      (item) => item.id === activeTabId,
    );
  }, [activeTabId]);

  return (
    <SectionWrapper
      id="brand-story"
      className="bg-slate-50 px-6 py-24 sm:px-8 lg:px-14"
    >
      {/* 1. Centered Header Area */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainerVariants}
        className="mx-auto max-w-3xl text-center mb-16 space-y-6"
      >
        <motion.h2
          variants={fadeUpVariants}
          className="font-heading text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl"
        >
          {BRAND_STORY_CONTENT.title}
        </motion.h2>
      </motion.div>

      {/* 2. Main Content Grid */}
      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-12 lg:gap-16 lg:items-start">
        {/* Left Side: Media Viewer (Spans 7 columns on desktop) */}
        <div className="lg:col-span-7">
          <div className="sticky top-24">
            {" "}
            {/* Makes it stick while scrolling if right column gets long */}
            <AnimatePresence mode="wait">
              {activeContent && (
                <motion.div
                  key={`media-${activeContent.id}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col gap-6"
                >
                  {/* Image Container */}
                  <div className="group relative aspect-4/3 w-full overflow-hidden rounded-3xl bg-gray-200 shadow-xl shadow-brand-navy/5">
                    {activeContent.imageUrl ? (
                      <img
                        src={activeContent.imageUrl}
                        alt={activeContent.title}
                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-brand-navy/40">
                        No Image Available
                      </div>
                    )}
                    {/* Subtle overlay gradient */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Interactive Vertical Tabs (Spans 5 columns on desktop) */}
        <div className="flex flex-col gap-4 lg:col-span-5 lg:pt-8">
          {BRAND_STORY_CONTENT.highlights.map((highlight) => {
            const isActive = activeTabId === highlight.id;

            return (
              <button
                key={highlight.id}
                type="button"
                onClick={() => setActiveTabId(highlight.id)}
                className={`relative overflow-hidden w-full cursor-pointer rounded-2xl p-6 text-left transition-all duration-300 ${
                  isActive
                    ? "bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] scale-[1.02]"
                    : "bg-transparent hover:bg-white/60 hover:scale-[1.01]"
                }`}
              >
                {/* Animated active border indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1.5 bg-brand-navy"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}

                <div
                  className={`pl-4 transition-colors duration-300 ${isActive ? "opacity-100" : "opacity-60"}`}
                >
                  <h4
                    className={`text-lg font-bold ${isActive ? "text-brand-navy" : "text-brand-navy/80"}`}
                  >
                    {highlight.title}
                  </h4>
                  {/* We truncate the description slightly on the right cards to keep them looking like clean tabs */}
                  <p className="mt-2 text-sm leading-relaxed text-brand-navy/70 line-clamp-2">
                    {highlight.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}

export default memo(BrandStoryComponent);
