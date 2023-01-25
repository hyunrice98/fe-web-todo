import {getNewColumnTemplate, Column} from './column.js'
import {Card, getCardRegisterTemplate, resizeCardInput} from './card.js'
import { eventToCardDeleteBtns } from "../popupHandler.js";
import { eventToColumnBtns } from "../columnHeaderHandler.js";
import {dragHandler} from "../dragHandler.js";
import {addSidebarBlock} from "./sidebarData.js"
import {deleteColumnData, patchMainData, postColumnData} from "../server/mainData.js";
import { addEvent, pipe } from '../helper/commonFunction.js';

NodeList.prototype.forEach = Array.prototype.forEach;

class Main {
    constructor(columns = []) {
        this.columns = columns
    }

    replaceColumn = (prevName, newName) => 
        this.columns
        .filter((column) => column.name === prevName)
        .forEach((column) => column.name = newName);

    replaceCardWithTitle(cardTitle, $newCard) {
        for(const $column of this.columns) {
            for(const [$card, index] of $column.cards.entries()) {
                if($card.title === cardTitle) {
                    $column.cards[index] = $newCard;
                }
            }
        }
    }

    showMainHTML() {
        const $columnContent = document.querySelector("#column_holder");
        $columnContent.innerHTML = this.columns
        .reduce((runningString, column) => runningString + column.getTemplate(), '');

        this.modifyColumnHeaderTextListener();
        eventToCardDeleteBtns();
        this.setCardDeleteButtonHover();
        this.setCardEditButtonListener();
        eventToColumnBtns();
        dragHandler();
    }

    modifyColumnHeaderTextListener() {
        const $columnHeaderTexts = document.querySelectorAll(".column_header_text");
        $columnHeaderTexts.forEach(($columnHeaderText) => {
            $columnHeaderText.addEventListener("dblclick", () => {
                const originalColumnHeader = $columnHeaderText.parentElement;
                const newColumnHeader = document.createElement("div");
                newColumnHeader.className = "column_header";
                newColumnHeader.innerHTML = `
                    <input type="text" class="column_header_text_input column_header_text" placeholder="섹션 제목을 입력하세요"
                     value="${originalColumnHeader.parentElement.id ?? ''}"
                     >
                    <span class="material-symbols-outlined column_confirm_button">check</span>
                `;

                originalColumnHeader.parentElement.replaceChild(newColumnHeader, originalColumnHeader);

                const $columnConfirmBtn = document.querySelector(".column_confirm_button");
                addEvent($columnConfirmBtn, [
                    () => this.replaceColumn(newColumnHeader.parentElement.id, newColumnHeader.children[0].value),
                    () => patchMainData(),
                    () => this.showMainHTML()
                ]);
            });
        });
    }

    refreshNumberCircle() {
        const columnHTMLHeaders = document.getElementsByClassName("number_circle");
        this.columns.forEach((column) => {
            for (const numberCircle of columnHTMLHeaders) {
                if (numberCircle.id === column.name) {
                    numberCircle.innerHTML = column.cards.length;
                }
            }
        });
    }

    deleteCard(cardId) {
        this.columns.forEach((column) => {
            column.cards.forEach((card) => {
                if (card.title === cardId) {
                    const index = column.cards.indexOf(card);
                    column.cards.splice(index, 1);
                    patchMainData();
                }
            });
        });
        this.showMainHTML();
    }

    addCardHTML = (columnID) => pipe(
        ($column) => $column.querySelector(".column_main"),
        ($columnMain) => this.newAddCardHTML($columnMain)
    )(document.getElementById(columnID));

    newAddCardHTML(column) {
        column.prepend(getCardRegisterTemplate());
        resizeCardInput();
        this.setCardAdditionCancelListener();
        this.setCardAdditionConfirmListener();
    }

    setCardAdditionCancelListener = () => pipe(
        ($cardCancelBtn) => addEvent($cardCancelBtn, [
            () => {
                const column = $cardCancelBtn.closest(".column_main")
                column.removeChild(column.firstChild);
            }
        ])
    )(document.querySelector("#card_addition_cancel"));

