import { Request, Response } from 'express';
import { RouteRepository } from '../../../core/ports/RouteRepository';
import { Route } from '../../../core/domain/Route';
import { GetRoute } from '../../../core/application/GetRoute';
import { DeleteRoute } from '../../../core/application/DeleteRoute';

export class RouteController {
  constructor(
    private routeRepo: RouteRepository,
    private getRoute: GetRoute,
    private deleteRoute: DeleteRoute
  ) {}

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const routes = await this.routeRepo.findAll();
      res.json(routes);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch routes' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const route = await this.getRoute.execute(id);
      if (!route) {
        res.status(404).json({ error: 'Route not found' });
        return;
      }
      res.json(route);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch route' });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { vesselId, startPort, endPort, fuelUsed, distance } = req.body;
      if (!vesselId || !startPort || !endPort || fuelUsed == null || distance == null) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }
      const route = new Route(crypto.randomUUID(), vesselId, startPort, endPort, fuelUsed, distance);
      await this.routeRepo.save(route);
      res.status(201).json(route);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create route' });
    }
  }
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.deleteRoute.execute(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete route' });
    }
  }
}