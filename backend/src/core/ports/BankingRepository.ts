import { BankingTransaction } from '../domain/BankingTransaction';

export interface BankingRepository {
  save(transaction: BankingTransaction): Promise<void>;
  findByVesselId(vesselId: string): Promise<BankingTransaction[]>;
}