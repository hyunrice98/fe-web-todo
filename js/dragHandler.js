import { main } from "./data/mainData.js";
import { addSidebarBlock } from "./data/sidebarData.js";
import { addEvent, pipe } from "./helperFunction/common.js";
import { patchMainData } from "./server/mainData.js";

let dragCard = null;
HTMLCollection.prototype.forEach = Array.prototype.forEach;

const dragEventToEveryCard = () => pipe(
    ($cardArray) => {
        $cardArray.forEach(($card) => {
            addEvent($card, [
                (event) => dragCard = event.target,
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
        addEvent($column, [
            (event) => event.preventDefault()
        ], "dragover")

        addEvent($column, [
            (event) => {
                const targetId = event.target.id;
                if(event.target.className !== "column") return;
                const $currentColumn = dragCard.parentNode;
                $currentColumn.removeChild(dragCard);
                // dragCard.parentNode.removeChild(dragCard);
                event.target.appendChild(dragCard);

                let tempColumnName;
                let tempCard;
                for (const column of main.columns) {
                    column.cards.forEach((card) => {
                        if (card.title === dragCard.id) {
                            tempCard = card;
                            tempColumnName = column.name;
                            const index = column.cards.indexOf(card);
                            column.cards.splice(index, 1);
                        }
                    });
                }
                
                for(const column of main.columns) {
                    if(column.name !== targetId) continue;
                    column.cards.push(tempCard);
                    patchMainData();
                    addSidebarBlock("jaehyun cho",
                        `<strong>${dragCard.id}</strong>를 <strong>${tempColumnName}</strong>에서 <strong>${column.name}</strong>로 이동하였습니다.`
                    );
                }

                main.refreshNumberCircle();
            }
        ], "drop");
    })
}

function dragHandler() {
    dragEventToEveryCard();
    dragEventToEveryColumn();
}

export {dragHandler}