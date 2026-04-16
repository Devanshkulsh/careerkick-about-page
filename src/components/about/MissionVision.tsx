import { motion } from "framer-motion";
import { Lightbulb, Target } from "lucide-react";
import { memo, useMemo } from "react";
import type { MissionVisionItem } from "../../types/about.types";
import { SectionWrapper } from "../shared/SectionWrapper";

const MISSION_VISION_ITEMS: MissionVisionItem[] = [
  {
    id: "mission",
    title: "Mission",
    description:
      "Deliver personalized and reliable counseling that turns India's exam pressure into clear admission outcomes.",
    icon: Target,
    points: [
      "Student-first counseling workflows",
      "Data-backed counseling strategy",
      "Transparent choice filling support",
    ],
  },
  {
    id: "vision",
    title: "Vision",
    description:
      "Create the most trusted education counseling ecosystem where every student can access top opportunities, regardless of geography.",
    icon: Lightbulb,
    points: [
      "Pan-India advisory excellence",
      "Technology + human expertise model",
      "Long-term academic career guidance",
    ],
  },
];

function randomSeeded(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

function MissionVisionComponent() {
  const snowParticles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: `snow-${i}`,
      left: `${randomSeeded(i) * 100}%`,
      size: randomSeeded(i + 100) * 4 + 2,
      opacity: randomSeeded(i + 200) * 0.4 + 0.1,
      duration: randomSeeded(i + 300) * 8 + 7,
      delay: randomSeeded(i + 400) * 10,
      drift: (randomSeeded(i + 500) - 0.5) * 50,
    }));
  }, []);

  const cardNodes = useMemo(() => {
    return MISSION_VISION_ITEMS.map((item, index) => {
      const Icon = item.icon;
      const pointNodes = item.points.map((point) => (
        <li
          key={`${item.id}-${point}`}
          className="flex items-start text-sm leading-relaxed text-white/70"
        >
          <span className="mr-2 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
          {point}
        </li>
      ));

      return (
        <motion.article
          key={item.id}
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            delay: index * 0.12,
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1] as const,
          }}
          className="group relative overflow-hidden rounded-4xl0 border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.15)] sm:p-10"
        >
          <div className="pointer-events-none absolute inset-0 rounded-4xl0 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]" />

          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:bg-white/20">
            <Icon size={26} strokeWidth={1.5} />
          </div>
          <h3 className="mt-6 text-2xl font-bold text-white tracking-tight">
            {item.title}
          </h3>
          <p className="mt-4 text-base leading-relaxed text-white/80">
            {item.description}
          </p>
          <ul className="mt-6 space-y-3">{pointNodes}</ul>
        </motion.article>
      );
    });
  }, []);

  return (
    <SectionWrapper
      id="mission-vision"
      className="relative overflow-hidden bg-black px-6 py-24 sm:px-8 lg:px-14"
    >
      {/* Animated Snow Background Layer */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {snowParticles.map((flake) => (
          <motion.div
            key={flake.id}
            className="absolute rounded-full bg-white blur-[1px]"
            style={{
              left: flake.left,
              width: flake.size,
              height: flake.size,
              opacity: flake.opacity,
              top: "-5%", // Start just above the view
            }}
            animate={{
              y: ["0vh", "110vh"],
              x: [0, flake.drift, 0],
            }}
            transition={{
              y: {
                duration: flake.duration,
                delay: flake.delay,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              },
              x: {
                duration: flake.duration * 0.8,
                delay: flake.delay,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Mission & Vision
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-white/20" />
        </motion.div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2 lg:gap-10">
          {cardNodes}
        </div>
      </div>
    </SectionWrapper>
  );
}

export default memo(MissionVisionComponent);
