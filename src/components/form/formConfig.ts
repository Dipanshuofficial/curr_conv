import { z } from "zod";
export const formSchema = z.object({
  from: z.string(),
  to: z.string(),
  amount: z.number(),
});

