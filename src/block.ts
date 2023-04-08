// block.ts
import { Transaction } from './transaction';
import * as crypto from 'crypto';

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
    const hasher = crypto.createHash('sha256');
    hasher.update(`${this.index}${this.timestamp}${JSON.stringify(this.transactions)}${this.parentHash}`);
    return hasher.digest('hex');
  }

  isValid(): boolean {
    return this.calculateHash() === this.hash;
  }
}