import { Test, TestingModule } from '@nestjs/testing';
import { CnaeController } from './cnae.controller';

describe('CnaeController', () => {
  let controller: CnaeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CnaeController],
    }).compile();

    controller = module.get<CnaeController>(CnaeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
