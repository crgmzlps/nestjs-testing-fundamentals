import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  const dto = {
    name: 'john doe',
    email: 'john@doe.com',
  };

  const mockUserService = {
    findOne: jest.fn((id) => ({ id, ...dto })),
    create: jest.fn((dto) => {
      return {
        id: 1,
        ...dto,
      };
    }),
    update: jest.fn((id, dto) => {
      return {
        id: 1,
        ...dto,
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService], //deps inject
    })
      .overrideProvider(UserService)
      .useValue(mockUserService)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user ', async () => {
    expect(await controller.create(dto)).toEqual({
      id: expect.any(Number),
      name: dto.name,
      email: dto.email,
    });
    expect(mockUserService.create).toHaveBeenCalledWith(dto);
  });

  it('should update a user ', async () => {
    const id = 1;

    expect(await controller.update(id, { name: dto.name })).toEqual({
      id: 1,
      name: dto.name,
      email: expect.any(String),
    });
    expect(mockUserService.update).toHaveBeenCalled();
  });
});
