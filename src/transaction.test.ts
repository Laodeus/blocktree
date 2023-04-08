import { test, expect } from '@jest/globals';
import { Transaction } from './transaction';

test('Crée un nouvel objet Transaction', () => {
  const key = 'cle';
  const value = 'valeur';
  const deleteKey = false;
  const transaction = new Transaction(key, value, deleteKey);

  expect(transaction.key).toBe(key);
  expect(transaction.value).toBe(value);
  expect(transaction.deleteKey).toBe(deleteKey);
});

test('Crée un objet Transaction avec deleteKey à true', () => {
  const key = 'cle';
  const value: string | null = null;
  const deleteKey = true;
  const transaction = new Transaction(key, value, deleteKey);

  expect(transaction.key).toBe(key);
  expect(transaction.value).toBe(value);
  expect(transaction.deleteKey).toBe(deleteKey);
});

test('Crée un objet Transaction sans préciser deleteKey', () => {
  const key = 'cle';
  const value = 'valeur';
  const transaction = new Transaction(key, value);

  expect(transaction.key).toBe(key);
  expect(transaction.value).toBe(value);
  expect(transaction.deleteKey).toBe(false);
});