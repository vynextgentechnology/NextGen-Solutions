import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgressBar, ScrollToTopButton } from "@/components/ScrollAnimation";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import About from "@/pages/About";
import WebDevelopment from "@/pages/WebDevelopment";
import BillingSoftware from "@/pages/BillingSoftware";
import Internship from "@/pages/Internship";
import Enquiry from "@/pages/Enquiry";
import Careers from "@/pages/Careers";
import DigitalServices from "@/pages/DigitalServices";
import Solutions from "@/pages/Solutions";
import Services from "@/pages/Services";
import Products from "@/pages/Products";
import Industries from "@/pages/Industries";

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // If there is no hash in URL, scroll to top
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [location]);

  return null;
}

function Router() {
  const [location] = useLocation();

  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <motion.div
          key={location}
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: -12 }}
          transition={{
            duration: 0.36,
            ease: [0.16, 1, 0.3, 1], // Fluid spring pop-up effect
          }}
          className="w-full origin-top overflow-x-clip"
        >
          <Switch location={location}>
            <Route path="/" component={Home} />
            <Route path="/solutions" component={Solutions} />
            <Route path="/services" component={Services} />
            <Route path="/products" component={Products} />
            <Route path="/industries" component={Industries} />
            <Route path="/about" component={About} />
            <Route path="/web-development" component={WebDevelopment} />
            <Route path="/billing-software" component={BillingSoftware} />
            <Route path="/digital-services" component={DigitalServices} />
            <Route path="/internship" component={Internship} />
            <Route path="/careers" component={Careers} />
            <Route path="/jobs" component={Careers} />
            <Route path="/vacancies" component={Careers} />
            <Route path="/enquiry" component={Enquiry} />
            <Route path="/order" component={Enquiry} />
            <Route component={NotFound} />
          </Switch>
        </motion.div>
      </AnimatePresence>
    </>
  );
}



function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ScrollProgressBar />
        <CustomCursor />
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            <Router />
          </main>
          <Footer />
          <FloatingWhatsApp />
          <ScrollToTopButton />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
