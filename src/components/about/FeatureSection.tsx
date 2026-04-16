import { motion } from "framer-motion";
import { Shield, Sparkles, Users, Lock } from "lucide-react";

const featuresLeft = [
  {
    icon: <Sparkles size={18} />,
    title: "Generative editing",
    desc: "Describe the look you want in plain language—relight scenes, swap backgrounds, and refine portraits.",
  },
  {
    icon: <Users size={18} />,
    title: "Teams & workspaces",
    desc: "Invite retouchers and producers with the right permissions and keep everything in one studio.",
  },
];

const featuresRight = [
  {
    icon: <Shield size={18} />,
    title: "Privacy & originals",
    desc: "Your raws and exports stay yours with encryption and zero-retention processing.",
  },
  {
    icon: <Lock size={18} />,
    title: "Client-ready delivery",
    desc: "Share proofs and finals with secure links and watermark protection.",
  },
];

export default function FeatureSection() {
  return (
    <section className="w-full bg-black text-white py-28 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 items-center">

        {/* LEFT */}
        <div className="space-y-10">
          {featuresLeft.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="flex gap-4"
            >
              <div className="mt-1 text-gray-400">{item.icon}</div>
              <div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mt-1">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CENTER CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative flex justify-center"
        >
          {/* Glow */}
          <div className="absolute w-[320px] h-[320px] bg-white/10 blur-3xl rounded-full" />

          {/* Outer Glass */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="relative rounded-3xl p-4 bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_20px_60px_rgba(255,255,255,0.1)]"
          >
            {/* Inner Frame */}
            <div className="rounded-2xl p-4 bg-white/5 border border-white/10">
              
              {/* Image Container */}
              <motion.div
                whileHover={{ filter: "grayscale(0%)" }}
                initial={{ filter: "grayscale(100%)" }}
                className="rounded-xl overflow-hidden"
              >
                <img
                  src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1"
                  alt="profile"
                  className="w-[260px] h-[260px] object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT */}
        <div className="space-y-10">
          {featuresRight.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="flex gap-4"
            >
              <div className="mt-1 text-gray-400">{item.icon}</div>
              <div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mt-1">
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