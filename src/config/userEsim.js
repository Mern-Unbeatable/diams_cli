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
    smdpAddress: "SMDP.NOVASKY.IO",
    activationCode: "K2-9F4A-7C21-XR88-QQ03",
    confirmationCode: "",
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
  manualEntry: {
    tag: "MANUAL ENTRY",
    title: "Enter your activation details",
    subtitle: "Copy these values exactly as shown in your NovaSky welcome email.",
    smdpAddress: "SMDP.NOVASKY.IO",
    activationCode: "K2-9F4A-7C21-XR88-QQ03",
    confirmationPlaceholder: "Only if requested by your device",
    activateButtonText: "Activate eSIM",
    activateNotice: "Activation is instant and can only be done once per profile.",
    tipsTitle: "Installation tips",
    tips: [
      "Stay connected to a stable Wi-Fi network during the whole installation.",
      "Keep at least 30% battery — activation can take up to 3 minutes.",
      "Do not delete the eSIM profile after installing it; it cannot be reinstalled.",
      "Set NovaSky as your primary data line once the profile appears.",
    ],
    referenceValuesTitle: "Reference values",
    referenceValues: [
      { id: "smdp", label: "SMDP.NOVASKY.IO", value: "SMDP.NOVASKY.IO" },
      { id: "code", label: "K2-9F4A-7C21-XR88-QQ03", value: "K2-9F4A-7C21-XR88-QQ03" },
    ],
  },
  deviceTransfer: {
    tag: "DEVICE TRANSFER",
    title: "Move your eSIM to a new device",
    subtitle: "Your number and plan stay the same — only the profile moves.",
    currentDevice: {
      label: "CURRENT DEVICE",
      name: "iPhone 14 Pro",
      details: "iOS 18.2 • Active since Mar 2024",
    },
    newDevice: {
      label: "NEW DEVICE",
      name: "iPhone 16 Pro Max",
      details: "iOS 19.1 • Detected nearby",
    },
    stepsTitle: "Transfer steps",
    steps: [
      {
        id: 1,
        title: "Verify account",
        description: "Confirm your NovaSky identity with a one-time code.",
        active: true,
      },
      {
        id: 2,
        title: "Select current device",
        description: "Choose the device holding the active eSIM.",
        active: false,
      },
      {
        id: 3,
        title: "Confirm transfer",
        description: "Review the line and accept the transfer terms.",
        active: false,
      },
      {
        id: 4,
        title: "Activate on new device",
        description: "Finish setup on the receiving device.",
        active: false,
      },
    ],
    startButtonText: "Start transfer",
    estimatedTime: {
      title: "Estimated transfer time",
      value: "2–5 min",
      description:
        "Your service stays online on the current device until the new profile activates.",
    },
    supportedDevices: {
      title: "Supported devices",
      devices: [
        { brand: "Apple", models: "iPhone XS and newer, iPad Pro (2018+)" },
        { brand: "Samsung", models: "Galaxy S20 and newer, Fold / Flip series" },
        { brand: "Google", models: "Pixel 3 and newer" },
        { brand: "Other", models: "Motorola Razr, Oppo Find X, Huawei P40" },
      ],
    },
  },
  installationHelp: {
    tag: "HELP CENTER",
    title: "Installation guides",
    subtitle: "Step-by-step walkthroughs for every supported platform.",
    guides: [
      {
        id: "iphone",
        name: "iPhone",
        details: "iOS 16 — iOS 19 • 6 steps",
        icon: "smartphone",
      },
      {
        id: "android",
        name: "Android",
        details: "Android 11+ • 5 steps",
        icon: "android",
      },
      {
        id: "samsung",
        name: "Samsung",
        details: "One UI 5+ • 6 steps",
        icon: "smartphone",
      },
      {
        id: "pixel",
        name: "Google Pixel",
        details: "Pixel 3 and newer • 5 steps",
        icon: "pixel",
      },
    ],
    troubleshootingTitle: "Troubleshooting",
    troubleshootingItems: [
      {
        id: "qr_fail",
        q: "QR code not working",
        a: "Make sure you have an active Wi-Fi connection, raise your screen brightness, and clean your camera lens. If scanning fails, use the 'Enter the code manually' tab.",
      },
      {
        id: "act_fail",
        q: "Activation failed",
        a: "Restart your phone and verify your software is updated to the latest OS version. Ensure carrier locks are not enabled on your device.",
      },
      {
        id: "no_sig",
        q: "No signal after install",
        a: "Toggle Airplane Mode on for 10 seconds and turn it off. Make sure Mobile Data is switched to your NovaSky line under Settings > Cellular.",
      },
      {
        id: "net_unavail",
        q: "Network unavailable",
        a: "Verify that Data Roaming is turned ON for your eSIM profile and that NovaSky APN is set to 'internet.novasky.ch'.",
      },
    ],
    videoTutorial: {
      title: "Video tutorial",
      subtitle: "Install your NovaSky eSIM in 3 minutes — full walkthrough.",
    },
    offlineResources: {
      title: "Offline resources",
      pdfButton: "Download PDF guide",
      supportButton: "Contact support",
      notice: "AVERAGE RESPONSE TIME UNDER 2 MINUTES, 24/7.",
    },
    faqTitle: "Frequently asked questions",
    faqItems: [
      {
        q: "Can I use my eSIM and a physical SIM at the same time?",
        a: "Yes! Dual SIM dual standby (DSDS) lets you keep a physical nano-SIM active alongside your NovaSky eSIM for calls, SMS, and data switching.",
      },
      {
        q: "What happens if I reset my phone?",
        a: "When performing a factory reset, select 'Keep eSIM profiles' to retain your NovaSky line. If deleted by accident, scan your QR code again to reinstall.",
      },
      {
        q: "Does the eSIM work abroad?",
        a: "Yes! Your NovaSky plan includes EU & US high-speed roaming. Roaming activates automatically when you land in covered destinations.",
      },
      {
        q: "How many transfers are included?",
        a: "eSIM device transfers and profile re-issuing are 100% free and unlimited for all NovaSky customers.",
      },
    ],
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
