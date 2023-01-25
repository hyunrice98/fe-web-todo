import {main} from "./data/mainData.js";
import {addSidebarBlock} from "./data/sidebarData.js";
import {patchMainData} from "./server/mainData.js";

function dragHandler() {
    let dragged = null;

    // dragged object transparency injection
    const cards = document.getElementsByClassName("card");
    [...cards].forEach((card) => {
        card.addEventListener("dragstart", (event) => {
            dragged = event.target;
            event.target.classList.add("dragging");
        });
        card.addEventListener("dragend", (event) => {
            event.target.classList.remove("dragging");
        });
    });

    // data transfer after drag
    const target = document.getElementsByClassName("column");
    [...target].forEach((column) => {
        column.addEventListener("dragover", (event) => {
            event.preventDefault();
        });
        column.addEventListener("drop", (event) => {
            event.preventDefault();
            if (event.target.className === "column") {
                dragged.parentNode.removeChild(dragged);
                event.target.appendChild(dragged);
            } else return;

            let tempColumnName;
            let tempCard;
            for (const column of main.columns) {
                column.cards.forEach((card) => {
                    if (card.title === dragged.id) {
                        tempCard = card;
                        tempColumnName = column.name;
                        const index = column.cards.indexOf(card);
                        column.cards.splice(index, 1);
                    }
                });
            }

            const targetId = event.target.id;
            main.columns.forEach((column) => {
                if (column.name === targetId) {
                    column.cards.push(tempCard);
                    patchMainData();
                    addSidebarBlock("jaehyun cho",
                        `<strong>${dragged.id}</strong>를 <strong>${tempColumnName}</strong>에서 <strong>${column.name}</strong>로 이동하였습니다.`
                    );
                }
            });
            main.refreshNumberCircle();
        });
    });
}

export {dragHandler}