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
import { eventToCardEditBtn, hoverEventToCardDeleteBtn } from './button.js';

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
        $columnContent.innerHTML = this.columns.reduce(
            (runningString, column) => runningString + column.getTemplate(), '');
        eventToColumnHeader();
        eventToCardDeleteBtns();
        hoverEventToCardDeleteBtn();
        eventToCardEditBtn();
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

    switchAddCardHTML = (targetCard) => pipe(
        ($newCard) => {
            targetCard.parentElement.replaceChild($newCard, targetCard);
            return $newCard.querySelector("#card_addition_cancel");
        },
        ($cancelBtn) => 
            addEvent($cancelBtn, [() => 
                $cardAddCancelBtn.closest(".column_main").replaceChild(targetCard, newCard)]),
        () => {
            eventToCardAdditionConfirmBtn(cardTitle);
            resizeCardInput();
        }
    )(getCardRegisterNode(targetCard.id, targetCard.querySelector(".card_main_text").innerHTML));
}

const main = new Main();

export {main}