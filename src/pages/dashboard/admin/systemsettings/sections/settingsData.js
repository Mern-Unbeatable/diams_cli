export const INITIAL_SETTINGS = {
  company: {
    companyName: "NovaSky AG",
    contactInfo: "admin@novasky.ch",
    address: "Bahnhofstrasse 42, 8001 Zurich, Switzerland",
    supportPhone: "+41 44 555 18 10",
  },
  vatCurrency: {
    vatPercentage: "8.1",
    currency: "CHF",
  },
  languages: {
    available: ["German", "French", "Italian", "English"],
    selected: ["German", "French", "Italian", "English"],
    defaultLanguage: "German",
  },
  emailTemplate: {
    templateList: "Activation Welcome",
    subject: "Welcome to NovaSky",
    templateBody: "Your line is ready. Open the NovaSky app to complete activation.",
  },
  security: {
    require2fa: true,
    sessionTimeout: "30",
    securityConfig: "Strong passwords, 12 characters minimum",
  },
  apiConfig: {
    apiUrl: "https://api.novasky.ch/v1",
    apiKey: "sk_live_xxxxxxx",
    status: "Connected",
  },
  paymentGateway: {
    gatewayName: "SwissPay Gateway",
    merchantId: "NSKY-CH-1800",
    status: "Connected",
  },
};
