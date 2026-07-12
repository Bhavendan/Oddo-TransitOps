import { useMemo, useState } from 'react';
import { Topbar, Chip, DataFrame } from '../components/ui';
import Modal, { Field } from '../components/Modal';
import { useApi } from '../lib/useApi';
import { expensesApi } from '../api/expenses';
import { vehiclesApi } from '../api/vehicles';
import { statusLabel } from '../lib/statusTone';
import { currency, dateShort } from '../lib/format';

const EXPENSE_TYPES = ['TOLL', 'PARKING', 'INSURANCE', 'PERMIT', 'TYRE', 'CLEANING', 'OTHER'];
const SWATCH = { TOLL: 'var(--blue)', PARKING: '#7C8698', INSURANCE: 'var(--green)', PERMIT: '#B7BECB', TYRE: 'var(--amber)', CLEANING: '#9B8AFB', OTHER: '#C9CED8' };

const emptyForm = { vehicleId: '', expenseType: 'TOLL', amount: '', expenseDate: '', description: '' };

export default function Expenses() {
  const { data, loading, error, reload } = useApi(() => expensesApi.list(), []);
  const vehicles = useApi(() => vehiclesApi.list(), []);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const byType = useMemo(() => {
    const totals = {};
    (data || []).forEach((e) => {
      totals[e.expenseType] = (totals[e.expenseType] || 0) + Number(e.amount || 0);
    });
    return Object.entries(totals).sort((a, b) => b[1] - a[1]);
  }, [data]);

  const total = byType.reduce((sum, [, v]) => sum + v, 0);

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    setErrors({});
    try {
      await expensesApi.create({
        vehicle: { vehicleId: Number(form.vehicleId) },
        expenseType: form.expenseType,
        amount: Number(form.amount),
        expenseDate: form.expenseDate,
        description: form.description,
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
        title="Expenses"
        desc="Toll, insurance, permits and other running costs"
        actions={<button className="btn amber" onClick={() => setShowForm(true)}>+ Log expense</button>}
      />
      <div className="two-col">
        <div className="panel">
          <div className="panel-head"><h3>Recent expenses</h3><span className="sub">{(data || []).length} entries</span></div>
          <div className="panel-body">
            <DataFrame
              loading={loading}
              error={error}
              onRetry={reload}
              isEmpty={(data || []).length === 0}
              emptyLabel="No expenses logged yet."
            >
              <table>
                <thead><tr><th>Vehicle</th><th>Type</th><th>Amount</th><th>Date</th></tr></thead>
                <tbody>
                  {(data || []).map((e) => (
                    <tr key={e.expenseId}>
                      <td className="mono">{e.vehicle?.registrationNumber || '—'}</td>
                      <td><Chip tone="grey">{statusLabel(e.expenseType)}</Chip></td>
                      <td className="mono">{currency(e.amount)}</td>
                      <td className="mono">{dateShort(e.expenseDate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </DataFrame>
          </div>
        </div>
        <div className="panel">
          <div className="panel-head"><h3>By type</h3><span className="sub">{currency(total)} total</span></div>
          <DataFrame loading={loading} error={error} isEmpty={byType.length === 0} emptyLabel="Nothing to break down yet.">
            <div className="expense-legend">
              {byType.map(([type, amt]) => (
                <div className="expense-row" key={type}>
                  <span className="swatch" style={{ background: SWATCH[type] || '#C9CED8' }} />
                  {statusLabel(type)}
                  <span className="amt">{currency(amt)}</span>
                </div>
              ))}
            </div>
          </DataFrame>
        </div>
      </div>

      {showForm && (
        <Modal
          title="Log expense"
          onClose={() => setShowForm(false)}
          footer={
            <>
              <button className="btn ghost" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="btn amber" form="expense-form" disabled={saving}>{saving ? 'Saving…' : 'Log expense'}</button>
            </>
          }
        >
          <form id="expense-form" onSubmit={submit} style={{ display: 'contents' }}>
            {errors._general && <div className="field-error">{errors._general}</div>}
            <Field label="Vehicle" error={errors.vehicle}>
              <select required value={form.vehicleId} onChange={(e) => setForm((f) => ({ ...f, vehicleId: e.target.value }))}>
                <option value="">Select vehicle…</option>
                {(vehicles.data || []).map((v) => (
                  <option key={v.vehicleId} value={v.vehicleId}>{v.registrationNumber} — {v.vehicleName}</option>
                ))}
              </select>
            </Field>
            <Field label="Type" error={errors.expenseType}>
              <select value={form.expenseType} onChange={(e) => setForm((f) => ({ ...f, expenseType: e.target.value }))}>
                {EXPENSE_TYPES.map((t) => <option key={t} value={t}>{statusLabel(t)}</option>)}
              </select>
            </Field>
            <Field label="Amount (₹)" error={errors.amount}>
              <input required type="number" min="0" step="0.01" value={form.amount} onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))} />
            </Field>
            <Field label="Date" error={errors.expenseDate}>
              <input required type="date" value={form.expenseDate} onChange={(e) => setForm((f) => ({ ...f, expenseDate: e.target.value }))} />
            </Field>
            <Field label="Description">
              <input value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
            </Field>
          </form>
        </Modal>
      )}
    </section>
  );
}
