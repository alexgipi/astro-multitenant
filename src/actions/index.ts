import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

export const server = {
  deleteTenant: defineAction({
    input: z.object({
      id: z.string(),
    }),
    handler: async (input) => {
      return `Delete tenant with id ${input.id}`
    }
  })
}