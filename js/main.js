import {clickHeaderMenuButton, clickSidebarCloseButton} from "./sidebarHandler.js";
import {data} from "./data/mainData.js"
import {sideData} from "./data/sidebarData.js"

// Dom imports with initial data
data.getMainHTML();
sideData.getSidebarHTML();

// Menubar Showing
clickHeaderMenuButton();
clickSidebarCloseButton();