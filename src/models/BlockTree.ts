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
        const initialBlock = this.getBlockById(blockId);
        if (!initialBlock) {
            throw new Error(`Le bloc avec l'id ${blockId} n'existe pas.`);
        }
    
        const genesisBlock = this.getGenesis();
        if (!genesisBlock) {
            throw new Error(`Le bloc de genèse n'existe pas.`);
        }
    
        let currentBlock: Block | null = initialBlock;
        const blockChain: Block[] = [];
    
        while (currentBlock) {
            blockChain.push(currentBlock);
            const parentHash: string = currentBlock.previousHash;
            currentBlock = this.blockList.find((block: Block) => block.hash === parentHash) || null;
        }
    
        return blockChain.reverse(); // Inverse l'ordre de la chaîne
    };


    getAllKnownChildren = (blockId: string): IBlock[] | null => {
        const children = this.blockList.filter(block => block.previousHash === blockId);
        return children.length ? children : null;
    };

    getGenesis = (): Block => this.blockList[0];


}