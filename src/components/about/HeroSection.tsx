import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import type { PointerEvent } from "react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useParallax } from "../../hooks/useParallax";
import type { HeroContent } from "../../types/about.types";
import { GradientText } from "../shared/GradientText";

const PARTICLE_COUNT = 25;
const WORD_STAGGER = 0.08;
const WORD_DURATION = 0.6;
const HEADLINE_DURATION = 0.8;
const SUBHEAD_DELAY = 0.2;
const TAGLINE_DELAY = 0.7;
const CTA_DELAY = 0.85;

const HERO_CONTENT: HeroContent = {
  title: "Shaping India's Educational Future",
  subtitle:
    "CareerKick empowers aspirants across IIT-JEE, NEET, and MBA pathways with counseling, data intelligence, and human mentorship designed for life-changing admissions decisions.",
  tagline: "Since 2017 · 1M+ Students · 150+ Colleges · 200+ Counselors",
  primaryCta: {
    label: "Get Counseled",
    href: "https://careerkick.in",
  },
  secondaryCta: {
    label: "Our Story",
    sectionId: "brand-story",
  },
};

interface ParticleOrb {
  id: string;
  left: string;
  top: string;
  size: number;
  opacity: number;
  duration: number;
  driftX: number;
  driftY: number;
  delay: number;
}

function seededValue(seed: number): number {
  const raw = Math.sin(seed * 999.91) * 10000;
  return raw - Math.floor(raw);
}

