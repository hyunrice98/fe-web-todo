import { addEvent, pipe } from "../helper/commonFunction.js";
import { patchMainData, postColumnData } from "../server/mainData.js";
import { main } from "./mainData.js";
import { menuAddColumnTemplate } from "../template.js";
import { Column } from "./column.js";
import { addSidebarBlock } from "./sidebarData.js";

const hoverEventToCardDeleteBtn = () => pipe(
    ($deleteBtns) => $deleteBtns.forEach(($btn) => {
        const targetCard = $btn.closest(".card");

        addEvent($btn, [
            () => targetCard.style.outline = "solid #FF4343",
            () => targetCard.style.backgroundColor = "#FFEEEC"
        ], "mouseover");

        addEvent($btn, [
            () => targetCard.style.outline = "none",
            () => targetCard.style.backgroundColor = "#FFFFFF"
        ], "mouseout");
    })
)(document.querySelectorAll(".card_delete_button"));

const eventToColumnModifyBtn = ($columnConfirmBtn, $nextHeader) => addEvent($columnConfirmBtn, [
    () => main.replaceColumn($nextHeader.parentElement.id, $nextHeader.children[0].value),
    () => patchMainData(),
    () => main.showMainHTML()
])

const eventToCardAdditionConfirmBtn = () => pipe(
    ($confirmBtn) => addEvent($confirmBtn, [
        () => {
            const title = document.getElementsByClassName("card_addition_title")[0].value;
            const main = document.getElementsByClassName("card_addition_text")[0].value;

            if (title === '' || main === '') return;

            const columnID = $confirmBtn.closest(".column").id;
            this.columns.forEach((column) => {
                if (column.name === columnID) {
                    const newCard = new Card(title, main, "jaehyun cho");

                    if (cardTitle !== '') {
                        this.replaceCardWithTitle(cardTitle, newCard);
                        addSidebarBlock(menuUpdateTemplate(column.name, title));
                    } else {
                        column.cards.unshift(newCard);
                        addSidebarBlock(menuAddTemplate(column.name, title));
                    }
                    patchMainData();
                }
            });

            this.showMainHTML();
        }
    ])
)(document.querySelector("#card_addition_confirm"));

const eventToCardEditBtn = () => pipe(
    ($modifyBtns) => $modifyBtns.forEach(($btn) => {
        addEvent($btn, [() => main.switchAddCardHTML($btn.closest(".card"))]);
        addEvent($btn, [() => $btn.style.color = "#0075DE"], "mouseover");
        addEvent($btn, [() => $btn.style.color = "#000000"], "mouseout");
    })
)(document.querySelectorAll(".card_edit_button"));

const eventToCardAdditonCancelBtn = () => pipe(
    ($cardCancelBtn) => addEvent($cardCancelBtn, [() => {
            const column = $cardCancelBtn.closest(".column_main")
            column.removeChild(column.firstChild);
    }])
)(document.querySelector("#card_addition_cancel"));

const eventToColumnConfirmBtn = () => pipe(
    ($columnConfirmBtn) => addEvent($columnConfirmBtn, [
        () => {
            const columnName = $columnConfirmBtn.previousElementSibling.value;
            if (columnName === '') return;
            const newColumn = new Column(columnName, []);
            main.columns.push(newColumn);
            postColumnData(newColumn);
            addSidebarBlock(menuAddColumnTemplate(columnName));
            main.showMainHTML();
        }
    ])
)(document.querySelector(".column_confirm_button"));

export { 
    hoverEventToCardDeleteBtn, eventToCardAdditionConfirmBtn, eventToCardEditBtn, eventToCardAdditonCancelBtn,
    eventToColumnConfirmBtn, eventToColumnModifyBtn
}