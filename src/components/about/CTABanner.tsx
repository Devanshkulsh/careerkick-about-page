import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import {
  ArrowRight,
  Phone,
  GraduationCap,
  BookOpen,
  School,
  Stethoscope,
} from "lucide-react";
import { memo, useCallback, useRef } from "react";

const CTA_BANNER_CONTENT = {
  title: "Ready To Plan Your Dream Admission Journey?",
  description:
    "Connect with CareerKick's expert counselors and build a personalized strategy for your next admission cycle.",
  primaryAction: {
    label: "Book Counseling Session",
    href: "https://careerkick.in",
  },
  secondaryAction: {
    label: "Call Us Now",
    href: "tel:+917390950914",
  },
};

const FloatingElement = ({
  children,
  className,
  delay = 0,
  duration = 6,
}: any) => (
  <motion.div
    animate={{
      y: [0, -20, 0],
      rotate: [0, 10, 0],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
    className={`absolute hidden lg:flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-5 text-white/30 shadow-2xl ${className}`}
  >
    {children}
  </motion.div>
);

function CTABannerComponent() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const handlePrimaryClick = useCallback(() => {
    window.open(CTA_BANNER_CONTENT.primaryAction.href, "_blank");
  }, []);

  const handleSecondaryClick = useCallback(() => {
    window.location.href = CTA_BANNER_CONTENT.secondaryAction.href;
  }, []);

  // Mouse Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  // Subtle rotation for the container
  const rotateX = useTransform(springY, [-500, 500], [5, -5]);
  const rotateY = useTransform(springX, [-500, 500], [-5, 5]);

  // Inverse movement for icons to create depth
  const iconX = useTransform(springX, [-500, 500], [20, -20]);
  const iconY = useTransform(springY, [-500, 500], [20, -20]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      className="relative w-full bg-black py-20 px-4 sm:py-32 sm:px-6 overflow-hidden text-white flex items-center justify-center"
    >
      {/* 🌌 LAYER 1: BACKGROUND GRADIENT */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(37,99,235,0.15),transparent_70%)] pointer-events-none" />

      {/* 🎓 LAYER 2: FLOATING ELEMENTS */}
      <motion.div
        style={{ x: iconX, y: iconY, perspective: 1000 }}
        className="absolute inset-0 z-0 pointer-events-none max-w-7xl mx-auto"
      >
        {/* Top Left */}
        <FloatingElement
          className="top-[10%] left-[5%] sm:left-[10%]"
          duration={5}
        >
          <GraduationCap size={38} />
        </FloatingElement>

        {/* Top Right */}
        <FloatingElement
          className="top-[15%] right-[5%] sm:right-[10%]"
          delay={1}
          duration={7}
        >
          <Stethoscope size={30} />
        </FloatingElement>

        {/* Bottom Left */}
        <FloatingElement
          className="bottom-[15%] left-[8%] sm:left-[12%]"
          delay={0.5}
          duration={6}
        >
          <BookOpen size={34} />
        </FloatingElement>

        {/* Bottom Right */}
        <FloatingElement
          className="bottom-[10%] right-[8%] sm:right-[12%]"
          delay={1.5}
          duration={8}
        >
          <School size={40} />
        </FloatingElement>
      </motion.div>

      {/* ⚡ LAYER 3: AMBIENT LIGHTING */}
      <motion.div
        animate={{ opacity: [0, 0, 0.2, 0] }}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 8 }}
        className="absolute inset-0 bg-blue-400/5 mix-blend-overlay pointer-events-none"
      />

      {/* 📦 LAYER 4: MAIN CONTENT CARD */}
      <div className="w-full max-w-4xl relative z-10">
        <motion.div
          style={{ rotateX, rotateY }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[2.5rem] border border-white/10 bg-white/2 backdrop-blur-2xl px-6 py-16 sm:px-16 sm:py-24 text-center shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          {/* Inner Decorative Glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-600/20 blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-purple-600/20 blur-[100px] pointer-events-none" />

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            {CTA_BANNER_CONTENT.title}
          </h2>

          <p className="mt-8 text-white/50 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {CTA_BANNER_CONTENT.description}
          </p>

          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
            <motion.button
              onClick={handlePrimaryClick}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(255,255,255,0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto group flex items-center justify-center gap-3 rounded-full px-10 py-5 text-sm font-bold text-black bg-white transition-all"
            >
              {CTA_BANNER_CONTENT.primaryAction.label}
              <ArrowRight
                size={20}
                className="transition-transform group-hover:translate-x-1"
              />
            </motion.button>

            <motion.button
              onClick={handleSecondaryClick}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.1)",
              }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto group flex items-center justify-center gap-3 rounded-full px-10 py-5 text-sm font-bold text-white border border-white/20 bg-transparent backdrop-blur-md transition-all"
            >
              <Phone size={18} />
              {CTA_BANNER_CONTENT.secondaryAction.label}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default memo(CTABannerComponent);
