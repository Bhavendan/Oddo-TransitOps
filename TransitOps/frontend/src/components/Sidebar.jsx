import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { labelize } from '../lib/format';

function initials(name) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] || '') + (parts[1]?.[0] || '')).toUpperCase() || name[0].toUpperCase();
}

const icons = {
  dashboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" />
    </svg>
  ),
  trips: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 12h4l2-4 3 8 2-6h4l2 2" />
    </svg>
  ),
  vehicles: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="9" width="15" height="8" rx="1.5" /><path d="M17 11h3l2 3v3h-5" />
      <circle cx="6.5" cy="18.5" r="1.6" /><circle cx="16.5" cy="18.5" r="1.6" />
    </svg>
  ),
  drivers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="3.4" /><path d="M4.5 20c1.4-4 4.2-6 7.5-6s6.1 2 7.5 6" />
    </svg>
  ),
  maintenance: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14.7 6.3a4 4 0 0 1-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 1 5.4-5.4l-2.6 2.6-2-2z" />
    </svg>
  ),
  expenses: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 6h18M3 12h18M3 18h11" /><circle cx="19" cy="18" r="2.4" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="8" r="3" /><path d="M3 20c1-3.5 3.3-5.5 6-5.5s5 2 6 5.5" />
      <circle cx="18" cy="8" r="2.2" /><path d="M15.5 14.7c1.9.4 3.4 2 4.3 4.8" />
    </svg>
  ),
};

function Item({ to, icon, children }) {
  return (
    <NavLink to={to} className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')} end={to === '/'}>
      {icons[icon]}
      {children}
    </NavLink>
  );
}

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <div className="sidebar">
      <NavLink to="/" className="brand">
        <div className="brand-mark">T</div>
        <div>
          <div className="brand-name">TransitOps</div>
          <div className="brand-sub">Control Room</div>
        </div>
      </NavLink>
      <nav>
        <Item to="/" icon="dashboard">Dashboard</Item>
        <div className="nav-divider">Operations</div>
        <Item to="/trips" icon="trips">Dispatch &amp; Trips</Item>
        <Item to="/vehicles" icon="vehicles">Fleet</Item>
        <Item to="/drivers" icon="drivers">Drivers</Item>
        <div className="nav-divider">Maintenance</div>
        <Item to="/maintenance" icon="maintenance">Maintenance &amp; Fuel</Item>
        <Item to="/expenses" icon="expenses">Expenses</Item>
        <div className="nav-divider">Admin</div>
        <Item to="/users" icon="users">Users &amp; Roles</Item>
      </nav>
      <div className="sidebar-footer">
        <div className="avatar">{initials(user?.name)}</div>
        <div className="who"><b>{user?.name || 'Signed in'}</b><span>{user?.role ? labelize(user.role) : ''}</span></div>
        <button className="close-x" title="Sign out" onClick={handleLogout} style={{ marginLeft: 'auto', color: '#8992A0' }}>
          ⎋
        </button>
      </div>
    </div>
  );
}
