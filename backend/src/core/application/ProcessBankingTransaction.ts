import { BankingTransaction } from '../domain/BankingTransaction';
import { BankingRepository } from '../ports/BankingRepository';

export class ProcessBankingTransaction {
  constructor(private bankingRepo: BankingRepository) {}

  async execute(vesselId: string, amount: number, type: 'credit' | 'debit'): Promise<void> {
    const transaction = new BankingTransaction(crypto.randomUUID(), vesselId, amount, type);
    await this.bankingRepo.save(transaction);
  }
}