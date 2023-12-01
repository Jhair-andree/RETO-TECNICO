import * as request from 'supertest';
import app from './app'; // Importa tu aplicación Express
import faker from 'faker';

describe('API Tests', () => {
  beforeAll(() => {
    process.env.NODE_ENV = 'test';
  });

  it('should add a user', async () => {
    const randomUsername = faker.internet.userName();
    const randomEmail = faker.internet.email();

    const response = await request(app)
      .post('/add_user')
      .send({ username: randomUsername, email: randomEmail });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User added successfully');
  });

  it('should get users', async () => {
    const randomUsername = faker.internet.userName();
    const randomEmail = faker.internet.email();

    await request(app)
      .post('/add_user')
      .send({ username: randomUsername, email: randomEmail });

    const response = await request(app).get('/get_users');

    expect(response.status).toBe(200);
    expect(response.body.users.length).toBe(1);
    expect(response.body.users[0].username).toBe(randomUsername);
    expect(response.body.users[0].email).toBe(randomEmail);
  });
});
