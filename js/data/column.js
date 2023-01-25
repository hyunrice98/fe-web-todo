class Column {
    id;
    name;
    cards;

    constructor(name = '', card = [], id) {
        this.id = Math.floor(Math.random() * 1000000000);
        this.name = name;
        this.cards = card;
    }

    getColumnHTML() {
        const cardsHTML = this.cards.reduce((acc, card) => acc + card.getTemplate(), '');

        return `
            <li class="column" id="${this.name}">
                <div class="column_header">
                    <p class="column_header_text">${this.name}</p>
                    <div class="number_circle" id="${this.name}">${this.cards.length}</div>
                    <span class="material-symbols-outlined column_add_button">add</span>
                    <span class="material-symbols-outlined column_delete_button">close</span>
                </div>
                <ol class="column_main">
                    ${cardsHTML}
                </ol>
            </li>
        `;
    }
}

function getAddColumnHTML() {
    const column = document.createElement("li");
    column.className = "column";
    column.innerHTML = `
        <div class="column_header">
            <input type="text" class="column_header_text_input column_header_text" placeholder="섹션 제목을 입력하세요">
            <span class="material-symbols-outlined column_confirm_button">check</span>
        </div>
        <ol class="column_main">
        </ol>
    `

    return column;
}

export {Column, getAddColumnHTML}