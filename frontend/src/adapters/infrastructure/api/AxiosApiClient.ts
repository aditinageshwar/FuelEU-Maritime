import axios, { AxiosInstance } from 'axios';
import { ApiPort } from '../../../core/ports/ApiPort';
import { RouteApiPort } from '../../../core/ports/RouteApiPort';
import { ComplianceApiPort } from '../../../core/ports/ComplianceApiPort';
import { BankingApiPort } from '../../../core/ports/BankingApiPort';
import { PoolingApiPort } from '../../../core/ports/PoolingApiPort';
import { Route } from '../../../core/domain/Route';
import { BankingTransaction } from '../../../core/domain/BankingTransaction';
import { Pooling } from '../../../core/domain/Pooling';

export class AxiosApiClient implements ApiPort, RouteApiPort, ComplianceApiPort, BankingApiPort, PoolingApiPort {
 private client: AxiosInstance;

 constructor(baseURL: string = 'http://localhost:3001') {
   this.client = axios.create({ baseURL });
 }

// ApiPort Implementation (Generic HTTP Methods)
  async get<T>(url: string): Promise<T> {
    const response = await this.client.get(url);
    return response.data;
  }

  async post<T>(url: string, data?: any): Promise<T> {
    const response = await this.client.post(url, data);
    return response.data;
  }
    
  async delete<T>(url: string): Promise<T> {
    const response = await this.client.delete(url);
    return response.data;
  }

// RouteApiPort Implementation
  async getAll(): Promise<Route[]> {
    const response = await this.client.get('/routes');
    return response.data;
  }

  async createR(route: Omit<Route, 'id'>): Promise<Route> {
    const response = await this.client.post('/routes', route);
    return response.data;
  }

  async deleteR(id: string): Promise<void> {
    await this.client.delete(`/routes/${id}`);
  }

// ComplianceApiPort Implementation
  async calculate(routeId: string): Promise<{ cb: number }> {
    const response = await this.client.get(`/compliance/calculate/${routeId}`);
    return response.data;
  }

// BankingApiPort Implementation
  async getByVessel(vesselId: string): Promise<BankingTransaction[]> {
    const response = await this.client.get(`/banking/vessels/${vesselId}/transactions`);
    return response.data;
  }

  async createTransaction(vesselId: string, amount: number, type: 'credit' | 'debit'): Promise<void> {
    await this.client.post('/banking/transactions', { vesselId, amount, type });
  }

// PoolingApiPort Implementation
  async getPoolingsByVessel(vesselId: string): Promise<Pooling[]> {
    const response = await this.client.get(`/pooling/vessels/${vesselId}`);
    return response.data;
  }

  async create(fromVesselId: string, toVesselId: string, cbAmount: number): Promise<void> {
    await this.client.post('/pooling', { fromVesselId, toVesselId, cbAmount });
  }
}