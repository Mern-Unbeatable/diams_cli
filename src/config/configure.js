export const CHECKOUT_STEPS = [
  {
    id: 1,
    slug: "configure",
    label: "Configure",
    description: "Choose your plan & SIM",
  },
  {
    id: 2,
    slug: "personal-info",
    label: "Personal Info",
    description: "Tell us about yourself",
  },
  {
    id: 3,
    slug: "verification",
    label: "Verification",
    description: "Identity check",
  },
  {
    id: 4,
    slug: "payment",
    label: "Payment",
    description: "Secure payment",
  },
  {
    id: 5,
    slug: "review",
    label: "Review",
    description: "Confirm your order",
  },
  {
    id: 6,
    slug: "confirmation",
    label: "Confirmation",
    description: "You're all set!",
  },
];

export const SIM_OPTIONS = [
  {
    id: "esim",
    title: "eSIM",
    icon: "esim",
    features: [
      "Instant activation",
      "No physical SIM card",
      "Scan QR code and you're ready",
    ],
  },
  {
    id: "physical",
    title: "Physical SIM",
    icon: "sim",
    features: [
      "We'll deliver it to you",
      "Standard SIM (2FF)",
      "Delivery in 1–3 business days",
    ],
  },
];

export const NUMBER_OPTIONS = [
  {
    id: "new",
    title: "Get a new number",
    icon: "phone-new",
    description: "We'll assign you a new NovaSky number",
  },
  {
    id: "port",
    title: "Keep my current number",
    icon: "phone-port",
    description: "Transfer your number to NovaSky (Portability)",
  },
];

export const ACTIVATION_OPTIONS = [
  { id: "asap", label: "Activate as soon as possible" },
  { id: "scheduled", label: "Schedule for a later date" },
];

export const TRUST_BADGES = [
  {
    id: "secure",
    icon: "shield",
    title: "Secure & reliable",
    description:
      "Your data is protected with top-level security and privacy.",
  },
  {
    id: "satisfaction",
    icon: "thumbs-up",
    title: "Satisfaction guaranteed",
    description:
      "If you're not satisfied, we'll do our best to make it right.",
  },
];

export const ORDER_SUMMARY_ITEMS = {
  one: [
    { icon: "signal", label: "Data", value: "25 GB in 5G" },
    { icon: "phone", label: "Calls/SMS", value: "Unlimited" },
    { icon: "globe", label: "Roaming", value: "-" },
    { icon: "wifi", label: "Hotspot", value: "Included" },
    { icon: "sim", label: "eSIM availability", value: "Yes" },
    { icon: "check", label: "Activation fee", value: "CHF 0" },
  ],
  plus: [
    { icon: "signal", label: "Data", value: "Unlimited 5G" },
    { icon: "phone", label: "Calls/SMS", value: "Unlimited" },
    { icon: "globe", label: "Roaming", value: "Included" },
    { icon: "wifi", label: "Hotspot", value: "50GB" },
    { icon: "sim", label: "eSIM availability", value: "Yes" },
    { icon: "check", label: "Activation fee", value: "CHF 0" },
  ],
  max: [
    { icon: "signal", label: "Data", value: "150 GB in 5G" },
    { icon: "phone", label: "Calls/SMS", value: "Unlimited" },
    { icon: "globe", label: "Roaming", value: "Worldwide" },
    { icon: "wifi", label: "Hotspot", value: "Included" },
    { icon: "sim", label: "eSIM availability", value: "Yes" },
    { icon: "check", label: "Activation fee", value: "CHF 0" },
  ],
};

export const CONFIGURE_PAGE = {
  title: "Configure your",
  titleAccent: "order",
  subtitle: "Create your mobile plan in just a few steps.",
  activationNote:
    "You can change the activation date later from your account.",
};
