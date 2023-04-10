import { test, expect } from '@jest/globals';

import { Blocktree } from '../src/blocktree';
import { Transaction } from '../src/transaction';
import { Block } from '../src/block';

test('Crée un nouvel objet Blocktree avec le bloc Genesis', () => {
  const blocktree = new Blocktree();
  expect(blocktree.blocks.length).toBe(1);
  expect(blocktree.genesisBlock.index).toBe(0);
  expect(blocktree.genesisBlock.transactions).toEqual([]);
  expect(blocktree.genesisBlock.parentHash).toBe('');
});

test('Ajoute un bloc à Blocktree', () => {
  const blocktree = new Blocktree();
  const transactions: Transaction[] = [new Transaction('cle', 'valeur')];
  const parentHash = blocktree.genesisBlock.hash;
  const newBlock = blocktree.addBlock(transactions, parentHash);

  expect(newBlock.transactions).toEqual(transactions);
  expect(newBlock.parentHash).toBe(parentHash);
  expect(blocktree.blocks.length).toBe(2);
});

test('Récupère un bloc par index', () => {
  const blocktree = new Blocktree();
  const genesisBlock = blocktree.getBlock(0);

  expect(genesisBlock).not.toBeNull();
  expect(genesisBlock).toEqual(blocktree.genesisBlock);
});

test('Récupère l\'état final de l\'arbre de blocs', () => {
  const blocktree = new Blocktree();
  const transactions1: Transaction[] = [new Transaction('cle1', 'valeur1')];
  const transactions2: Transaction[] = [new Transaction('cle2', 'valeur2')];
  blocktree.addBlock(transactions1, blocktree.genesisBlock.hash);
  blocktree.addBlock(transactions2, blocktree.genesisBlock.hash);

  const finalState = blocktree.getFinalState(2);

  expect(finalState).toEqual({ cle1: 'valeur1', cle2: 'valeur2' });
});

test('Récupère l\'état à un bloc spécifique', () => {
  const blocktree = new Blocktree();
  const transactions1: Transaction[] = [new Transaction('cle1', 'valeur1')];
  const transactions2: Transaction[] = [new Transaction('cle2', 'valeur2')];
  blocktree.addBlock(transactions1, blocktree.genesisBlock.hash);
  blocktree.addBlock(transactions2, blocktree.genesisBlock.hash);

  const stateAtBlock1 = blocktree.getStateAtBlock(1);

  expect(stateAtBlock1).toEqual({ cle1: 'valeur1' });
});

test('Gère les clés supprimées dans getStateAtBlock()', () => {
  const blocktree = new Blocktree();
  const transactions1: Transaction[] = [new Transaction('cle1', 'valeur1')];
  const transactions2: Transaction[] = [new Transaction('cle1', null, true)];
  blocktree.addBlock(transactions1, blocktree.genesisBlock.hash);
  blocktree.addBlock(transactions2, blocktree.genesisBlock.hash);

  const stateAtBlock2 = blocktree.getStateAtBlock(2);

  expect(stateAtBlock2).toEqual({});
});

test('Retourne null si l\'index est invalide dans getBlock()', () => {
  const blocktree = new Blocktree();
  const invalidBlock = blocktree.getBlock(-1);

  expect(invalidBlock).toBeNull();
});

test('Retourne null si l\'index est invalide dans getStateAtBlock()', () => {
  const blocktree = new Blocktree();
  const invalidState = blocktree.getStateAtBlock(-1);

  expect(invalidState).toBeNull();
});

test('Ajoute un bloc valide à Blocktree', () => {
  const blocktree = new Blocktree();
  const transactions: Transaction[] = [new Transaction('cle', 'valeur')];
  const parentHash = blocktree.genesisBlock.hash;
  const newBlock = blocktree.addBlock(transactions, parentHash);

  expect(newBlock).not.toBeNull();
  expect(newBlock.transactions).toEqual(transactions);
  expect(newBlock.parentHash).toBe(parentHash);
  expect(blocktree.blocks.length).toBe(2);
});

test('Ne pas ajouter un bloc invalide à Blocktree', () => {
  const blocktree = new Blocktree();
  const transactions: Transaction[] = [new Transaction('cle', 'valeur')];
  const invalidParentHash = 'invalidParentHash';
  const invalidBlock = blocktree.addBlock(transactions, invalidParentHash);

  expect(invalidBlock).toBeNull();
  expect(blocktree.blocks.length).toBe(1);
});

test('Vérifie la validité d\'un bloc valide', () => {
  const blocktree = new Blocktree();
  const transactions: Transaction[] = [new Transaction('cle', 'valeur')];
  const parentHash = blocktree.genesisBlock.hash;
  const newBlock = new Block(blocktree.blocks.length, transactions, parentHash);

  expect(blocktree.isValidBlock(newBlock)).toBe(true);
});

test('Vérifie l\'invalidité d\'un bloc avec un mauvais parentHash', () => {
  const blocktree = new Blocktree();
  const transactions: Transaction[] = [new Transaction('cle', 'valeur')];
  const invalidParentHash = 'invalidParentHash';
  const invalidBlock = new Block(blocktree.blocks.length, transactions, invalidParentHash);

  expect(blocktree.isValidBlock(invalidBlock)).toBe(false);
});

test('Vérifie l\'invalidité d\'un bloc avec un mauvais index', () => {
  const blocktree = new Blocktree();
  const transactions: Transaction[] = [new Transaction('cle', 'valeur')];
  const parentHash = blocktree.genesisBlock.hash;
  const invalidIndex = blocktree.blocks.length + 1;
  const invalidBlock = new Block(invalidIndex, transactions, parentHash);

  expect(blocktree.isValidBlock(invalidBlock)).toBe(false);
});