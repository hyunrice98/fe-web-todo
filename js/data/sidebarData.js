import { SidebarBlock } from "./sidebarBlock.js";
import { eventToSideBarBtns } from "../sidebarHandler.js";
import { pipe } from "../helper/commonFunction.js";

class SidebarData {
    constructor(sidebarBlocks) {
        this.sidebarBlocks = sidebarBlocks;
    }

    getTemplate = () => pipe(
        ($sideBar) => {
            $sideBar.innerHTML = `
                <button type="button" id="sidebar_close_button">
                <img src="Icon/icon_close.png" alt="menu">
                </button>
                <ol id="sidebar_blocks"></ol>
            `;

            return $sideBar.querySelector("ol#sidebar_blocks");
        },
        ($sideBarBlocks) => $sideBarBlocks.innerHTML 
            = this.sidebarBlocks.reduce(
                (runningString, block) => runningString + block.getSidebarBlockHTML(), ''),
        () => eventToSideBarBtns()
    )(document.querySelector("#sidebar"));
}

const parsedDate = () => pipe(
    (time) => `
        ${time.getFullYear()}/${time.getMonth() + 1}/${time.getDate()}
        ${time.getHours()}:${time.getMinutes()}
    `
)(new Date());

const addSidebarBlock = (text, name="jaehyun cho") => pipe(
    () => sideData.sidebarBlocks.unshift(new SidebarBlock(name, text, parsedDate())),
    () => sideData.getTemplate()
)();

const sideData = new SidebarData([]);

export {sideData, SidebarData, addSidebarBlock}