import { Route } from '../domain/Route';

export interface RouteApiPort {
  getAll(): Promise<Route[]>;
  createR(route: Omit<Route, 'id'>): Promise<Route>;
  deleteR(id: string): Promise<void>;
}