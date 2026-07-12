import client from './client';

export const driversApi = {
  list: (params) => client.get('/drivers', { params }).then((r) => r.data),
  get: (id) => client.get(`/drivers/${id}`).then((r) => r.data),
  expiringLicenses: (before) =>
    client.get('/drivers/expiring-licenses', { params: { before } }).then((r) => r.data),
  create: (payload) => client.post('/drivers', payload).then((r) => r.data),
  update: (id, payload) => client.put(`/drivers/${id}`, payload).then((r) => r.data),
  remove: (id) => client.delete(`/drivers/${id}`).then((r) => r.data),
};
