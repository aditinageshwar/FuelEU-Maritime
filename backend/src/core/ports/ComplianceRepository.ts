import { ComplianceBalance } from '../domain/ComplianceBalance';

export interface ComplianceRepository {
  save(balance: ComplianceBalance): Promise<void>;
  findByRouteId(routeId: string): Promise<ComplianceBalance | null>;
}