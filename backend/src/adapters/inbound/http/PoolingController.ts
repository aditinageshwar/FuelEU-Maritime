import { Request, Response } from 'express';
import { CreatePooling } from '../../../core/application/CreatePooling';
import { PoolingRepository } from '../../../core/ports/PoolingRepository';

export class PoolingController {
  constructor(
    private createPooling: CreatePooling,
    private poolingRepo: PoolingRepository
  ) {}

  async getByVessel(req: Request, res: Response): Promise<void> {
    try {
      const { vesselId } = req.params;
      const poolings = await this.poolingRepo.findByVesselId(vesselId);
      res.json(poolings);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch poolings' });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { fromVesselId, toVesselId, cbAmount } = req.body;
      if (!fromVesselId || !toVesselId || cbAmount == null) {
        res.status(400).json({ error: 'Invalid fields' });
        return;
      }
      await this.createPooling.execute(fromVesselId, toVesselId, cbAmount);
      res.status(201).json({ message: 'Pooling created' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create pooling' });
    }
  }
}
