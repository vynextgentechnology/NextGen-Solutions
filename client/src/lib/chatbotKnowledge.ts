export interface ChatAction {
  label: string;
  path?: string;
  externalUrl?: string;
  actionType?: "navigate" | "external" | "openForm" | "quickQuery";
  queryText?: string;
}

export interface BotResponse {
  text: string;
  actions?: ChatAction[];
  showLeadForm?: boolean;
}

export interface QuickSuggestion {
  id: string;
  label: string;
  iconName: string;
  query: string;
}

export const QUICK_SUGGESTIONS: QuickSuggestion[] = [
  {
    id: "web-dev",
    label: "🌐 Web Development",
    iconName: "Globe",
    query: "Tell me about your Web Development services and delivery timeline",
  },
  {
    id: "billing",
    label: "🧾 Billing & POS Demo",
    iconName: "Receipt",
    query: "Tell me about your retail POS and billing software features",
  },
  {
    id: "pricing",
    label: "💰 Get Price Estimate",
    iconName: "DollarSign",
    query: "How much does a website or POS software cost? I need an estimate",
  },
  {
    id: "human",
    label: "📞 Talk to Human Lead",
    iconName: "Phone",
    query: "Can I speak directly with someone from your team right now?",
  },
  {
    id: "careers",
    label: "💼 Careers & Jobs",
    iconName: "Briefcase",
    query: "What job openings are available at VY NextGen Technologies?",
  },
  {
    id: "internship",
    label: "🎓 Internship Program",
    iconName: "GraduationCap",
    query: "How can I apply for the software engineering internship program?",
  },
];

/**
 * Returns a warm, human-like greeting based on current time of day
 */
export function getFriendlyGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning! ☀️";
  if (hour < 17) return "Good afternoon! 🌤️";
  return "Good evening! 🌙";
}

export function getInitialWelcomeMessage(): BotResponse {
  const greeting = getFriendlyGreeting();
  return {
    text: `👋 **${greeting} Welcome to VY NextGen Technologies!**

I'm **VY Assistant**, your dedicated business and technology concierge. Whether you're planning a new website, upgrading your store's billing software, or exploring tech careers, I'm here to assist you every step of the way! 😊

**Popular questions I can answer right now:**
• 🌐 **Custom Web Development** (React, Next.js, 3–7 day delivery)
• 🧾 **Billing & POS Solutions** (Fast GST billing, offline-first mode)
• 💰 **Instant Quotes & Transparent Estimates**
• 💼 **Job Openings & Developer Internships**

Feel free to choose a quick topic below or type your question in your own words!`,
    actions: [
      { label: "🌐 Web Development", path: "/web-development", actionType: "navigate" },
      { label: "🧾 Billing Software Demo", path: "/billing-software", actionType: "navigate" },
      { label: "📝 Request Quick Quote", path: "/enquiry", actionType: "navigate" },
      { label: "💬 WhatsApp Us", externalUrl: "https://wa.me/918754020556?text=Hi%20VY%20NextGen%20Technology,%20I%20am%20chatting%20on%20your%20website%20and%20would%20love%20some%20information.", actionType: "external" },
    ],
  };
}

interface KnowledgeItem {
  keywords: string[];
  patterns: RegExp[];
  response: (input: string) => BotResponse;
}

