"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("./../src");
describe('BlockTree', () => {
    let blockTree;
    let blockData;
    beforeEach(() => {
        blockData = new src_1.BlockData('Genesis', [], "test");
        const genesisBlock = new src_1.Block('', blockData);
        blockTree = new src_1.BlockTree([genesisBlock]);
    });
    test('should add a block correctly', () => {
        const newBlock = blockTree.addBlock(blockTree.getGenesis().hash, blockData);
        expect(blockTree.getBlockById(newBlock.id)).toBe(newBlock);
    });
    test('getBlockChainToGenesis should return the correct chain', () => {
        const newBlock1 = blockTree.addBlock(blockTree.getGenesis().hash, blockData);
        const newBlock2 = blockTree.addBlock(newBlock1.hash, blockData);
        const chain = blockTree.getBlockChainToGenesis(newBlock2.id);
        expect(chain).toEqual([blockTree.getGenesis(), newBlock1, newBlock2]);
    });
    test('getAllKnownChildren should return all known children', () => {
        const newBlock1 = blockTree.addBlock(blockTree.getGenesis().hash, blockData);
        const newBlock2 = blockTree.addBlock(blockTree.getGenesis().hash, blockData);
        const children = blockTree.getAllKnownChildren(blockTree.getGenesis().hash);
        expect(children).toEqual([newBlock1, newBlock2]);
    });
});
