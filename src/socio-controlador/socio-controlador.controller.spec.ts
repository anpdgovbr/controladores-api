import { Test, TestingModule } from '@nestjs/testing';
import { SocioControladorController } from './socio-controlador.controller';

describe('SocioControladorController', () => {
  let controller: SocioControladorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocioControladorController],
    }).compile();

    controller = module.get<SocioControladorController>(
      SocioControladorController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
