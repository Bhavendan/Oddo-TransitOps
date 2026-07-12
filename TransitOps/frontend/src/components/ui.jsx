export function Chip({ tone = 'grey', children, dot = true }) {
  return (
    <span className={`chip ${tone}`}>
      {dot && <span className="dot-i" />}
      {children}
    </span>
  );
}

export function StatCard({ label, value, delta, deltaTone }) {
  return (
    <div className="stat-card">
      <div className="label">{label}</div>
      <div className="value">{value}</div>
      {delta && <div className={`delta ${deltaTone || ''}`}>{delta}</div>}
    </div>
  );
}

export function Topbar({ title, desc, actions }) {
  return (
    <div className="topbar">
      <div>
        <h1>{title}</h1>
        {desc && <div className="desc">{desc}</div>}
      </div>
      {actions && <div className="topbar-actions">{actions}</div>}
    </div>
  );
}

export function LoadingState({ label = 'Loading…' }) {
  return <div className="loading-state">{label}</div>;
}

export function ErrorState({ message, onRetry }) {
  return (
    <div className="error-state">
      {message || 'Something went wrong talking to the backend.'}
      {onRetry && (
        <button className="btn ghost" style={{ marginLeft: 10 }} onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}

export function EmptyState({ label = 'Nothing here yet.' }) {
  return <div className="empty-state">{label}</div>;
}

/** Wraps a table body: shows loading / error / empty / children as appropriate. */
export function DataFrame({ loading, error, onRetry, isEmpty, emptyLabel, children }) {
  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={onRetry} />;
  if (isEmpty) return <EmptyState label={emptyLabel} />;
  return children;
}
