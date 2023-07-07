import { Block } from "./Block";
import { BlockData } from "./BlockData";

import { IBlockData } from "./IBlockData";
import { IBlock } from "./IBlock";
import { IBlockTree } from "./IBlockTree";


export class BlockTree implements IBlockTree {
    genesisBlock = new Block("genesis", new BlockData("", "", ""));
    blockList: Block[] = [];
    constructor(block: Block) {
        this.genesisBlock = block;
        this.blockList.push(this.genesisBlock);
    }


    addBlock = (parentHash: string, blockData: IBlockData): Block => {
        const newBlock = new Block(parentHash, blockData)
        this.blockList.push(newBlock)
        return newBlock;

    };
    getBlockById = (id: string): Block => {
        const found =this.blockList.find(block => block.id === id)
        return found || this.getGenesis();
    };
    verifyIntegrity = (): boolean => true;
    getBlockChainToGenesis = (blockId: string): Block[] => {
        const blockChain: Block[] = [];
        let currentBlock = this.getBlockById(blockId);
    
        while (currentBlock.previousHash != this.getGenesis().hash) {
            blockChain.unshift(currentBlock);
            currentBlock = this.getBlockById(currentBlock.previousHash);
        }
    
        return blockChain;
    };
    getAllKnownChildren = (blockId: string): IBlock[] | null => null;
    synchronize = (otherBlockTrees: IBlockTree[]): void => { };
    getGenesis = (): Block => this.genesisBlock
}