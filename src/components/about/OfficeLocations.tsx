import { motion } from "framer-motion";
import { Clock3, MapPin } from "lucide-react";
import { memo, useMemo } from "react";
import Map from "../Map";

interface OfficeCardItem {
  id: string;
  name: string;
  branch: string;
  city: string;
  address: string;
  hours: string;
  href: string;
  center: [number, number];
}

const OFFICE_CARDS: OfficeCardItem[] = [
  {
    id: "kanpur",
    name: "Careerkick Services",
    branch: "Kanpur Branch",
    city: "Kanpur",
    address: "117 N 65, Rani Ganj, Kakadeo, Kanpur, 208025",
    hours: "10 AM - 6 PM",
    href: "https://maps.app.goo.gl/C7fjCr7jsH5zcAPE8",
    center: [80.2894, 26.4783],
  },
  {
    id: "greater-noida",
    name: "Careerkick Services",
    branch: "Greater Noida Branch",
    city: "Greater Noida",
    address:
      "2nd floor, AA -007, Block A, Ansal Golf Link -1, Greater Noida, Uttar Pradesh 201315",
    hours: "10 AM - 6 PM",
    href: "https://maps.app.goo.gl/j23DFmnco28ps6T29",
    center: [77.4995, 28.4744],
  },
  {
    id: "gorakhpur",
    name: "Careerkick Services",
    branch: "Gorakhpur Branch",
    city: "Gorakhpur",
    address:
      "2nd floor, 401, LIG 1st St, near Bargadwa, Vikas Nagar, Gorakhpur, Uttar Pradesh 273007",
    hours: "10 AM - 6 PM",
    href: "https://maps.app.goo.gl/QzgpEZ2osVwjUfQK9",
    center: [83.3732, 26.7606],
  },
];

function OfficeLocationsComponent() {
  const officeNodes = useMemo(() => {
    return OFFICE_CARDS.map((office, index) => (
      <motion.article
        key={office.id}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{
          delay: index * 0.12,
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1] as const,
        }}
        whileHover={{ y: -6 }}
        className="group relative overflow-hidden rounded-3xl border border-brand-navy/10 bg-slate-50 p-4 sm:p-5"
      >
        <Map
          center={office.center}
          zoom={15}
          title={`${office.name} · ${office.branch}`}
          address={office.address}
          locationUrl={office.href}
          className="h-52"
        />

        <div className="mt-5">
          <h3 className="text-xl font-semibold text-brand-navy">
            {office.city}
          </h3>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-brand-royal">
            {office.branch}
          </p>

          <div className="mt-4 flex items-start gap-3 text-sm leading-relaxed text-brand-navy/75">
            <MapPin className="mt-0.5 shrink-0 text-brand-royal" size={18} />
            <span>{office.address}</span>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-brand-navy/70">
            <Clock3 size={16} className="text-brand-royal" />
            {office.hours}
          </div>
        </div>
      </motion.article>
    ));
  }, []);

  return (
    <section
      id="office-locations"
      className="w-full bg-brand-surface text-brand-navy py-28 px-6"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(37,99,235,0.08),transparent_60%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="font-heading text-4xl font-bold tracking-tight text-brand-navy sm:text-5xl">
            Our Office Presence
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-brand-navy/70">
            Visit our branches and connect with counselors directly for
            personalized admission support.
          </p>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-brand-navy/15" />
        </motion.div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">{officeNodes}</div>
      </div>
    </section>
  );
}

export default memo(OfficeLocationsComponent);
