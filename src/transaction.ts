// transaction.ts

/**
 * Represents a transaction in the blockchain.
 */
export class Transaction {
    /**
     * The key of the transaction.
     * @type {string}
     */
    key: string;
    
    /**
     * The value of the transaction.
     * @type {(string|null)}
     */
    value: string | null;

    /**
     * Indicates whether this transaction is a delete operation.
     * @type {boolean}
     */
    deleteKey: boolean;

    /**
     * Creates a new instance of Transaction.
     * @param {string} key - The key of the transaction.
     * @param {(string|null)} value - The value of the transaction. Default is null.
     * @param {boolean} deleteKey - Indicates whether this transaction is a delete operation. Default is false.
     */
    constructor(key: string, value: string | null, deleteKey: boolean = false) {
      this.key = key;
      this.value = value;
      this.deleteKey = deleteKey;
    }
  }