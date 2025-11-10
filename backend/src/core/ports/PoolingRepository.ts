import { Pooling } from '../domain/Pooling';

export interface PoolingRepository {
  save(pooling: Pooling): Promise<void>;
  findByVesselId(vesselId: string): Promise<Pooling[]>;
}