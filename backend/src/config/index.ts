import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const { NODE_ENV, PORT, MONGODB_URI, HOST, EXTERNAL_API_BASE_URL, LOG_FORMAT, LOG_DIR, ORIGIN, FILES_DIR, SECRET_KEY, TIMEZONE } = process.env;
