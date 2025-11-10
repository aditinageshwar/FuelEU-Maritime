import { Route } from '../domain/Route';
import { ComplianceBalance } from '../domain/ComplianceBalance';
import { RouteRepository } from '../ports/RouteRepository';
import { ComplianceRepository } from '../ports/ComplianceRepository';

export class CalculateComplianceBalance {
  constructor(
    private routeRepo: RouteRepository,
    private complianceRepo: ComplianceRepository
  ) {}

  async execute(routeId: string): Promise<number> {
    const route = await this.routeRepo.findById(routeId);
    if (!route) throw new Error('Route not found');
    // Simplified CB: 1 - (fuelUsed / distance * 0.1) - capped at 1
    const cb = Math.max(0, Math.min(1, 1 - (route.fuelUsed / route.distance) * 0.1));
    const balance = new ComplianceBalance(crypto.randomUUID(), routeId, cb);
    await this.complianceRepo.save(balance);
    return cb;
  }
}