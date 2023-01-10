class SidebarBlock {
    constructor(name, text, time) {
        this.name = name;
        this.text = text;
        this.time = time;
    }

    getSidebarBlockHTML() {
        return `
        <li class="sidebar_block">
            <p class="sidebar_block_emoji">🥳</p>
            <div class="sidebar_block_text_container">
                <p class="sidebar_block_name">${this.name}</p>
                <p class="sidebar_block_text">${this.text}</p>
                <p class="sidebar_block_time">${this.time}</p>
            </div>
        </li>
        `
    }
}

export {SidebarBlock}