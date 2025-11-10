import { Request, Response } from 'express';
import { CalculateComplianceBalance } from '../../../core/application/CalculateComplianceBalance';

export class ComplianceController {
  constructor(private calculateCB: CalculateComplianceBalance) {}

  async calculate(req: Request, res: Response): Promise<void> {
    try {
      const { routeId } = req.body;
      if (!routeId) {
        res.status(400).json({ error: 'routeId required' });
        return;
      }
      const cb = await this.calculateCB.execute(routeId);
      res.json({ cb });
    } catch (error) {
      res.status(500).json({ error: 'Failed to calculate compliance balance' });
    }
  }
}
