import { Pooling } from '../../../core/domain/Pooling';
import { PoolingRepository } from '../../../core/ports/PoolingRepository';
import prisma from '../../../infrastructure/db/config';

export class PostgreSQLPoolingRepository implements PoolingRepository {
  async save(pooling: Pooling): Promise<void> {
    await prisma.pooling.create({
      data: {
        id: pooling.id,
        fromVesselId: pooling.fromVesselId,
        toVesselId: pooling.toVesselId,
        cbAmount: pooling.cbAmount,
      },
    });
  }

  async findByVesselId(vesselId: string): Promise<Pooling[]> {
    const rows = await prisma.pooling.findMany({
      where: { OR: [{ fromVesselId: vesselId }, { toVesselId: vesselId }] },
    });
    return rows.map(row => new Pooling(row.id, row.fromVesselId, row.toVesselId, row.cbAmount));
  }
}