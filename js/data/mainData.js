import {Column, createCardRegisterForm, eventToColumnHeader} from './column.js'
import {Card, getCardRegisterNode, resizeCardInput} from './card.js'
import { eventToCardDeleteBtns } from "../popupHandler.js";
import { eventToColumnBtns } from "../columnHeaderHandler.js";
import {dragHandler} from "../dragHandler.js";
import {addSidebarBlock} from "./sidebarData.js"
import {deleteColumnData, patchMainData, postColumnData} from "../server/mainData.js";
import { addEvent, pipe } from '../helper/commonFunction.js';
import { 
    menuAddTemplate, menuDeleteColumnTemplate, menuUpdateTemplate, menuAddColumnTemplate 
} from '../template.js';

NodeList.prototype.forEach = Array.prototype.forEach;
const $columnContent = document.querySelector("#column_holder");

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
        $columnContent.innerHTML = this.columns
        .reduce((runningString, column) => runningString + column.getTemplate(), '');
        eventToColumnHeader();
        eventToCardDeleteBtns();
        this.hoverEventToCardDeleteBtn();
        this.eventToCardEditBtn();
        eventToColumnBtns();
        dragHandler();
    }

    updateColumnLength = () => this.columns.forEach((column) => {
        const $column = document.getElementById(`${column.name}`);
        const $numberCircle = $column.getElementsByClassName("number_circle")[0];
        $numberCircle.innerHTML = column.cards.length;
    });

    deleteCard(cardID) {
        this.columns.forEach((column) => {
            column.cards.forEach((card, index) => {
                if (card.title === cardID) 
                    column.cards.splice(index, 1);
            });
        });
        patchMainData();
        this.showMainHTML();
    }

    addCardHTML = (columnID) => pipe(
        ($column) => $column.querySelector(".column_main"),
        ($columnMain) => createCardRegisterForm($columnMain)
    )(document.getElementById(columnID));

    eventToCardAdditonCancelBtn = () => pipe(
        ($cardCancelBtn) => 
            addEvent($cardCancelBtn, [() => {
                const column = $cardCancelBtn.closest(".column_main")
                column.removeChild(column.firstChild);
            }
        ])
    )(document.querySelector("#card_addition_cancel"));

    eventToCardAdditionConfirmBtn = () => pipe(
        ($confirmBtn) => addEvent($confirmBtn, [
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

    deleteColumn = (columnID) => pipe(
        () => this.columns.find((column) => column.name == columnID),
        (column) => {
            addSidebarBlock(menuDeleteColumnTemplate(column.name));
            return main.columns.indexOf(column);
        },
        (index) => {
            const columnID = main.columns[index].id;
            main.columns.splice(index, 1);

            return columnID;
        },
        (columnId) => deleteColumnData(columnId)
    )();

    addColumnConfirmController = () => pipe(
        ($columnConfirmBtn) => addEvent($columnConfirmBtn, [
            () => {
                const columnName = $columnConfirmBtn.previousElementSibling.value;
                if (columnName === '') return;
                const newColumn = new Column(columnName, []);
                this.columns.push(newColumn);
                postColumnData(newColumn);
                addSidebarBlock(menuAddColumnTemplate(columnName));
                this.showMainHTML();
            }
        ])
    )(document.querySelector(".column_confirm_button"));

    hoverEventToCardDeleteBtn() {
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

    eventToCardEditBtn() {
        const $modifyBtns = document.querySelectorAll(".card_edit_button");
        $modifyBtns.forEach(($btn) => {
            addEvent($btn, [() => this.switchAddCardHTML($btn.closest(".card"))]);
            addEvent($btn, [() => $btn.style.color = "#0075DE"], "mouseover");
            addEvent($btn, [() => $btn.style.color = "#000000"], "mouseout");
        });
    }

    switchAddCardHTML = (targetCard) => pipe(
        ($newCard) => {
            targetCard.parentElement.replaceChild($newCard, targetCard);
            return $newCard.querySelector("#card_addition_cancel");
        },
        ($cancelBtn) => 
            addEvent($cancelBtn, [() => 
                $cardAddCancelBtn.closest(".column_main").replaceChild(targetCard, newCard)]),
        () => {
            this.eventToCardAdditionConfirmBtn(cardTitle);
            resizeCardInput();
        }
    )(getCardRegisterNode(targetCard.id, targetCard.querySelector(".card_main_text").innerHTML));
}

const main = new Main();

export {main}