import z from 'zod';

export const createUserZodSchema = z.object({
  body: z.object({
    role: z.string({
      error: 'role is required.',
    }),
    password: z.string().optional(),
  }),
});
