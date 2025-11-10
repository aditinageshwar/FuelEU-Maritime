export class BankingTransaction {
  constructor(
    public id: string,
    public vesselId: string,
    public amount: number,
    public type: 'credit' | 'debit'
  ) {}
}