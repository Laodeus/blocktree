// transaction.ts

export class Transaction {
    key: string;
    value: string | null;
    deleteKey: boolean;
  
    constructor(key: string, value: string | null, deleteKey: boolean = false) {
      this.key = key;
      this.value = value;
      this.deleteKey = deleteKey;
    }
  }