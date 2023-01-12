import {SidebarBlock} from "./sidebarBlock.js";

class SidebarData {
    constructor(sidebars) {
        this.sidebars = sidebars;
    }

    getSidebarHTML() {
        const sidebar = document.getElementById("sidebar");
        let html = `
            <button type="button" id="sidebar_close_button">
                <img src="Icon/icon_close.png" alt="menu">
            </button>
            <ol id="sidebar_blocks">
        `

        for (let block of this.sidebars) {
            html += block.getSidebarBlockHTML();
        }
        html += '</ol>'

        sidebar.innerHTML = html;
    }
}

let sideData = new SidebarData([
    new SidebarBlock('sam', 'HTML/CSS공부하기를 해야할 일에서 하고 있는 일로 이동하였습니다.', '1분전'),
    new SidebarBlock('sam', '해야할 일에 HTML/CSS공부하기를 등록하였습니다.', '1분전'),
    new SidebarBlock('sam', '해야할 일에 블로그에 포스팅할 것을 등록하였습니다.', '1분전'),
    new SidebarBlock('sam', '해야할 일에 GitHub 공부하기를 등록하였습니다.', '1분전'),
    new SidebarBlock('sam', '해야할 일에 GitHub 공부하기를 등록하였습니다.', '1분전'),
    new SidebarBlock('sam', '해야할 일에 GitHub 공부하기를 등록하였습니다.', '1분전'),
    new SidebarBlock('sam', '해야할 일에 GitHub 공부하기를 등록하였습니다.', '1분전'),
]);

export {sideData}