import client from './client';

export const tripsApi = {
  list: (params) => client.get('/trips', { params }).then((r) => r.data),
  get: (id) => client.get(`/trips/${id}`).then((r) => r.data),
  countByStatus: () => client.get('/trips/stats/count-by-status').then((r) => r.data),
  create: (payload) => client.post('/trips', payload).then((r) => r.data),
  update: (id, payload) => client.put(`/trips/${id}`, payload).then((r) => r.data),
  remove: (id) => client.delete(`/trips/${id}`).then((r) => r.data),
};
