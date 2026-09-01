export const USER_ESIM = {
  header: {
    title: "My eSIM",
    subtitle: "Manage your eSIM, install it, or get a new profile.",
  },
  activeEsim: {
    title: "eSIM active",
    status: "Enabled",
    planName: "NovaSky Plus",
    networkBadge: "5G",
    number: "+41 76 123 45 67",
    customName: "Primary eSIM (Personal)",
    lastUsed: "Today, 09:41",
    activatedOn: "August 7, 2024",
    imei: "35 123456 789012 3",
    iccid: "8944 1000 1234 5678 9012 3",
    eid: "89049032000008882000123456789012",
    smdpAddress: "LPA:1$smdp.novasky.ch$MATCHING-ID-99238472",
    activationCode: "B284-9912-4410-8821",
    confirmationCode: "Not required",
    carrier: "NovaSky Switzerland (Sunrise 5G Network)",
    roamingStatus: "Active (EU & US Included)",
    apn: "internet.novasky.ch",
  },
  promo: {
    title: "Enjoy the freedom of eSIM.",
    features: [
      {
        id: "instant-activation",
        title: "Instant Activation",
        description: "No physical SIM card",
        icon: "cpu",
      },
      {
        id: "switch-devices",
        title: "Switch devices easily",
        description: "Transfer your eSIM in just a few clicks",
        icon: "switch",
      },
      {
        id: "secure-integrated",
        title: "Secure and integrated",
        description: "Next-generation eSIM technology",
        icon: "shield",
      },
    ],
    buttonText: "Learn more",
  },
  installTabs: [
    { id: "qr-code", label: "Scan a QR Code" },
    { id: "manual-code", label: "Enter the code manually" },
    { id: "transfer", label: "Transfer from a device" },
    { id: "help", label: "Installation help" },
  ],
  qrSection: {
    title: "Scan this QR Code with your device",
    subtitle: "Open the camera or QR code reader on your smartphone.",
    dividerText: "ou",
    transferBox: {
      title: "Do you already have an eSIM on another device?",
      description: "Easily transfer your eSIM to your new device.",
      buttonText: "Transfer my eSIM",
    },
    infoNotice:
      "Make sure you have a stable internet connection to install your eSIM.",
  },
  manageCards: [
    {
      id: "rename",
      title: "Rename your eSIM",
      description: "Customize your eSIM name to recognize it easily.",
      icon: "edit",
      variant: "blue",
    },
    {
      id: "delete",
      title: "Delete your eSIM",
      description:
        "Remove your eSIM from this device. You can reinstall it later.",
      icon: "trash",
      variant: "red",
    },
    {
      id: "new",
      title: "Get a new eSIM",
      description: "Replace your current eSIM with a new profile.",
      icon: "plus",
      variant: "blue",
    },
  ],
  helpLinks: [
    {
      id: "guide",
      title: "Installation Guide",
      subtitle: "View the step-by-step guide",
      icon: "book",
    },
    {
      id: "faq",
      title: "Frequently Asked Questions",
      subtitle: "Find answers to your questions",
      icon: "help",
    },
    {
      id: "support",
      title: "Contact Support",
      subtitle: "We're here to help you",
      icon: "message",
    },
  ],
  faqItems: [
    {
      q: "What is an eSIM and how does it work?",
      a: "An eSIM (embedded SIM) is a digital SIM card built directly into your smartphone or device. It allows you to activate a mobile plan without needing a physical nano-SIM card.",
    },
    {
      q: "Can I install the same QR code on multiple devices?",
      a: "No. For security reasons, an eSIM QR code can only be actively installed on one device at a time. If you wish to switch devices, use the 'Transfer from a device' feature or delete the profile before reinstalling.",
    },
    {
      q: "What should I do if the QR code scan fails?",
      a: "Ensure your phone is connected to Wi-Fi. You can also use the 'Enter the code manually' tab to input the SM-DP+ address and activation code directly into your cellular settings.",
    },
    {
      q: "Will deleting an eSIM cancel my subscription?",
      a: "No. Deleting an eSIM only removes the profile from your device hardware. Your NovaSky plan, number, and billing remain active.",
    },
  ],
  osGuides: {
    ios: {
      name: "Apple iOS (iPhone & iPad)",
      steps: [
        "Go to Settings > Cellular (or Mobile Service).",
        "Tap 'Add eSIM' or 'Set Up Cellular'.",
        "Select 'Use QR Code' and scan the QR code displayed on this screen.",
        "Follow the on-screen prompts and label your new eSIM line.",
      ],
    },
    android: {
      name: "Android (Samsung, Pixel, etc.)",
      steps: [
        "Go to Settings > Connections / Network & internet > SIMs.",
        "Tap 'Add SIM' or '+' next to SIMs > 'Download a SIM instead?'.",
        "Scan the QR code displayed on this screen when prompted.",
        "Confirm download and enable the eSIM profile.",
      ],
    },
  },
};
