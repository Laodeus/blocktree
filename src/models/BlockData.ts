import { IBlockData } from "./IBlockData";

export class BlockData implements IBlockData {
    title = "";
    content = "";
    author = "";
    timestamp = "";

    constructor(title: string, content: string, author: string) {
        this.title = title;
        this.content = content;
        this.author = author;
        this.timestamp = Date.now().toString();
    }
}