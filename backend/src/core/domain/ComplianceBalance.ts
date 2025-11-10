export class ComplianceBalance {
  constructor(
    public id: string,
    public routeId: string,
    public cb: number // 0-1, where 1 is fully compliant
  ) {}
}