import { BlockData } from "./models/BlockData";
import { BlockTree } from "./models/BlockTree";
import { TransactionType } from "./models/Interfaces/ITransaction";
import { Transaction } from "./models/Transaction";
import { TransactionPayload } from "./models/TransactionPayload";


const blockTree = new BlockTree([]);


const newBlockData1Transaction = new Transaction(TransactionType.ADD, new TransactionPayload(0,undefined,"ok"));
const newBlockData1 = new BlockData("add first block",[newBlockData1Transaction],"Laodeus")

blockTree.addBlock("",newBlockData1);

console.log(JSON.stringify(blockTree))