import momentTz, { MomentInput } from 'moment-timezone';

/**
 * Custom `moment` function - use this function instead of directly importing `moment` to maintain consistency of timezone.
 * @returns Moment function with default timezone from `.env` file
 */

export default function moment(...args: MomentInput[]): momentTz.Moment {
  return momentTz(...args).tz(process.env.TIMEZONE as string);
}
