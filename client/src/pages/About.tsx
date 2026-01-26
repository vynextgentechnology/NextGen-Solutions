import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const team = [
  "Yuvan Shankar Raja",
  "Narenthar Prasath",
  "Santhosh",
  "Yeswanth SM"
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">About VY NextGen Technology</h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              VY NextGen Technology is a growing IT solutions company delivering
              innovative digital services, software solutions, and internship programs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <motion.div {...fadeInUp} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold mb-4 text-primary">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed">
                To empower businesses and individuals with cutting-edge technology solutions that drive growth, efficiency, and innovation in an ever-evolving digital landscape.
              </p>
            </motion.div>
            <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold mb-4 text-primary">Our Vision</h2>
              <p className="text-slate-600 leading-relaxed">
                To be a leading global IT partner recognized for transforming ideas into reality through excellence in software development and digital transformation.
              </p>
            </motion.div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-10">Our Professional Team</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {team.map((name, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="hover-elevate transition-all duration-300 border-none shadow-md">
                    <CardContent className="pt-6 pb-6 text-center">
                      <Avatar className="w-20 h-20 mx-auto mb-4 border-2 border-primary/10">
                        <AvatarFallback className="bg-primary/5 text-primary font-bold text-xl">
                          {name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-bold text-slate-900">{name}</h3>
                      <p className="text-sm text-slate-500 mt-1">IT Professional</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
