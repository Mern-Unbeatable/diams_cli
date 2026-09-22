import { z } from "zod";
import { emailField } from "@/lib/validation/common.schemas";

export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional().default(false),
});
