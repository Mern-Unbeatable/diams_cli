export const USER_SUPPORT = {
  header: {
    title: "Support",
    subtitle: "We're here to help. Find answers, get support or contact our team.",
  },
  tabs: [
    { id: "overview", label: "Overview" },
    { id: "tickets", label: "My Tickets" },
    { id: "faq", label: "FAQ" },
  ],
  searchBanner: {
    title: "How can we help you today?",
    subtitle: "Search our help center or choose a topic below.",
    placeholder: "Search for help articles...",
  },
  popularTopics: [
    {
      id: "esim",
      title: "eSIM Activation",
      description: "Learn how to activate your eSIM",
      icon: "cpu",
    },
    {
      id: "data",
      title: "Data & Connectivity",
      description: "Troubleshoot internet and network issues",
      icon: "wifi",
    },
    {
      id: "billing",
      title: "Billing & Payments",
      description: "Invoices, payments and refunds",
      icon: "credit-card",
    },
    {
      id: "account",
      title: "Account & Profile",
      description: "Manage your account and personal info",
      icon: "user",
    },
    {
      id: "sim-puk",
      title: "SIM & PUK",
      description: "PIN, PUK and SIM related help",
      icon: "sim",
    },
  ],
  recentTickets: [
    {
      id: "NS-84521",
      title: "eSIM activation issue",
      category: "eSIM",
      status: "Resolved",
      statusVariant: "green",
      updated: "Updated 2 days ago",
      date: "Aug 05, 2024",
      description:
        "My QR code was not scanning on the new iPhone. Support re-sent the SM-DP+ manual code and it activated immediately.",
    },
    {
      id: "NS-84211",
      title: "Payment not processed",
      category: "Billing",
      status: "In Progress",
      statusVariant: "blue",
      updated: "Updated 1 day ago",
      date: "Aug 04, 2024",
      description:
        "Credit card charge showed pending and Twint failed. Agent is reviewing transaction with SIX Payments.",
    },
    {
      id: "NS-83677",
      title: "Change of plan",
      category: "Plans",
      status: "Closed",
      statusVariant: "amber",
      updated: "Updated 5 days ago",
      date: "Jul 30, 2024",
      description:
        "Request to upgrade from NovaSky Plus to NovaSky Max at next billing cycle. Completed successfully.",
    },
  ],
  contactMethods: [
    {
      id: "chat",
      title: "Live Chat",
      statusText: "Available",
      statusColor: "text-emerald-600",
      icon: "chat",
    },
    {
      id: "ticket",
      title: "Open a Ticket",
      subtitle: "We'll reply by email",
      icon: "mail",
    },
    {
      id: "phone",
      title: "+41 800 123 456",
      subtitle: "24/7 Customer Support",
      icon: "phone",
    },
  ],
  frequentlyAskedQuestions: [
    {
      id: "faq-1",
      question: "How do I activate my eSIM?",
      answer:
        "Go to the eSIM section in your NovaSky dashboard, scan the generated QR code with your smartphone camera, or enter the SM-DP+ address and activation code manually.",
    },
    {
      id: "faq-2",
      question: "How do I top up my balance?",
      answer:
        "Navigate to Payments > Top Up, choose your desired amount (CHF 10 to CHF 100), and pay via Credit Card, Twint, Apple Pay, or PostFinance.",
    },
    {
      id: "faq-3",
      question: "How can I change my plan?",
      answer:
        "Visit the Plans & Options tab, select your preferred NovaSky plan, and confirm the upgrade or change. It will take effect on your next billing cycle.",
    },
    {
      id: "faq-4",
      question: "Why is my data not working?",
      answer:
        "Check that Data Roaming is turned ON for your NovaSky profile, verify your APN is set to 'internet.novasky.ch', and restart your device.",
    },
    {
      id: "faq-5",
      question: "How do I get my PUK code?",
      answer:
        "Your 8-digit PUK code is available in My Information > Security or printed on your original NovaSky welcome pack. You can also request it via 24/7 Live Chat.",
    },
  ],
  stillNeedHelp: {
    title: "Still need help?",
    subtitle: "Our support team is ready to assist you 24/7.",
    buttonText: "Start Live Chat",
  },
};
