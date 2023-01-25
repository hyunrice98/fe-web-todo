import { pipe } from "../helper/commonFunction.js";
import { ID_DIVISTION_NUMBER } from "../helper/commonVariable.js";

class Column {
    id;
    name;
    cards;

    getID = () =>  this.id
    getName = () => this.name

    constructor(name = '', card = [], id) {
        this.id = Math.floor(Math.random() * ID_DIVISTION_NUMBER);
        this.name = name;
        this.cards = card;
    }

    getTemplate = () => pipe(
        () => this.cards.reduce((runningString, $card) => runningString + $card.getTemplate(), ''),
        (allCardTemplate) => `
        <li class="column" id="${this.name}">
            <div class="column_header">
                <p class="column_header_text">${this.name}</p>
                <div class="number_circle" id="${this.name}">${this.cards.length}</div>
                <span class="material-symbols-outlined column_add_button">add</span>
                <span class="material-symbols-outlined column_delete_button">close</span>
            </div>
            <ol class="column_main">
                ${allCardTemplate}
            </ol>
        </li>
        `
    )();
}

const getNewColumnTemplate = () => pipe(
    () => document.createElement("li"),
    ($column) => {
        $column.classList.add("column");
        $column.innerHTML = `
            <div class="column_header">
                <input type="text" class="column_header_text_input column_header_text" placeholder="섹션 제목을 입력하세요">
                <span class="material-symbols-outlined column_confirm_button">check</span>
            </div>
            <ol class="column_main">
            </ol>
        `

        return $column;
    }
)();

export {Column, getNewColumnTemplate}