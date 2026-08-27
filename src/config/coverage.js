import coverageHeroImage from "@/assets/coverage/hero.png";
import coverageMapImage from "@/assets/coverage/map.png";

export const COVERAGE_HERO = {
  image: coverageHeroImage,
  title: "Check NovaSky",
  titleAccent: "Coverage",
  subtitle: "Discover our fast and reliable 5G network across Switzerland.",
  cta: { label: "Check Coverage", path: "#coverage-search" },
};

export const COVERAGE_SEARCH = {
  title: "Check Coverage in Your Area",
  description: "Enter your address or postcode to see the coverage quality.",
  placeholder: "Enter your address or postcode",
  buttonLabel: "Search",
  examples: [
    { label: "1000 Lausanne", value: "1000 Lausanne" },
    { label: "8001 Zürich", value: "8001 Zürich" },
    { label: "1204 Genève", value: "1204 Genève" },
  ],
};

export const COVERAGE_QUALITY = {
  title: "Excellent 5G Coverage",
  metrics: [
    { id: "download", icon: "download", label: "Download", value: "stars" },
    { id: "upload", icon: "upload", label: "Upload", value: "stars" },
    {
      id: "indoor",
      icon: "home",
      label: "Indoor Coverage",
      value: "Excellent",
    },
    {
      id: "outdoor",
      icon: "outdoor",
      label: "Outdoor Coverage",
      value: "Excellent",
    },
  ],
};

export const COVERAGE_NETWORK = {
  title: "Our Network, Built for You",
  subtitle: "Enjoy high-speed connectivity and reliable service everywhere you go.",
  features: [
    {
      id: "5g",
      icon: "wifi",
      title: "5G Coverage",
      description: "Ultra-fast 5G speeds in more and more cities and towns.",
    },
    {
      id: "4g",
      icon: "signal",
      title: "4G LTE",
      description: "Reliable 4G LTE coverage across the country.",
    },
    {
      id: "voice",
      icon: "phone",
      title: "Voice Calls",
      description: "Crystal-clear calls on our advanced network.",
    },
    {
      id: "roaming",
      icon: "globe",
      title: "International Roaming",
      description: "Stay connected in 100+ countries worldwide.",
    },
  ],
};

export const COVERAGE_MAP = {
  label: "Coverage map",
  title: "Switzerland, Connected",
  description:
    "Our network is continuously expanding to bring you the best coverage and experience possible.",
  image: coverageMapImage,
  legend: [
    { id: "excellent", label: "Excellent Coverage", color: "bg-emerald-500" },
    { id: "good", label: "Good Coverage", color: "bg-btnPrimary" },
    { id: "limited", label: "Limited Coverage", color: "bg-amber-500" },
  ],
};

export const COVERAGE_FAQ = {
  title: "Frequently Asked Questions",
  items: [
    {
      id: "accuracy",
      question: "How accurate is the coverage map?",
      answer:
        "Our coverage map is based on real network data and field measurements. It is updated regularly to reflect the latest coverage across Switzerland.",
    },
    {
      id: "5g",
      question: "What is 5G coverage?",
      answer:
        "5G coverage refers to areas where our latest-generation network is available, offering significantly faster speeds and lower latency than 4G.",
    },
    {
      id: "call-quality",
      question: "Does coverage affect call quality?",
      answer:
        "Yes. Stronger coverage generally means clearer voice calls and more stable connections. Our map helps you check expected quality in your area.",
    },
    {
      id: "roaming",
      question: "Do you offer international roaming?",
      answer:
        "Yes. NovaSky plans include EU roaming, and we offer international roaming in 100+ destinations worldwide.",
    },
    {
      id: "rural",
      question: "Will I have coverage in rural areas?",
      answer:
        "We provide extensive coverage across Switzerland, including many rural regions. Use the search tool above to check coverage at your specific address.",
    },
    {
      id: "updates",
      question: "How often is the coverage map updated?",
      answer:
        "We update our coverage map quarterly, or whenever significant network expansions are completed.",
    },
  ],
};

export const COVERAGE_CTA = {
  title: "Ready to join NovaSky?",
  subtitle:
    "Get your eSIM in minutes and connect to Switzerland's fast and reliable network.",
  button: { label: "Get Started", path: "/plans" },
};
