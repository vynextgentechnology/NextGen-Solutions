import { useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertWebsiteOrderSchema, type InsertWebsiteOrder } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  CheckCircle2, 
  ArrowRight, 
  PhoneCall, 
  ShieldCheck, 
  Clock, 
  Mail, 
  Phone, 
  MapPin, 
  Sparkles,
  Layers
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Enquiry() {
  const [submitted, setSubmitted] = useState(false);
  const [lastSubmittedData, setLastSubmittedData] = useState<InsertWebsiteOrder | null>(null);
  const { toast } = useToast();

  const form = useForm<InsertWebsiteOrder>({
    resolver: zodResolver(insertWebsiteOrderSchema),
    defaultValues: {
      businessName: "",
      clientName: "",
      email: "",
      phone: "",
      websiteType: "Corporate Business Website",
      requiredPages: "1 - 5 Pages",
      referenceWebsite: "",
      district: "",
      taluk: "",
      villageArea: "",
      additionalRequirements: "",
    },
  });

  const enquiryMutation = useMutation({
    mutationFn: async (data: InsertWebsiteOrder) => {
      const res = await apiRequest("POST", "/api/orders", data);
      return res.json();
    },
    onSuccess: (_, variables) => {
      setSubmitted(true);
      setLastSubmittedData(variables);
      toast({
        title: "Enquiry Submitted Successfully",
        description: "Our technical team has received your details and will contact you within 2 hours.",
      });
    },
    onError: (err: any) => {
      toast({
        title: "Submission Error",
        description: err.message || "Failed to submit enquiry. Please call us or try again.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: InsertWebsiteOrder) {
    enquiryMutation.mutate(data);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-blue-600/20 selection:text-blue-300 overflow-x-hidden">
      <Navigation />

      {/* Hero Header */}
      <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 bg-slate-950 text-white overflow-hidden">
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute inset-0 tech-grid-pattern-dark opacity-30 pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-cyan-300 text-xs sm:text-sm font-semibold mb-6 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>DIRECT CLIENT INTAKE • RAPID CONSULTATION</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
              Project & Service <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">Enquiry</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto">
              Share your project vision, website requirements, or software needs below. Our lead architects will prepare a comprehensive proposal, scope timeline, and budget estimate.
            </p>

            <div className="flex flex-wrap justify-center gap-3 mt-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                2-Hour Quick Response
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                100% Free Consultation
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                Custom Tailored Solutions
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="pb-24 pt-4 bg-slate-950 text-white relative z-10">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-xl">
            
            {/* Form Title & Subtitle matching reference */}
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-cyan-400 font-bold uppercase tracking-wider text-xs font-mono">
                // CLIENT ENQUIRY DESK
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mt-2 text-white">
                Submit Your Project Enquiry
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm mt-2">
                Provide your requirements below. Our technical team will reach out with a detailed proposal and contract.
              </p>
            </div>

            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-5"
              >
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40 shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Enquiry Successfully Submitted!
                </h3>
                <p className="text-slate-300 max-w-md mx-auto text-sm leading-relaxed">
                  Thank you, <strong className="text-cyan-300">{lastSubmittedData?.clientName || "Valued Client"}</strong>! Our engineering lead has been notified at <span className="font-mono text-cyan-400">vynextgentechnology@gmail.com</span> and will review your specifications within 2 hours.
                </p>

                <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <a
                    href={`https://wa.me/918754020556?text=${encodeURIComponent(
                      `Hello VY NextGen Technologies! I just submitted an enquiry for ${lastSubmittedData?.businessName || "my project"} (${lastSubmittedData?.websiteType}). Looking forward to your response!`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all shadow-lg shadow-emerald-600/30"
                  >
                    <FaWhatsapp className="w-4 h-4" />
                    <span>Ping Us on WhatsApp for Instant Update</span>
                  </a>

                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      form.reset();
                    }}
                    variant="outline"
                    className="rounded-full text-slate-300 border-slate-700 hover:bg-slate-800 hover:text-white"
                  >
                    Submit Another Enquiry
                  </Button>
                </div>
              </motion.div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  
                  {/* Row 1: Company Name & Contact Person */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="businessName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300 text-sm font-medium">
                            Company / Business Name
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. NextGen Logistics"
                              {...field}
                              className="bg-slate-900 border-slate-700 text-white focus:border-cyan-400 h-11"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="clientName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300 text-sm font-medium">
                            Contact Person Name <span className="text-rose-400">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your full name"
                              {...field}
                              className="bg-slate-900 border-slate-700 text-white focus:border-cyan-400 h-11"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Row 2: Email & Phone */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300 text-sm font-medium">
                            Email Address <span className="text-rose-400">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="contact@company.com"
                              {...field}
                              className="bg-slate-900 border-slate-700 text-white focus:border-cyan-400 h-11"
                            />
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
                          <FormLabel className="text-slate-300 text-sm font-medium">
                            Mobile / WhatsApp Number <span className="text-rose-400">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. 9876543210"
                              {...field}
                              className="bg-slate-900 border-slate-700 text-white focus:border-cyan-400 h-11"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Row 3: Category & Pages */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="websiteType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300 text-sm font-medium">
                            Project / Service Category
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value || "Corporate Business Website"}>
                            <FormControl>
                              <SelectTrigger className="bg-slate-900 border-slate-700 text-white h-11">
                                <SelectValue placeholder="Select service category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-slate-900 border-slate-700 text-white">
                              <SelectItem value="Corporate Business Website">Corporate Business Website</SelectItem>
                              <SelectItem value="E-Commerce Online Store">E-Commerce Online Store</SelectItem>
                              <SelectItem value="Custom Web Application / SaaS">Custom Web Application / SaaS</SelectItem>
                              <SelectItem value="Billing & GST POS Software">Billing & GST POS Software</SelectItem>
                              <SelectItem value="Mobile App (iOS & Android)">Mobile App (iOS & Android)</SelectItem>
                              <SelectItem value="Landing Page & Lead Funnel">Landing Page & Lead Funnel</SelectItem>
                              <SelectItem value="UI/UX & Product Design">UI/UX & Product Design</SelectItem>
                              <SelectItem value="Website Redesign & Maintenance">Website Redesign & Maintenance</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="requiredPages"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300 text-sm font-medium">
                            Estimated Page Count / Modules
                          </FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value || "1 - 5 Pages"}>
                            <FormControl>
                              <SelectTrigger className="bg-slate-900 border-slate-700 text-white h-11">
                                <SelectValue placeholder="Select pages / modules" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-slate-900 border-slate-700 text-white">
                              <SelectItem value="Single Page Landing">Single Page Landing (1 Page)</SelectItem>
                              <SelectItem value="1 - 5 Pages">1 - 5 Pages (Standard)</SelectItem>
                              <SelectItem value="6 - 15 Pages">6 - 15 Pages (Growth)</SelectItem>
                              <SelectItem value="15+ Pages / Custom Portal">15+ Pages / Complex Portal</SelectItem>
                              <SelectItem value="Billing POS Suite">Billing POS & Retail Suite</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Row 4: Reference Website & City */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="referenceWebsite"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300 text-sm font-medium">
                            Reference Website / Competitor Link (Optional)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. https://apple.com or competitor.in"
                              {...field}
                              value={field.value || ""}
                              className="bg-slate-900 border-slate-700 text-white focus:border-cyan-400 h-11"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="district"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300 text-sm font-medium">
                            Your City / Location
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Karur, Chennai, Bangalore"
                              {...field}
                              value={field.value || ""}
                              className="bg-slate-900 border-slate-700 text-white focus:border-cyan-400 h-11"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Row 5: Description & Special Features */}
                  <FormField
                    control={form.control}
                    name="additionalRequirements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300 text-sm font-medium">
                          Project Description & Special Features Needed
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Tell us about your brand, required integrations (payment gateway, CRM, WhatsApp automation), target launch date..."
                            rows={4}
                            {...field}
                            value={field.value || ""}
                            className="bg-slate-900 border-slate-700 text-white focus:border-cyan-400 resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit Buttons matching reference */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button
                      type="submit"
                      disabled={enquiryMutation.isPending}
                      className="flex-1 h-12 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-lg shadow-blue-500/30 transition-all hover:scale-[1.01]"
                    >
                      {enquiryMutation.isPending ? (
                        <span>Submitting Enquiry...</span>
                      ) : (
                        <span className="flex items-center justify-center">
                          Confirm & Submit Project Enquiry
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </span>
                      )}
                    </Button>

                    <a
                      href="tel:+918754020556"
                      className="flex items-center justify-center gap-2 px-6 h-12 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-900 transition-colors text-sm font-semibold"
                    >
                      <PhoneCall className="w-4 h-4 text-cyan-400" />
                      <span>Call Engineering Team</span>
                    </a>
                  </div>

                  <p className="text-center text-xs text-slate-500 pt-2">
                    Direct notification will be dispatched to <span className="text-slate-400 font-mono">vynextgentechnology@gmail.com</span> upon submission.
                  </p>
                </form>
              </Form>
            )}

          </div>

          {/* Quick Support strip */}
          <div className="mt-12 grid sm:grid-cols-3 gap-4">
            <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Direct Helpline</p>
                <a href="tel:+918754020556" className="text-sm font-bold text-white hover:text-cyan-400 transition-colors">
                  +91 87540 20556
                </a>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Official Mail Desk</p>
                <a href="mailto:vynextgentechnology@gmail.com" className="text-xs font-bold text-white hover:text-cyan-400 transition-colors truncate block">
                  vynextgentechnology@gmail.com
                </a>
              </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-slate-400">Engineering HQ</p>
                <p className="text-sm font-bold text-white">Karur, Tamil Nadu</p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
