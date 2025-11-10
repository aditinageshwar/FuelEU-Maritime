import { Request, Response } from 'express';
import { ProcessBankingTransaction } from '../../../core/application/ProcessBankingTransaction';
import { BankingRepository } from '../../../core/ports/BankingRepository';

export class BankingController {
  constructor(
    private processTransaction: ProcessBankingTransaction,
    private bankingRepo: BankingRepository
  ) {}

  async getByVessel(req: Request, res: Response): Promise<void> {
    try {
      const { vesselId } = req.params;
      const transactions = await this.bankingRepo.findByVesselId(vesselId);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch transactions' });
    }
  }

  async createTransaction(req: Request, res: Response): Promise<void> {
    try {
      const { vesselId, amount, type } = req.body;
      if (!vesselId || amount == null || !['credit', 'debit'].includes(type)) {
        res.status(400).json({ error: 'Invalid fields' });
        return;
      }
      await this.processTransaction.execute(vesselId, amount, type);
      res.status(201).json({ message: 'Transaction processed' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to process transaction' });
    }
  }
}