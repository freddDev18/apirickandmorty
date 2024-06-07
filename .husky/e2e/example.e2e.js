import { describe, test, beforeAll, expect, afterAll } from 'vitest';
import createApp from '../../src/app.js';

const request = require('supertest');

describe('Pruebas a Example',()=>{
    describe('GET /example/', ()=>{
        let app = null;
    let server = null;
    let api = null;
    const exampleEndPoint = '/api/v1/example/';
    beforeAll(() => {
        app = createApp();
        server = app.listen(9000);
        api = request(app);
      });

      afterAll(() => {
        server.close();
      });

      test('Debería retornar estatus 200 y listado', async()=>{
        const response = await api.get(exampleEndPoint).query({});
     expect(response).toBeTruthy();
      expect(response.statusCode).toBe(200);
      expect(typeof response.body).toBe('object');
      response.body.forEach((obj) => {
        expect(obj).toHaveProperty('id');
        expect(obj).toHaveProperty('fullName');
        expect(obj).toHaveProperty('jobArea');
        expect(obj).toHaveProperty('email');
        expect(obj).toHaveProperty('isBlock');
      });
      expect(response.body.length).toBeGreaterThan(0);
      });
    })
});