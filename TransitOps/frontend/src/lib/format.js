export function currency(value) {
  const n = Number(value ?? 0);
  return '₹' + n.toLocaleString('en-IN', { maximumFractionDigits: 0 });
}

export function number(value, digits = 0) {
  const n = Number(value ?? 0);
  return n.toLocaleString('en-IN', { maximumFractionDigits: digits });
}

export function dateShort(value) {
  if (!value) return '—';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
}

export function daysUntil(dateStr) {
  if (!dateStr) return null;
  const target = new Date(dateStr);
  const now = new Date();
  return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
}

// Human labels for backend enum constants (e.g. ON_TRIP -> On trip)
export function labelize(enumValue) {
  if (!enumValue) return '—';
  return enumValue
    .toString()
    .toLowerCase()
    .split('_')
    .map((w, i) => (i === 0 ? w[0].toUpperCase() + w.slice(1) : w))
    .join(' ');
}
