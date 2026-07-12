import client from './client';

export const usersApi = {
  list: () => client.get('/users').then((r) => r.data),
  get: (id) => client.get(`/users/${id}`).then((r) => r.data),
  create: (payload) => client.post('/users', payload).then((r) => r.data),
  update: (id, payload) => client.put(`/users/${id}`, payload).then((r) => r.data),
  remove: (id) => client.delete(`/users/${id}`).then((r) => r.data),
};

export const rolesApi = {
  list: () => client.get('/roles').then((r) => r.data),
  get: (id) => client.get(`/roles/${id}`).then((r) => r.data),
  create: (payload) => client.post('/roles', payload).then((r) => r.data),
  update: (id, payload) => client.put(`/roles/${id}`, payload).then((r) => r.data),
  remove: (id) => client.delete(`/roles/${id}`).then((r) => r.data),
};
