import { BankingTransaction } from '../domain/BankingTransaction';

export interface BankingApiPort {
  getByVessel(vesselId: string): Promise<BankingTransaction[]>;
  createTransaction(vesselId: string, amount: number, type: 'credit' | 'debit'): Promise<void>;
}