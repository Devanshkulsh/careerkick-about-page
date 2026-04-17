import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type AnimationPlaybackControls,
} from "framer-motion";
import { Star } from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

const MARQUEE_DURATION = 34;
const MOBILE_SLIDE_MS = 3200;
const MAX_STARS = 5;

const TESTIMONIALS = [
  {
    name: "Riya Sharma",
    review:
      "The counseling roadmap was crystal clear. I secured a top-fit college choice confidently.",
    rating: 5,
    date: "Jan 2026",
  },
  {
    name: "Ayush Verma",
    review:
      "CareerKick removed the stress from NEET counseling. Every step felt transparent and guided.",
    rating: 5,
    date: "Dec 2025",
  },
  {
    name: "Pooja Singh",
    review:
      "Best decision for our family. Expert counselor support was practical and deeply personalized.",
    rating: 5,
    date: "Nov 2025",
  },
  {
    name: "Nitin Kapoor",
    review:
      "Strong data-backed options and zero confusion during choice filling.",
    rating: 5,
    date: "Oct 2025",
  },
  {
    name: "Sneha Mishra",
    review:
      "The mentors explained every possible scenario before final submission.",
    rating: 5,
    date: "Sep 2025",
  },
  {
    name: "Karan Yadav",
    review: "Guidance quality was world-class. We knew exactly what to do.",
    rating: 5,
    date: "Aug 2025",
  },
];

type TestimonialItem = (typeof TESTIMONIALS)[number];

function buildStarNodes(rating: number, keyPrefix: string) {
  return Array.from({ length: MAX_STARS }, (_, index) => {
    const isFilled = index < rating;
    return (
      <Star
        key={`${keyPrefix}-${index}`}
        size={14}
        className={
          isFilled ? "fill-yellow-400 text-yellow-400" : "text-yellow-400/30"
        }
      />
    );
  });
}

const TestimonialCard = memo(function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: TestimonialItem;
  index: number;
}) {
  return (
    <motion.div whileHover={{ y: -6 }} className="w-full shrink-0 group">
      <div className="relative rounded-2xl p-[1px] bg-gradient-to-b from-white/20 to-transparent h-full">
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 h-full transition duration-500 group-hover:bg-white/[0.08] relative overflow-hidden">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-lg bg-white/6 rounded-2xl transition duration-500 pointer-events-none" />

          <div className="flex justify-between text-[10px] sm:text-xs text-gray-400 relative z-10">
            <h3 className="font-semibold text-white truncate max-w-[150px]">
              {testimonial.name}
            </h3>
            <span className="shrink-0">{testimonial.date}</span>
          </div>

          <div className="mt-2 sm:mt-3 flex gap-1 relative z-10">
            {buildStarNodes(testimonial.rating, `${testimonial.name}-${index}`)}
          </div>

          <p className="mt-3 text-xs sm:text-sm text-gray-300 leading-relaxed relative z-10">
            {testimonial.review}
          </p>
        </div>
      </div>
    </motion.div>
  );
});

const MarqueeRow = memo(function MarqueeRowComponent({
  testimonials,
  direction,
}: {
  testimonials: typeof TESTIMONIALS;
  direction: "left" | "right";
}) {
  const x = useMotionValue(0);
  const xPercent = useTransform(x, (v) => `${v}%`);
  const controlsRef = useRef<AnimationPlaybackControls | null>(null);
  const duplicated = useMemo(
    () => [...testimonials, ...testimonials],
    [testimonials],
  );

  useEffect(() => {
    const controls = animate(x, direction === "left" ? [-50, 0] : [0, -50], {
      duration: MARQUEE_DURATION,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
    });

    controlsRef.current = controls;
    return () => controls.stop();
  }, [direction, x]);

  const pause = useCallback(() => controlsRef.current?.pause(), []);
  const play = useCallback(() => controlsRef.current?.play(), []);

  return (
    <div
      onMouseEnter={pause}
      onMouseLeave={play}
      className="relative hidden overflow-hidden md:flex"
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <motion.div
        style={{ x: xPercent, willChange: "transform" }}
        className="flex gap-6 py-4 pr-6"
      >
        {duplicated.map((testimonial, index) => (
          <div
            key={`${testimonial.name}-${index}`}
            className="w-[320px] shrink-0"
          >
            <TestimonialCard testimonial={testimonial} index={index} />
          </div>
        ))}
      </motion.div>
    </div>
  );
});

const MobileCarousel = memo(function MobileCarousel({
  testimonials,
}: {
  testimonials: typeof TESTIMONIALS;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, MOBILE_SLIDE_MS);

    return () => window.clearInterval(timer);
  }, [testimonials.length]);

  const goToSlide = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <div className="md:hidden">
      <div className="overflow-hidden">
        <motion.div
          animate={{ x: `-${activeIndex * 100}%` }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="flex"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.name}-mobile-${index}`}
              className="w-full shrink-0 px-1"
            >
              <TestimonialCard testimonial={testimonial} index={index} />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        {testimonials.map((testimonial, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={`${testimonial.name}-dot-${index}`}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                isActive ? "w-6 bg-yellow-400" : "w-2.5 bg-white/35"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
});

function TestimonialMarqueeComponent() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-16 sm:px-8 sm:py-24 lg:px-14">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,255,0.05),transparent_50%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 text-center">
        <div className="inline-flex items-center rounded-full border border-yellow-400/30 bg-yellow-400/10 px-3 py-1.5 text-[10px] sm:text-xs font-semibold tracking-wider text-yellow-400 uppercase">
          EXCELLENT · 4.9/5 · 274+ Reviews
        </div>

        <h2 className="mt-4 sm:mt-6 font-heading text-2xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          What Students Say <br className="hidden sm:block" /> About CareerKick
        </h2>

        <div className="mt-10 sm:mt-12 space-y-2 sm:space-y-4">
          <MobileCarousel testimonials={TESTIMONIALS} />
          <MarqueeRow testimonials={TESTIMONIALS} direction="left" />
          <MarqueeRow testimonials={TESTIMONIALS} direction="right" />
        </div>
      </div>
    </section>
  );
}

export default memo(TestimonialMarqueeComponent);
