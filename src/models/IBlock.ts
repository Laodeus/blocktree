import { IBlockData } from "./IBlockData";

/**
 * Interface for a Block in the blockchain.
 * @interface
 * @property {string} id - The UUID of the block in the tree.
 * @property {string} hash - The hash of the block.
 * @property {string} previousHash - The hash of the previous block in the chain.
 * @property {BlockData} data - The data associated with the block.
 * @property {IBlock[]} children - The children blocks in the blocktree.
 */
export interface IBlock {
    id: string;
    hash: string;
    previousHash: string;
    data: IBlockData;
    children: IBlock[];

    /**
     * Calculates the hash for the block.
     * @returns {string} The calculated hash.
     */
    calculateHash(): string;

    /**
     * Validates the block.
     * @returns {boolean} The result of the validation.
     */
    validate(): boolean;

    /**
     * Adds a child block to the block.
     * @param {IBlock} block - The block to add as a child.
     */
    addChild(block: IBlock): void;
}