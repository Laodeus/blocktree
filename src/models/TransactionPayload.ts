import { ITransactionPayload } from "./Interfaces/ITransactionPayload";

export class TransactionPayload implements ITransactionPayload {
    startIndex: number;
    length?: number;
    content?: string;

    constructor(startIndex: number, length?: number, content?: string) {
        this.startIndex = startIndex;
        this.length = length;
        this.content = content;
    }
}