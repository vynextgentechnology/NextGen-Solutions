import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { useContactMutation } from "@/hooks/use-contact";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Code2, 
  Smartphone, 
  Receipt, 
  GraduationCap, 
  Lightbulb, 
  ArrowRight,
  Send,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Instagram,
  Facebook
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";

import heroImage from "@assets/generated_images/modern_it_startup_office_hero_image.png";

export default function Home() {
  const contactMutation = useContactMutation();

  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (data: InsertContactMessage) => {
    contactMutation.mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-primary/10">
      <Navigation />

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Modern IT Office" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/80 via-slate-50/40 to-slate-50" />
          <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-accent/5 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Innovating the Future
              </div>
              <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                <span className="text-slate-900">VY NextGen</span>{" "}
                <span className="text-gradient">Technology</span>
              </h1>
              <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                Innovative IT Solutions for Your Business Growth. We transform ideas into digital reality with cutting-edge technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <ScrollLink to="contact" smooth={true} duration={500} offset={-80}>
                  <Button size="lg" className="rounded-full px-8 h-12 text-lg shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:-translate-y-1">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </ScrollLink>
                <ScrollLink to="services" smooth={true} duration={500} offset={-80}>
                  <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-lg border-2 hover:bg-slate-50">
                    Explore Services
                  </Button>
                </ScrollLink>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl bg-slate-100 overflow-hidden relative z-10">
                {/* Abstract visualization of technology since we don't have stock photos */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 opacity-10 rotate-12 scale-150">
                     <Code2 size={120} />
                     <Smartphone size={120} />
                     <Lightbulb size={120} />
                     <GraduationCap size={120} />
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                   <h3 className="text-3xl font-bold text-slate-800">Transforming Businesses Through Technology</h3>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-primary/20 rounded-3xl -z-10" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-primary font-bold tracking-wider uppercase text-sm">About Us</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">Who We Are</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                VY NextGen Technology is an emerging IT solutions company dedicated to helping businesses thrive in the digital age. We specialize in comprehensive web development, custom software services, and streamlined billing solutions.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                Beyond services, we are committed to nurturing the next generation of tech talent through our intensive online internship programs.
              </p>
              
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <CheckCircle2 />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Valiullah</p>
                  <p className="text-sm text-slate-500">Founder & CEO</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-primary font-bold tracking-wider uppercase text-sm">Our Expertise</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Quality Services for Business Growth</h2>
            <p className="text-slate-600">We offer a wide range of IT solutions tailored to meet your specific business needs and challenges.</p>
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: <Code2 className="h-8 w-8 text-white" />,
                title: "Web Development",
                desc: "Custom websites that are fast, responsive, and SEO-friendly.",
                color: "bg-blue-500"
              },
              {
                icon: <Smartphone className="h-8 w-8 text-white" />,
                title: "App Development",
                desc: "Native and cross-platform mobile applications for iOS and Android.",
                color: "bg-indigo-500"
              },
              {
                icon: <Receipt className="h-8 w-8 text-white" />,
                title: "Billing & GST",
                desc: "Streamlined billing software solutions compliant with GST standards.",
                color: "bg-purple-500"
              },
              {
                icon: <GraduationCap className="h-8 w-8 text-white" />,
                title: "Internship Programs",
                desc: "Practical training and certification for aspiring developers.",
                color: "bg-pink-500"
              },
              {
                icon: <Lightbulb className="h-8 w-8 text-white" />,
                title: "IT Consulting",
                desc: "Strategic technology advice to optimize your business operations.",
                color: "bg-orange-500"
              }
            ].map((service, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-8 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100"
              >
                <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Internship Section */}
      <section id="internship" className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-bold tracking-wider uppercase text-sm">Join Our Team</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6">Launch Your Career With Our Internship Program</h2>
              <p className="text-slate-300 text-lg mb-8">
                Gain hands-on experience working on real-world projects. Our mentorship program is designed to bridge the gap between academic learning and industry requirements.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "1 Month Intensive Online Training",
                  "Live Projects & Code Reviews",
                  "Industry Recognized Certificate",
                  "Affordable Fee Structure"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center text-xs">✓</div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <Button 
                size="lg" 
                className="rounded-full px-8 bg-white text-slate-900 hover:bg-slate-100 font-bold"
                onClick={() => window.open("https://forms.gle/skWDWMTWipZjRf8U6", "_blank")}
              >
                Apply Now
              </Button>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-20 blur-2xl rounded-full" />
              <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 text-center">
                <GraduationCap className="w-20 h-20 text-primary mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-2">Next Batch Starting Soon</h3>
                <p className="text-slate-400 mb-8">Limited seats available for the upcoming cohort.</p>
                <div className="inline-block bg-primary/20 rounded-lg px-6 py-3 border border-primary/30">
                  <span className="text-primary font-mono font-bold">Enrollment Open</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl shadow-slate-200 overflow-hidden border border-slate-100">
            <div className="grid md:grid-cols-5 h-full">
              {/* Contact Info Sidebar */}
              <div className="md:col-span-2 bg-slate-900 text-white p-10 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Get in Touch</h3>
                  <p className="text-slate-400 mb-8 text-sm">Fill up the form and our team will get back to you within 24 hours.</p>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <Phone className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Phone</p>
                        <p className="font-medium">8754020556</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Mail className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Email</p>
                        <p className="font-medium">vynextgentechnology@gmail.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <MapPin className="w-5 h-5 text-primary mt-1" />
                      <div>
                        <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Location</p>
                        <p className="font-medium">Karur, Tamil Nadu, India</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                   <p className="font-medium mb-4">Connect with us</p>
                   <div className="flex gap-4">
                      <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                        <Facebook size={18} />
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                        <Instagram size={18} />
                      </a>
                      <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                        <Linkedin size={18} />
                      </a>
                   </div>
                </div>
              </div>

              {/* Form Area */}
              <div className="md:col-span-3 p-10">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="John Doe" {...field} className="bg-slate-50 border-slate-200 focus:border-primary focus:ring-primary/20" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="+91..." {...field} className="bg-slate-50 border-slate-200 focus:border-primary focus:ring-primary/20" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" {...field} className="bg-slate-50 border-slate-200 focus:border-primary focus:ring-primary/20" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us about your project or inquiry..." 
                              className="min-h-[120px] bg-slate-50 border-slate-200 focus:border-primary focus:ring-primary/20 resize-none" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                      <Button 
                        type="submit" 
                        disabled={contactMutation.isPending}
                        className="flex-1 rounded-full shadow-lg shadow-primary/20 h-12 text-md"
                      >
                        {contactMutation.isPending ? "Sending..." : "Send Message"}
                        {!contactMutation.isPending && <Send className="ml-2 h-4 w-4" />}
                      </Button>
                      
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="flex-1 rounded-full border-green-500 text-green-600 hover:bg-green-50 h-12 text-md"
                        onClick={() => window.open("https://wa.me/918754020556", "_blank")}
                      >
                        <FaWhatsapp className="mr-2 h-5 w-5" /> Chat on WhatsApp
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">VY NextGen Technology</h2>
            <p className="text-sm">Innovating for a better tomorrow.</p>
          </div>
          
          <div className="flex justify-center gap-6 mb-8">
            {['Home', 'About', 'Services', 'Internship', 'Contact'].map((item) => (
              <ScrollLink 
                key={item} 
                to={item.toLowerCase()} 
                smooth={true} 
                duration={500}
                className="hover:text-primary transition-colors cursor-pointer text-sm"
              >
                {item}
              </ScrollLink>
            ))}
          </div>
          
          <div className="text-xs border-t border-slate-800 pt-8">
            <p>&copy; 2026 VY NextGen Technology. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
