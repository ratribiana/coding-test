import dotenv from 'dotenv';

dotenv.config({ path: `.env.development` });

import request from 'supertest';
import App from '@/app';
import WelcomeRoute from '@routes/welcome.route';

jest.setTimeout(10000); // Increased timeout for the test

describe('Testing Index', () => {
  let app: App;

  beforeAll(() => {
    app = new App();
  });

  afterAll(async () => {
    await app.closeDbConnection();
  });

  describe('[GET] /', () => {
    it('should respond with HTML if Accept header includes "html"', async () => {
      const response = await request(app.getServer([new WelcomeRoute()]))
        .get('/')
        .set('Accept', 'text/html');

      expect(response.status).toBe(200);
      expect(response.header['content-type']).toContain('html');
      expect(response.text).toContain('API is now up and running!');
    });

    it('should respond with JSON if Accept header does not include "html"', async () => {
      const response = await request(app.getServer([new WelcomeRoute()]))
        .get('/')
        .set('Accept', 'application/json');

      expect(response.status).toBe(200);
      expect(response.header['content-type']).toContain('json');
      expect(response.body).toEqual({
        success: true,
        message: 'API is now up and running!',
      });
    });

    it('response statusCode 500 for an error', async () => {
      const response = await request(app.getServer([new WelcomeRoute()])).get('/');
      expect(response.status).toBe(500);
    });
  });
});
