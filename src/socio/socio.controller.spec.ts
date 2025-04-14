import { Test, TestingModule } from '@nestjs/testing';
import { SocioController } from './socio.controller';

describe('SocioController', () => {
  let controller: SocioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocioController],
    }).compile();

    controller = module.get<SocioController>(SocioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
