import {getNewColumnTemplate, Column} from './column.js'
import {Card, getCardRegisterTemplate, resizeCardInput} from './card.js'
import {setCardDeleteButton} from "../popupHandler.js";
import { eventToColumnBtns } from "../columnHeaderHandler.js";
import {dragHandler} from "../dragHandler.js";
import {addSidebarBlock} from "./sidebarData.js"
import {deleteColumnData, patchMainData, postColumnData} from "../server/mainData.js";

class Main {
    constructor(columns = []) {
        this.columns = columns
    }

    replaceColumn(prevName, newName) {
        for(const $column of this.columns) {
            if($column.name === prevName) {
                $column.name = newName;
            }
        }
    }

    replaceCardWithTitle(cardTitle, $newCard) {
        for(const $column of this.columns) {
            for(const [$card, index] of $column.cards.entries()) {
                console.log($card, index);
                if($card.title === cardTitle) {
                    $column.cards[index] = $newCard;
                }
            }
        }

        this.columns.forEach((column) => {
            column.cards.forEach((card, index) => {
                if (card.title === cardTitle) {
                    column.cards[index] = $newCard;
                }
            });
        });
    }

    showMainHTML() {
        const main = document.querySelector("#column_holder");
        main.innerHTML = this.columns.reduce((acc, column) => acc + column.getTemplate(), '');

        this.modifyColumnHeaderTextListener();
        setCardDeleteButton();
        this.setCardDeleteButtonHover();
        this.setCardEditButtonListener();
        eventToColumnBtns();
        dragHandler();
    }

    modifyColumnHeaderTextListener() {
        const columnHeaderTexts = document.querySelectorAll(".column_header_text");

        [...columnHeaderTexts].forEach((columnHeaderText) => {
            columnHeaderText.addEventListener("dblclick", () => {
                const originalColumnHeader = columnHeaderText.parentElement;
                const newColumnHeader = document.createElement("div");
                newColumnHeader.className = "column_header";
                newColumnHeader.innerHTML = `
                    <input type="text" class="column_header_text_input column_header_text" placeholder="섹션 제목을 입력하세요"
                     value="${originalColumnHeader.parentElement.id ?? ''}"
                     >
                    <span class="material-symbols-outlined column_confirm_button">check</span>
                `;

                originalColumnHeader.parentElement.replaceChild(newColumnHeader, originalColumnHeader);

                document.querySelector(".column_confirm_button").addEventListener("click", () => {
                    this.replaceColumn(newColumnHeader.parentElement.id, newColumnHeader.children[0].value);
                    patchMainData();
                    this.showMainHTML();
                });
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

    addCardHTML(columnId) {
        const $column = document.getElementById(columnId);
        const $columnMain = $column.querySelector(".column_main");
        this.newAddCardHTML($columnMain);
    }

    newAddCardHTML(column) {
        column.prepend(getCardRegisterTemplate());
        resizeCardInput();
        this.setCardAdditionCancelListener();
        this.setCardAdditionConfirmListener();
    }

    setCardAdditionCancelListener() {
        const cardCancelButton = document.querySelector("#card_addition_cancel");
        cardCancelButton.addEventListener("click", () => {
            const column = cardCancelButton.closest(".column_main")
            column.removeChild(column.firstChild);
        });
    }

    setCardAdditionConfirmListener(cardTitle = '') {
        const cardConfirmButton = document.querySelector("#card_addition_confirm");
        cardConfirmButton.addEventListener("click", () => {
            const title = document.getElementsByClassName("card_addition_title")[0].value;
            const main = document.getElementsByClassName("card_addition_text")[0].value;
            const author = "jaehyun cho";

            if (title === '' || main === '') {
                return;
            }

            const column_id = cardConfirmButton.closest(".column").id;
            this.columns.forEach((column) => {
                if (column.name === column_id) {
                    if (cardTitle !== '') {
                        this.replaceCardWithTitle(cardTitle, new Card(title, main, author));
                        patchMainData();
                        addSidebarBlock(`<strong>${column.name}</strong>의 <strong>${title}</strong>를 수정하였습니다.`);
                    } else {
                        column.cards.unshift(new Card(title, main, author));
                        patchMainData();
                        addSidebarBlock(`<strong>${column.name}</strong>에 <strong>${title}</strong>를 등록하였습니다.`);
                    }
                }
            });
            this.showMainHTML();
        });
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

    addColumn() {
        const columnHolder = document.querySelector("#column_holder");
        columnHolder.appendChild(getNewColumnTemplate());
        this.addColumnConfirmController();
    }

    addColumnConfirmController() {
        const columnConfirmButton = document.querySelector(".column_confirm_button");
        columnConfirmButton.addEventListener("click", () => {
            const columnName = columnConfirmButton.previousElementSibling.value;
            if (columnName === '') return;
            const newColumn = new Column(columnName, []);
            this.columns.push(newColumn);
            postColumnData(newColumn);
            addSidebarBlock(`<strong>${columnName}</strong> 칼럼을 등록하였습니다.`);
            this.showMainHTML();
        });
    }

    setCardDeleteButtonHover() {
        const deleteButtons = document.querySelectorAll(".card_delete_button");
        deleteButtons.forEach((button) => {
            const targetCard = button.closest(".card");
            button.addEventListener("mouseover", () => {
                targetCard.style.outline = "solid #FF4343";
                targetCard.style.backgroundColor = "#FFEEEC";
            });
            button.addEventListener("mouseout", () => {
                targetCard.style.outline = "none";
                targetCard.style.backgroundColor = "#FFFFFF";
            });
        });
    }

    setCardEditButtonListener() {
        const modifyButtons = document.querySelectorAll(".card_edit_button");
        modifyButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const targetCard = button.closest(".card");
                this.switchAddCardHTML(targetCard);
            });
            button.addEventListener("mouseover", () => {
                button.style.color = "#0075DE";
            });
            button.addEventListener("mouseout", () => {
                button.style.color = "#000000";
            });
        });
    }

    switchAddCardHTML(targetCard) {
        const newCard = getCardRegisterTemplate(targetCard.id, targetCard.children[1].innerHTML);
        targetCard.parentElement.replaceChild(newCard, targetCard);
        resizeCardInput();
        const cardTitle = targetCard.id;
        const cancelAddCardButton = document.querySelector("#card_addition_cancel");
        cancelAddCardButton.addEventListener("click", () => {
            cancelAddCardButton.closest(".column_main").replaceChild(targetCard, newCard);
        });
        this.setCardAdditionConfirmListener(cardTitle);
    }
}

const main = new Main();

export {main}