import { ITransactionPayload } from "./ITransactionPayload";

/**
 * Enum for transaction types.
 * @readonly
 * @enum {string}
 */
export enum TransactionType {
    /** Represents an add transaction. */
    ADD = 'ADD',
    /** Represents a delete transaction. */
    DELETE = 'DELETE',
    /** Represents an edit transaction. */
    EDIT = 'EDIT',
}

/**
 * Interface for a transaction in the blockchain.
 * @interface
 * 
 * @property {TransactionType} type - The type of the transaction.
 * @property {ITransactionPayload} payload - The details of the transaction.
 */
export interface ITransaction {
    type: TransactionType;
    payload: ITransactionPayload;
}