import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as request from 'supertest';
import { User } from '../src/user/models/user-entity';
import { UserModule } from '../src/user/user.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  const userMock = {
    name: 'john doe',
    email: 'john@doe.com',
  };

  const userRepositoryMock = {
    find: jest.fn().mockImplementation(() => []),
    save: jest.fn().mockImplementation((dto) => ({ id: 1, ...dto })),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideProvider(getRepositoryToken(User))
      .useValue(userRepositoryMock)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .then((res) => {
        expect(res.body).toBeInstanceOf(Array);
      });
  });

  it('/users (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send(userMock)
      .expect(201)
      .then((res) => {
        expect(res.body).toEqual({
          id: expect.any(Number),
          name: userMock.name,
          email: userMock.email,
        });
      });
  });

  it('/users (POST)  --> 400 on validation error', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({ name: 123 })
      .expect(400);
  });
});
