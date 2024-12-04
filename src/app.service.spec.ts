import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('debería devolver estado ok e incrementar el contador', () => {
    const result1 = service.healthCheck();
    expect(result1.Status).toBe('ok');
    expect(result1.checkCount).toBe(0);

    const result2 = service.healthCheck();
    expect(result2.Status).toBe('ok');
    expect(result2.checkCount).toBe(1);
  });

  it('debería controlar y retornar un error', () => {
    try {
      throw new Error('Test error');
    } catch (error) {
      const result = {
        Status: 'error',
        error: error instanceof Error ? error.message : 'Error desconocido',
      };
      expect(result.Status).toBe('error');
      expect(result.error).toBe('Test error');
    }
  });
});
