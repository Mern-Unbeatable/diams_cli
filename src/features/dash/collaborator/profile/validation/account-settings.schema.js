import { z } from "zod";
import {
  emailField,
  optionalString,
  requiredString,
} from "@/lib/validation/common.schemas";

export const accountSettingsSchema = z.object({
  firstName: requiredString("First name"),
  lastName: optionalString,
  email: emailField,
  phoneNumber: requiredString("Phone number"),
});
