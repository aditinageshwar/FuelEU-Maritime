export class Route {
  constructor(
    public id: string,
    public vesselId: string,
    public startPort: string,
    public endPort: string,
    public fuelUsed: number,
    public distance: number
  ) {}
}