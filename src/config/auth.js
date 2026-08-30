import authImage from "@/assets/auth/auth.png";
import { BRAND } from "./navigation";

export const AUTH_PAGE = {
  logo: BRAND.logo,
  brandName: BRAND.name,
  image: authImage,
  headlineLine1: "Stay connected,",
  headlineAccent: "anywhere",
  headlineLine2: "in the",
  headlineLine3: "world.",
  description:
    "NovaSky brings you seamless eSIM connectivity with the best network quality and transparent pricing.",
  features: [
    {
      id: "coverage",
      icon: "globe",
      title: "Global Coverage",
      description: "Connect in 200+ countries",
    },
    {
      id: "esim",
      icon: "smartphone",
      title: "Instant eSIM",
      description: "Activate in seconds",
    },
    {
      id: "security",
      icon: "shield",
      title: "Secure & Reliable",
      description: "Your data is always protected",
    },
  ],
  form: {
    title: "Welcome back",
    subtitle: "Sign in to your NovaSky account",
    emailLabel: "Email address",
    emailPlaceholder: "Enter your email address",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter your password",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    submit: "Sign in",
    divider: "or",
    google: "Continue with Google",
    noAccount: "Don't have an account?",
    createAccount: "Create account",
    createAccountPath: "/plans",
    forgotPasswordPath: "/help",
  },
};
