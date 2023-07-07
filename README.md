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