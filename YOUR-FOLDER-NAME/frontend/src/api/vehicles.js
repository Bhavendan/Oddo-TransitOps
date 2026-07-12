import client from './client';

export const vehiclesApi = {
  list: (params) => client.get('/vehicles', { params }).then((r) => r.data),
  get: (id) => client.get(`/vehicles/${id}`).then((r) => r.data),
  countByStatus: () => client.get('/vehicles/stats/count-by-status').then((r) => r.data),
  create: (payload) => client.post('/vehicles', payload).then((r) => r.data),
  update: (id, payload) => client.put(`/vehicles/${id}`, payload).then((r) => r.data),
  remove: (id) => client.delete(`/vehicles/${id}`).then((r) => r.data),
};
