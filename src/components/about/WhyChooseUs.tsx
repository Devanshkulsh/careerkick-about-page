import { motion } from "framer-motion";
import { useState } from "react";
import { ShieldCheck, Sparkles, Trophy, Users } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck size={28} />,
    title: "Trusted Guidance",
    desc: "Thousands of students rely on our expert counselling for secure admissions.",
  },
  {
    icon: <Sparkles size={28} />,
    title: "End-to-End Support",
    desc: "From counselling to final admission, we handle everything seamlessly.",
  },
  {
    icon: <Trophy size={28} />,
    title: "Proven Results",
    desc: "Consistent success in securing top colleges across India.",
  },
  {
    icon: <Users size={28} />,
    title: "Personalized Approach",
    desc: "Every student gets tailored guidance based on their goals.",
  },
];

export default function WhyChooseUs() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  return (
    <section
      className="relative w-full py-32 bg-black text-white overflow-hidden"
      onMouseMove={(e) => {
        setMouse({ x: e.clientX, y: e.clientY });
      }}
    >
      {/* 🌟 Dynamic Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition duration-300"
        style={{
          background: `radial-gradient(600px at ${mouse.x}px ${mouse.y}px, rgba(255,255,255,0.08), transparent 60%)`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Why Choose <span className="text-white/70">Careerkick</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            We don’t just guide you — we ensure your success with precision,
            strategy, and unmatched expertise.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.15,
                duration: 0.6,
                ease: "easeOut",
              }}
              whileHover={{ y: -10 }}
              className="group relative p-px rounded-2xl bg-linear-to-b from-white/20 to-white/0"
            >
              {/* Inner Card */}
              <div className="relative h-full rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 transition-all duration-300 group-hover:bg-white/10">

                {/* Glow Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 blur-2xl bg-white/10 rounded-2xl" />

                {/* Icon */}
                <div className="mb-4 text-white/80 group-hover:text-white transition">
                  {item.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}