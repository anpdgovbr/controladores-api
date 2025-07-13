import { Test, TestingModule } from '@nestjs/testing';
import { EncarregadoController } from './encarregado.controller';

describe('EncarregadoController', () => {
  let controller: EncarregadoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EncarregadoController],
    }).compile();

    controller = module.get<EncarregadoController>(EncarregadoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
