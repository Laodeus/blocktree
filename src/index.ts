import { BlockTree } from "./models/BlockTree";
import { Block } from "./models/Block";
import { BlockData } from "./models/BlockData";

const tree = new BlockTree(
    new Block(
        "Genesis",
        new BlockData(
            "Genesis block",
            "Branch in.",
            "Laodeus"
        )
    )
);

const block1 = tree.addBlock(tree.getGenesis().hash, new BlockData("secondBlock", "Branch Out", "Laodeus"));
tree.addBlock(block1.hash, new BlockData("secondBlock", "Branch Out", "Laodeus"));
tree.addBlock(block1.hash, new BlockData("secondBlock", "Branch Out2", "Laodeus"));

console.log(tree)