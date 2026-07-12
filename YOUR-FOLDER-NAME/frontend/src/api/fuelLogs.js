import client from './client';

export const fuelLogsApi = {
  list: (params) => client.get('/fuel-logs', { params }).then((r) => r.data),
  get: (id) => client.get(`/fuel-logs/${id}`).then((r) => r.data),
  totalCost: (vehicleId) =>
    client.get(`/fuel-logs/vehicle/${vehicleId}/total-cost`).then((r) => r.data),
  create: (payload) => client.post('/fuel-logs', payload).then((r) => r.data),
  update: (id, payload) => client.put(`/fuel-logs/${id}`, payload).then((r) => r.data),
  remove: (id) => client.delete(`/fuel-logs/${id}`).then((r) => r.data),
};
