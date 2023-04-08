// blocktree.ts

import * as fs from 'fs';

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

  addBlock(transactions: Transaction[], parentHash: string): Block | null {
    if (!this.validateParentHash(parentHash)) {
      return null;
    }

    const newIndex = this.blocks.length;
    const newBlock = new Block(newIndex, transactions, parentHash);
    this.blocks.push(newBlock);
    return newBlock;
  }

  validateParentHash(parentHash: string): boolean {
    const parentBlock = this.blocks.find((block) => block.hash === parentHash);
    return !!parentBlock;
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
  saveToFile(filepath: string): void {
    const data = JSON.stringify(this.blocks);
    fs.writeFileSync(filepath, data);
  }

  static loadFromFile(filepath: string): Blocktree | null {
    if (fs.existsSync(filepath)) {
      const data = fs.readFileSync(filepath, 'utf-8');
      const blocksData = JSON.parse(data);
      const blocktree = new Blocktree();

      blocktree.blocks = blocksData.map((blockData: any) => {
        const block = new Block(blockData.index, blockData.transactions, blockData.parentHash);
        block.timestamp = blockData.timestamp;
        block.hash = blockData.hash;
        return block;
      });

      return blocktree;
    }

    return null;
  }

  isValidBlock(newBlock: Block): boolean {
    // Vérifier si l'index du nouveau bloc est correct
    const parentBlock = this.getBlock(newBlock.index - 1);
    if (!parentBlock) {
      return false;
    }

    // Vérifier si le parentHash correspond au hash du bloc parent
    if (newBlock.parentHash !== parentBlock.hash) {
      return false;
    }

    // Vérifier si le hash du bloc est correct
    if (!newBlock.isValid()) {
      return false;
    }

    // Vous pouvez ajouter d'autres vérifications ici, par exemple pour valider les transactions

    return true;
  }
}
