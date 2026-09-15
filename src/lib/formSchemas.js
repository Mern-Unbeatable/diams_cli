import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export { z, zodResolver };

/** Shared Zod field helpers */
export const emailField = z
  .string()
  .trim()
  .min(1, "Email is required")
  .email("Enter a valid email");

export const passwordField = z
  .string()
  .min(1, "Password is required")
  .min(8, "Password must be at least 8 characters")
  .regex(/[a-z]/, "Include at least one lowercase letter")
  .regex(/[A-Z]/, "Include at least one uppercase letter")
  .regex(/\d/, "Include at least one number")
  .regex(/[^A-Za-z0-9]/, "Include at least one symbol");

export const requiredString = (label = "This field") =>
  z.string().trim().min(1, `${label} is required`);

export const optionalString = z.string().optional().default("");

/** Login */
export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional().default(false),
});

/** Profile / account settings */
export const accountSettingsSchema = z.object({
  firstName: requiredString("First name"),
  lastName: optionalString,
  email: emailField,
  phoneNumber: requiredString("Phone number"),
});

/** Change password (with confirm match) */
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: passwordField,
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New passwords do not match",
    path: ["confirmPassword"],
  });

/** Support ticket */
export const newTicketSchema = z.object({
  topic: requiredString("Topic"),
  subject: requiredString("Subject"),
  description: requiredString("Description"),
});

export default {
  z,
  zodResolver,
  loginSchema,
  accountSettingsSchema,
  changePasswordSchema,
  newTicketSchema,
};
