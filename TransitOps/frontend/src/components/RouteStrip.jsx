import { Chip } from './ui';
import { toneFor, statusLabel } from '../lib/statusTone';
import { number } from '../lib/format';

const MARKER_COLOR = { DISPATCHED: 'var(--blue)', COMPLETED: 'var(--green)', DRAFT: 'var(--ink-faint)', CANCELLED: 'var(--red)' };

export default function RouteStrip({ trip }) {
  const planned = Number(trip.plannedDistance || 0);
  const actual = Number(trip.actualDistance || 0);
  const pct = trip.status === 'COMPLETED'
    ? 100
    : planned > 0
      ? Math.min(95, Math.max(4, (actual / planned) * 100))
      : 6;

  return (
    <div className="route-row">
      <div className="route-veh">
        <span className="plate">{trip.vehicle?.registrationNumber || '—'}</span>
        <div className="name">{trip.vehicle?.vehicleName || ''}</div>
      </div>
      <div className="route-strip">
        <span className="city">{trip.source}</span>
        <div className="route-line">
          <span className="dot start" />
          <span className="marker" style={{ left: `${pct}%`, background: MARKER_COLOR[trip.status] || 'var(--ink-faint)' }} />
          <span className="dot end" />
        </div>
        <span className="city dest">{trip.destination}</span>
      </div>
      <div className="route-meta">
        <Chip tone={toneFor(trip.status)}>{statusLabel(trip.status)}</Chip>
        <div className="km">
          {number(actual)} / {number(planned)} km
        </div>
      </div>
    </div>
  );
}
