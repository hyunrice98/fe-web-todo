import {data} from "./data/mainData.js"
import {sideData} from "./data/sidebarData.js"
import {favHandler} from "./favHandler.js"
import {getMainData, patchMainData} from "./server/mainData.js"

import {Box} from "./data/box.js";

// server setting
await getMainData();

// Dom imports with initial data
await data.showMainHTML();
await sideData.getSidebarHTML();

// Menubar Showing
favHandler();

// test zone
// let a = new Box("asdf", "asdfasdf", "fdsa");
// await uploadBox(1, a);

await patchMainData()