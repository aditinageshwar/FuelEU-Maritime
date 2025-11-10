export interface ComplianceApiPort {
  calculate(routeId: string): Promise<{ cb: number }>;
}