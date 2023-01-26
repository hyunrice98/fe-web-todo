import { addEvent, pipe } from "../helper/commonFunction.js";
import { ID_DIVISTION_NUMBER } from "../helper/commonVariable.js";
import { patchMainData } from "../server/mainData.js";
import { columnHeaderTemplate, columnTemplate, emptyColumnTemplate } from "../template.js";
import { eventToCardAdditionConfirmBtn, eventToCardAdditonCancelBtn } from "./button.js";
import { getCardRegisterNode, resizeCardInput } from "./card.js";
import { main } from "./mainData.js";

class Column {
    id;
    name;
    cards;

    getID = () =>  this.id
    getName = () => this.name

    constructor(name = '', card = []) {
        this.id = Math.floor(Math.random() * ID_DIVISTION_NUMBER);
        this.name = name;
        this.cards = card;
    }

    getTemplate = () => pipe(
        () => this.cards.reduce((runningString, $card) => runningString + $card.getTemplate(), ''),
        (allCardTemplate) => columnTemplate(this.name, this.cards.length, allCardTemplate)
    )();
}

const getNewColumnTemplate = () => pipe(
    ($column) => {
        $column.classList.add("column");
        $column.innerHTML = emptyColumnTemplate();
        return $column;
    }
)(document.createElement("li"));

const createCardRegisterForm = ($column) => pipe(
    () => $column.prepend(getCardRegisterNode()),
    () => eventToCardAdditonCancelBtn(),
    () => eventToCardAdditionConfirmBtn(),
    () => resizeCardInput()
)()

const doubleClickeEventToColumnHeader = ($columnHeader) => addEvent($columnHeader, [
    () => {
        const $prevHeader = $columnHeader.parentElement;
        const $nextHeader = document.createElement("div");
        $nextHeader.className = "column_header";
        $nextHeader.innerHTML = columnHeaderTemplate($prevHeader.parentElement.id);

        $prevHeader.parentElement.replaceChild($nextHeader, $prevHeader);

        const $columnConfirmBtn = document.querySelector(".column_confirm_button");
        eventToColumnModifyBtn($columnConfirmBtn, $nextHeader);
    }
], "dblclick");

const eventToColumnModifyBtn = ($columnConfirmBtn, $nextHeader) => addEvent($columnConfirmBtn, [
    () => main.replaceColumn($nextHeader.parentElement.id, $nextHeader.children[0].value),
    () => patchMainData(),
    () => main.showMainHTML()
])

const eventToColumnHeader = () => pipe(
    ($columnHeaders) => 
        $columnHeaders.forEach(($columnHeader) => 
            doubleClickeEventToColumnHeader($columnHeader))
)(document.querySelectorAll(".column_header_text"))

export { Column, getNewColumnTemplate, createCardRegisterForm, eventToColumnHeader }