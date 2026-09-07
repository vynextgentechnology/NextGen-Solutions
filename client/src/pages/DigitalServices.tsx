import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertWebsiteOrderSchema, type InsertWebsiteOrder } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import {
  Building2,
  FileText,
  Search,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  PhoneCall,
  Sparkles,
  HelpCircle,
  FileCheck,
  CreditCard,
  Car,
  Home
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

interface ServiceItem {
  name: string;
  category: "Certificates" | "Ration & Civil" | "Identity (Aadhar/PAN)" | "Land & Utility" | "Welfare & Schemes";
  docs: string;
}

const allServices: ServiceItem[] = [
  { name: "Community Certificate (சாதி சான்றிதழ்)", category: "Certificates", docs: "Aadhar, Ration Card, Parent's TC / Community Cert, Photo" },
  { name: "Income Certificate (வருமான சான்றிதழ்)", category: "Certificates", docs: "Aadhar, Ration Card, Salary Slip / Income Proof, Photo" },
  { name: "Nativity Certificate (இருப்பிட சான்றிதழ்)", category: "Certificates", docs: "Aadhar, Ration Card, Gas Bill / EB Bill, Photo" },
  { name: "OBC / BC / MBC Certificate", category: "Certificates", docs: "Aadhar, Community Certificate, Income Proof, Photo" },
  { name: "First Graduate Certificate (முதல் பட்டதாரி சான்றிதழ்)", category: "Certificates", docs: "Aadhar, Ration Card, 10th/12th Marksheet, Parent/Sibling TC" },
  { name: "Legal Heir Certificate (வாரிசு சான்றிதழ்)", category: "Certificates", docs: "Deceased Death Certificate, Legal Heirs Aadhar, Ration Card" },
  { name: "Birth / Death Certificate Download", category: "Certificates", docs: "Hospital Discharge / Registration number, Date of Event" },
  { name: "New Smart Ration Card Apply", category: "Ration & Civil", docs: "Aadhar cards of all members, Gas connection proof, Rental agreement" },
  { name: "Ration Card Member Addition (Baby / Spouse)", category: "Ration & Civil", docs: "Birth Certificate / Marriage Certificate, Aadhar, Existing Card" },
  { name: "Ration Card Member Deletion / Address Change", category: "Ration & Civil", docs: "Marriage Certificate / Death Certificate, New Address Proof" },
  { name: "Aadhar Card Correction / Update Assistance", category: "Identity (Aadhar/PAN)", docs: "Valid Proof of Identity & Address (Passport/Voter/Marksheet)" },
  { name: "New PAN Card (Instant E-PAN & Physical)", category: "Identity (Aadhar/PAN)", docs: "Aadhar Card with linked mobile number for OTP" },
  { name: "PAN Card Correction / Name Update", category: "Identity (Aadhar/PAN)", docs: "Aadhar Card, Supporting Gazette / Marksheet" },
  { name: "Voter ID New Registration / Correction", category: "Identity (Aadhar/PAN)", docs: "Aadhar, Age Proof (10th/Birth Cert), Passport Photo" },
  { name: "Driving Licence (DL) / Learner Licence (LL)", category: "Land & Utility", docs: "Aadhar Card, Blood Group Proof, Age Proof" },
  { name: "Patta / Chitta / Land Record (நில ஆவணங்கள்)", category: "Land & Utility", docs: "Survey Number, Sub-division, Taluk & Village Details" },
  { name: "TNEB EB Name Transfer & New Connection", category: "Land & Utility", docs: "Tax Receipt, Sale Deed Copy, Aadhar Card" },
  { name: "Passport Application & Slot Booking", category: "Land & Utility", docs: "Aadhar Card, 10th Marksheet, Pan Card, Bank Passbook" },
  { name: "Old Age Pension (OAP) Assistance", category: "Welfare & Schemes", docs: "Aadhar, Age Proof (60+), Ration Card, Bank Passbook" },
  { name: "Government Scholarship Application Support", category: "Welfare & Schemes", docs: "Income Cert, Community Cert, College Fee Receipt, Bank Passbook" }
];

export default function DigitalServices() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [submitted, setSubmitted] = useState(false);

  const orderMutation = useMutation({
    mutationFn: async (data: InsertWebsiteOrder) => {
      const res = await apiRequest("POST", "/api/orders", data);
      return res.json();
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Digital Service Request Received!",
        description: "Our e-Sevai coordinator will contact you shortly with required document verification.",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Submission Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const form = useForm<InsertWebsiteOrder>({
    resolver: zodResolver(insertWebsiteOrderSchema),
    defaultValues: {
      businessName: "Citizen Digital Services",
      clientName: "",
      email: "",
      phone: "",
      websiteType: "Community Certificate (சாதி சான்றிதழ்)",
      district: "",
      taluk: "",
      villageArea: "",
      additionalRequirements: "",
    },
  });

  const onSubmit = (data: InsertWebsiteOrder) => {
    orderMutation.mutate(data);
  };

  const filteredServices = allServices.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          s.docs.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || s.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Certificates", "Ration & Civil", "Identity (Aadhar/PAN)", "Land & Utility", "Welfare & Schemes"];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-emerald-500/20">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 tech-grid-pattern-dark opacity-25" />
        <div className="absolute -top-40 right-1/3 w-96 h-96 bg-emerald-500/20 rounded-full blur-[130px]" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Tamil Nadu Citizen e-Governance Assistance
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6">
              Tamil Nadu <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">e-Sevai & Digital</span> Services
            </h1>

            <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
              Get hassle-free, fast online processing for government revenue certificates, smart ration cards, Patta/Chitta land records, and welfare schemes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#request-service">
                <Button size="lg" className="rounded-full px-8 h-12 bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-500/30">
                  Submit Online Request <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </a>
              <a
                href="https://wa.me/918754020556?text=Hello%20VY%20NextGen%20Technology,%20I%20need%20assistance%20with%20Tamil%20Nadu%20e-Sevai%20services."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg" className="rounded-full px-8 h-12 border-emerald-500/40 text-emerald-300 hover:bg-emerald-950/40 font-bold">
                  <FaWhatsapp className="mr-2 w-5 h-5 text-emerald-400" /> WhatsApp e-Sevai Desk
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Directory of Services with Search & Categories */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-emerald-600 font-bold uppercase tracking-wider text-xs">Search Directory</span>
            <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mt-2">Browse All 20+ Digital Services</h2>
            <p className="text-slate-600 mt-2">Filter by category or search below to check eligibility and required documents.</p>
          </div>

          {/* Search bar */}
          <div className="max-w-xl mx-auto mb-8 relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search certificate, land record, ration card..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 h-12 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/20"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Service Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full inline-block mb-3">
                    {service.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mb-2">{service.name}</h3>
                  <div className="space-y-1 pt-2 border-t border-slate-200">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Required Documents:</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{service.docs}</p>
                  </div>
                </div>

                <div className="pt-5">
                  <a
                    href="#request-service"
                    onClick={() => form.setValue("websiteType", service.name)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700"
                  >
                    <span>Apply for this Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              <p>No services match your search term. Call our helpline at +91 87540 20556 for custom assistance.</p>
            </div>
          )}

        </div>
      </section>

      {/* Online Request Form */}
      <section id="request-service" className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto bg-slate-950 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-emerald-400 font-bold uppercase tracking-wider text-xs">Citizen Application</span>
              <h2 className="text-3xl font-black mt-2 text-white">Online Digital Service Application</h2>
              <p className="text-slate-400 text-sm mt-2">
                Fill the details below. Our team will verify your documents and initiate application processing.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white">Request Successfully Submitted!</h3>
                <p className="text-slate-400 max-w-md mx-auto text-sm">
                  Thank you! Our e-Sevai executive will contact you to collect document copies via WhatsApp or Email.
                </p>
                <div className="pt-4">
                  <Button
                    onClick={() => setSubmitted(false)}
                    variant="outline"
                    className="rounded-full text-slate-300 border-slate-700"
                  >
                    Submit Another Request
                  </Button>
                </div>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="clientName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Applicant Full Name (விண்ணப்பதாரர் பெயர்)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. S. Murugan"
                              {...field}
                              className="bg-slate-900 border-slate-700 text-white focus:border-emerald-400"
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
                          <FormLabel className="text-slate-300">Mobile / WhatsApp Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. 9876543210"
                              {...field}
                              className="bg-slate-900 border-slate-700 text-white focus:border-emerald-400"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Email Address (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="applicant@gmail.com"
                              {...field}
                              className="bg-slate-900 border-slate-700 text-white focus:border-emerald-400"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="websiteType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Select Digital Service</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value || allServices[0].name}>
                            <FormControl>
                              <SelectTrigger className="bg-slate-900 border-slate-700 text-white">
                                <SelectValue placeholder="Select service" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-slate-900 border-slate-700 text-white max-h-72">
                              {allServices.map((s) => (
                                <SelectItem key={s.name} value={s.name}>
                                  {s.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="district"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">District (மாவட்டம்)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Karur"
                              {...field}
                              value={field.value || ""}
                              className="bg-slate-900 border-slate-700 text-white focus:border-emerald-400"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="taluk"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Taluk (வட்டம்)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Karur Taluk"
                              {...field}
                              value={field.value || ""}
                              className="bg-slate-900 border-slate-700 text-white focus:border-emerald-400"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="villageArea"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Village / Town / Area</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Pasupathipalayam"
                              {...field}
                              value={field.value || ""}
                              className="bg-slate-900 border-slate-700 text-white focus:border-emerald-400"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="additionalRequirements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300">Additional Remarks or Urgent Deadlines</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any specific instructions, college admission submission date, or questions..."
                            rows={3}
                            {...field}
                            value={field.value || ""}
                            className="bg-slate-900 border-slate-700 text-white focus:border-emerald-400 resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col sm:flex-row gap-4 pt-2">
                    <Button
                      type="submit"
                      disabled={orderMutation.isPending}
                      className="flex-1 h-12 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base shadow-lg shadow-emerald-500/30"
                    >
                      {orderMutation.isPending ? "Submitting Request..." : "Submit e-Sevai Assistance Request"}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                    <a
                      href="tel:+918754020556"
                      className="flex items-center justify-center gap-2 px-6 h-12 rounded-xl border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-900 transition-colors text-sm font-semibold"
                    >
                      <PhoneCall className="w-4 h-4 text-emerald-400" />
                      <span>Helpline: 8754020556</span>
                    </a>
                  </div>
                </form>
              </Form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
