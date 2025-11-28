import z from 'zod';
import { LOG_LEVEL_MAP } from '../logger/log-levels';
import 'dotenv/config';

export const EnvSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'production']).default('development'),

    PORT: z.coerce.number().int().min(1).max(65535).default(3000),

    LOG_LEVEL: z
      .enum(['fatal', 'error', 'warn', 'log', 'debug', 'verbose'])
      .default('log'),

    JWT_SECRET: z.string().nonempty(),
  })
  .transform((cfg) => ({
    ...cfg,

    IS_DEVELOPMENT: cfg.NODE_ENV === 'development',
    IS_PRODUCTION: cfg.NODE_ENV === 'production',

    LOG_LEVEL: [...LOG_LEVEL_MAP[cfg.LOG_LEVEL]],
  }));
