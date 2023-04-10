// blocktree.ts

import * as fs from 'fs';

import { Block } from './block';
import { Transaction } from './transaction';


/**
 * A blockchain data structure that holds a chain of blocks
 */
export class Blocktree {

  /**
   * The first block in the chain (genesis block)
   */
  genesisBlock: Block;

  /**
   * The list of all blocks in the chain, including the genesis block
   */
  blocks: Block[];

  /**
   * Constructs a new Blocktree object with a genesis block
   */
  constructor() {
    const genesisTransactions: Transaction[] = [];
    this.genesisBlock = new Block(0, genesisTransactions, '');
    this.blocks = [this.genesisBlock];
  }

  /**
   * Adds a new block to the blockchain.
   * @param transactions - The list of transactions to include in the block
   * @param parentHash - The hash of the previous block in the chain
   * @returns The newly created block, or null if the parentHash is invalid
   */
  addBlock(transactions: Transaction[], parentHash: string): Block | null {
    if (!this.validateParentHash(parentHash)) {
      return null;
    }

    const newIndex = this.blocks.length;
    const newBlock = new Block(newIndex, transactions, parentHash);
    this.blocks.push(newBlock);
    return newBlock;
  }

  /**
   * Checks if a given parent hash is valid by checking if a block with that hash exists in the chain
   * @param parentHash - The hash of the parent block to validate
   * @returns True if the parent hash is valid, false otherwise
   */
  validateParentHash(parentHash: string): boolean {
    const parentBlock = this.blocks.find((block) => block.hash === parentHash);
    return !!parentBlock;
  }


  /**
   * Calculates the final state of the blockchain up to the specified block index.
   * @param blockIndex - The index of the final block to include in the state calculation
   * @returns An object representing the final state of the blockchain
   */
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

  /**
   * Gets the block at the specified index.
   * @param index - The index of the block to retrieve
   * @returns The block at the specified index, or null if the index is out of range
   */
  getBlock(index: number): Block | null {
    if (index >= 0 && index < this.blocks.length) {
      return this.blocks[index];
    }
    return null;
  }

  /**
   * Calculates the state of the blockchain at the specified block index.
   * @param index - The index of the block to calculate the state for
   * @returns An object representing the state of the blockchain at the specified block index
   */
  getStateAtBlock(index: number): { [key: string]: string | null } | null {
    if (index >= 0 && index < this.blocks.length) {
      let state: { [key: string]: string | null } = {};

      for (let i = 0; i <= index; i++) {
        const block = this.blocks[i];
        block.transactions.forEach((transaction) => {
          if (transaction.deleteKey) {
            delete state[transaction.key];
          } else {
            state[transaction.key] = transaction.value;
          }
        });
      }

      return state;
    }
    return null;
  }

  /**
   * Saves the current state of the blockchain to a file.
   * @param filepath - The path of the file to save the blockchain to
   */
  saveToFile(filepath: string): void {
    const data = JSON.stringify(this.blocks);
    fs.writeFileSync(filepath, data);
  }

  /**
   * Loads the state of the blockchain from a file.
   * @param filepath - The path of the file to load the blockchain from
   * @returns A Blocktree object representing the loaded blockchain state, or null if the file does not exist
   */
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

  /**
   * Validates if a given block is a valid new block to add to the blockchain.
   * @param newBlock - The block to validate
   * @returns True if the block is valid, false otherwise
   */
  isValidBlock(newBlock: Block): boolean {
    const parentBlock = this.getBlock(newBlock.index - 1);
    if (!parentBlock) {
      return false;
    }

    if (newBlock.parentHash !== parentBlock.hash) {
      return false;
    }

    if (!newBlock.isValid()) {
      return false;
    }

    return true;
  }
}
