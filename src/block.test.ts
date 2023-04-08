import { test, expect } from '@jest/globals';
import { Block } from './block';
import { Transaction } from './transaction';

test('Crée un nouvel objet Block', () => {
  const index = 1;
  const transactions: Transaction[] = [new Transaction('cle', 'valeur')];
  const parentHash = 'parentHash';
  const block = new Block(index, transactions, parentHash);

  expect(block.index).toBe(index);
  expect(block.transactions).toEqual(transactions);
  expect(block.parentHash).toBe(parentHash);
  expect(typeof block.timestamp).toBe('number');
  expect(typeof block.hash).toBe('string');
  expect(block.hash.length).toBe(64);
});

test('Calcule un hash différent pour les blocs avec des données différentes', () => {
    const transactions1: Transaction[] = [new Transaction('cle1', 'valeur1')];
    const transactions2: Transaction[] = [new Transaction('cle2', 'valeur2')];
    const parentHash = 'parentHash';
    const block1 = new Block(1, transactions1, parentHash);
    const block2 = new Block(1, transactions2, parentHash);
  
    expect(block1.hash).not.toEqual(block2.hash);
  });
  
  test('Calcule un hash différent pour les blocs avec des timestamps différents', async () => {
    const transactions: Transaction[] = [new Transaction('cle', 'valeur')];
    const parentHash = 'parentHash';
    const block1 = new Block(1, transactions, parentHash);
    const block2 = new Block(1, transactions, parentHash);
  
    // Simule un délai pour que les timestamps soient différents
    const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
    await delay(5);
  
    block2.timestamp = Date.now();
    block2.hash = block2.calculateHash();
  
    expect(block1.hash).not.toEqual(block2.hash);
  });
  
  test('Vérifie que les transactions sont correctement stockées dans un bloc', () => {
    const transactions: Transaction[] = [
      new Transaction('cle1', 'valeur1'),
      new Transaction('cle2', 'valeur2', true),
    ];
    const parentHash = 'parentHash';
    const block = new Block(1, transactions, parentHash);
  
    expect(block.transactions.length).toBe(transactions.length);
    expect(block.transactions[0].key).toEqual(transactions[0].key);
    expect(block.transactions[0].value).toEqual(transactions[0].value);
    expect(block.transactions[0].deleteKey).toEqual(transactions[0].deleteKey);
    expect(block.transactions[1].key).toEqual(transactions[1].key);
    expect(block.transactions[1].value).toEqual(transactions[1].value);
    expect(block.transactions[1].deleteKey).toEqual(transactions[1].deleteKey);
  });