import { findLastUserId } from './user.service.js';

export const generateUserId = async (): Promise<string> => {
  const last = await findLastUserId();
  const n = last ? parseInt(last, 10) : 0;
  const next = (n + 1).toString().padStart(5, '0');
  return next;
};
