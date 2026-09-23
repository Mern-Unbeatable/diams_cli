/**
 * Demo records for admin add-ons (rich UI seed).
 * Combines table add-ons with international-call and premium-service cards
 * so one mock store backs all Add-ons tabs.
 */
import {
  ADDONS_DATA,
  INTERNATIONAL_CALLS_DATA,
  PREMIUM_SERVICES_DATA,
} from "./addOns.seed";

export const ADD_ONS_MOCK = [
  ...ADDONS_DATA,
  ...INTERNATIONAL_CALLS_DATA.map((item) => ({
    ...item,
    category: "International Calls",
  })),
  ...PREMIUM_SERVICES_DATA.map((item) => ({
    ...item,
    category: "Premium Services",
  })),
];
