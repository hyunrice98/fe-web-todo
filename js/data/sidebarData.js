import {SidebarBlock} from "./sidebarBlock.js";
import {clickHeaderMenuButton, clickSidebarCloseButton} from "../sidebarHandler.js";
import { pipe } from "../helperFunction/common.js";

class SidebarData {
    constructor(sidebarBlocks) {
        this.sidebarBlocks = sidebarBlocks;
    }

    async getTemplate() {
        const sidebar = document.querySelector("#sidebar");
        let html = `
            <button type="button" id="sidebar_close_button">
                <img src="Icon/icon_close.png" alt="menu">
            </button>
            <ol id="sidebar_blocks">
        `

        html += this.sidebarBlocks.reduce((runningString, block) => runningString + block.getSidebarBlockHTML(), '');
        html += '</ol>'

        sidebar.innerHTML = html;
        clickHeaderMenuButton();
        clickSidebarCloseButton();
    }
}

const parsedDate = () => pipe(
    (time) => `
        ${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()}
        ${time.getHours()}:${time.getMinutes()}
    `
)(new Date());

function addSidebarBlock(name, text) {
    sideData.sidebarBlocks.unshift(new SidebarBlock(name, text, parsedDate()));
    sideData.getTemplate();
}

const sideData = new SidebarData([]);

export {sideData, SidebarData, addSidebarBlock}