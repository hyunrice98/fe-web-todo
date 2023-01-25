import { main } from "./data/mainData.js";
import { addSidebarBlock } from "./data/sidebarData.js";
import { addEvent, pipe } from "./helper/commonFunction.js";
import { patchMainData } from "./server/mainData.js";
import { menuMoveTemplate } from "./template.js";

let $dragCard = null;
HTMLCollection.prototype.forEach = Array.prototype.forEach;

const dragEventToEveryCard = () => pipe(
    ($cardArray) => {
        $cardArray.forEach(($card) => {
            addEvent($card, [
                (event) => $dragCard = event.target,
                (event) => event.target.classList.add("dragging")
            ], "dragstart");

            addEvent($card, [
                (event) => event.target.classList.remove("dragging")
            ], "dragend")
        })
    }
)(document.querySelectorAll(".card"));

const dragEventToEveryColumn = () => {
    const columnArray = document.querySelectorAll(".column");
    columnArray.forEach(($column) => {
        addEvent($column, [(event) => event.preventDefault()], "dragover");
        addEvent($column, [
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
            () => main.refreshNumberCircle()
        ], "drop");
    })
}

const dragHandler = () => pipe(
    dragEventToEveryCard,
    dragEventToEveryColumn
)()

export {dragHandler}