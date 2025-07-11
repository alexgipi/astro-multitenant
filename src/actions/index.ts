import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { deleteDocument } from "@/lib/db";

export const server = {
  deleteTenant: defineAction({
    input: z.object({
      id: z.string(),
    }),
    handler: async (input) => {


      const res = await deleteDocument("tenants", input.id);
      const { message, ok } = res;
      const messageType = ok ? "success" : "error";

      return { message, messageType, ok };
      

    }
  })
}