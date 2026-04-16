import { motion } from "framer-motion";
import { Clock3, MapPin } from "lucide-react";
import { memo, useMemo } from "react";

const OFFICES = [
  {
    id: "noida",
    city: "Noida",
    address: "AA-007 Golf Link-1, Greater Noida",
    hours: "10 AM - 7 PM",
  },
  {
    id: "kanpur",
    city: "Kanpur",
    address: "117 N 65, Kakadeo",
    hours: "10 AM - 7 PM",
  },
  {
    id: "gorakhpur",
    city: "Gorakhpur",
    address: "CareerKick Regional Office, Gorakhpur",
    hours: "10 AM - 7 PM",
  },
];

function OfficeLocationsComponent() {
  const officeNodes = useMemo(() => {
    return OFFICES.map((office, index) => (
      <motion.div
        key={office.id}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{
          delay: index * 0.15,
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{ y: -8 }}
        className="group relative"
      >
        {/* Gradient Border */}
        <div className="absolute inset-0 rounded-3xl bg-linear-to-b from-brand-navy/12 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

        {/* Card */}
        <div className="relative h-full rounded-3xl border border-brand-navy/10 bg-slate-50 p-6 transition-all duration-300 group-hover:bg-white group-hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)]">

          {/* Glow */}
          <div className="absolute inset-0 rounded-3xl bg-brand-royal/10 opacity-0 blur-2xl transition duration-500 group-hover:opacity-100" />

          {/* City */}
          <h3 className="text-xl font-semibold text-brand-navy">
            {office.city}
          </h3>

          {/* Address */}
          <div className="mt-4 flex items-start gap-3 text-sm leading-relaxed text-brand-navy/70">
            <MapPin className="mt-[2px] shrink-0 text-brand-royal" size={18} />
            <span>{office.address}</span>
          </div>

          {/* Hours */}
          <div className="mt-4 flex items-center gap-2 text-sm text-brand-navy/65">
            <Clock3 size={16} className="text-brand-royal" />
            {office.hours}
          </div>
        </div>
      </motion.div>
    ));
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-white px-6 py-28 text-brand-navy">
      
      {/* Background Map Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(37,99,235,0.08),transparent_60%)]" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="font-heading text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl">
            Our Office Presence
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-brand-navy/70">
            Strategically located across India to support students at every step.
          </p>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-brand-navy/15" />
        </motion.div>

        {/* Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {officeNodes}
        </div>
      </div>
    </section>
  );
}

export default memo(OfficeLocationsComponent);
