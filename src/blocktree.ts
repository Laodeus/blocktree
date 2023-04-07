// blocktree.ts
import { Block } from './block';
import { Transaction } from './transaction';

export class Blocktree {
  genesisBlock: Block;
  blocks: Block[];

  constructor() {
    const genesisTransactions: Transaction[] = [];
    this.genesisBlock = new Block(0, genesisTransactions, '');
    this.blocks = [this.genesisBlock];
  }

  addBlock(transactions: Transaction[], parentHash: string): Block {
    const newIndex = this.blocks.length;
    const newBlock = new Block(newIndex, transactions, parentHash);
    this.blocks.push(newBlock);
    return newBlock;
  }

  getFinalState(blockIndex: number): { [key: string]: string | null } {
    let state: { [key: string]: string | null } = {};

    for (let i = 0; i <= blockIndex; i++) {
      const block = this.blocks[i];
      block.transactions.forEach((transaction) => {
        state[transaction.key] = transaction.value;
      });
    }

    return state;
  }

  getBlock(index: number): Block | null {
    if (index >= 0 && index < this.blocks.length) {
      return this.blocks[index];
    }
    return null;
  }

  getStateAtBlock(index: number): { [key: string]: string | null } | null {
    if (index >= 0 && index < this.blocks.length) {
      let state: { [key: string]: string | null } = {};

      for (let i = 0; i <= index; i++) {
        const block = this.blocks[i];
        block.transactions.forEach((transaction) => {
          if (transaction.deleteKey) {
            delete state[transaction.key]; // Supprimer complètement la clé si deleteKey est true
          } else {
            state[transaction.key] = transaction.value;
          }
        });
      }

      return state;
    }
    return null;
  }
}