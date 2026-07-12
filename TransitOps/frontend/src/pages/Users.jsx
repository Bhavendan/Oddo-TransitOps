import { useState } from 'react';
import { Topbar, Chip, DataFrame } from '../components/ui';
import Modal, { Field } from '../components/Modal';
import { useApi } from '../lib/useApi';
import { usersApi, rolesApi } from '../api/users';
import { statusLabel } from '../lib/statusTone';

const emptyForm = { name: '', email: '', password: '', roleId: '' };

export default function Users() {
  const users = useApi(() => usersApi.list(), []);
  const roles = useApi(() => rolesApi.list(), []);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    setErrors({});
    try {
      await usersApi.create({
        name: form.name,
        email: form.email,
        password: form.password,
        role: { roleId: Number(form.roleId) },
      });
      setShowForm(false);
      setForm(emptyForm);
      users.reload();
    } catch (err) {
      setErrors(err.response?.data?.fieldErrors || { _general: err.message });
    } finally {
      setSaving(false);
    }
  }

  return (
    <section>
      <Topbar
        title="Users &amp; Roles"
        desc="Access control across the platform"
        actions={<button className="btn amber" onClick={() => setShowForm(true)}>+ Invite user</button>}
      />
      <div className="panel">
        <div className="panel-body">
          <DataFrame
            loading={users.loading}
            error={users.error}
            onRetry={users.reload}
            isEmpty={(users.data || []).length === 0}
            emptyLabel="No users yet."
          >
            <table>
              <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th></tr></thead>
              <tbody>
                {(users.data || []).map((u) => (
                  <tr key={u.userId}>
                    <td className="row-name">{u.name}</td>
                    <td className="mono">{u.email}</td>
                    <td><Chip tone="grey">{u.role?.name ? statusLabel(u.role.name) : '—'}</Chip></td>
                    <td><Chip tone={u.enabled ? 'green' : 'red'}>{u.enabled ? 'Active' : 'Disabled'}</Chip></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </DataFrame>
        </div>
      </div>
      <p className="note">Roles map to RoleName in the backend — Admin, Fleet Manager, Driver, Safety Officer, Financial Analyst.</p>

      {showForm && (
        <Modal
          title="Invite user"
          onClose={() => setShowForm(false)}
          footer={
            <>
              <button className="btn ghost" onClick={() => setShowForm(false)}>Cancel</button>
              <button className="btn amber" form="user-form" disabled={saving}>{saving ? 'Saving…' : 'Invite user'}</button>
            </>
          }
        >
          <form id="user-form" onSubmit={submit} style={{ display: 'contents' }}>
            {errors._general && <div className="field-error">{errors._general}</div>}
            <Field label="Name" error={errors.name}>
              <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            </Field>
            <Field label="Email" error={errors.email}>
              <input required type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
            </Field>
            <Field label="Temporary password" error={errors.password}>
              <input required type="password" value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))} />
            </Field>
            <Field label="Role" error={errors.role}>
              <select required value={form.roleId} onChange={(e) => setForm((f) => ({ ...f, roleId: e.target.value }))}>
                <option value="">Select role…</option>
                {(roles.data || []).map((r) => (
                  <option key={r.roleId} value={r.roleId}>{statusLabel(r.name)}</option>
                ))}
              </select>
            </Field>
          </form>
        </Modal>
      )}
    </section>
  );
}
