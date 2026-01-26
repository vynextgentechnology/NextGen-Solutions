import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertWebsiteOrderSchema, type InsertWebsiteOrder } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { motion } from "framer-motion";

const tnServices = [
  "Community Certificate",
  "Income Certificate",
  "Nativity Certificate",
  "OBC / BC / MBC Certificate",
  "First Graduate Certificate",
  "Legal Heir Certificate",
  "Birth Certificate",
  "Death Certificate",
  "New Ration Card",
  "Ration Card Correction",
  "Ration Card Addition / Removal",
  "Aadhar Update",
  "Aadhar Linking",
  "New PAN",
  "PAN Correction",
  "Voter ID Services",
  "Driving Licence (DL) Services",
  "Learner Licence (LL)",
  "Passport Assistance",
  "Patta / Chitta / Land Record Services",
  "EB / TNEB Online Services",
  "Pension Related Services",
  "Government Scheme Application Assistance",
  "Scholarship Application Support",
  "Other Government Digital Services"
];

export default function DigitalServices() {
  const { toast } = useToast();
  
  const orderMutation = useMutation({
    mutationFn: async (data: InsertWebsiteOrder) => {
      const res = await apiRequest("POST", "/api/orders", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Request Submitted",
        description: "Our team will contact you shortly regarding your digital services request.",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const form = useForm<InsertWebsiteOrder>({
    resolver: zodResolver(insertWebsiteOrderSchema),
    defaultValues: {
      businessName: "",
      clientName: "",
      email: "",
      phone: "",
      websiteType: "",
      district: "",
      taluk: "",
      villageArea: "",
      additionalRequirements: "",
    },
  });

  const onSubmit = (data: InsertWebsiteOrder) => {
    orderMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Card className="border-none shadow-xl shadow-slate-200/50">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-3xl font-bold text-primary">Tamil Nadu Government Digital Services Request</CardTitle>
              <CardDescription className="text-lg mt-2">
                We provide complete Tamil Nadu Government (TNeSevai / e-Sevai) digital services.
                Submit your request and our team will assist you end-to-end.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="clientName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Applicant Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter applicant name" {...field} />
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
                          <FormLabel>Mobile Number</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter mobile number" {...field} />
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
                          <Input type="email" placeholder="email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="district"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>District</FormLabel>
                          <FormControl>
                            <Input placeholder="District" {...field} value={field.value ?? ""} />
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
                          <FormLabel>Taluk</FormLabel>
                          <FormControl>
                            <Input placeholder="Taluk" {...field} value={field.value ?? ""} />
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
                          <FormLabel>Village / Area</FormLabel>
                          <FormControl>
                            <Input placeholder="Village / Area" {...field} value={field.value ?? ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="websiteType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select digital service" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-[300px]">
                            {tnServices.map((service) => (
                              <SelectItem key={service} value={service}>
                                {service}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="additionalRequirements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Requirements / Explanation</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Provide more details about your request..." 
                            className="min-h-[120px] resize-none" 
                            {...field} 
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Hidden field for businessName to satisfy validation if required */}
                  <div className="hidden">
                    <FormField
                      control={form.control}
                      name="businessName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input {...field} value="TN Government Services" />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full h-12 text-lg font-bold rounded-xl bg-primary hover:bg-primary/90"
                    disabled={orderMutation.isPending}
                  >
                    {orderMutation.isPending ? "Submitting..." : "Submit Digital Service Request"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
