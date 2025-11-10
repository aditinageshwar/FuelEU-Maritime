import { Route } from '../domain/Route';

export interface RouteRepository {
  findById(id: string): Promise<Route | null>;
  save(route: Route): Promise<void>;
  findAll(): Promise<Route[]>;
  delete(id: string): Promise<void>;
}