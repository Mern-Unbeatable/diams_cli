export const USER_MY_INFORMATION = {
  header: {
    title: "My Information",
    subtitle: "Manage your personal information and preferences",
  },
  tabs: [{ id: "profile", label: "Profile" }],
  personalInfo: {
    avatarInitials: "AM",
    avatarBg: "bg-[#1e88e5]",
    fullName: "Abdoulaye Sow",
    dob: "March 12, 1990",
    email: "abdoulaye.sow@email.com",
    isEmailVerified: true,
    phone: "+41 76 123 45 67",
    isPhoneVerified: true,
    address: "12 Lilas Street, 1700 Fribourg, Switzerland",
    language: "French",
  },
  accountInfo: {
    accountNumber: "NSK-2894-5678-9012",
    accountType: "Premium Customer",
    accountTypeBadge: "💎",
    memberSince: "August 7, 2024",
    passwordMasked: "••••••••••••",
    pinMasked: "••••",
  },
  securitySummary: {
    twoFactor: "Enabled",
    secureLogin: "All your logins are protected.",
    secureLoginStatus: "Active",
    connectedDevices: "3 Devices",
    activeSessions: "1 Active Session",
  },
  profileCompletion: {
    percent: 75,
    title: "Complete your profile",
    description:
      "The more complete your profile is, the more personalized and secure your experience will be.",
    buttonText: "Complete My Profile",
  },
  helpLinks: [
    {
      id: "help-center",
      title: "Help Center",
      subtitle: "Find Answers",
      icon: "help",
      to: "/dashboard/user/support",
    },
    {
      id: "contact-us",
      title: "Contact Us",
      subtitle: "Chat with an advisor",
      icon: "chat",
      to: "/dashboard/user/support",
    },
    {
      id: "faq",
      title: "FAQ",
      subtitle: "View frequently asked questions",
      icon: "faq",
      to: "/dashboard/user/support",
    },
  ],
};
