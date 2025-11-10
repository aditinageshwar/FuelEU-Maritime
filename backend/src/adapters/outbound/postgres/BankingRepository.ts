import { BankingTransaction } from '../../../core/domain/BankingTransaction';
import { BankingRepository } from '../../../core/ports/BankingRepository';
import prisma from '../../../infrastructure/db/config';

export class PostgreSQLBankingRepository implements BankingRepository {
  async save(transaction: BankingTransaction): Promise<void> {
    await prisma.bankingTransaction.create({
      data: {
        id: transaction.id,
        vesselId: transaction.vesselId,
        amount: transaction.amount,
        type: transaction.type,
      },
    });
  }

  async findByVesselId(vesselId: string): Promise<BankingTransaction[]> {
    const rows = await prisma.bankingTransaction.findMany({ where: { vesselId } });
    return rows.map((row: { id: string; vesselId: string; amount: number; type: string }) =>
      new BankingTransaction(row.id, row.vesselId, row.amount, row.type as 'credit' | 'debit')
    );
  }
}
