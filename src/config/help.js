import helpHeroImage from "@/assets/help/hero.png";

export const HELP_HERO = {
  image: helpHeroImage,
  title: "Need Help?",
  subtitle: "We're here whenever you need us.",
  searchPlaceholder: "Search our Help Center...",
  searchLabel: "Search",
  popularLabel: "Popular searches:",
  popularSearches: [
    "eSIM activation",
    "Billing",
    "Coverage",
    "Top up",
    "Port my number",
  ],
};

export const HELP_SUPPORT_HIGHLIGHTS = {
  title: "Support Highlights",
  items: [
    {
      id: "support",
      icon: "headset",
      title: "Fast & Friendly Support",
      description: "We reply within 24 hours",
    },
    {
      id: "swiss",
      icon: "map",
      title: "Swiss Based",
      description: "Local support, local experts",
    },
    {
      id: "hours",
      icon: "clock",
      title: "Always Here",
      description: "Mon - Fri, 08:00 - 18:00",
    },
  ],
};

export const HELP_CATEGORIES = {
  title: "How can we help you?",
  items: [
    {
      id: "billing",
      icon: "billing",
      title: "Billing & Payments",
      description: "Manage your invoices, payments and billing details.",
    },
    {
      id: "esim",
      icon: "esim",
      title: "eSIM",
      description: "Activate, install and manage your eSIM.",
    },
    {
      id: "coverage",
      icon: "coverage",
      title: "Coverage",
      description: "Check network coverage in your area.",
    },
    {
      id: "plans",
      icon: "plans",
      title: "Plans & Options",
      description: "Explore plans and manage your options.",
    },
    {
      id: "roaming",
      icon: "roaming",
      title: "Roaming",
      description: "Use your line abroad with roaming.",
    },
    {
      id: "account",
      icon: "account",
      title: "Account & Security",
      description: "Manage account settings and security.",
    },
  ],
};

export const HELP_FAQ = {
  title: "Frequently Asked Questions",
  viewAll: { label: "View all articles", path: "/help" },
  items: [
    {
      id: "activate-esim",
      question: "How do I activate my eSIM?",
      answer:
        "After completing your order, scan the QR code we send you or enter the activation code manually in your device settings.",
    },
    {
      id: "invoice",
      question: "How do I view or download my invoice?",
      answer:
        "Log in to My Account and open the Billing section to view and download your invoices anytime.",
    },
    {
      id: "data-usage",
      question: "How can I check my data usage?",
      answer:
        "You can check your remaining data in the NovaSky app or from your account dashboard online.",
    },
    {
      id: "voicemail-pin",
      question: "How do I reset my Voicemail PIN?",
      answer:
        "Dial the voicemail service from your NovaSky line and follow the prompts to reset your PIN in settings.",
    },
    {
      id: "top-up",
      question: "How do I top up my balance?",
      answer:
        "Top up instantly through the NovaSky app, your online account, or at any authorized retail partner.",
    },
    {
      id: "5g-area",
      question: "Is NovaSky 5G available in my area?",
      answer:
        "Use our Coverage page to enter your address and see whether 5G and 4G are available where you are.",
    },
    {
      id: "port-number",
      question: "Can I keep my current phone number?",
      answer:
        "Yes. Start number porting during activation and we will transfer your existing Swiss number to NovaSky.",
    },
    {
      id: "contact-support",
      question: "How do I contact customer support?",
      answer:
        "Reach us via live chat, email at support@novasky.ch, or phone at 0800 800 100 during business hours.",
    },
    {
      id: "change-plan",
      question: "How do I change my plan?",
      answer:
        "Open My Account, go to Plans, and choose a new plan. Changes apply from your next billing cycle.",
    },
    {
      id: "cancel-plan",
      question: "How do I cancel my plan?",
      answer:
        "You can cancel anytime from My Account with no long-term commitment. Your line stays active until period end.",
    },
  ],
};

export const HELP_CONTACT = {
  title: "Contact Us",
  subtitle: "Choose the best way to reach our support team.",
  methods: [
    {
      id: "chat",
      icon: "chat",
      title: "Live Chat",
      description: "Chat with our support team in real time for quick assistance.",
      action: "Start Live Chat",
      footer: "Available now",
      footerType: "status",
    },
    {
      id: "email",
      icon: "email",
      title: "Email Support",
      description: "Send us an email and we'll get back to you as soon as possible.",
      action: "support@novasky.ch",
      footer: "We reply within 24h",
    },
    {
      id: "phone",
      icon: "phone",
      title: "Phone Support",
      description: "Speak directly with our support team for urgent matters.",
      action: "0800 800 100",
      footer: "Mon - Fri, 08:00 - 18:00",
    },
    {
      id: "business",
      icon: "business",
      title: "Business Support",
      description: "Dedicated support for business customers and enterprise accounts.",
      action: "Contact Business Team",
      footer: "Coming soon",
    },
  ],
};

export const HELP_EMERGENCY = {
  title: "Lost your phone or SIM?",
  description: "Block your line immediately to protect your account and personal data.",
  button: { label: "Block My Line", path: "/help" },
};

export const HELP_RESOURCES = {
  title: "More Ways to Get Help",
  description: "Explore guides, check system status, and download helpful resources.",
  items: [
    {
      id: "guides",
      icon: "guides",
      title: "User Guides",
      description: "Step-by-step guides and tutorials",
    },
    {
      id: "status",
      icon: "status",
      title: "System Status",
      description: "Check network status and updates",
    },
    {
      id: "downloads",
      icon: "downloads",
      title: "Downloads",
      description: "App, manuals and documents",
    },
  ],
};
