import { main } from "./data/mainData.js";
import { addSidebarBlock } from "./data/sidebarData.js";
import { addEvent, pipe } from "./helper/commonFunction.js";
import { patchMainData } from "./server/mainData.js";
import { menuMoveTemplate } from "./template.js";

let $dragCard = null;
let prevColumnID = "";
HTMLCollection.prototype.forEach = Array.prototype.forEach;

// drag event to card
const dragStartEventToCard = ($card) => addEvent($card, [
    (event) => $dragCard = event.target,
    ({target}) => target.classList.add("dragging")
], "dragstart");

const dragEndEventToCard = ($card) => addEvent($card, [
    ({target}) => target.classList.remove("dragging")
], "dragend")

const dragEventToEveryCard = () => pipe(
    ($cardArray) => $cardArray.forEach(($card) => {
        dragStartEventToCard($card);
        dragEndEventToCard($card);
    })
)(document.querySelectorAll(".card"));

// drag event to column
const dragOverEventToColumn = ($column) => addEvent($column, 
    [(event) => event.preventDefault()], "dragover");

const dropEventToColumn = ($column) => addEvent($column, [
    () => { if(target.className !== "column") return;},
    () => {
        $dragCard.remove();
        target.appendChild($dragCard);
    },
    () => prevColumnID = $dragCard.closest("li.column").getAttribute("id"),
    ({target}) => {
        const prevColumn = main.columns.filter((column) => prevColumnID == column.getName())[0];
        const nextColumn = main.columns.filter((column) => column.name == target.id)[0];
        for(const [index, card] of prevColumn.cards.entries()) {
            if(card.title !== $dragCard.id) continue;
            prevColumn.cards.splice(index, 1);
            nextColumn.cards.push(card)
        }

        addSidebarBlock(menuMoveTemplate($dragCard.id, prevColumn.getName(), nextColumn.name));
    },
    () => patchMainData(),
    () => main.updateColumnLength()
], "drop");

const dragEventToEveryColumn = () => pipe(
    (columnArray) => columnArray.forEach(($column) => {
        dragOverEventToColumn($column);
        dropEventToColumn($column);
    })
)(document.querySelectorAll(".column"));

const dragHandler = () => pipe(
    dragEventToEveryCard,
    dragEventToEveryColumn
)()

export {dragHandler}