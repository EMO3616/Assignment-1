import { seed } from './seed';
const KEY = 'funews-assignment01-v1';
export function readData() {
  try {
    const parsed = JSON.parse(localStorage.getItem(KEY));
    if (parsed && ['categories','news','users'].every(k => Array.isArray(parsed[k]))) return parsed;
  } catch { /* Corrupted storage: fall back to seed. */ }
  return structuredClone(seed);
}
export function saveData(data) { localStorage.setItem(KEY, JSON.stringify(data)); }
export function resetData() { localStorage.removeItem(KEY); return structuredClone(seed); }
export const sessionKey = 'funews-session-v1';
