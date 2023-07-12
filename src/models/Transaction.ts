import { ITransaction, TransactionType } from "./Interfaces/ITransaction";
import { ITransactionPayload } from "./Interfaces/ITransactionPayload";

export class Transaction implements ITransaction{
    type : TransactionType;
    payload : ITransactionPayload;

    constructor(type: TransactionType,  payload : ITransactionPayload){
        this.type = type;
        this.payload = payload;
    }
}