function HeroSectionComponent() {
  const [showHeadline, setShowHeadline] = useState<boolean>(false);
  const { ref, y } = useParallax<HTMLElement>(0.4);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const particleX = useSpring(mouseX, { stiffness: 75, damping: 20 });
  const particleY = useSpring(mouseY, { stiffness: 75, damping: 20 });

  const handlePointerMove = useCallback(
    (e: PointerEvent<HTMLElement>) => {
      // Calculate offset from center of screen (multiplied by -0.05 for subtle inverse parallax)
      const moveX = (e.clientX - window.innerWidth / 2) * -0.05;
      const moveY = (e.clientY - window.innerHeight / 2) * -0.05;

      mouseX.set(moveX);
      mouseY.set(moveY);
    },
    [mouseX, mouseY],
  );

  useEffect(() => {
    setShowHeadline(true);
  }, []);

  const subtitleWords = useMemo<string[]>(
    () => HERO_CONTENT.subtitle.split(" "),
    [HERO_CONTENT.subtitle],
  );

  const particles = useMemo<ParticleOrb[]>(() => {
    return Array.from({ length: PARTICLE_COUNT }, (_, index) => {
      const baseSeed = index + 1;
      const left = `${Math.round(seededValue(baseSeed) * 100)}%`;
      const top = `${Math.round(seededValue(baseSeed + 33) * 100)}%`;
      const size = 6 + seededValue(baseSeed + 66) * 16;
      const opacity = 0.1 + seededValue(baseSeed + 99) * 0.4;
      const duration = 4 + seededValue(baseSeed + 132) * 6;
      const driftX = -30 + seededValue(baseSeed + 165) * 60;
      const driftY = -30 + seededValue(baseSeed + 198) * 60;
      const delay = seededValue(baseSeed + 231) * 2;

      return {
        id: `orb-${index + 1}`,
        left,
        top,
        size,
        opacity,
        duration,
        driftX,
        driftY,
        delay,
      };
    });
  }, []);

  const handlePrimaryClick = useCallback(() => {
    window.open(HERO_CONTENT.primaryCta.href, "_blank", "noopener,noreferrer");
  }, [HERO_CONTENT.primaryCta.href]);

  const handleSecondaryClick = useCallback(() => {
    const targetElement = document.getElementById(
      HERO_CONTENT.secondaryCta.sectionId,
    );
    targetElement?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [HERO_CONTENT.secondaryCta.sectionId]);

  const particleNodes = useMemo(() => {
    return particles.map((particle) => (
      <motion.div
        key={particle.id}
        className="absolute rounded-full bg-white/70 blur-[2px]"
        style={{
          left: particle.left,
          top: particle.top,
          width: particle.size,
          height: particle.size,
          opacity: particle.opacity,
          boxShadow: `0 0 ${particle.size * 2}px rgba(255,255,255,0.3)`, // Added subtle glow
        }}
        animate={{
          x: [0, particle.driftX, 0],
          y: [0, particle.driftY, 0],
          scale: [0.5, 1.5, 0.8, 1.2, 0.5],
          opacity: [
            particle.opacity * 0.75,
            particle.opacity,
            particle.opacity * 0.55,
          ],
        }}
        transition={{
          duration: particle.duration,
          delay: particle.delay,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    ));
  }, [particles]);

  const subtitleWordNodes = useMemo(() => {
    return subtitleWords.map((word, index) => (
      <motion.span
        key={`${word}-${index.toString()}`}
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          delay: SUBHEAD_DELAY + index * WORD_STAGGER,
          duration: WORD_DURATION,
          ease: [0.22, 1, 0.36, 1] as const,
        }}
        className="mr-2 inline-block"
      >
        {word}
      </motion.span>
    ));
  }, [subtitleWords]);

  return (
    <section
      id="hero"
      ref={ref}
      onPointerMove={handlePointerMove}
      className="relative isolate flex min-h-svh items-center justify-center overflow-hidden bg-black px-4 py-16 text-white sm:px-8 sm:py-20 lg:px-14"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          y,
          background:
            "linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 100%)",
        }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ x: particleX, y: particleY }}
      >
        {particleNodes}
      </motion.div>

      <motion.a
        href="/"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
        className="absolute left-4 top-4 z-20 inline-flex items-center rounded-xl border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-md sm:left-6 sm:top-6"
        aria-label="CareerKick Home"
      >
        <img
          src="/logo-bg.png"
          alt="CareerKick logo"
          width={140}
          height={40}
          className="h-8 w-auto sm:h-9"
        />
      </motion.a>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <AnimatePresence mode="wait">
          {showHeadline && (
            <motion.h1
              key="hero-headline"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{
                duration: HEADLINE_DURATION,
                ease: [0.22, 1, 0.36, 1] as const,
              }}
              className="font-heading text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-7xl"
            >
              <GradientText text={HERO_CONTENT.title} />
            </motion.h1>
          )}
        </AnimatePresence>

        <motion.p
          className="mt-6 max-w-4xl text-balance text-sm leading-relaxed text-white/90 sm:mt-8 sm:text-base md:text-lg"
          initial="hidden"
          animate="visible"
          variants={{ hidden: {}, visible: {} }}
        >
          {subtitleWordNodes}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: TAGLINE_DELAY,
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1] as const,
          }}
          className="mx-auto mt-6 max-w-full rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-center text-xs font-medium uppercase tracking-[0.16em] text-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-md sm:mt-8 sm:px-5 sm:py-2 sm:text-sm"
        >
          {HERO_CONTENT.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: CTA_DELAY,
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1] as const,
          }}
          className="mt-8 flex w-full flex-col items-center justify-center gap-3 px-2 sm:mt-10 sm:w-auto sm:flex-row sm:gap-4 sm:px-0"
        >
          <motion.button
            type="button"
            onClick={handlePrimaryClick}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-full rounded-full bg-brand-cta px-7 py-3 text-sm font-semibold tracking-wide text-white shadow-lg shadow-brand-cta/35 transition-colors hover:bg-brand-cta/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cta focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy sm:w-auto"
          >
            {HERO_CONTENT.primaryCta.label}
          </motion.button>

          <motion.button
            type="button"
            onClick={handleSecondaryClick}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="w-full rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-semibold tracking-wide text-white backdrop-blur-sm transition-all hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-navy sm:w-auto"
          >
            {HERO_CONTENT.secondaryCta.label}
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(HeroSectionComponent);
