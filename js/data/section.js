class Section {
    name;
    box;

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

function getAddSectionHTML() {
    let section = document.createElement("li");
    section.className = "section";
    section.innerHTML = `
        <div class="section_header">
            <input type="text" class="section_header_text_input section_header_text" placeholder="섹션 제목을 입력하라우">
            <span class="material-symbols-outlined section_confirm_button">check</span>
        </div>
        <ol class="section_main">
        </ol>
    `

    return section;
}

export {Section, getAddSectionHTML}