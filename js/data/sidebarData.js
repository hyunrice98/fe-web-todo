import {SidebarBlock} from "./sidebarBlock.js";
import {clickHeaderMenuButton, clickSidebarCloseButton} from "../sidebarHandler.js";

class SidebarData {
    constructor(sidebars) {
        this.sidebars = sidebars;
    }

    getSidebarHTML() {
        const sidebar = document.querySelector("#sidebar");
        let html = `
            <button type="button" id="sidebar_close_button">
                <img src="Icon/icon_close.png" alt="menu">
            </button>
            <ol id="sidebar_blocks">
        `

        html += this.sidebars.reduce((acc, block) => acc + block.getSidebarBlockHTML(), '');
        html += '</ol>'

        sidebar.innerHTML = html;
        clickHeaderMenuButton();
        clickSidebarCloseButton();
    }
}

function addSidebarBlock(name, text) {
    sideData.sidebars.unshift(new SidebarBlock(name, text, parsedDate()));
    sideData.getSidebarHTML();
}

function parsedDate() {
    const time = new Date();
    return `
        ${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()}
        ${time.getHours()}:${time.getMinutes()}
    `
}

let sideData = new SidebarData([]);

export {sideData, SidebarData, addSidebarBlock}