export const VERIFICATION_PAGE = {
  title: "Verify your",
  titleAccent: "identity",
  subtitle:
    "Identity verification is required to activate your mobile line. It only takes a few minutes.",
};

export const ID_TYPES = [
  {
    id: "national-id",
    title: "National ID Card",
    badge: "Recommended",
    badgeVariant: "primary",
    icon: "id-card",
  },
  {
    id: "driving-license",
    title: "Driving License",
    badge: "Also accepted",
    badgeVariant: "muted",
    icon: "car",
  },
];

export const UPLOAD_INFO = {
  formats: "Accepted formats: JPG, PNG or PDF. Maximum file size: 10 MB.",
  tipsTitle: "Tips for a successful upload:",
};

export const UPLOAD_TIPS = [
  { id: "lighting", icon: "sun", label: "Good lighting" },
  { id: "edges", icon: "scan", label: "All edges visible" },
  { id: "blur", icon: "focus", label: "No blur" },
  { id: "reflections", icon: "flash", label: "No reflections" },
];

export const SELFIE_CHECKLIST = [
  "Hold your ID next to your face",
  "Your face and ID must be clearly visible",
  "Look directly at the camera",
  "Color photo only",
];

export const NEED_HELP = {
  title: "Need Help?",
  description: "Our support team is here to assist you with your verification.",
  contacts: [
    { id: "chat", icon: "message", label: "Live Chat" },
    { id: "email", icon: "mail", label: "support@novasky.ch" },
    { id: "phone", icon: "phone", label: "0800 800 100" },
  ],
};

export const SECURE_BANNER = {
  title: "Your information is 100% secure",
  description:
    "We use bank-level encryption to protect your personal information. Your documents are stored securely and never shared with third parties.",
  badge: "SSL Secured",
};
