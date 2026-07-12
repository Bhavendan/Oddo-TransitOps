import { useMemo, useState } from 'react';
import { Topbar, Chip, DataFrame } from '../components/ui';
import Modal, { Field } from '../components/Modal';
import { useApi } from '../lib/useApi';
import { vehiclesApi } from '../api/vehicles';
import { toneFor, statusLabel } from '../lib/statusTone';
import { number } from '../lib/format';

const STATUSES = ['AVAILABLE', 'ON_TRIP', 'IN_SHOP', 'RETIRED'];

const emptyForm = {
  registrationNumber: '',
  vehicleName: '',
  vehicleModel: '',
  vehicleType: '',
  maximumLoadCapacity: '',
  currentOdometer: '',
  acquisitionCost: '',
  region: '',
};

export default function Vehicles() {
  const { data, loading, error, reload } = useApi(() => vehiclesApi.list(), []);
  const [filter, setFilter] = useState('ALL');
  const [query, setQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(() => {
    let list = data || [];
    if (filter !== 'ALL') list = list.filter((v) => v.status === filter);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (v) =>
          v.registrationNumber?.toLowerCase().includes(q) ||
          v.vehicleModel?.toLowerCase().includes(q) ||
          v.region?.toLowerCase().includes(q)
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
      await vehiclesApi.create({
        ...form,
        maximumLoadCapacity: Number(form.maximumLoadCapacity),
        currentOdometer: Number(form.currentOdometer),
        acquisitionCost: Number(form.acquisitionCost),
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
        title="Fleet"
        desc={`${data?.length ?? '—'} vehicles registered`}
        actions={<button className="btn amber" onClick={() => setShowForm(true)}>+ Register vehicle</button>}
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
          <input
            className="search"
            placeholder="Search by plate, model or region…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="panel-body">
          <DataFrame
            loading={loading}
            error={error}
            onRetry={reload}
            isEmpty={filtered.length === 0}
            emptyLabel="No vehicles match. Try clearing filters, or register your first vehicle."
          >
            <table>
              <thead>
                <tr><th>Vehicle</th><th>Type</th><th>Capacity</th><th>Odometer</th><th>Region</th><th>Status</th></tr>
              </thead>
              <tbody>
                {filtered.map((v) => (
                  <tr key={v.vehicleId}>
                    <td>
                      <span className="mono row-name" style={{ fontWeight: 600 }}>{v.registrationNumber}</span>
                      <div className="row-sub">{v.vehicleName} · {v.vehicleModel}</div>
                    </td>
                    <td>{v.vehicleType}</td>
                    <td className="mono">{number(v.maximumLoadCapacity)} kg</td>
                    <td className="mono">{number(v.currentOdometer)} km</td>
                    <td>{v.region || '—'}</td>
                    <td><Chip tone={toneFor(v.status)}>{statusLabel(v.status)}</Chip></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </DataFrame>
        </div>
      </div>

      {showForm && (
        <Modal
          title="Register vehicle"
          onClose={() => setShowForm(false)}
          footer={
            <>
              <button className="btn ghost" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="btn amber" form="vehicle-form" disabled={saving}>
                {saving ? 'Saving…' : 'Register vehicle'}
              </button>
            </>
          }
        >
          <form id="vehicle-form" onSubmit={submit} style={{ display: 'contents' }}>
            {errors._general && <div className="field-error">{errors._general}</div>}
            <Field label="Registration number" error={errors.registrationNumber}>
              <input required value={form.registrationNumber} onChange={(e) => updateField('registrationNumber', e.target.value)} placeholder="TN 09 AB 4471" />
            </Field>
            <Field label="Vehicle name" error={errors.vehicleName}>
              <input required value={form.vehicleName} onChange={(e) => updateField('vehicleName', e.target.value)} placeholder="Tata Ace" />
            </Field>
            <Field label="Model" error={errors.vehicleModel}>
              <input required value={form.vehicleModel} onChange={(e) => updateField('vehicleModel', e.target.value)} />
            </Field>
            <Field label="Type" error={errors.vehicleType}>
              <input required value={form.vehicleType} onChange={(e) => updateField('vehicleType', e.target.value)} placeholder="Mini truck / LCV / MCV" />
            </Field>
            <Field label="Max load capacity (kg)" error={errors.maximumLoadCapacity}>
              <input required type="number" min="0" step="0.1" value={form.maximumLoadCapacity} onChange={(e) => updateField('maximumLoadCapacity', e.target.value)} />
            </Field>
            <Field label="Current odometer (km)" error={errors.currentOdometer}>
              <input required type="number" min="0" step="0.1" value={form.currentOdometer} onChange={(e) => updateField('currentOdometer', e.target.value)} />
            </Field>
            <Field label="Acquisition cost" error={errors.acquisitionCost}>
              <input required type="number" min="0" step="0.01" value={form.acquisitionCost} onChange={(e) => updateField('acquisitionCost', e.target.value)} />
            </Field>
            <Field label="Region">
              <input value={form.region} onChange={(e) => updateField('region', e.target.value)} placeholder="Coimbatore" />
            </Field>
          </form>
        </Modal>
      )}
    </section>
  );
}
