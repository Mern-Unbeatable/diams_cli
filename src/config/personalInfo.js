export const PERSONAL_INFO_PAGE = {
  title: "Create your",
  titleAccent: "account",
  subtitle: "Create your customer space to manage your line with ease.",
};

export const ACCOUNT_TYPES = [
  {
    id: "personal",
    label: "Personal",
    description: "For individual use",
    icon: "user",
  },
  {
    id: "business",
    label: "Business",
    description: "For professional use",
    icon: "building",
  },
];

export const BUSINESS_INFO = {
  title: "Company Information",
  description: "Enter your company details to set up your business account.",
};

export const COUNTRIES = [{ id: "ch", label: "Switzerland" }];

export const PASSWORD_RULES = [
  { id: "length", label: "8+ characters", test: (v) => v.length >= 8 },
  { id: "number", label: "1 number", test: (v) => /\d/.test(v) },
  { id: "upper", label: "1 uppercase letter", test: (v) => /[A-Z]/.test(v) },
  { id: "lower", label: "1 lowercase letter", test: (v) => /[a-z]/.test(v) },
  {
    id: "special",
    label: "1 special character",
    test: (v) => /[^A-Za-z0-9]/.test(v),
  },
];

export const CHECKOUT_SIDEBAR_FEATURES = {
  one: [
    { icon: "signal", text: "25 GB in 5G" },
    { icon: "phone", text: "Unlimited Calls in Switzerland" },
    { icon: "message", text: "Unlimited SMS in Switzerland" },
    { icon: "wifi", text: "Hotspot Included" },
    { icon: "check", text: "No Commitment" },
  ],
  plus: [
    { icon: "signal", text: "80 GB in 5G" },
    { icon: "phone", text: "Unlimited Calls in Switzerland & EU" },
    { icon: "message", text: "Unlimited SMS in Switzerland & EU" },
    { icon: "wifi", text: "Hotspot Included" },
    { icon: "check", text: "No Commitment" },
    { icon: "globe", text: "EU Roaming Included" },
  ],
  max: [
    { icon: "signal", text: "150 GB in 5G" },
    { icon: "phone", text: "Unlimited Calls in Switzerland" },
    { icon: "message", text: "Unlimited SMS in Switzerland & EU" },
    { icon: "wifi", text: "Hotspot Included" },
    { icon: "check", text: "No Commitment" },
    { icon: "globe", text: "Roaming Worldwide Included" },
  ],
};

export const CHECKOUT_DEFAULTS = {
  lineType: "eSIM",
  phoneNumber: "New number",
  activationDate: "July 7, 2024",
  activationFee: "CHF 0.00",
  firstPayment: "34.90",
};
