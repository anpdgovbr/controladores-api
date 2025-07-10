import { Test, TestingModule } from '@nestjs/testing';
import { GrupoEconomicoService } from './grupo-economico.service';

describe('GrupoEconomicoService', () => {
  let service: GrupoEconomicoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GrupoEconomicoService],
    }).compile();

    service = module.get<GrupoEconomicoService>(GrupoEconomicoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
