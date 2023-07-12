# BlockTree

BlockTree is a novel implementation of a blockchain that, rather than forming a linear chain of blocks, forms a tree of blocks, with each block having an arbitrary number of child blocks. This enables more flexible, creative, and participatory processes, as any block can be extended with new content.

## Overview

Unlike traditional blockchain implementations, which require a consensus mechanism to determine the order of blocks, BlockTree uses a locally validated and passively synchronized model. Each block is identified by a unique UUID, ensuring that blocks can be correctly and uniquely identified, regardless of the order in which they are created or received.

## Getting Started

To install BlockTree, clone the repository and install the dependencies:

```bash
git clone https://github.com/username/BlockTree.git
cd BlockTree
npm install
```

## Interfaces

### IBlock

| Property | Type | Description |
| -------- | ---- | ----------- |
| id | string | The UUID of the block in the tree. |
| hash | string | The hash of the block. |
| previousHash | string | The hash of the previous block in the chain. |
| data | IBlockData | The data associated with the block. |

#### Methods

| Method | Returns | Description |
| ------ | ------- | ----------- |
| calculateHash() | string | Calculates the hash for the block. |
| validate() | boolean | Validates the block. |

### IBlockData

| Property | Type | Description |
| -------- | ---- | ----------- |
| title | string | The title of the block. |
| transaction | ITransaction[] | An array of transactions associated with the block. |
| author | string | The author of the block. |
| timestamp | string | The timestamp when the block was created. |

### IBlockTree

| Property | Type | Description |
| -------- | ---- | ----------- |
| genesisBlock | IBlock | The first block in the blocktree. |
| blockList | IBlock[] | A list of all blocks in the blocktree. |

#### Methods

| Method | Parameters | Returns | Description |
| ------ | ---------- | ------- | ----------- |
| addBlock(parentId: string, blockData: IBlockData) | parentId: string, blockData: IBlockData | IBlock | Adds a block to the blocktree. |
| getBlockById(id: string) | id: string | IBlock \| null | Gets a specific block by its ID. |
| verifyIntegrity() | none | boolean | Verifies the integrity of the blocktree. |
| getBlockChainToGenesis(blockId: string) | blockId: string | IBlock[] | Gets the chain of blocks from a specified block to the genesis block. |
| getAllKnownChildren(blockId: string) | blockId: string | IBlock[] \| null | Gets all known children of a specified block. |
| synchronize(otherBlockTrees: IBlockTree[]) | otherBlockTrees: IBlockTree[] | void | Synchronizes the blocktree with other blocktrees. |
| getGenesis() | none | IBlock | Returns the genesis block. |

### ITransaction

| Property | Type | Description |
| -------- | ---- | ----------- |
| type | TransactionType | The type of the transaction. |
| payload | ITransactionPayload | The details of the transaction. |

### ITransactionPayload

| Property | Type | Description |
| -------- | ---- | ----------- |
| startIndex | number | The start index for the transaction operation. |
| length | number (optional) | The length of the section to be affected by the transaction. |
| content | string (optional) | The content to be added by the transaction. |