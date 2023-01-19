class Section {
    id;
    name;
    boxes;

    constructor(name = '', box = [], id) {
        this.id = Math.floor(Math.random() * 1000000000);
        this.name = name;
        this.boxes = box;
    }

    getSectionHTML() {
        const boxesHTML = this.boxes.reduce((acc, box) => acc + box.getBoxHTML(), '');

        return `
            <li class="section" id="${this.name}">
                <div class="section_header">
                    <p class="section_header_text">${this.name}</p>
                    <div class="number_box" id="${this.name}">${this.boxes.length}</div>
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
    const section = document.createElement("li");
    section.className = "section";
    section.innerHTML = `
        <div class="section_header">
            <input type="text" class="section_header_text_input section_header_text" placeholder="섹션 제목을 입력하세요">
            <span class="material-symbols-outlined section_confirm_button">check</span>
        </div>
        <ol class="section_main">
        </ol>
    `

    return section;
}

export {Section, getAddSectionHTML}