const request = require('supertest');
const app = require('../app');

describe('POST /api/converter/convert', () => {
  it('should convert length from meter to kilometer', async () => {
    const response = await request(app).post('/api/converter/convert').send({
      category: 'length',
      fromUnit: 'meter',
      toUnit: 'kilometer',
      value: 1000
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      success: true,
      result: 1
    });
  });

  it('should normalize case and numeric string input', async () => {
    const response = await request(app).post('/api/converter/convert').send({
      category: 'Length',
      fromUnit: 'Meter',
      toUnit: 'Kilometer',
      value: '1000'
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.result).toBe(1);
  });

  it('should return 400 for invalid unit', async () => {
    const response = await request(app).post('/api/converter/convert').send({
      category: 'length',
      fromUnit: 'meter',
      toUnit: 'invalid',
      value: 1000
    });

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Invalid toUnit for selected category');
  });
});

describe('Fallback route', () => {
  it('should return 404 for unknown endpoint', async () => {
    const response = await request(app).get('/api/missing-route');

    expect(response.statusCode).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Route not found');
  });
});
