import {main} from "./data/mainData.js"
import {sideData} from "./data/sidebarData.js"
import {favHandler} from "./favHandler.js"
import {getMainData} from "./server/mainData.js"

// server setting
await getMainData();

// Dom imports with initial data
await main.showMainHTML();
await sideData.getTemplate();

// Menubar Showing
favHandler();

// Test zone