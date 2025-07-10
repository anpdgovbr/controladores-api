import { Test, TestingModule } from '@nestjs/testing';
import { EncarregadoService } from './encarregado.service';

describe('EncarregadoService', () => {
  let service: EncarregadoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EncarregadoService],
    }).compile();

    service = module.get<EncarregadoService>(EncarregadoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
