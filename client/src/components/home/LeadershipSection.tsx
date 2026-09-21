import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/SectionHeader";
import { ShieldCheck, ArrowRight, Award } from "lucide-react";

import founderPhoto from "@assets/file_000000002dc871fa82cdcaab5c34b0ec_1776134862189.png";
import narendraPhoto from "@assets/narendra_prasath_ceo.png";
import yuvanPhoto from "@assets/yuvan_shankar_raja_co_founder.png";
import santhoshPhoto from "@assets/santhosh_managing_director.png";
import yeswanthPhoto from "@assets/yeswanth_director.png";
import sriPrajithPhoto from "@assets/sri_prajith_cto_cfo.png";

export function LeadershipSection() {
  const leaders = [
    {
      name: "Mr. Valiullah",
      role: "Founder & Executive Chairman",
      titleBadge: "Founder & Chairman",
      photo: founderPhoto,
      bio: "Visionary founder governing corporate mission, enterprise software architectures, regional digital transformation, and software developer incubation.",
    },
    {
      name: "Mr. Yuvan Shankar Raja",
      role: "Co-Founder",
      titleBadge: "Co-Founder",
      photo: yuvanPhoto,
      bio: "Co-founder driving corporate business architecture, strategic commercial partnerships, and enterprise cloud software scale.",
    },
    {
      name: "Mr. Narendhra Prashath",
      role: "Chief Executive Officer (CEO)",
      titleBadge: "CEO",
      photo: narendraPhoto,
      bio: "Directs corporate strategy, client acquisition, enterprise consulting engagements, and operational execution.",
    },
    {
      name: "Mr. Santhosh",
      role: "Managing Director",
      titleBadge: "Managing Director",
      photo: santhoshPhoto,
      bio: "Oversees enterprise deployment operations, engineering excellence, customer delivery pipelines, and quality assurance.",
    },
    {
      name: "Mr. Yeswanth",
      role: "Director",
      titleBadge: "Director",
      photo: yeswanthPhoto,
      bio: "Leads hardware-software integration initiatives, market expansion, industrial client relations, and project delivery.",
    },
    {
      name: "Mr. Sri Prajith",
      role: "CTO / CFO",
      titleBadge: "CTO & CFO",
      photo: sriPrajithPhoto,
      bio: "Oversees core technological innovation, systems security, fiscal architecture, and enterprise software engineering teams.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-slate-950 via-[#030d29] to-slate-950 text-slate-100 relative overflow-hidden" id="leadership">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <SectionHeader
          badge="Founding Governance"
          badgeIcon={<Award className="w-3.5 h-3.5 text-cyan-400" />}
          title="Executive Governance &"
          titleHighlight="Engineering Board"
          subtitle="Led by proven software architects, hardware technologists, and directors dedicated to building enduring digital and physical technology infrastructure."
          align="center"
        />

        {/* 6 Leaders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {leaders.map((leader, idx) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-slate-900/80 rounded-3xl border border-slate-800 overflow-hidden hover:border-cyan-500/50 transition-all duration-300 flex flex-col group hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="h-64 bg-slate-950 overflow-hidden relative flex items-center justify-center p-3">
                <img
                  src={leader.photo}
                  alt={leader.name}
                  className="h-full w-auto object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <span className="text-[10px] font-mono font-bold bg-slate-950/90 border border-slate-700 text-cyan-300 px-2.5 py-0.5 rounded-full shadow-lg">
                    {leader.titleBadge}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {leader.name}
                  </h3>
                  <p className="text-xs font-semibold text-blue-400 mt-0.5 mb-3 font-mono">
                    {leader.role}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {leader.bio}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>VY NextGen Board</span>
                  <Link href="/about" className="text-cyan-400 hover:underline font-semibold flex items-center gap-1">
                    <span>Full Bio</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/about">
            <Button
              variant="outline"
              className="rounded-xl px-7 h-11 border-slate-700 hover:bg-slate-800 text-slate-200 text-xs font-bold"
            >
              <span>Explore Corporate Mission & Incubation Story</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
