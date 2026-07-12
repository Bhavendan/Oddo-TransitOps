import { useState } from 'react';
import { Topbar, Chip, DataFrame } from '../components/ui';
import Modal, { Field } from '../components/Modal';
import { useApi } from '../lib/useApi';
import { maintenanceLogsApi } from '../api/maintenanceLogs';
import { fuelLogsApi } from '../api/fuelLogs';
import { vehiclesApi } from '../api/vehicles';
import { toneFor, statusLabel } from '../lib/statusTone';
import { currency, number, dateShort } from '../lib/format';

const emptyMaintForm = { vehicleId: '', maintenanceType: '', issue: '', description: '', cost: '', startDate: '' };
const emptyFuelForm = { vehicleId: '', fuelDate: '', liters: '', cost: '', odometerReading: '', remarks: '' };

function efficiencyTone(kmPerL) {
  if (kmPerL >= 8) return 'green';
  if (kmPerL >= 6) return 'amber';
  return 'red';
}

export default function Maintenance() {
  const maintenance = useApi(() => maintenanceLogsApi.list(), []);
  const fuel = useApi(() => fuelLogsApi.list(), []);
  const vehicles = useApi(() => vehiclesApi.list(), []);

  const [showMaintForm, setShowMaintForm] = useState(false);
  const [maintForm, setMaintForm] = useState(emptyMaintForm);
  const [maintErrors, setMaintErrors] = useState({});
  const [savingMaint, setSavingMaint] = useState(false);

  const [showFuelForm, setShowFuelForm] = useState(false);
  const [fuelForm, setFuelForm] = useState(emptyFuelForm);
  const [fuelErrors, setFuelErrors] = useState({});
  const [savingFuel, setSavingFuel] = useState(false);

  async function submitMaintenance(e) {
    e.preventDefault();
    setSavingMaint(true);
    setMaintErrors({});
    try {
      await maintenanceLogsApi.create({
        vehicle: { vehicleId: Number(maintForm.vehicleId) },
        maintenanceType: maintForm.maintenanceType,
        issue: maintForm.issue,
        description: maintForm.description,
        cost: Number(maintForm.cost),
        startDate: maintForm.startDate,
      });
      setShowMaintForm(false);
      setMaintForm(emptyMaintForm);
      maintenance.reload();
    } catch (err) {
      setMaintErrors(err.response?.data?.fieldErrors || { _general: err.message });
    } finally {
      setSavingMaint(false);
    }
  }

  async function submitFuel(e) {
    e.preventDefault();
    setSavingFuel(true);
    setFuelErrors({});
    try {
      await fuelLogsApi.create({
        vehicle: { vehicleId: Number(fuelForm.vehicleId) },
        fuelDate: fuelForm.fuelDate,
        liters: Number(fuelForm.liters),
        cost: Number(fuelForm.cost),
        odometerReading: Number(fuelForm.odometerReading),
        remarks: fuelForm.remarks,
      });
      setShowFuelForm(false);
      setFuelForm(emptyFuelForm);
      fuel.reload();
    } catch (err) {
      setFuelErrors(err.response?.data?.fieldErrors || { _general: err.message });
    } finally {
      setSavingFuel(false);
    }
  }

  return (
    <section>
      <Topbar
        title="Maintenance &amp; Fuel"
        desc="Service history and fuel efficiency by vehicle"
        actions={
          <>
            <button className="btn" onClick={() => setShowFuelForm(true)}>+ Log fuel</button>
            <button className="btn amber" onClick={() => setShowMaintForm(true)}>+ Log maintenance</button>
          </>
        }
      />

      <div className="panel">
        <div className="panel-head">
          <h3>Maintenance logs</h3>
          <span className="sub">{maintenance.data?.filter((m) => m.status === 'ACTIVE').length ?? 0} active</span>
        </div>
        <div className="panel-body">
          <DataFrame
            loading={maintenance.loading}
            error={maintenance.error}
            onRetry={maintenance.reload}
            isEmpty={(maintenance.data || []).length === 0}
            emptyLabel="No maintenance logged yet."
          >
            <table>
              <thead><tr><th>Vehicle</th><th>Type</th><th>Issue</th><th>Cost</th><th>Start</th><th>Status</th></tr></thead>
              <tbody>
                {(maintenance.data || []).map((m) => (
                  <tr key={m.maintenanceId}>
                    <td className="mono">{m.vehicle?.registrationNumber || '—'}</td>
                    <td>{m.maintenanceType}</td>
                    <td>{m.issue}</td>
                    <td className="mono">{currency(m.cost)}</td>
                    <td className="mono">{dateShort(m.startDate)}</td>
                    <td><Chip tone={toneFor(m.status)}>{statusLabel(m.status)}</Chip></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </DataFrame>
        </div>
      </div>

      <div className="panel">
        <div className="panel-head">
          <h3>Fuel logs</h3>
          <span className="sub">{(fuel.data || []).length} entries</span>
        </div>
        <div className="panel-body">
          <DataFrame
            loading={fuel.loading}
            error={fuel.error}
            onRetry={fuel.reload}
            isEmpty={(fuel.data || []).length === 0}
            emptyLabel="No fuel logs yet."
          >
            <table>
              <thead><tr><th>Vehicle</th><th>Date</th><th>Litres</th><th>Cost</th><th>Odometer</th><th>Efficiency</th></tr></thead>
              <tbody>
                {(fuel.data || []).map((f) => {
                  const kmPerL = f.fuelConsumed && f.liters ? f.fuelConsumed / f.liters : null;
                  return (
                    <tr key={f.fuelLogId}>
                      <td className="mono">{f.vehicle?.registrationNumber || '—'}</td>
                      <td className="mono">{dateShort(f.fuelDate)}</td>
                      <td className="mono">{number(f.liters, 1)} L</td>
                      <td className="mono">{currency(f.cost)}</td>
                      <td className="mono">{number(f.odometerReading)} km</td>
                      <td>{kmPerL ? <Chip tone={efficiencyTone(kmPerL)}>{kmPerL.toFixed(1)} km/l</Chip> : '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </DataFrame>
        </div>
      </div>

      {showMaintForm && (
        <Modal
          title="Log maintenance"
          onClose={() => setShowMaintForm(false)}
          footer={
            <>
              <button className="btn ghost" onClick={() => setShowMaintForm(false)}>Cancel</button>
              <button className="btn amber" form="maint-form" disabled={savingMaint}>{savingMaint ? 'Saving…' : 'Log maintenance'}</button>
            </>
          }
        >
          <form id="maint-form" onSubmit={submitMaintenance} style={{ display: 'contents' }}>
            {maintErrors._general && <div className="field-error">{maintErrors._general}</div>}
            <Field label="Vehicle" error={maintErrors.vehicle}>
              <select required value={maintForm.vehicleId} onChange={(e) => setMaintForm((f) => ({ ...f, vehicleId: e.target.value }))}>
                <option value="">Select vehicle…</option>
                {(vehicles.data || []).map((v) => (
                  <option key={v.vehicleId} value={v.vehicleId}>{v.registrationNumber} — {v.vehicleName}</option>
                ))}
              </select>
            </Field>
            <Field label="Maintenance type" error={maintErrors.maintenanceType}>
              <input required value={maintForm.maintenanceType} onChange={(e) => setMaintForm((f) => ({ ...f, maintenanceType: e.target.value }))} placeholder="Engine service" />
            </Field>
            <Field label="Issue" error={maintErrors.issue}>
              <input required value={maintForm.issue} onChange={(e) => setMaintForm((f) => ({ ...f, issue: e.target.value }))} placeholder="Overheating on long haul" />
            </Field>
            <Field label="Description">
              <textarea rows={3} value={maintForm.description} onChange={(e) => setMaintForm((f) => ({ ...f, description: e.target.value }))} />
            </Field>
            <Field label="Cost (₹)" error={maintErrors.cost}>
              <input required type="number" min="0" step="0.01" value={maintForm.cost} onChange={(e) => setMaintForm((f) => ({ ...f, cost: e.target.value }))} />
            </Field>
            <Field label="Start date" error={maintErrors.startDate}>
              <input required type="date" value={maintForm.startDate} onChange={(e) => setMaintForm((f) => ({ ...f, startDate: e.target.value }))} />
            </Field>
          </form>
        </Modal>
      )}

      {showFuelForm && (
        <Modal
          title="Log fuel"
          onClose={() => setShowFuelForm(false)}
          footer={
            <>
              <button className="btn ghost" onClick={() => setShowFuelForm(false)}>Cancel</button>
              <button className="btn amber" form="fuel-form" disabled={savingFuel}>{savingFuel ? 'Saving…' : 'Log fuel'}</button>
            </>
          }
        >
          <form id="fuel-form" onSubmit={submitFuel} style={{ display: 'contents' }}>
            {fuelErrors._general && <div className="field-error">{fuelErrors._general}</div>}
            <Field label="Vehicle" error={fuelErrors.vehicle}>
              <select required value={fuelForm.vehicleId} onChange={(e) => setFuelForm((f) => ({ ...f, vehicleId: e.target.value }))}>
                <option value="">Select vehicle…</option>
                {(vehicles.data || []).map((v) => (
                  <option key={v.vehicleId} value={v.vehicleId}>{v.registrationNumber} — {v.vehicleName}</option>
                ))}
              </select>
            </Field>
            <Field label="Fuel date" error={fuelErrors.fuelDate}>
              <input required type="date" value={fuelForm.fuelDate} onChange={(e) => setFuelForm((f) => ({ ...f, fuelDate: e.target.value }))} />
            </Field>
            <Field label="Litres" error={fuelErrors.liters}>
              <input required type="number" min="0" step="0.1" value={fuelForm.liters} onChange={(e) => setFuelForm((f) => ({ ...f, liters: e.target.value }))} />
            </Field>
            <Field label="Cost (₹)" error={fuelErrors.cost}>
              <input required type="number" min="0" step="0.01" value={fuelForm.cost} onChange={(e) => setFuelForm((f) => ({ ...f, cost: e.target.value }))} />
            </Field>
            <Field label="Odometer reading (km)" error={fuelErrors.odometerReading}>
              <input required type="number" min="0" step="0.1" value={fuelForm.odometerReading} onChange={(e) => setFuelForm((f) => ({ ...f, odometerReading: e.target.value }))} />
            </Field>
            <Field label="Remarks">
              <input value={fuelForm.remarks} onChange={(e) => setFuelForm((f) => ({ ...f, remarks: e.target.value }))} />
            </Field>
          </form>
        </Modal>
      )}
    </section>
  );
}
