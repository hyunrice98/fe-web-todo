import { main } from './data/mainData.js'
import { addEvent, pipe } from './helperFunction/common.js';

function eventToColumnDeleteBtns() {
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

function eventToColumnAddBtns() {
    const columnAddBtnArray = document.querySelectorAll(".column_add_button");

    for(const $btn of columnAddBtnArray) {
        const $column = $btn.closest(".column");
        const columnID = $column.id;

        addEvent($btn, [
            () => main.addCardHTML(columnID)
        ])
    }
}

const eventToColumnBtns = () => pipe(
    eventToColumnDeleteBtns,
    eventToColumnAddBtns,
)()

export { eventToColumnBtns }

