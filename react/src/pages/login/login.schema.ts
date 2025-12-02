import z from 'zod';

export const loginSchema = z.object({
  email: z.email('Invalid email'),

  password: z
    .string('Password must not be empty')
    .min(8, 'Password must be longer than or equal to 8 characters'),
});
