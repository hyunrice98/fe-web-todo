import {main} from './data/mainData.js'
import { addEvent } from './helperFunction/common.js';

function setColumnDeleteButton() {
    const columnDeleteBtnArray = document.querySelectorAll(".column_delete_button");

    for(const $btn of columnDeleteBtnArray) {
        const $column = $btn.closest(".column");
        const columnID = $column.id;

        addEvent($btn, [
            () => main.deleteColumn(columnID),
            () => main.showMainHTML()
        ])
    }
}

function setColumnAddButton() {
    const columnAddBtnArray = document.querySelectorAll(".column_add_button");

    for(const $btn of columnAddBtnArray) {
        const $column = $btn.closest(".column");
        const columnID = $column.id;

        addEvent($btn, [
            () => main.addCardHTML(columnID)
        ])
    }
}

export {setColumnDeleteButton, setColumnAddButton}