    setCardAdditionConfirmListener(cardTitle = '') {
        const $cardConfirmBtn = document.querySelector("#card_addition_confirm");
        addEvent($cardConfirmBtn, [
            () => {
                const title = document.getElementsByClassName("card_addition_title")[0].value;
                const main = document.getElementsByClassName("card_addition_text")[0].value;

                if (title === '' || main === '') return;

                const columnID = $cardConfirmBtn.closest(".column").id;
                this.columns.forEach((column) => {
                    if (column.name === columnID) {
                        const newCard = new Card(title, main, "jaehyun cho");

                        if (cardTitle !== '') {
                            this.replaceCardWithTitle(cardTitle, newCard);
                            patchMainData();
                            addSidebarBlock(`<strong>${column.name}</strong>의 <strong>${title}</strong>를 수정하였습니다.`);
                        } else {
                            column.cards.unshift(newCard);
                            patchMainData();
                            addSidebarBlock(`<strong>${column.name}</strong>에 <strong>${title}</strong>를 등록하였습니다.`);
                        }
                    }
                });

                this.showMainHTML();
            }
        ]);
    }

    deleteColumn(columnId) {
        this.columns.forEach((column) => {
            if (column.name === columnId) {
                const index = main.columns.indexOf(column);
                const columnID = main.columns[index].id;
                deleteColumnData(columnID);
                main.columns.splice(index, 1);
                addSidebarBlock(`<strong>${column.name}</strong> 칼럼을 삭제하였습니다.`);
            }
        });
    }

    addColumn = () => pipe(
        ($columnHolder) => $columnHolder.appendChild(getNewColumnTemplate()),
        () => this.addColumnConfirmController()
    )(document.querySelector("#column_holder"));

    addColumnConfirmController = () => pipe(
        ($columnConfirmBtn) => addEvent($columnConfirmBtn, [
            () => {
                const columnName = $columnConfirmBtn.previousElementSibling.value;
                if (columnName === '') return;
                const newColumn = new Column(columnName, []);
                this.columns.push(newColumn);
                postColumnData(newColumn);
                addSidebarBlock(`<strong>${columnName}</strong> 칼럼을 등록하였습니다.`);
                this.showMainHTML();
            }
        ])
    )(document.querySelector(".column_confirm_button"));

    setCardDeleteButtonHover() {
        const $deleteBtns = document.querySelectorAll(".card_delete_button");
        $deleteBtns.forEach(($btn) => {
            const targetCard = $btn.closest(".card");

            addEvent($btn, [
                () => targetCard.style.outline = "solid #FF4343",
                () => targetCard.style.backgroundColor = "#FFEEEC"
            ], "mouseover");

            addEvent($btn, [
                () => targetCard.style.outline = "none",
                () => targetCard.style.backgroundColor = "#FFFFFF"
            ], "mouseout");
        });
    }

    setCardEditButtonListener() {
        const $modifyBtns = document.querySelectorAll(".card_edit_button");
        $modifyBtns.forEach(($btn) => {
            addEvent($btn, [() => this.switchAddCardHTML($btn.closest(".card"))]);
            addEvent($btn, [() => $btn.style.color = "#0075DE"], "mouseover");
            addEvent($btn, [() => $btn.style.color = "#000000"], "mouseout");
        });
    }

    switchAddCardHTML(targetCard) {
        const $cardAddCancelBtn = document.querySelector("#card_addition_cancel");
        const cardTitle = targetCard.id;
        const newCard = getCardRegisterTemplate(cardTitle, targetCard.children[1].innerHTML);
        targetCard.parentElement.replaceChild(newCard, targetCard);
        resizeCardInput();
        addEvent($cardAddCancelBtn, [
            () => $cardAddCancelBtn.closest(".column_main").replaceChild(targetCard, newCard)
        ]);
        this.setCardAdditionConfirmListener(cardTitle);
    }
}

const main = new Main();

export {main}