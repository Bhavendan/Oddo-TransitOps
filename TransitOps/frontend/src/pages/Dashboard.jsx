import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Topbar, StatCard, DataFrame } from '../components/ui';
import RouteStrip from '../components/RouteStrip';
import { useApi } from '../lib/useApi';
import { vehiclesApi } from '../api/vehicles';
import { tripsApi } from '../api/trips';
import { driversApi } from '../api/drivers';
import { maintenanceLogsApi } from '../api/maintenanceLogs';
import { fuelLogsApi } from '../api/fuelLogs';
import { currency, number } from '../lib/format';

export default function Dashboard() {
  const vehicles = useApi(() => vehiclesApi.list(), []);
  const trips = useApi(() => tripsApi.list(), []);
  const drivers = useApi(() => driversApi.list(), []);
  const maintenance = useApi(() => maintenanceLogsApi.list({ status: 'ACTIVE' }), []);
  const inTransitDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().slice(0, 10);
  }, []);
  const expiringLicenses = useApi(() => driversApi.expiringLicenses(inTransitDate), [inTransitDate]);
  const fuelLogs = useApi(() => fuelLogsApi.list(), []);

  const loading = vehicles.loading || trips.loading || drivers.loading;
  const error = vehicles.error || trips.error || drivers.error;

  const vehicleCounts = useMemo(() => {
    const list = vehicles.data || [];
    return {
      total: list.length,
      available: list.filter((v) => v.status === 'AVAILABLE').length,
      inShop: list.filter((v) => v.status === 'IN_SHOP').length,
    };
  }, [vehicles.data]);

  const activeTrips = useMemo(
    () => (trips.data || []).filter((t) => t.status === 'DISPATCHED'),
    [trips.data]
  );

  const fuelSpendMTD = useMemo(() => {
    const list = fuelLogs.data || [];
    const now = new Date();
    return list
      .filter((f) => {
        const d = new Date(f.fuelDate);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      })
      .reduce((sum, f) => sum + Number(f.cost || 0), 0);
  }, [fuelLogs.data]);

  return (
    <section>
      <Topbar
        title="Control Room"
        desc="Live snapshot of the fleet"
        actions={<Link to="/trips" className="btn amber">+ New trip</Link>}
      />

      <DataFrame loading={loading} error={error} onRetry={() => { vehicles.reload(); trips.reload(); drivers.reload(); }}>
        <div className="stat-row">
          <StatCard
            label="Vehicles available"
            value={`${vehicleCounts.available} / ${vehicleCounts.total}`}
          />
          <StatCard label="Active trips" value={activeTrips.length} delta={`${(trips.data || []).length} total logged`} />
          <StatCard
            label="In the shop"
            value={vehicleCounts.inShop}
            delta={maintenance.data?.length ? `${maintenance.data.length} active job(s)` : undefined}
            deltaTone="warn"
          />
          <StatCard label="Fuel spend (this month)" value={currency(fuelSpendMTD)} />
        </div>
      </DataFrame>

      <div className="two-col">
        <div className="panel">
          <div className="panel-head">
            <h3>Live routes</h3>
            <span className="sub">{activeTrips.length} vehicle(s) dispatched</span>
          </div>
          <div className="panel-body">
            <DataFrame
              loading={trips.loading}
              error={trips.error}
              onRetry={trips.reload}
              isEmpty={activeTrips.length === 0}
              emptyLabel="No trips are currently dispatched."
            >
              {activeTrips.slice(0, 6).map((t) => (
                <RouteStrip key={t.tripId} trip={t} />
              ))}
            </DataFrame>
          </div>
        </div>

        <div className="panel">
          <div className="panel-head">
            <h3>Alerts</h3>
            <span className="sub">{(expiringLicenses.data?.length || 0) + (maintenance.data?.length || 0)} need attention</span>
          </div>
          <div className="panel-body">
            <DataFrame
              loading={expiringLicenses.loading || maintenance.loading}
              error={expiringLicenses.error || maintenance.error}
              isEmpty={(expiringLicenses.data?.length || 0) === 0 && (maintenance.data?.length || 0) === 0}
              emptyLabel="No alerts — everything's on schedule."
            >
              {(expiringLicenses.data || []).map((d) => (
                <div className="alert-item" key={`lic-${d.driverId}`}>
                  <div className="alert-icon red">!</div>
                  <div className="alert-text">
                    <b>License expiring — {d.name}</b>
                    <span>{d.licenseCategory} licence expires {d.licenseExpiryDate}</span>
                  </div>
                </div>
              ))}
              {(maintenance.data || []).map((m) => (
                <div className="alert-item" key={`maint-${m.maintenanceId}`}>
                  <div className="alert-icon amber">⏱</div>
                  <div className="alert-text">
                    <b>{m.maintenanceType} in progress</b>
                    <span>{m.vehicle?.registrationNumber} — since {m.startDate}, {number(m.cost)} so far</span>
                  </div>
                </div>
              ))}
            </DataFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
