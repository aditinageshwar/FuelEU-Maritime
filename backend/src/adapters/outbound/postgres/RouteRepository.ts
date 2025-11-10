import { Route } from '../../../core/domain/Route';
import { RouteRepository } from '../../../core/ports/RouteRepository';
import prisma from '../../../infrastructure/db/config';

export class PostgreSQLRouteRepository implements RouteRepository {
  async findById(id: string): Promise<Route | null> {
    const row = await prisma.route.findUnique({ where: { id } });
    return row ? new Route(
      (row as { id: string; vesselId: string; startPort: string; endPort: string; fuelUsed: number; distance: number }).id,
      (row as { id: string; vesselId: string; startPort: string; endPort: string; fuelUsed: number; distance: number }).vesselId,
      (row as { id: string; vesselId: string; startPort: string; endPort: string; fuelUsed: number; distance: number }).startPort,
      (row as { id: string; vesselId: string; startPort: string; endPort: string; fuelUsed: number; distance: number }).endPort,
      (row as { id: string; vesselId: string; startPort: string; endPort: string; fuelUsed: number; distance: number }).fuelUsed,
      (row as { id: string; vesselId: string; startPort: string; endPort: string; fuelUsed: number; distance: number }).distance
    ) : null;
  }

  async save(route: Route): Promise<void> {
    await prisma.route.upsert({
      where: { id: route.id },
      update: {
        vesselId: route.vesselId,
        startPort: route.startPort,
        endPort: route.endPort,
        fuelUsed: route.fuelUsed,
        distance: route.distance,
      },
      create: {
        id: route.id,
        vesselId: route.vesselId,
        startPort: route.startPort,
        endPort: route.endPort,
        fuelUsed: route.fuelUsed,
        distance: route.distance,
      },
    });
  }

  async findAll(): Promise<Route[]> {
    const rows = await prisma.route.findMany();
    return rows.map((row: { id: string; vesselId: string; startPort: string; endPort: string; fuelUsed: number; distance: number }) =>
      new Route(row.id, row.vesselId, row.startPort, row.endPort, row.fuelUsed, row.distance)
    );
  }

  async delete(id: string): Promise<void> {
    await prisma.route.delete({ where: { id } });
  }
}
