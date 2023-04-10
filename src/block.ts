// block.ts
import { Transaction } from './transaction';
import * as crypto from 'crypto';

/**
 * A block in the blockchain.
 */
export class Block {
  index: number;
  timestamp: number;
  transactions: Transaction[];
  parentHash: string;
  hash: string;

  /**
   * @param {number} index - The index of the block.
   * @param {Transaction[]} transactions - The transactions included in the block.
   * @param {string} parentHash - The hash of the previous block in the chain.
   */
  constructor(index: number, transactions: Transaction[], parentHash: string) {
    this.index = index;
    this.timestamp = Date.now();
    this.transactions = transactions;
    this.parentHash = parentHash;
    this.hash = this.calculateHash();
  }

  /**
   * Calculates the hash of the block.
   * @returns {string} The hash of the block.
   */
  calculateHash(): string {
    const hasher = crypto.createHash('sha256');
    hasher.update(`${this.index}${this.timestamp}${JSON.stringify(this.transactions)}${this.parentHash}`);
    return hasher.digest('hex');
  }
  
  /**
   * Checks if the block is valid.
   * @returns {boolean} True if the block is valid, false otherwise.
   */
  isValid(): boolean {
    return this.calculateHash() === this.hash;
  }
}