import { Block } from "./Block";

import { IBlockData } from "./Interfaces/IBlockData";
import { IBlock } from "./Interfaces/IBlock";
import { IBlockTree } from "./Interfaces/IBlockTree";


export class BlockTree implements IBlockTree {
    blockList :Block[];
    constructor(blockList :Block[]) {
        this.blockList = blockList;
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
    getGenesis = (): Block => this.blockList[0]
}