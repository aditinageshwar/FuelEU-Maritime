import { ComplianceApiPort } from '../ports/ComplianceApiPort';

export class ComplianceService {
  constructor(private complianceApi: ComplianceApiPort) {}

  async calculateCompliance(routeId: string): Promise<number> {
    const response = await this.complianceApi.calculate(routeId);
    return response.cb;
  }
}