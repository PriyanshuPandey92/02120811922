import { nanoid } from 'nanoid';

export function generateShortcode(length = 6) {
  return nanoid(length);
}

export function getExpiryTimestamp(minutes) {
  const now = new Date();
  now.setMinutes(now.getMinutes() + minutes);
  return now.toISOString();
}
