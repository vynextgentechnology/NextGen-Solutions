import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

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
            <h2 className="text-3xl font-bold mb-10">Our Leadership</h2>
            <div className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-sm"
              >
                <Card className="hover-elevate transition-all duration-300 border-none shadow-md">
                  <CardContent className="pt-8 pb-8 text-center">
                    <Avatar className="w-24 h-24 mx-auto mb-6 border-2 border-primary/10">
                      <AvatarFallback className="bg-primary/5 text-primary font-bold text-2xl">
                        VY
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold text-slate-900">Founder & CEO</h3>
                    <p className="text-base text-slate-500 mt-2 font-medium">VY NextGen Technology</p>
                    <p className="text-sm text-slate-400 mt-4 leading-relaxed">
                      Leading the vision of VY NextGen Technology to provide innovative IT solutions and empower businesses globally.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
