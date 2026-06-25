const request = require('supertest');

const app = require('../src/app');
const env = require('../src/config/env');

describe('Health endpoint', () => {
  it('returns service health payload', async () => {
    const response = await request(app).get(`${env.apiPrefix}/health`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({ success: true });
    expect(response.body.data).toMatchObject({
      service: 'music-player-backend',
      status: 'ok'
    });
  });
});
