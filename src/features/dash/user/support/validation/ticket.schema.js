import { z } from "zod";
import { requiredString } from "@/lib/validation/common.schemas";

export const newTicketSchema = z.object({
  topic: requiredString("Topic"),
  subject: requiredString("Subject"),
  description: requiredString("Description"),
});
