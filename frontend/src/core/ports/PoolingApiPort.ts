import { Pooling } from '../domain/Pooling';

export interface PoolingApiPort {
  getPoolingsByVessel(vesselId: string): Promise<Pooling[]>;
  create(fromVesselId: string, toVesselId: string, cbAmount: number): Promise<void>;
}