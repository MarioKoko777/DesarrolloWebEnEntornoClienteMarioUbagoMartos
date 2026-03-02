export const STORAGE_KEY = 'vue-recordador-tareas';

export function uid() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

const rtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });
export function formatRelative(ms) {
  const now = Date.now();
  const diff = Math.round((ms - now) / 1000);
  const abs = Math.abs(diff);
  if (abs < 60) return rtf.format(Math.round(diff), 'second');
  const min = Math.round(diff / 60);
  if (Math.abs(min) < 60) return rtf.format(min, 'minute');
  const hrs = Math.round(min / 60);
  if (Math.abs(hrs) < 24) return rtf.format(hrs, 'hour');
  const days = Math.round(hrs / 24);
  return rtf.format(days, 'day');
}
