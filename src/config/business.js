import businessHeroImage from "@/assets/business/hero.png";
import businessCtaImage from "@/assets/business/cta.png";

export const BUSINESS_HERO = {
  image: businessHeroImage,
  label: "NovaSky Business",
  title: "Business Connectivity",
  titleAccent: "Made Simple",
  subtitle:
    "Flexible mobile solutions for businesses of all sizes. Reliable. Scalable. Swiss.",
  cta: { label: "Contact Sales", path: "/help" },
};

export const BUSINESS_HERO_FEATURES = [
  {
    id: "businesses",
    icon: "building",
    title: "For businesses",
    description: "From startups to enterprise",
  },
  {
    id: "quality",
    icon: "shield",
    title: "Swiss quality",
    description: "Reliable 5G network across Switzerland",
  },
  {
    id: "support",
    icon: "phone",
    title: "Dedicated support",
    description: "Priority support from our business team",
  },
  {
    id: "scale",
    icon: "chart",
    title: "Scalable solutions",
    description: "Plans that grow with your business",
  },
];

export const BUSINESS_WHY_CHOOSE = {
  label: "Why choose NovaSky Business?",
  title: "The Right Connection for Your Business",
  cards: [
    {
      id: "flexible",
      icon: "file",
      iconBg: "bg-sky-50",
      iconColor: "text-sky-500",
      title: "Flexible Plans",
      description:
        "Choose the right data, minutes and features for your team. Change anytime.",
    },
    {
      id: "support",
      icon: "headset",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-500",
      title: "Dedicated Support",
      description:
        "Get priority assistance from our business specialists whenever you need it.",
    },
    {
      id: "network",
      icon: "wifi",
      iconBg: "bg-violet-50",
      iconColor: "text-violet-500",
      title: "5G Network",
      description:
        "Enjoy Switzerland's reliable 5G network for faster performance everywhere.",
    },
    {
      id: "billing",
      icon: "card",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-500",
      title: "Centralized Billing",
      description:
        "One consolidated invoice for all your lines. Simple, transparent and efficient.",
    },
  ],
};

export const BUSINESS_PLANS_SECTION = {
  label: "Business plans",
  title: "Plans Built for Every Business",
};

export const BUSINESS_PLANS = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Perfect for small teams",
    price: "19.90",
    currency: "CHF",
    period: "/line per month",
    popular: false,
    features: [
      "20 GB Switzerland Data",
      "Unlimited Calls in Switzerland",
      "Unlimited SMS",
      "EU Roaming Included",
      "eSIM Included",
    ],
    cta: { label: "Get Started", path: "/plans", variant: "outline" },
  },
  {
    id: "business-plus",
    name: "Business Plus",
    tagline: "Ideal for growing businesses",
    price: "29.90",
    currency: "CHF",
    period: "/line per month",
    popular: true,
    features: [
      "Unlimited Switzerland Data",
      "Unlimited Calls in Switzerland",
      "Unlimited SMS",
      "EU Roaming Included",
      "International Calls Add-on",
      "Priority Support",
    ],
    cta: { label: "Get Started", path: "/plans", variant: "solid" },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For large organizations",
    price: "Custom",
    currency: "",
    period: "Tailored for your needs",
    popular: false,
    features: [
      "Custom Data & Voice",
      "Multi-country Roaming",
      "Centralized Management",
      "Dedicated Account Manager",
      "SLA & Advanced Support",
      "Custom integrations",
    ],
    cta: { label: "Contact Sales", path: "/help", variant: "outline" },
  },
];

export const BUSINESS_FEATURES_SECTION = {
  label: "Powerful features",
  title: "Everything You Need to Run Your Business",
  link: { label: "See all features", path: "/help" },
  features: [
    {
      id: "lines",
      icon: "file",
      title: "Multi-line Management",
      description: "Add, remove and manage lines easily.",
    },
    {
      id: "security",
      icon: "shield",
      title: "Security & Control",
      description: "Control usage and permissions.",
    },
    {
      id: "pools",
      icon: "users",
      title: "Shared Data & Pools",
      description: "Share data across your team.",
    },
    {
      id: "analytics",
      icon: "chart",
      title: "Detailed Analytics",
      description: "Track usage with advanced reports.",
    },
    {
      id: "roaming",
      icon: "globe",
      title: "International Roaming",
      description: "Stay connected in 100+ destinations.",
    },
    {
      id: "api",
      icon: "cpu",
      title: "APIs & Integrations",
      description: "Seamless integration with your tools.",
    },
  ],
};

export const BUSINESS_CONTACT_FORM = {
  label: "Talk to our business team",
  title: "Let's Build the Right Solution for Your Business",
  submitLabel: "Request a Quote",
  lineOptions: [
    { value: "", label: "Select range" },
    { value: "1-5", label: "1–5 lines" },
    { value: "6-20", label: "6–20 lines" },
    { value: "21-50", label: "21–50 lines" },
    { value: "51-100", label: "51–100 lines" },
    { value: "100+", label: "100+ lines" },
  ],
  trustBadges: [
    {
      id: "consultation",
      icon: "check",
      title: "No commitment",
      description: "Get a free consultation",
    },
    {
      id: "response",
      icon: "clock",
      title: "Quick response",
      description: "We reply within 24h",
    },
    {
      id: "secure",
      icon: "lock",
      title: "100% secure",
      description: "Your data is protected",
    },
  ],
};

export const BUSINESS_CTA = {
  image: businessCtaImage,
  title: "Ready to connect your business with Switzerland's new network?",
  subtitle: "Join NovaSky Business and experience the future of connectivity.",
  button: { label: "Contact Sales", path: "/help" },
};
