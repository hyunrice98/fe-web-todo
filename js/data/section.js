class Section {
    constructor(name, box) {
        this.name = name;
        this.box = box;
    }

    getSectionHTML() {
        let boxesHTML = "";
        for (let box of this.box) {
            boxesHTML += box.getBoxHTML();
        }

        // MARK: id=${this.mark} might need changing
        return `
            <li class="section" id="${this.name}">
                <div class="section_header">
                    <p class="section_header_text">${this.name}</p>
                    <div class="number_box">${this.box.length}</div>
                    <span class="material-symbols-outlined section_add_button">add</span>
                    <span class="material-symbols-outlined section_delete_button">close</span>
                </div>
                <ol class="section_main">
                    ${boxesHTML}
                </ol>
            </li>
        `;
    }
}


export {Section}