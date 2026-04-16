import { motion, AnimatePresence } from "framer-motion";
import { Shield, Sparkles, Users, Lock } from "lucide-react";
import { useState, useEffect } from "react";

const images = [
  "/services/ayush.webp",
  "/services/mbbs_govt.webp",
  "/services/mbbs_private.webp",
  "/services/bds.webp",
];

const featuresLeft = [
  {
    icon: <Sparkles size={18} />,
    title: "Ayush Counselling",
    desc: "Govt + Private Colleges",
  },
  {
    icon: <Users size={18} />,
    title: "MBBS Counselling (Govt College)",
    desc: "Complete admission support",
  },
];

const featuresRight = [
  {
    icon: <Shield size={18} />,
    title: "MBBS Counselling (Private College)",
    desc: "Private college admission guidance",
  },
  {
    icon: <Lock size={18} />,
    title: "BDS / BSc Nursing / Veterinary / BPT",
    desc: "All-inclusive counselling support",
  },
];

export default function FeatureSection() {
  const [index, setIndex] = useState(0);
  const [position, setPosition] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // ✅ CONTINUOUS LOOP SLIDER + IMAGE CHANGE
  useEffect(() => {
    if (isPaused) return;

    let animationFrame: number;
    let lastTime = performance.now();

    const speed = 20; // lower = slower (premium feel)

    const animate = (time: number) => {
      const delta = time - lastTime;
      lastTime = time;

      setPosition((prev) => {
        const next = prev + (delta / 1000) * speed;

        if (next >= 100) {
          setIndex((i) => (i + 1) % images.length);
          return 0;
        }

        return next;
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isPaused]);

  return (
    <section className="w-full bg-brand-surface text-brand-navy py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14 text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Counseling Programs Tailored To Your Career Path
          </h2>
          <p className="mt-3 text-sm text-brand-navy/70 sm:text-base">
            Explore specialized guidance options designed for medical and allied health admissions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">

          {/* LEFT */}
          <div className="space-y-10">
            {featuresLeft.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className="flex gap-4"
              >
                <div className="mt-1 text-brand-navy/55">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-brand-navy/70 text-sm mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CENTER CARD */}
          <div className="relative flex justify-center">

          {/* Glow */}
          <div className="absolute w-[320px] h-[320px] bg-brand-royal/10 blur-3xl rounded-full" />

          <div className="relative rounded-3xl p-4 bg-white backdrop-blur-xl border border-brand-navy/10 shadow-xl shadow-brand-navy/10">

            <div className="rounded-2xl p-4 bg-brand-surface border border-brand-navy/10">
              
              {/* BEFORE AFTER SLIDER */}
              <div
                className="relative w-[260px] h-[260px] overflow-hidden rounded-xl cursor-col-resize"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const percent = (x / rect.width) * 100;
                  setPosition(percent);
                }}
              >
                {/* BASE IMAGE */}
                <AnimatePresence mode="wait">
                  <motion.img
                    key={index}
                    src={images[index]}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 w-full h-full object-cover grayscale"
                  />
                </AnimatePresence>

                {/* REVEALED IMAGE */}
                <motion.div
                  className="absolute inset-0 overflow-hidden"
                  animate={{ width: `${position}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={index + "-color"}
                      src={images[index]}
                      initial={{ opacity: 0, scale: 1.05 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full h-full object-cover"
                    />
                  </AnimatePresence>
                </motion.div>

                {/* SLIDER LINE */}
                <motion.div
                  className="absolute top-0 bottom-0 w-[2px] bg-brand-navy"
                  animate={{ left: `${position}%` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />

                {/* HANDLE */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-brand-navy rounded-full shadow"
                  animate={{ left: `calc(${position}% - 8px)` }}
                  transition={{ duration: 0.1, ease: "linear" }}
                />
              </div>
            </div>
          </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-10">
            {featuresRight.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className="flex gap-4"
              >
                <div className="mt-1 text-brand-navy/55">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-brand-navy/70 text-sm mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
