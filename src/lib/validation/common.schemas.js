/**
 * Shared Zod field primitives — reused by feature schemas.
 */

import { z } from "zod";

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