export const KNOWLEDGE_BASE: KnowledgeItem[] = [
  // 1. Bot identity / Human vs AI
  {
    keywords: ["who are you", "what is your name", "are you human", "are you ai", "real person", "bot"],
    patterns: [
      /who.*(are|r)\s*you/i,
      /what.*your.*name/i,
      /are.*you.*(real|human|robot|ai|bot)/i,
      /talk.*to.*human/i,
      /speak.*with.*person/i,
    ],
    response: () => ({
      text: `Hello! 😊 I'm **VY Assistant**, an intelligent concierge crafted by the engineers at **VY NextGen Technologies**.

While I am powered by software, I work hand-in-hand with our real human team in Tamil Nadu! If you'd like to speak with our founders or engineering leads directly, we'd love to jump on a quick call with you.

Would you like me to connect you with our team right away?`,
      actions: [
        { label: "📞 Call +91 87540 20556", externalUrl: "tel:+918754020556", actionType: "external" },
        { label: "💬 WhatsApp with Human Lead", externalUrl: "https://wa.me/918754020556?text=Hi,%20I%20am%20on%20your%20website%20and%20would%20like%20to%20speak%20with%20a%20human%20representative.", actionType: "external" },
        { label: "📝 Request a Call Back", path: "/enquiry", actionType: "navigate" },
      ],
    }),
  },

  // 2. Casual small talk: How are you?
  {
    keywords: ["how are you", "how are u", "how do you do", "what's up", "whats up", "how r u"],
    patterns: [
      /how.*(are|r)\s*(you|u)/i,
      /how.*going/i,
      /what'?s\s*up/i,
    ],
    response: () => ({
      text: `I'm doing wonderful, thank you so much for asking! 😊 

I'm having a great day helping entrepreneurs, business owners, and developers build amazing digital products. 

How is your day going, and what exciting project or question can I help you with today?`,
      actions: [
        { label: "🌐 I need a Website", path: "/web-development", actionType: "navigate" },
        { label: "🧾 I need Billing Software", path: "/billing-software", actionType: "navigate" },
        { label: "💼 Looking for Careers", path: "/careers", actionType: "navigate" },
      ],
    }),
  },

  // 3. Web Development & Tech Stack
  {
    keywords: ["web", "website", "development", "react", "frontend", "backend", "fullstack", "portal", "ecommerce", "online store", "html", "nextjs", "node", "ui", "ux", "redesign"],
    patterns: [
      /web\s*dev/i,
      /build.*(website|site|web)/i,
      /create.*(website|store|app)/i,
      /e-?commerce/i,
      /tech\s*stack/i,
      /need.*a.*website/i,
    ],
    response: () => ({
      text: `🚀 **Crafting Exceptional Web Experiences!**

We'd love to help you build or revamp your website! At VY NextGen Technologies, our web engineering goes far beyond simple templates:

• **Modern & Fast**: Handcrafted using React, Next.js, TypeScript, and Tailwind CSS.
• **Lightning Speed**: 95+ PageSpeed scores to guarantee rapid load times and high Google rankings.
• **100% Mobile Responsive**: Flawless experience on iPhones, Android devices, tablets, and 4K displays.
• **Swift Turnaround**: Standard business websites are completed in **just 3 to 7 business days**!
• **Everything Included**: Free SSL, custom domain setup, professional corporate email, and ongoing support.

Would you like to explore our website packages, or would you like a quick quote for your specific idea?`,
      actions: [
        { label: "Explore Web Services", path: "/web-development", actionType: "navigate" },
        { label: "Request Custom Quote", path: "/enquiry", actionType: "navigate" },
        { label: "💬 Discuss on WhatsApp", externalUrl: "https://wa.me/918754020556?text=Hi,%20I%20am%20interested%20in%20developing%20a%20website%20for%20my%20business.", actionType: "external" },
      ],
    }),
  },

  // 4. Billing & POS Software
  {
    keywords: ["billing", "pos", "point of sale", "retail", "supermarket", "grocery", "restaurant", "pharmacy", "medical", "barcode", "thermal", "gst", "invoice", "counter", "inventory", "stock", "printer"],
    patterns: [
      /billing.*software/i,
      /pos.*system/i,
      /retail.*software/i,
      /supermarket/i,
      /thermal.*print/i,
      /gst.*invoice/i,
      /barcode/i,
    ],
    response: () => ({
      text: `🧾 **Smart, High-Speed POS & Billing Software**

Are you running a retail shop, supermarket, restaurant, or wholesale business? Our billing software is built to handle heavy rush hours with zero slowdown:

• **Sub-2-Second Billing**: Rapid barcode scanning and keyboard shortcuts for lightning-fast customer checkout.
• **100% Offline-First**: Works seamlessly even during internet cuts, syncing automatically when reconnected.
• **Hardware Compatibility**: Plug-and-play with all standard thermal printers (2-inch, 3-inch), barcode scanners, and cash drawers.
• **Inventory & Expiry Tracking**: Low-stock notifications and batch-wise expiry alerts so you never lose revenue.
• **GST Invoices & WhatsApp**: Generate compliant GST tax invoices and send digital receipts straight to your customer's WhatsApp.

**We offer 100% Free Live Demonstrations!** Would you like to schedule a free demo for your store?`,
      actions: [
        { label: "View POS Features", path: "/billing-software", actionType: "navigate" },
        { label: "Schedule Free Demo", path: "/enquiry", actionType: "navigate" },
        { label: "💬 Book Demo on WhatsApp", externalUrl: "https://wa.me/918754020556?text=Hi,%20I%20would%20like%20a%20free%20demo%20of%20your%20POS%20Billing%20Software.", actionType: "external" },
      ],
    }),
  },

  // 5. Pricing, Costs, and Estimates
  {
    keywords: ["price", "pricing", "cost", "how much", "rate", "quote", "estimation", "budget", "fees", "charge", "packages", "cheap", "expensive", "affordable"],
    patterns: [
      /how\s*much/i,
      /price\s*list/i,
      /what.*(cost|charge|fee)/i,
      /get.*quote/i,
      /affordable/i,
      /how\s*much\s*is/i,
    ],
    response: () => ({
      text: `💰 **Transparent, Friendly & Fair Pricing**

We believe high-quality engineering should be accessible and transparent without hidden surprise fees:

• **Business Websites**: Starting packages tailored for startups and local businesses, delivered ready-to-launch with free SSL and support.
• **Custom Portals & E-Commerce**: Flexible quotes based on exact features, user roles, and payment gateways.
• **Billing & POS Systems**: One-time license options or managed annual support plans per billing counter, including on-site setup and staff training.
• **Zero-Risk Consultation**: 100% free technical discussion and requirement analysis before any commitment.

Drop your details below and our team will prepare a customized quotation within **2 hours**!`,
      showLeadForm: true,
      actions: [
        { label: "Submit Online Quote Request", path: "/enquiry", actionType: "navigate" },
        { label: "📞 Call for Instant Quote", externalUrl: "tel:+918754020556", actionType: "external" },
      ],
    }),
  },

  // 6. Timelines & Turnaround speed
  {
    keywords: ["timeline", "how long", "how fast", "delivery time", "duration", "days", "weeks", "turnaround"],
    patterns: [
      /how.*long.*(take|build|deliver)/i,
      /when.*(can|will).*deliver/i,
      /delivery.*time/i,
      /how.*fast/i,
    ],
    response: () => ({
      text: `⏱️ **Fast Turnarounds Without Cutting Corners!**

Speed is one of our greatest strengths at VY NextGen Technologies:

• **Standard Business Websites**: 3 to 7 business days from requirement sign-off.
• **E-Commerce & Dynamic Portals**: 10 to 21 business days with full payment gateway & product configuration.
• **Billing & POS Software Setup**: Same-day or next-day on-site deployment, printer configuration, and staff training!

Do you have a specific launch deadline in mind? Let us know and we'll do everything possible to meet your schedule! 😊`,
      actions: [
        { label: "Share Your Target Timeline", path: "/enquiry", actionType: "navigate" },
        { label: "💬 Fast-Track on WhatsApp", externalUrl: "https://wa.me/918754020556?text=Hi,%20I%20have%20an%20urgent%20software%20project%20with%20a%20tight%20deadline.", actionType: "external" },
      ],
    }),
  },

  // 7. Careers & Job Openings
  {
    keywords: ["career", "careers", "job", "jobs", "hiring", "vacancy", "vacancies", "work", "apply", "developer", "engineer", "resume", "cv", "interview", "recruitment", "salary"],
    patterns: [
      /job.*opening/i,
      /are.*hiring/i,
      /apply.*job/i,
      /career.*opportunit/i,
      /open.*position/i,
      /fresher.*job/i,
    ],
    response: () => ({
      text: `💼 **Join the VY NextGen Engineering Team!**

We are always looking for passionate builders, problem solvers, and engineers who love modern technologies:

**Currently Active Openings:**
• 💻 **Frontend Engineer** — React, Next.js, Tailwind CSS, TypeScript
• ⚙️ **Backend Engineer** — Node.js, Express, PostgreSQL, REST/GraphQL
• 🚀 **Full-Stack Engineer** — Modern JavaScript/TypeScript stacks
• 🎨 **UI/UX Designer** — Figma, responsive design systems, micro-animations
• 📈 **Business Development Specialist** — Retail POS consulting and enterprise client acquisition

**How to Apply:**
We review applications directly through our **Official Google Recruitment Form** to ensure speedy screening within 48 hours!`,
      actions: [
        { label: "View Careers & Apply", path: "/careers", actionType: "navigate" },
        { label: "💬 Message HR on WhatsApp", externalUrl: "https://wa.me/918754020556?text=Hello%20HR%20Team,%20I%20am%20interested%20in%20career%20opportunities%20at%20VY%20NextGen%20Technologies.", actionType: "external" },
      ],
    }),
  },

  // 8. Internship Program
  {
    keywords: ["intern", "internship", "training", "student", "college", "certificate", "mern", "learn", "mentor", "stipend", "fresher", "junior", "course"],
    patterns: [
      /internship.*program/i,
      /apply.*intern/i,
      /student.*training/i,
      /college.*intern/i,
      /certificate/i,
    ],
    response: () => ({
      text: `🎓 **Software Engineering Internship & Incubation Program**

Looking to gain real-world product engineering experience instead of just theory? We've got you covered:

• **What You Build**: Production-grade Full-Stack applications using React, TypeScript, Node.js, and databases.
• **1-on-1 Mentorship**: Senior software architects review your code, guide your architecture, and provide personalized feedback.
• **Verified Credentials**: Official Certificate of Completion and Letter of Recommendation.
• **Career Opportunities**: Outstanding interns receive priority consideration for full-time engineering placements.
• **Flexible Durations**: 1-month and 3-month tracks for college students and recent graduates.`,
      actions: [
        { label: "Explore Internship Program", path: "/internship", actionType: "navigate" },
        { label: "Apply Now", path: "/enquiry", actionType: "navigate" },
        { label: "💬 Chat with Coordinator", externalUrl: "https://wa.me/918754020556?text=Hi,%20I%20am%20interested%20in%20the%20Software%20Development%20Internship%20Program.", actionType: "external" },
      ],
    }),
  },

  // 9. Leadership & Founders
  {
    keywords: ["about", "founder", "chairman", "ceo", "cto", "cfo", "director", "management", "leaders", "leadership", "valiullah", "yuvan", "narendra", "prajith", "santhosh", "yeswanth", "who started"],
    patterns: [
      /who.*(runs|leads|founded)/i,
      /about.*company/i,
      /executive.*team/i,
      /who.*founder/i,
      /who.*ceo/i,
    ],
    response: () => ({
      text: `🏢 **Meet Our Executive Leadership Team**

VY NextGen Technologies is driven by a passionate team of engineering and business innovators:

• **Mr. Valiullah** — *Founder & Executive Chairman* (Systems Architecture & R&D Governance)
• **Mr. Yuvan Shankar Raja** — *Co-Founder* (Fintech & Strategic Scalability)
• **Mr. Narendhra Prashath** — *Chief Executive Officer (CEO)* (Corporate Strategy & Enterprise Solutions)
• **Mr. Sri Prajith** — *Chief Technology & Chief Financial Officer (CTO/CFO)* (DevSecOps, Cloud & Fiscal Management)
• **Mr. Santhosh** — *Managing Director* (Engineering Standards & Operations)
• **Mr. Yeswanth** — *Director* (Strategic Partnerships & Regional Expansion)

Together, our leadership drives digital transformation across hundreds of businesses!`,
      actions: [
        { label: "Read Our Full Story", path: "/about", actionType: "navigate" },
        { label: "Contact Leadership", path: "/enquiry", actionType: "navigate" },
      ],
    }),
  },

  // 10. Contact, Phone, Location & Office
  {
    keywords: ["contact", "phone", "number", "call", "email", "address", "location", "office", "reach", "whatsapp", "tamil nadu", "where", "hours", "timing", "google map"],
    patterns: [
      /how.*contact/i,
      /phone.*number/i,
      /what.*email/i,
      /office.*address/i,
      /where.*located/i,
      /give.*me.*number/i,
    ],
    response: () => ({
      text: `📍 **We're Always Here for You!**

You can reach the VY NextGen team through any of these direct channels:

• 📱 **Direct Call**: [+91 87540 20556](tel:+918754020556)
• 💬 **WhatsApp**: [+91 87540 20556](https://wa.me/918754020556) *(Instant response 24/7)*
• ✉️ **Official Email**: [vynextgentechnology@gmail.com](mailto:vynextgentechnology@gmail.com)
• 🏢 **Headquarters**: Tamil Nadu, India *(serving pan-India & global clients)*
• ⏰ **Support Hours**: Monday to Saturday, 9:00 AM – 7:00 PM IST

Want us to call you back right away? Leave your phone number below!`,
      showLeadForm: true,
      actions: [
        { label: "📞 Call +91 87540 20556", externalUrl: "tel:+918754020556", actionType: "external" },
        { label: "💬 WhatsApp Us", externalUrl: "https://wa.me/918754020556", actionType: "external" },
        { label: "📝 Fill Enquiry Form", path: "/enquiry", actionType: "navigate" },
      ],
    }),
  },

  // 11. Tamil / Regional Friendly Greeting
  {
    keywords: ["vanakkam", "epdi irukinga", "nandri", "tamil"],
    patterns: [
      /vanakkam/i,
      /epdi\s*iruk/i,
      /nandri/i,
    ],
    response: () => ({
      text: `வணக்கம்! (Vanakkam!) 🙏

VY NextGen Technologies-க்கு உங்களை அன்போடு வரவேற்கிறோம்! 

எங்கள் **Web Development**, **Billing / POS Software**, அல்லது **Software Internship** சேவைகள் பற்றி என்ன தகவல் வேண்டும்? உங்களுக்கு உதவ நான் எப்போதும் தயார்! 😊`,
      actions: [
        { label: "🌐 Web Development", path: "/web-development", actionType: "navigate" },
        { label: "🧾 Billing Software", path: "/billing-software", actionType: "navigate" },
        { label: "💬 WhatsApp தொடர்பு", externalUrl: "https://wa.me/918754020556?text=Vanakkam%20VY%20NextGen%20Technology,%20enakku%20unga%20services%20patri%20details%20theva.", actionType: "external" },
      ],
    }),
  },

  // 12. Friendly Greetings
  {
    keywords: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "namaste", "howdy", "sup"],
    patterns: [
      /^(hi|hello|hey|namaste|greetings)(\s|$|[!?.])/i,
    ],
    response: () => {
      const greeting = getFriendlyGreeting();
      return {
        text: `Hello there! ${greeting} It's so nice to meet you. 😊

How can I help you today?
• Planning a **new website or redesign**?
• Interested in our **Retail POS / Billing software** demo?
• Want to discuss **pricing and project timelines**?
• Inquiring about **job openings or internships**?

Feel free to ask whatever is on your mind!`,
        actions: [
          { label: "🌐 Web Development", path: "/web-development", actionType: "navigate" },
          { label: "🧾 Billing Software Demo", path: "/billing-software", actionType: "navigate" },
          { label: "💰 Request Price Quote", path: "/enquiry", actionType: "navigate" },
          { label: "💬 Chat on WhatsApp", externalUrl: "https://wa.me/918754020556", actionType: "external" },
        ],
      };
    },
  },

  // 13. Gratitude & Goodbyes
  {
    keywords: ["thank", "thanks", "thank you", "thx", "appreciate", "helpful", "great", "awesome", "perfect", "bye", "goodbye", "see you"],
    patterns: [
      /thank/i,
      /you.*helped/i,
      /great.*job/i,
      /bye/i,
      /see.*you/i,
    ],
    response: () => ({
      text: `You're very welcome! It was truly my pleasure helping you! 😊❤️

If you ever have more questions or want to kickstart a project, our team is always just a quick message away on WhatsApp or phone at **+91 87540 20556**.

Wishing you great success with your business endeavors! Have an awesome day ahead! 🚀`,
      actions: [
        { label: "💬 Keep in touch on WhatsApp", externalUrl: "https://wa.me/918754020556", actionType: "external" },
        { label: "📝 Submit Project Details", path: "/enquiry", actionType: "navigate" },
      ],
    }),
  },
];

