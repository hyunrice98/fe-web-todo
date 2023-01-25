import { sideBarContentTemplate } from "../template.js";

class SidebarBlock {
    constructor(name, text, time) {
        this.name = name;
        this.text = text;
        this.time = time;
    }

    getSideBarTemplate = () => sideBarContentTemplate(this.name. this.text, this.time);
}

export { SidebarBlock }