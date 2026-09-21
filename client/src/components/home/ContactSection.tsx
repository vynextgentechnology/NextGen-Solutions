import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { useContactMutation } from "@/hooks/use-contact";
import { SectionHeader } from "@/components/SectionHeader";
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
import { Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";

export function ContactSection() {
  const contactMutation = useContactMutation();
  const [submitted, setSubmitted] = useState(false);

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
      onSuccess: () => {
        setSubmitted(true);
        form.reset();
      },
    });
  };

  return (
    <section className="py-16 sm:py-24 bg-white text-slate-900" id="contact">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        
        {/* Section Header */}
        <SectionHeader
          title="Contact Us"
          subtitle="Send us a message or reach out directly. We're here to help you get your software project started."
          align="center"
        />

        <div className="grid md:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Info */}
          <div className="md:col-span-5 p-7 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Get in Touch</h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                Have a question or requirement? Contact our team directly.
              </p>
            </div>

            <div className="space-y-4 pt-2 text-sm text-slate-700">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white border border-slate-200 text-blue-600 shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Email</p>
                  <a href="mailto:vynextgentechnology@gmail.com" className="font-semibold text-slate-900 hover:text-blue-600">
                    vynextgentechnology@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white border border-slate-200 text-blue-600 shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Phone</p>
                  <a href="tel:+918754020556" className="font-semibold text-slate-900 hover:text-blue-600">
                    +91 87540 20556
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white border border-slate-200 text-blue-600 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Location</p>
                  <p className="font-semibold text-slate-900">
                    Karur, Tamil Nadu, India
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200/80 text-xs text-slate-500">
              Response time: typically within a few hours.
            </div>
          </div>

          {/* Right: Clean Contact Form */}
          <div className="md:col-span-7 p-7 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm">
            {submitted ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Message Sent Successfully</h4>
                <p className="text-sm text-slate-600 max-w-sm mx-auto">
                  Thank you for reaching out. We will review your message and reply promptly.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSubmitted(false)}
                  className="rounded-xl text-xs font-semibold mt-2"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold text-slate-700">Name *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your full name"
                            {...field}
                            className="bg-white border-slate-200 rounded-xl h-10 text-sm focus:border-blue-600"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-rose-500" />
                      </FormItem>
                    )}
                  />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold text-slate-700">Email *</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="you@example.com"
                              {...field}
                              className="bg-white border-slate-200 rounded-xl h-10 text-sm focus:border-blue-600"
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-rose-500" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs font-semibold text-slate-700">Phone *</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your phone number"
                              {...field}
                              className="bg-white border-slate-200 rounded-xl h-10 text-sm focus:border-blue-600"
                            />
                          </FormControl>
                          <FormMessage className="text-xs text-rose-500" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-xs font-semibold text-slate-700">Message *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe what software you need..."
                            rows={4}
                            {...field}
                            className="bg-white border-slate-200 rounded-xl text-sm focus:border-blue-600 resize-none"
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-rose-500" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="w-full rounded-xl h-11 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
                  >
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
