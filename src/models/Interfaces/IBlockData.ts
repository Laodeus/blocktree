import { ITransaction } from './ITransaction'

/**
 * Data associated with a block.
 * @interface
 * @property {string} title - The title of the block.
 * @property {string} content - The content of the block.
 * @property {string} author - The author of the block.
 * @property {number} timestamp - The timestamp when the block was created.
 */

export interface IBlockData {
    title: string;
    transaction : ITransaction[];
    author: string;
    timestamp: string;
}