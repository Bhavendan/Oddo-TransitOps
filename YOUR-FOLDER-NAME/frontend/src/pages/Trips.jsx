import { useMemo, useState } from 'react';
import { Topbar, Chip, DataFrame } from '../components/ui';
import Modal, { Field } from '../components/Modal';
import { useApi } from '../lib/useApi';
import { tripsApi } from '../api/trips';
import { vehiclesApi } from '../api/vehicles';
import { driversApi } from '../api/drivers';
import { toneFor, statusLabel } from '../lib/statusTone';
import { currency, number } from '../lib/format';

const STATUSES = ['DRAFT', 'DISPATCHED', 'COMPLETED', 'CANCELLED'];

const emptyForm = {
  source: '',
  destination: '',
  cargoWeight: '',
  plannedDistance: '',
  revenue: '',
  vehicleId: '',
  driverId: '',
};

export default function Trips() {
  const { data, loading, error, reload } = useApi(() => tripsApi.list(), []);
  const vehicles = useApi(() => vehiclesApi.list({ status: 'AVAILABLE' }), []);
  const drivers = useApi(() => driversApi.list({ status: 'AVAILABLE' }), []);

  const [filter, setFilter] = useState('ALL');
  const [query, setQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(() => {
    let list = data || [];
    if (filter !== 'ALL') list = list.filter((t) => t.status === filter);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (t) =>
          t.source?.toLowerCase().includes(q) ||
          t.destination?.toLowerCase().includes(q) ||
          t.vehicle?.registrationNumber?.toLowerCase().includes(q) ||
          t.driver?.name?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [data, filter, query]);

  function updateField(name, value) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    setErrors({});
    try {
      await tripsApi.create({
        source: form.source,
        destination: form.destination,
        cargoWeight: Number(form.cargoWeight),
        plannedDistance: Number(form.plannedDistance),
        revenue: form.revenue ? Number(form.revenue) : 0,
        vehicle: { vehicleId: Number(form.vehicleId) },
        driver: { driverId: Number(form.driverId) },
      });
      setShowForm(false);
      setForm(emptyForm);
      reload();
    } catch (err) {
      setErrors(err.response?.data?.fieldErrors || { _general: err.message });
    } finally {
      setSaving(false);
    }
  }

  return (
    <section>
      <Topbar
        title="Dispatch &amp; Trips"
        desc="Draft, dispatch, and reconcile every haul"
        actions={<button className="btn amber" onClick={() => setShowForm(true)}>+ New trip</button>}
      />

      <div className="panel">
        <div className="toolbar">
          <div className="tab-pill">
            <button className={filter === 'ALL' ? 'on' : ''} onClick={() => setFilter('ALL')}>All</button>
            {STATUSES.map((s) => (
              <button key={s} className={filter === s ? 'on' : ''} onClick={() => setFilter(s)}>
                {statusLabel(s)}
              </button>
            ))}
          </div>
          <input className="search" placeholder="Search by route, vehicle or driver…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div className="panel-body">
          <DataFrame
            loading={loading}
            error={error}
            onRetry={reload}
            isEmpty={filtered.length === 0}
            emptyLabel="No trips match. Try clearing filters, or dispatch a new one."
          >
            <table>
              <thead>
                <tr><th>Trip</th><th>Route</th><th>Vehicle / Driver</th><th>Cargo</th><th>Distance</th><th>Revenue</th><th>Status</th></tr>
              </thead>
              <tbody>
                {filtered.map((t) => (
                  <tr key={t.tripId}>
                    <td className="mono">#{t.tripId}</td>
                    <td>{t.source} → {t.destination}</td>
                    <td>
                      <span className="row-name">{t.vehicle?.registrationNumber || '—'}</span>
                      <div className="row-sub">{t.driver?.name || '—'}</div>
                    </td>
                    <td>{number(t.cargoWeight, 1)} t</td>
                    <td className="mono">{number(t.plannedDistance)} km</td>
                    <td className="mono">{currency(t.revenue)}</td>
                    <td><Chip tone={toneFor(t.status)}>{statusLabel(t.status)}</Chip></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </DataFrame>
        </div>
      </div>

      {showForm && (
        <Modal
          title="New trip"
          onClose={() => setShowForm(false)}
          footer={
            <>
              <button className="btn ghost" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="btn amber" form="trip-form" disabled={saving}>{saving ? 'Saving…' : 'Create trip'}</button>
            </>
          }
        >
          <form id="trip-form" onSubmit={submit} style={{ display: 'contents' }}>
            {errors._general && <div className="field-error">{errors._general}</div>}
            <Field label="Source" error={errors.source}>
              <input required value={form.source} onChange={(e) => updateField('source', e.target.value)} placeholder="Coimbatore" />
            </Field>
            <Field label="Destination" error={errors.destination}>
              <input required value={form.destination} onChange={(e) => updateField('destination', e.target.value)} placeholder="Salem" />
            </Field>
            <Field label="Vehicle" error={errors.vehicle}>
              <select required value={form.vehicleId} onChange={(e) => updateField('vehicleId', e.target.value)}>
                <option value="">Select an available vehicle…</option>
                {(vehicles.data || []).map((v) => (
                  <option key={v.vehicleId} value={v.vehicleId}>{v.registrationNumber} — {v.vehicleName}</option>
                ))}
              </select>
            </Field>
            <Field label="Driver" error={errors.driver}>
              <select required value={form.driverId} onChange={(e) => updateField('driverId', e.target.value)}>
                <option value="">Select an available driver…</option>
                {(drivers.data || []).map((d) => (
                  <option key={d.driverId} value={d.driverId}>{d.name} — {d.licenseCategory}</option>
                ))}
              </select>
            </Field>
            <Field label="Cargo weight (t)" error={errors.cargoWeight}>
              <input required type="number" min="0" step="0.1" value={form.cargoWeight} onChange={(e) => updateField('cargoWeight', e.target.value)} />
            </Field>
            <Field label="Planned distance (km)" error={errors.plannedDistance}>
              <input required type="number" min="0" step="0.1" value={form.plannedDistance} onChange={(e) => updateField('plannedDistance', e.target.value)} />
            </Field>
            <Field label="Revenue (₹)" error={errors.revenue}>
              <input type="number" min="0" step="0.01" value={form.revenue} onChange={(e) => updateField('revenue', e.target.value)} />
            </Field>
          </form>
        </Modal>
      )}
    </section>
  );
}
