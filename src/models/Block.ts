import { BlockData } from "./BlockData";
import { IBlock } from "./Interfaces/IBlock";
import { v4 as uuidv4 } from "uuid";
import { SHA256 } from "crypto-js";

export class Block implements IBlock {
    id: string;
    hash: string;
    previousHash: string;
    data: BlockData;

    constructor(previousHash: string, data: BlockData) {
        this.id = uuidv4();
        this.previousHash = previousHash;
        this.data = data;
        this.hash = this.calculateHash();
    }

    calculateHash(): string {
        const serialized = JSON.stringify(this);
        const hash = SHA256(serialized).toString();
        return hash;
    }

    validate(): boolean {
        return true;
    }
}