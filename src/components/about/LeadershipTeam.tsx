import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const team = [
  {
    name: "Nikhil Sachan",
    role: "Founder & CEO",
    img: "/team/1.webp",
  },
  {
    name: "Nikhil Sachan",
    role: "Co-Founder",
    img: "/team/2.webp",
  },
  {
    name: "Nikhil Sachan",
    role: "Co-Founder",
    img: "/team/3.webp",
  },
];

export default function TeamSection() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <section ref={ref} className="w-full bg-white py-28 px-6 text-brand-navy">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16 text-center"
        >
          <h2 className="font-heading text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl">
            Meet The Leadership Team
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-brand-navy/70 sm:text-base">
            The people shaping CareerKick with student-first thinking,
            dependable execution, and years of admissions insight.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {team.map((member, i) => {
            // 🎯 SCALE BASED ON SCROLL (KEY EFFECT)
            const scale = useTransform(
              scrollYProgress,
              [0, 0.5, 1],
              [0.85, 1, 0.85],
            );

            const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

            return (
              <motion.div
                key={i}
                style={{ scale, y }}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className="group"
              >
                {/* Card */}
                <div className="relative rounded-2xl p-px bg-linear-to-b from-brand-navy/15 to-brand-navy/5 shadow-lg shadow-brand-navy/5">
                  <div className="rounded-2xl border border-brand-navy/10 bg-slate-50 p-4">
                    {/* Image */}
                    <div className="overflow-hidden rounded-xl">
                      <motion.img
                        src={member.img}
                        alt={member.name}
                        className="w-full h-65 object-cover rounded-xl"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>

                    {/* Text */}
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold text-brand-navy">
                        {member.name}
                      </h3>
                      <p className="text-sm text-brand-navy/65">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
