import {clickHeaderMenuButton, clickSidebarCloseButton} from "./sidebarHandler.js"
import {data} from "./data/mainData.js"
import {sideData} from "./data/sidebarData.js"
import {favHandler} from "./favHandler.js"

// Dom imports with initial data
data.showMainHTML();
sideData.getSidebarHTML();

// Menubar Showing
clickHeaderMenuButton();
clickSidebarCloseButton();
favHandler();

// test zone