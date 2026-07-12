import { labelize } from './format';

const TONES = {
  // VehicleStatus / DriverStatus
  AVAILABLE: 'green',
  ON_TRIP: 'amber',
  IN_SHOP: 'red',
  RETIRED: 'grey',
  OFF_DUTY: 'grey',
  SUSPENDED: 'red',
  // TripStatus
  DRAFT: 'grey',
  DISPATCHED: 'blue',
  COMPLETED: 'green',
  CANCELLED: 'red',
  // MaintenanceStatus
  ACTIVE: 'amber',
  // Users
  ENABLED: 'green',
  DISABLED: 'red',
};

export function toneFor(status) {
  return TONES[status] || 'grey';
}

export function statusLabel(status) {
  return labelize(status);
}
