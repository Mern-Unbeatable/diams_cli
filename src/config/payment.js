export const PAYMENT_PAGE = {
  title: "Secure",
  titleAccent: "payment",
  subtitle:
    "Your payment is secure and encrypted. We never store your full card details.",
};

export const PAYMENT_METHODS = [
  {
    id: "card",
    label: "Credit / Debit Card",
    brands: ["Visa", "Mastercard", "Maestro"],
  },
  { id: "twint", label: "TWINT", brands: ["TWINT"] },
  { id: "apple-pay", label: "Apple Pay", brands: ["Apple Pay"] },
  { id: "google-pay", label: "Google Pay", brands: ["Google Pay"] },
];

export const SAVE_CARD_OPTIONS = [
  {
    id: "save",
    label: "Save my card for faster payments",
    description: "Secure and encrypted.",
  },
  {
    id: "no-save",
    label: "I prefer not to save my card details",
    description: null,
  },
];

export const PCI_BANNER = {
  title: "Your payment information is protected with bank-level security.",
  description: "We do not store your card details on our servers.",
  badge: "PCI DSS COMPLIANT",
};

export const INSTANT_ACTIVATION = {
  title: "Activation is instant",
  description:
    "Once your payment is confirmed, your eSIM will be activated immediately.",
};
