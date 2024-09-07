import request from 'supertest';
import App from './app';

describe('App', () => {
  it('should respond to GET requests on the root route', async () => {
    const response = await request(App.app).get('/launches');
    expect(response.status).toBe(200);
  });

  it('should use CORS, Helmet, and Cookie Parser middlewares', async () => {
    const response = await request(App.app).get('/launches');
    expect(response.headers['access-control-allow-origin']).toBe('*');
  });

  it('should start the server on the specified port', async () => {
    const PORT = 8001;
    const server = App.app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });

    server.close();
  });
});
