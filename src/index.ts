// index.ts
import { Blocktree } from './blocktree';
import { Transaction } from './transaction';

const blocktree = new Blocktree();
const block1 = blocktree.addBlock([new Transaction('foo', 'bar')], blocktree.genesisBlock.hash);
const block2 = blocktree.addBlock([new Transaction('baz', 'qux')], block1.hash);
const block3 = blocktree.addBlock([new Transaction('foo', 'baz')], block2.hash);
const block4 = blocktree.addBlock([new Transaction('baz', null, true)], block3.hash); // Supprimer la clé 'baz'

console.log(blocktree.getStateAtBlock(4)); // {"foo": "baz"}