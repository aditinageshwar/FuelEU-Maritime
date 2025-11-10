import { Pooling } from '../domain/Pooling';
import { PoolingRepository } from '../ports/PoolingRepository';

export class CreatePooling {
  constructor(private poolingRepo: PoolingRepository) {}

  async execute(fromVesselId: string, toVesselId: string, cbAmount: number): Promise<void> {
    const pooling = new Pooling(crypto.randomUUID(), fromVesselId, toVesselId, cbAmount);
    await this.poolingRepo.save(pooling);
  }
}