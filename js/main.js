import {clickHeaderMenuButton, clickSidebarCloseButton} from "./sidebarHandler.js";
import {clickBoxDeleteButton, clickPopupCancelButton} from "./popupHandler.js";
import {data} from "./data/mainData.js"

// Menubar Showing
clickHeaderMenuButton();
clickSidebarCloseButton();
clickBoxDeleteButton();
clickPopupCancelButton();

data.getMainHTML();