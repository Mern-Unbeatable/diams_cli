export const ACTIVATION_PAGE = {
  title: "Activate your eSIM",
  subtitle:
    "Your eSIM is ready! Follow the steps below to activate your eSIM and start using your service.",
  successMessage:
    "Your plan is now active and ready to use. You will receive a confirmation email with all the details of your order.",
};

export const ACTIVATION_TABS = [
  { id: "scan", label: "Scan the QR code" },
  { id: "code", label: "Enter activation code" },
  { id: "email", label: "Send by email" },
];

export const ACTIVATION_STEPS = [
  {
    id: "camera",
    icon: "camera",
    title: "Open your camera",
    description:
      "Open the Camera app on your smartphone or the QR code scanner in your settings.",
  },
  {
    id: "scan",
    icon: "scan",
    title: "Scan the QR code",
    description:
      "Scan the QR code below and open the notification when it appears. Tap \"Add Cellular Plan\" to continue.",
  },
  {
    id: "install",
    icon: "download",
    title: "Install your eSIM",
    description:
      "Follow the instructions on your screen to install your eSIM. This only takes a few seconds.",
  },
  {
    id: "activate",
    icon: "check",
    title: "Activate and start using your line",
    description: null,
  },
];

export const ACTIVATION_CODE = {
  label: "User Activation Code",
  digits: 4,
};

export const ACTIVATION_EMAIL = {
  message:
    "Your eSIM activation details have been sent to your registered email address.",
};

export const ACTIVATION_TROUBLESHOOTING = {
  title: "Having trouble with installation?",
  description:
    "Get help with your eSIM installation or contact our support team.",
  guideLabel: "View guide",
  supportLabel: "Contact support",
};

export const COMPATIBLE_DEVICES = {
  title: "Compatible devices",
  description:
    "Most smartphones released after 2018 support eSIM. Check if your device is compatible before installing.",
  linkLabel: "View compatible devices",
};
