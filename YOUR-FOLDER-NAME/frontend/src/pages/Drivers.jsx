import { useMemo, useState } from 'react';
import { Topbar, Chip, DataFrame } from '../components/ui';
import Modal, { Field } from '../components/Modal';
import { useApi } from '../lib/useApi';
import { driversApi } from '../api/drivers';
import { toneFor, statusLabel } from '../lib/statusTone';
import { daysUntil } from '../lib/format';

const emptyForm = {
  name: '',
  licenseNumber: '',
  licenseCategory: '',
  licenseExpiryDate: '',
  contactNumber: '',
  safetyScore: '',
};

function barColor(score) {
  if (score >= 80) return 'var(--green)';
  if (score >= 60) return 'var(--amber)';
  return 'var(--red)';
}

export default function Drivers() {
  const { data, loading, error, reload } = useApi(() => driversApi.list(), []);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const rows = useMemo(() => data || [], [data]);

  function updateField(name, value) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    setErrors({});
    try {
      await driversApi.create({ ...form, safetyScore: Number(form.safetyScore) });
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
        title="Drivers"
        desc="Licences, safety scores and duty status"
        actions={<button className="btn amber" onClick={() => setShowForm(true)}>+ Add driver</button>}
      />

      <div className="panel">
        <div className="panel-body">
          <DataFrame
            loading={loading}
            error={error}
            onRetry={reload}
            isEmpty={rows.length === 0}
            emptyLabel="No drivers on record yet."
          >
            <table>
              <thead>
                <tr><th>Driver</th><th>Licence</th><th>Expiry</th><th>Contact</th><th>Safety score</th><th>Status</th></tr>
              </thead>
              <tbody>
                {rows.map((d) => {
                  const dLeft = daysUntil(d.licenseExpiryDate);
                  return (
                    <tr key={d.driverId}>
                      <td className="row-name">{d.name}</td>
                      <td className="mono">{d.licenseCategory} · {d.licenseNumber}</td>
                      <td>
                        {dLeft !== null && dLeft <= 30 ? (
                          <Chip tone={dLeft <= 14 ? 'red' : 'amber'}>{dLeft} days left</Chip>
                        ) : (
                          d.licenseExpiryDate
                        )}
                      </td>
                      <td className="mono">{d.contactNumber}</td>
                      <td>
                        <span className="bar-track">
                          <span className="bar-fill" style={{ width: `${d.safetyScore}%`, background: barColor(d.safetyScore) }} />
                        </span>
                        {d.safetyScore}
                      </td>
                      <td><Chip tone={toneFor(d.status)}>{statusLabel(d.status)}</Chip></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </DataFrame>
        </div>
      </div>

      {showForm && (
        <Modal
          title="Add driver"
          onClose={() => setShowForm(false)}
          footer={
            <>
              <button className="btn ghost" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="btn amber" form="driver-form" disabled={saving}>{saving ? 'Saving…' : 'Add driver'}</button>
            </>
          }
        >
          <form id="driver-form" onSubmit={submit} style={{ display: 'contents' }}>
            {errors._general && <div className="field-error">{errors._general}</div>}
            <Field label="Name" error={errors.name}>
              <input required value={form.name} onChange={(e) => updateField('name', e.target.value)} />
            </Field>
            <Field label="License number" error={errors.licenseNumber}>
              <input required value={form.licenseNumber} onChange={(e) => updateField('licenseNumber', e.target.value)} />
            </Field>
            <Field label="License category" error={errors.licenseCategory}>
              <input required value={form.licenseCategory} onChange={(e) => updateField('licenseCategory', e.target.value)} placeholder="HGV / LMV" />
            </Field>
            <Field label="License expiry date" error={errors.licenseExpiryDate}>
              <input required type="date" value={form.licenseExpiryDate} onChange={(e) => updateField('licenseExpiryDate', e.target.value)} />
            </Field>
            <Field label="Contact number" error={errors.contactNumber}>
              <input required value={form.contactNumber} onChange={(e) => updateField('contactNumber', e.target.value)} placeholder="10-digit mobile" />
            </Field>
            <Field label="Safety score (0–100)" error={errors.safetyScore}>
              <input required type="number" min="0" max="100" value={form.safetyScore} onChange={(e) => updateField('safetyScore', e.target.value)} />
            </Field>
          </form>
        </Modal>
      )}
    </section>
  );
}
