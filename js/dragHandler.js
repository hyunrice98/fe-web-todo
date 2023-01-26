import { main } from "./data/mainData.js";
import { addSidebarBlock } from "./data/sidebarData.js";
import { addEvent, pipe } from "./helper/commonFunction.js";
import { patchMainData } from "./server/mainData.js";
import { menuMoveTemplate } from "./template.js";

let $dragCard = null;
HTMLCollection.prototype.forEach = Array.prototype.forEach;

// drag event to card
const dragStartEventToCard = ($card) => addEvent($card, [
    (event) => $dragCard = event.target,
    (event) => event.target.classList.add("dragging")
], "dragstart");

const dragEndEventToCard = ($card) => addEvent($card, [
    (event) => event.target.classList.remove("dragging")
], "dragend")

const dragEventToEveryCard = () => pipe(
    ($cardArray) => $cardArray.forEach(($card) => {
        dragStartEventToCard($card);
        dragEndEventToCard($card);
    })
)(document.querySelectorAll(".card"));

// drag event to column
const dragOverEventToColumn = ($column) => addEvent(
    $column, [(event) => event.preventDefault()], "dragover");

const dropEventToColumn = ($column) => addEvent($column, [
    ({target}) => {
        if(target.className !== "column") return;

        const prevColumnID = $dragCard.closest("li.column").getAttribute("id");
        $dragCard.remove();

        const prevColumn = main.columns.filter((column) => prevColumnID == column.getName())[0];
        const nextColumn = main.columns.filter((column) => column.name == target.id)[0];

        for(const [index, card] of prevColumn.cards.entries()) {
            if(card.title !== $dragCard.id) continue;
            prevColumn.cards.splice(index, 1);
            nextColumn.cards.push(card)
        }

        addSidebarBlock(menuMoveTemplate($dragCard.id, prevColumn.getName(), nextColumn.name));

        target.appendChild($dragCard);
    },
    () => patchMainData(),
    () => main.updateColumnLength()
], "drop");

const dragEventToEveryColumn = () => {
    const columnArray = document.querySelectorAll(".column");
    columnArray.forEach(($column) => {
        dragOverEventToColumn($column);
        dropEventToColumn($column);
    })
}

const dragHandler = () => pipe(
    dragEventToEveryCard,
    dragEventToEveryColumn
)()

export {dragHandler}