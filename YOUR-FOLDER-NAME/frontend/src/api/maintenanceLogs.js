import client from './client';

export const maintenanceLogsApi = {
  list: (params) => client.get('/maintenance-logs', { params }).then((r) => r.data),
  get: (id) => client.get(`/maintenance-logs/${id}`).then((r) => r.data),
  countByStatus: () => client.get('/maintenance-logs/stats/count-by-status').then((r) => r.data),
  totalCost: (vehicleId) =>
    client.get(`/maintenance-logs/vehicle/${vehicleId}/total-cost`).then((r) => r.data),
  create: (payload) => client.post('/maintenance-logs', payload).then((r) => r.data),
  update: (id, payload) => client.put(`/maintenance-logs/${id}`, payload).then((r) => r.data),
  remove: (id) => client.delete(`/maintenance-logs/${id}`).then((r) => r.data),
};
