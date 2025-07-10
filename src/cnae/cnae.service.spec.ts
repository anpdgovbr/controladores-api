import { Test, TestingModule } from '@nestjs/testing';
import { CnaeService } from './cnae.service';

describe('CnaeService', () => {
  let service: CnaeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CnaeService],
    }).compile();

    service = module.get<CnaeService>(CnaeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
