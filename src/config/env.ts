import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL_DB1: z.string().min(1),
  RABBITMQ_URL: z.string().min(1),
  RABBITMQ_QUEUE: z.string().min(1),
  RABBITMQ_USER: z.string().min(1),
  RABBITMQ_PASS: z.string().min(1),
  RABBITMQ_VHOST: z.string().min(1),
  PORT: z.coerce.number().int().positive().default(3000),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('Invalid environment variables:\n', z.prettifyError(parsed.error));
  process.exit(1);
}

export const env = parsed.data;
