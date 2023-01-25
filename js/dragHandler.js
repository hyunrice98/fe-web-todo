import { main } from "./data/mainData.js";
import { addSidebarBlock } from "./data/sidebarData.js";
import { addEvent, pipe } from "./helperFunction/common.js";
import { patchMainData } from "./server/mainData.js";

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

                const $prevColumn = $dragCard.closest("li.column");
                const $prevColumnContent = $dragCard.parentNode;
                $prevColumnContent.removeChild($dragCard);

                const prevColumn = main.columns.filter((column) => $prevColumn.getAttribute("id") == column.getName())[0];
                const nextColumn = main.columns.filter((column) => column.name == target.id)[0];

                for(const [index, card] of prevColumn.cards.entries()) {
                    if(card.title !== $dragCard.id) continue;
                    prevColumn.cards.splice(index, 1);
                    nextColumn.cards.push(card)
                }
                    
                addSidebarBlock(`
                    <strong>${$dragCard.id}</strong>를 
                    <strong>${prevColumn.getName()}</strong>에서 
                    <strong>${nextColumn.name}</strong>로 이동하였습니다.
                `);

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