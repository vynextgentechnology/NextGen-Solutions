import { useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import About from "@/pages/About";
import WebDevelopment from "@/pages/WebDevelopment";
import BillingSoftware from "@/pages/BillingSoftware";
import Internship from "@/pages/Internship";
import Enquiry from "@/pages/Enquiry";

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // If there is no hash in URL, scroll to top
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/web-development" component={WebDevelopment} />
        <Route path="/billing-software" component={BillingSoftware} />
        <Route path="/internship" component={Internship} />
        <Route path="/enquiry" component={Enquiry} />
        <Route path="/order" component={Enquiry} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex flex-col min-h-screen">
          <main className="flex-grow">
            <Router />
          </main>
          <Footer />
          <FloatingWhatsApp />
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
