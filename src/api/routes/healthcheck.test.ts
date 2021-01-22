import App from '../../app';
import MockLogger from '../../utils/mockLogger';
import { Container } from 'typedi';
import request from 'supertest';

const path = '/healthcheck';

// Set MockLogger since we don't need logs for every test.
const logger = new MockLogger();
Container.set('logger', logger);

describe('#healthcheck', () => {
  let app;
  let instance;
  let connection;

  beforeAll(async () => {
    instance = new App(Container.get('logger'));
    await instance.init();
    app = instance.getServer();
    connection = instance.getDbConnection();
  });

  afterAll(async () => {
    await connection.close();
  });

  test('Respond with status code 200', async (done) => {
    await request(app).get(path).expect(200);
    done();
  });
});
