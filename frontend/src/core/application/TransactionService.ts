import { BankingTransaction } from '../domain/BankingTransaction';
import { Pooling } from '../domain/Pooling';
import { BankingApiPort } from '../ports/BankingApiPort';
import { PoolingApiPort } from '../ports/PoolingApiPort';

export class TransactionService {
  constructor(
    private bankingApi: BankingApiPort,
    private poolingApi: PoolingApiPort
  ) {}

  async getBankingTransactions(vesselId: string): Promise<BankingTransaction[]> {
    return await this.bankingApi.getByVessel(vesselId);
  }

  async processTransaction(vesselId: string, amount: number, type: 'credit' | 'debit'): Promise<void> {
    return await this.bankingApi.createTransaction(vesselId, amount, type);
  }

  async getPoolings(vesselId: string): Promise<Pooling[]> {
    return await this.poolingApi.getPoolingsByVessel(vesselId);
  }

  async createPooling(fromVesselId: string, toVesselId: string, cbAmount: number): Promise<void> {
    return await this.poolingApi.create(fromVesselId, toVesselId, cbAmount);
  }
}