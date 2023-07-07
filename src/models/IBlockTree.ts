import { IBlock } from "./IBlock";
import { IBlockData } from "./IBlockData";

/**
 * Interface for a BlockTree.
 * @interface
 * @property {IBlock} genesisBlock - The first block in the blocktree.
 */
export interface IBlockTree {
    genesisBlock: IBlock;
    blockList : IBlock[]

    /**
     * Adds a block to the blocktree.
     * @param {string} parentId - The UUID of the parent block.
     * @param {BlockData} blockData - The data for the new block.
     * @returns {boolean} True if the block was successfully added, false otherwise.
     */
    addBlock(parentId: string, blockData: IBlockData): IBlock;

    /**
     * Gets a specific block by its ID.
     * @param {string} id - The UUID of the block.
     * @returns {IBlock | null} The block with the specified ID, or null if the block was not found.
     */
    getBlockById(id: string): IBlock;

    /**
     * Verifies the integrity of the blocktree.
     * @returns {boolean} True if the blocktree is valid, false otherwise.
     */
    verifyIntegrity(): boolean;

    /**
     * Gets the chain of blocks from a specified block to the genesis block.
     * @param {string} blockId - The UUID of the starting block.
     * @returns {IBlock[] | null} The chain of blocks, or null if the starting block was not found.
     */
    getBlockChainToGenesis(blockId: string): IBlock[];

    /**
    * Gets all known children of a specified block.
    * @param {string} blockId - The UUID of the block.
    * @returns {IBlock[] | null} The children of the block, or null if the block was not found.
    */
    getAllKnownChildren(blockId: string): IBlock[] | null;

    /**
     * Synchronizes the blocktree with other blocktrees.
     * @param {IBlockTree[]} otherBlockTrees - The other blocktrees to synchronize with.
     * @returns {void}
     */
    synchronize(otherBlockTrees: IBlockTree[]): void;

    /**
     * getter for genesis block
     * @returns {Iblock}
     */
    getGenesis(): IBlock
}