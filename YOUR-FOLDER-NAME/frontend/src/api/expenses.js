import client from './client';

export const expensesApi = {
  list: (params) => client.get('/expenses', { params }).then((r) => r.data),
  get: (id) => client.get(`/expenses/${id}`).then((r) => r.data),
  totalForVehicle: (vehicleId) =>
    client.get(`/expenses/vehicle/${vehicleId}/total`).then((r) => r.data),
  create: (payload) => client.post('/expenses', payload).then((r) => r.data),
  update: (id, payload) => client.put(`/expenses/${id}`, payload).then((r) => r.data),
  remove: (id) => client.delete(`/expenses/${id}`).then((r) => r.data),
};
