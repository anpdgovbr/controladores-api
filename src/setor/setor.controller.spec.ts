import { Test, TestingModule } from '@nestjs/testing';
import { SetorController } from './setor.controller';

describe('SetorController', () => {
  let controller: SetorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SetorController],
    }).compile();

    controller = module.get<SetorController>(SetorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
