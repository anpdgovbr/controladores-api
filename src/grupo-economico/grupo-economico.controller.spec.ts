import { Test, TestingModule } from '@nestjs/testing';
import { GrupoEconomicoController } from './grupo-economico.controller';

describe('GrupoEconomicoController', () => {
  let controller: GrupoEconomicoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GrupoEconomicoController],
    }).compile();

    controller = module.get<GrupoEconomicoController>(GrupoEconomicoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
