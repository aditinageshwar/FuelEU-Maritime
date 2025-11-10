import { Route } from '../domain/Route';
import { RouteRepository } from '../ports/RouteRepository';

export class GetRoute {
  constructor(private routeRepo: RouteRepository) {}

  async execute(id: string): Promise<Route | null> {
    return await this.routeRepo.findById(id);
  }
}