import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './models/user-entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  const userMock = {
    name: 'john doe',
    email: 'john@doe.com',
  };

  const mockUserRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn().mockImplementation((user) => ({ id: 1, ...user })),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user record and return that', async () => {
    const result = await service.create(userMock);
    expect(result).toHaveProperty('id');
  });
});
