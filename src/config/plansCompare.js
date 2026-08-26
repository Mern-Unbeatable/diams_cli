export const PLANS_COMPARE = {
  title: "Compare all plans",
  rows: [
    {
      id: "mobile-data",
      label: "Mobile Data",
      icon: "signal",
      values: {
        one: "25 GB in 5G",
        plus: "80 GB in 5G",
        max: "150 GB in 5G",
      },
    },
    {
      id: "calls",
      label: "Calls",
      icon: "phone",
      values: {
        one: "Unlimited Within Switzerland",
        plus: "Unlimited Within Switzerland",
        max: "Unlimited Within Switzerland",
      },
    },
    {
      id: "sms",
      label: "SMS",
      icon: "message",
      values: {
        one: "Unlimited Within Switzerland",
        plus: "Unlimited Within Switzerland",
        max: "Unlimited Within Switzerland & EU",
      },
    },
    {
      id: "5g-access",
      label: "5G Access",
      icon: "wifi",
      type: "check",
      values: { one: true, plus: true, max: true },
    },
    {
      id: "esim",
      label: "eSIM",
      icon: "sim",
      values: {
        one: "Included",
        plus: "Included",
        max: "Included",
      },
    },
    {
      id: "roaming",
      label: "Roaming",
      icon: "globe",
      values: {
        one: "-",
        plus: "EU Included",
        max: "Worldwide Included",
      },
    },
    {
      id: "contract",
      label: "Contract",
      icon: "file",
      values: {
        one: "No Commitment",
        plus: "No Commitment",
        max: "No Commitment",
      },
    },
  ],
};
