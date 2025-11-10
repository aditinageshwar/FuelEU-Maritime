import { Route } from '../domain/Route';
import { RouteApiPort } from '../ports/RouteApiPort';

export class RouteService {
  constructor(private routeApi: RouteApiPort) {}

  async getAllRoutes(): Promise<Route[]> {
    return await this.routeApi.getAll();
  }

  async createRoute(route: Omit<Route, 'id'>): Promise<Route> {
    return await this.routeApi.createR(route);
  }

  async deleteRoute(id: string): Promise<void> {
    return await this.routeApi.deleteR(id);
  }
}