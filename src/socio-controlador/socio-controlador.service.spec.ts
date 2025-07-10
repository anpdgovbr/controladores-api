import { Test, TestingModule } from '@nestjs/testing';
import { SocioControladorService } from './socio-controlador.service';

describe('SocioControladorService', () => {
  let service: SocioControladorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocioControladorService],
    }).compile();

    service = module.get<SocioControladorService>(SocioControladorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
