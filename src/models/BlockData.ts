import { IBlockData } from "./Interfaces/IBlockData";
import { ITransaction } from "./Interfaces/ITransaction";

export class BlockData implements IBlockData {
    title: string;
    transaction : ITransaction[];
    author: string;
    timestamp : string;

    constructor(title: string, transaction : ITransaction[], author: string) {
        this.title = title;
        this.transaction = transaction;
        this.author = author;
        this.timestamp = Date.now().toString();
    }
}