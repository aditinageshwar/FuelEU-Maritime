import { RouteRepository } from '../ports/RouteRepository';

export class DeleteRoute {
  constructor(private routeRepo: RouteRepository) {}

  async execute(id: string): Promise<void> {
    // Note: In a real app, add checks (e.g., soft delete if related data exists)
    await this.routeRepo.delete(id);
  }
}