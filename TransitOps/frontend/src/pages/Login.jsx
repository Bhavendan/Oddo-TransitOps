import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      const dest = location.state?.from || '/';
      navigate(dest, { replace: true });
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.brand}>
          <div style={styles.brandMark}>T</div>
          <div>
            <div style={styles.brandName}>TransitOps</div>
            <div style={styles.brandSub}>Control Room</div>
          </div>
        </div>

        <h1 style={styles.title}>Sign in</h1>
        <p style={styles.subtitle}>Use your TransitOps account to continue.</p>

        <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {error && <div className="field-error" style={styles.error}>{error}</div>}
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@transitops.io"
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button className="btn amber" type="submit" disabled={loading} style={{ marginTop: 6 }}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p style={styles.note}>
          No account yet? Ask an admin to invite you from the Users &amp; Roles page.
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'var(--bg)',
    fontFamily: 'var(--body)',
  },
  card: {
    width: 380,
    background: 'var(--panel)',
    border: '1px solid var(--line)',
    borderRadius: 14,
    padding: '28px 30px',
  },
  brand: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 },
  brandMark: {
    width: 34, height: 34, borderRadius: 8, background: 'var(--amber)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: '#1A1400', fontFamily: 'var(--display)', fontWeight: 700, fontSize: 19,
  },
  brandName: { fontFamily: 'var(--display)', fontWeight: 600, fontSize: 21, color: 'var(--ink)' },
  brandSub: { fontSize: 10, color: 'var(--ink-faint)', letterSpacing: 1.5, textTransform: 'uppercase', marginTop: -2 },
  title: { fontFamily: 'var(--display)', fontSize: 26, fontWeight: 600, margin: '0 0 4px 0' },
  subtitle: { fontSize: 13, color: 'var(--ink-soft)', margin: '0 0 20px 0' },
  error: { background: 'var(--red-bg)', color: 'var(--red-ink)', padding: '8px 12px', borderRadius: 7, fontSize: 12.5 },
  note: { fontSize: 12, color: 'var(--ink-faint)', marginTop: 18, textAlign: 'center' },
};
