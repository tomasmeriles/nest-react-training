import z from 'zod';
import { EnvSchema } from './env.schema';

export const environment: Readonly<z.infer<typeof EnvSchema>> = z.parse(
  EnvSchema,
  process.env,
);
