import { api } from '../test/setup.js';

describe('Pruebas a users', () => {
  const usersEndPoint = '/api/v1/users';
  describe('GET /users', () => {
    test('Debería retornar la respuesta esperada y estatus 200', async () => {
      const response = await api.get(usersEndPoint).query();

      expect(response).toBeTruthy();
      expect(response.statusCode).toBe(200);
      expect(typeof response.body).toBe('object');
      expect(response.body).toHaveProperty('data');
      expect(response.body.data.length).toBeGreaterThan(0);
    });
  });

  describe('GET /users/:id', () => {
    test('Debería retornar la respuesta esperada y estatus 200', async () => {
      const getUsers = await api.get(usersEndPoint).query();
      const allDataUsers = getUsers.body.data;
      const usersIdNoBloqueado = allDataUsers.filter((user) => user.isBlock === false);
      const userId = usersIdNoBloqueado[0].id;
      const response = await api.get(`${usersEndPoint}/${userId}`).query();

      expect(response).toBeTruthy();
      expect(response.statusCode).toBe(200);
      expect(typeof response.body).toBe('object');
      expect(response.body).toHaveProperty('id');
      expect(response.body.id).toBe(userId);
    });
    test('Debería retornar la respuesta esperada y estatus 404 con un id inexistente', async () => {
      const fakeId = '349fff85-c413-480e-a15d-28124de10000';
      const response = await api.get(`${usersEndPoint}/${fakeId}`).query();

      expect(response).toBeTruthy();
      expect(response.statusCode).toBe(404);
      expect(typeof response.body).toBe('object');
      expect(response.body).toHaveProperty('code');
      expect(response.body.code).toBe('404');
    });
    test('Debería retornar la respuesta esperada y estatus 400 con un id no válido', async () => {
      const response = await api.get(`${usersEndPoint}/1234567890`).query();

      expect(response).toBeTruthy();
      expect(response.statusCode).toBe(400);
      expect(typeof response.body).toBe('object');
      expect(response.body).toHaveProperty('code');
      expect(response.body.code).toBe('400');
    });
  });
});
