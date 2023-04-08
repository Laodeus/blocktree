// index.test.ts
import { test, expect } from '@jest/globals';

import { Blocktree } from './blocktree';
import { Transaction } from './transaction';

test('Créer et manipuler une Blocktree avec plusieurs niveaux de profondeur', () => {
  const blocktree = new Blocktree();

  const transactions1: Transaction[] = [new Transaction('cle1', 'valeur1')];
  const transactions2: Transaction[] = [new Transaction('cle2', 'valeur2')];
  const transactions3: Transaction[] = [new Transaction('cle3', 'valeur3')];

  // Créer 3 enfants pour le bloc Genesis
  const childBlock1 = blocktree.addBlock(transactions1, blocktree.genesisBlock.hash);
  const childBlock2 = blocktree.addBlock(transactions2, blocktree.genesisBlock.hash);
  const childBlock3 = blocktree.addBlock(transactions3, blocktree.genesisBlock.hash);

  expect(blocktree.blocks.length).toBe(4);
  expect(childBlock1.parentHash).toBe(blocktree.genesisBlock.hash);
  expect(childBlock2.parentHash).toBe(blocktree.genesisBlock.hash);
  expect(childBlock3.parentHash).toBe(blocktree.genesisBlock.hash);

  // Ajouter des enfants à chaque enfant du bloc Genesis
  const transactions4: Transaction[] = [new Transaction('cle4', 'valeur4')];
  const transactions5: Transaction[] = [new Transaction('cle5', 'valeur5')];

  const grandChildBlock1 = blocktree.addBlock(transactions4, childBlock1.hash);
  const grandChildBlock2 = blocktree.addBlock(transactions5, childBlock1.hash);

  const transactions6: Transaction[] = [new Transaction('cle6', 'valeur6')];

  const grandChildBlock3 = blocktree.addBlock(transactions6, childBlock2.hash);

  expect(blocktree.blocks.length).toBe(7);
  expect(grandChildBlock1.parentHash).toBe(childBlock1.hash);
  expect(grandChildBlock2.parentHash).toBe(childBlock1.hash);
  expect(grandChildBlock3.parentHash).toBe(childBlock2.hash);

  // Tester l'état final
  const finalState1 = blocktree.getFinalState(4);
  expect(finalState1).toEqual({ cle1: 'valeur1', cle2: 'valeur2', cle3: 'valeur3', cle4: 'valeur4' });

  const finalState2 = blocktree.getFinalState(5);
  expect(finalState2).toEqual({ cle1: 'valeur1', cle2: 'valeur2', cle3: 'valeur3', cle4: 'valeur4', cle5: 'valeur5' });

  // Tester l'état à un bloc spécifique
  const stateAtChildBlock1 = blocktree.getStateAtBlock(childBlock1.index);
  expect(stateAtChildBlock1).toEqual({ cle1: 'valeur1' });

  const stateAtGrandChildBlock1 = blocktree.getStateAtBlock(grandChildBlock1.index);
  expect(stateAtGrandChildBlock1).toEqual({ cle1: 'valeur1', cle4: 'valeur4' });
});