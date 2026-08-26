import { getPlanById } from "./plans";
import planPricingImage from "@/assets/plans/pricing.png";

export const PLAN_PRICING_IMAGE = planPricingImage;

export const PLAN_DETAILS = {
  one: {
    detailBody:
      "Stay connected across Switzerland with generous data, unlimited calls and SMS, and no long-term commitment.",
    highlights: [
      { id: "5g", icon: "signal", label: "5G Ultra-Fast" },
      { id: "network", icon: "shield", label: "Reliable Swiss Network" },
      { id: "hotspot", icon: "wifi", label: "Hotspot Included" },
      { id: "support", icon: "headset", label: "24/7 Customer Support" },
    ],
    included: [
      {
        id: "data",
        icon: "signal",
        title: "25 GB in 5G",
        description: "High-speed data in Switzerland",
      },
      {
        id: "calls",
        icon: "phone",
        title: "Unlimited Calls",
        description: "Unlimited calls within Switzerland",
      },
      {
        id: "sms",
        icon: "message",
        title: "Unlimited SMS",
        description: "Unlimited SMS within Switzerland",
      },
      {
        id: "hotspot",
        icon: "wifi",
        title: "Hotspot Included",
        description: "Share your connection wherever you go",
      },
      {
        id: "commitment",
        icon: "ban",
        title: "No commitment",
        description: "No contract. Cancel anytime you want",
      },
      {
        id: "esim",
        icon: "sim",
        title: "eSIM Ready",
        description: "Activate instantly with a digital SIM",
      },
    ],
    summary: [
      { id: "data", icon: "signal", label: "Data", value: "25 GB in 5G" },
      { id: "calls", icon: "phone", label: "Calls", value: "Unlimited" },
      { id: "sms", icon: "message", label: "SMS", value: "Unlimited" },
      { id: "roaming", icon: "globe", label: "Roaming", value: "-" },
      { id: "hotspot", icon: "wifi", label: "Hotspot", value: "Included" },
      { id: "5g", icon: "wifi", label: "5G Access", type: "check" },
      { id: "esim", icon: "sim", label: "eSIM", value: "Included" },
      { id: "contract", icon: "file", label: "Contract", value: "No Commitment" },
    ],
    chooseLabel: "Choose This Plan",
    coveragePath: "/coverage",
  },
  plus: {
    detailBody:
      "Enjoy a connected life with unlimited calls and SMS, and stay connected across Switzerland and the EU.",
    highlights: [
      { id: "5g", icon: "signal", label: "5G Ultra-Fast" },
      { id: "network", icon: "shield", label: "Reliable Swiss Network" },
      { id: "roaming", icon: "globe", label: "Roaming in EU Included" },
      { id: "support", icon: "headset", label: "24/7 Customer Support" },
    ],
    included: [
      {
        id: "data",
        icon: "cloud",
        title: "80 GB in 5G",
        description: "High-speed data in Switzerland & EU",
      },
      {
        id: "roaming",
        icon: "phone",
        title: "Roaming in EU Included",
        description: "Use your data, calls and SMS across the EU",
      },
      {
        id: "calls",
        icon: "message",
        title: "Unlimited Calls",
        description: "Unlimited calls within Switzerland and EU",
      },
      {
        id: "commitment",
        icon: "ban",
        title: "No commitment",
        description: "No contract. Cancel anytime you want",
      },
      {
        id: "sms",
        icon: "globe",
        title: "Unlimited SMS",
        description: "Unlimited SMS within Switzerland and EU",
      },
      {
        id: "hotspot",
        icon: "shield",
        title: "Hotspot Included",
        description: "Share your connection wherever you go",
      },
    ],
    summary: [
      { id: "data", icon: "signal", label: "Data", value: "80 GB in 5G" },
      { id: "calls", icon: "phone", label: "Calls", value: "Unlimited" },
      { id: "sms", icon: "message", label: "SMS", value: "Unlimited" },
      { id: "roaming", icon: "globe", label: "Roaming", value: "EU Included" },
      { id: "hotspot", icon: "wifi", label: "Hotspot", value: "Included" },
      { id: "5g", icon: "wifi", label: "5G Access", type: "check" },
      { id: "esim", icon: "sim", label: "eSIM", value: "Included" },
      { id: "contract", icon: "file", label: "Contract", value: "No Commitment" },
    ],
    chooseLabel: "Choose This Plan",
    coveragePath: "/coverage",
  },
  max: {
    detailBody:
      "Get premium data, worldwide roaming, and priority network access for the ultimate mobile experience.",
    highlights: [
      { id: "5g", icon: "signal", label: "5G Ultra-Fast" },
      { id: "network", icon: "shield", label: "Reliable Swiss Network" },
      { id: "roaming", icon: "globe", label: "Roaming Worldwide" },
      { id: "support", icon: "headset", label: "24/7 Customer Support" },
    ],
    included: [
      {
        id: "data",
        icon: "signal",
        title: "150 GB in 5G",
        description: "High-speed data in Switzerland",
      },
      {
        id: "roaming",
        icon: "globe",
        title: "Roaming Worldwide",
        description: "Stay connected across the globe",
      },
      {
        id: "calls",
        icon: "phone",
        title: "Unlimited Calls",
        description: "Unlimited calls within Switzerland",
      },
      {
        id: "sms",
        icon: "message",
        title: "Unlimited SMS",
        description: "Unlimited SMS within Switzerland & EU",
      },
      {
        id: "priority",
        icon: "shield",
        title: "Priority Network",
        description: "Get priority access during peak times",
      },
      {
        id: "hotspot",
        icon: "wifi",
        title: "Hotspot Included",
        description: "Share your connection wherever you go",
      },
    ],
    summary: [
      { id: "data", icon: "signal", label: "Data", value: "150 GB in 5G" },
      { id: "calls", icon: "phone", label: "Calls", value: "Unlimited" },
      { id: "sms", icon: "message", label: "SMS", value: "Unlimited" },
      {
        id: "roaming",
        icon: "globe",
        label: "Roaming",
        value: "Worldwide Included",
      },
      { id: "hotspot", icon: "wifi", label: "Hotspot", value: "Included" },
      { id: "5g", icon: "wifi", label: "5G Access", type: "check" },
      { id: "esim", icon: "sim", label: "eSIM", value: "Included" },
      { id: "contract", icon: "file", label: "Contract", value: "No Commitment" },
    ],
    chooseLabel: "Choose This Plan",
    coveragePath: "/coverage",
  },
};

export const getPlanWithDetails = (planId) => {
  const plan = getPlanById(planId);
  const details = PLAN_DETAILS[planId];

  if (!plan || !details) return null;

  return { ...plan, ...details };
};
