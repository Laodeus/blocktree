// block.ts
import { Transaction } from './transaction';

export class Block {
  index: number;
  timestamp: number;
  transactions: Transaction[];
  parentHash: string;
  hash: string;

  constructor(index: number, transactions: Transaction[], parentHash: string) {
    this.index = index;
    this.timestamp = Date.now();
    this.transactions = transactions;
    this.parentHash = parentHash;
    this.hash = this.calculateHash();
  }

  calculateHash(): string {
    // Calculer le hash du bloc ici
    return '';
  }
}