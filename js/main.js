import {clickHeaderMenuButton, clickSidebarCloseButton} from "./sidebarHandler.js";
import {clickBoxDeleteButton, clickPopupCancelButton} from "./popupHandler.js";
import {data} from "./data/mainData.js"
import {sideData} from "./data/sidebarData.js"

data.getMainHTML();
sideData.getSidebarHTML();

// Menubar Showing
clickHeaderMenuButton();
clickSidebarCloseButton();
clickBoxDeleteButton();
clickPopupCancelButton();