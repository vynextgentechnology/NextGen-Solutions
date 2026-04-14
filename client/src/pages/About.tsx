import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import founderPhoto from "@assets/file_000000002dc871fa82cdcaab5c34b0ec_1776134862189.png";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const leaders = [
  {
    name: "Mr. Valiullah",
    role: "Founder & CEO",
    initials: "VU",
    photo: founderPhoto,
    description:
      "Visionary leader driving VY NextGen Technology's mission to deliver innovative IT solutions and empower businesses across India and beyond.",
  },
  {
    name: "Mr. Yuvan Shankar Raja",
    role: "Head of Financial Solutions",
    initials: "YR",
    description:
      "Expert in financial technology, steering the company's financial strategy and digital payment solutions for clients.",
  },
  {
    name: "Mr. Narendra Prasath",
    role: "Head of IT Consulting",
    initials: "NP",
    description:
      "Seasoned IT consultant who bridges the gap between technology and business, guiding clients through complex digital transformations.",
  },
  {
    name: "Mr. Shanthosh",
    role: "Head of Software Development",
    initials: "SH",
    description:
      "Leads the software engineering team in building robust, scalable web and mobile applications tailored to client needs.",
  },
  {
    name: "Mr. Yeswanth",
    role: "Head of Business Development",
    initials: "YW",
    description:
      "Drives growth by identifying new opportunities, building partnerships, and expanding VY NextGen Technology's market presence.",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />

      <main className="pt-24 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-4 max-w-4xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              About VY NextGen Technology
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              VY NextGen Technology is a growing IT solutions company delivering
              innovative digital services, software solutions, and internship
              programs.
            </p>
          </motion.div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              {...fadeInUp}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
            >
              <h2 className="text-2xl font-bold mb-4 text-primary">
                Our Mission
              </h2>
              <p className="text-slate-600 leading-relaxed">
                To empower businesses and individuals with cutting-edge
                technology solutions that drive growth, efficiency, and
                innovation in an ever-evolving digital landscape.
              </p>
            </motion.div>
            <motion.div
              {...fadeInUp}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
            >
              <h2 className="text-2xl font-bold mb-4 text-primary">
                Our Vision
              </h2>
              <p className="text-slate-600 leading-relaxed">
                To be a leading global IT partner recognized for transforming
                ideas into reality through excellence in software development
                and digital transformation.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Leadership Section */}
        <section
          className="py-20 px-4"
          style={{
            background:
              "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
          }}
        >
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Our Leadership Team
              </h2>
              <p className="text-blue-200 text-lg max-w-2xl mx-auto">
                Meet the passionate leaders driving VY NextGen Technology
                forward with expertise, dedication, and innovation.
              </p>
            </motion.div>

            {/* Top row: 2 cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 max-w-3xl mx-auto">
              {leaders.slice(0, 2).map((leader, index) => (
                <LeaderCard key={leader.name} leader={leader} index={index} />
              ))}
            </div>

            {/* Bottom row: 3 cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {leaders.slice(2).map((leader, index) => (
                <LeaderCard
                  key={leader.name}
                  leader={leader}
                  index={index + 2}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function LeaderCard({
  leader,
  index,
}: {
  leader: (typeof leaders)[0];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.04, y: -6 }}
      className="relative group cursor-default"
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        borderRadius: "1.25rem",
        padding: "2rem",
        textAlign: "center",
        boxShadow:
          "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
        transition: "box-shadow 0.3s ease",
      }}
    >
      {/* Glow on hover */}
      <div
        className="absolute inset-0 rounded-[1.25rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: "0 0 40px 8px rgba(59, 130, 246, 0.25)",
        }}
      />

      {/* Avatar */}
      <div
        className="w-24 h-24 rounded-full mx-auto mb-5 overflow-hidden flex items-center justify-center text-2xl font-bold"
        style={{
          border: "2px solid rgba(59,130,246,0.4)",
          boxShadow: "0 4px 20px rgba(59,130,246,0.3)",
          background:
            "linear-gradient(135deg, rgba(59,130,246,0.8), rgba(99,102,241,0.8))",
        }}
      >
        {"photo" in leader && leader.photo ? (
          <img
            src={leader.photo}
            alt={leader.name}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <span style={{ color: "#fff" }}>{leader.initials}</span>
        )}
      </div>

      <h3 className="text-lg font-bold text-white mb-1">{leader.name}</h3>
      <p
        className="text-sm font-semibold mb-4"
        style={{
          background: "linear-gradient(90deg, #60a5fa, #a78bfa)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {leader.role}
      </p>
      <p className="text-sm text-blue-100 leading-relaxed">
        {leader.description}
      </p>
    </motion.div>
  );
}
