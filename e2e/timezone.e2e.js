import { expect } from 'vitest';
import getDate from './queries/timezone.queries.js';
import { api } from './test/setup.js';
import fixtures from './utils/fixtures.js';

describe('Pruebas a dates', () => {
  const datesEndPoint = '/api/v1/dates';
  describe('POST /dates', () => {
    test('Debe retornar la fecha acorde a la zona horaria America/Mexico_City  y estatus 201', async () => {
      const response = await api.post(datesEndPoint).send(fixtures.timezone);
      const date = await getDate();
      const mexico = date.find((d) => d.timeZone === 'America/Mexico_City');
      const la = date.find((d) => d.timeZone === 'America/Los_Angeles');
      expect(response).toBeTruthy();
      expect(response.statusCode).toBe(201);
      expect(mexico.date).toBe('2016-02-26 12:15:00');
      expect(la.date).toBe('2016-02-26 02:00:00');
    });
  });
});
