import { ComplianceBalance } from '../../../core/domain/ComplianceBalance';
import { ComplianceRepository } from '../../../core/ports/ComplianceRepository';
import prisma from '../../../infrastructure/db/config';

export class PostgreSQLComplianceRepository implements ComplianceRepository {
  async save(balance: ComplianceBalance): Promise<void> {
    await prisma.complianceBalance.create({
      data: {
        id: balance.id,
        routeId: balance.routeId,
        cb: balance.cb,
      },
    });
  }

  async findByRouteId(routeId: string): Promise<ComplianceBalance | null> {
    const row = await prisma.complianceBalance.findFirst({ where: { routeId } });
    return row ? new ComplianceBalance(row.id, row.routeId, row.cb) : null;
  }
}