/**
 * Intelligent semantic matcher to return the most accurate and human-friendly response
 */
export function findBotResponse(userMessage: string): BotResponse {
  const cleanInput = userMessage.trim().toLowerCase();

  if (!cleanInput) {
    return {
      text: "I'm right here! Feel free to ask anything about our Web Development, Billing & POS systems, pricing, or career openings. 😊",
    };
  }

  // 1. Check regex patterns first
  for (const item of KNOWLEDGE_BASE) {
    for (const pattern of item.patterns) {
      if (pattern.test(cleanInput)) {
        return item.response(cleanInput);
      }
    }
  }

  // 2. Keyword score matching
  const inputWords = cleanInput.split(/\W+/).filter(Boolean);
  let bestMatch: KnowledgeItem | null = null;
  let highestScore = 0;

  for (const item of KNOWLEDGE_BASE) {
    let score = 0;
    for (const keyword of item.keywords) {
      if (cleanInput.includes(keyword.toLowerCase())) {
        score += keyword.length >= 5 ? 3 : 2;
      }
      for (const word of inputWords) {
        if (word === keyword.toLowerCase()) {
          score += 2;
        }
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && highestScore >= 2) {
    return bestMatch.response(cleanInput);
  }

  // 3. Empathetic smart fallback response
  return {
    text: `That's an interesting question! 😊 

While I might need a bit more specific context to give you the exact technical answer, here are the main ways our engineering team can help your business right now:

• 🌐 **Custom Web Platforms**: High-speed, responsive websites built with React & Next.js
• 🧾 **POS & Retail Billing**: Sub-2s checkout, offline mode, GST tax reports & WhatsApp receipts
• 💰 **Custom Quotations**: 100% free consultation and project estimates
• 💼 **Careers & Internships**: Opportunities for developers and fresh graduates

Would you like to connect directly with one of our human engineers or request a quick callback?`,
    showLeadForm: true,
    actions: [
      { label: "Request Free Consultation", path: "/enquiry", actionType: "navigate" },
      { label: "💬 Chat on WhatsApp (+91 87540 20556)", externalUrl: "https://wa.me/918754020556", actionType: "external" },
      { label: "📞 Call Human Lead", externalUrl: "tel:+918754020556", actionType: "external" },
    ],
  };
}
