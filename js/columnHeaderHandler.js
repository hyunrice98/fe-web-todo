import { main } from './data/mainData.js'
import { addEvent, pipe } from './helper/commonFunction.js';

const eventToColumnDeleteBtns = pipe(
    ($btnArray) => $btnArray.forEach(($btn) => {
        const $column = $btn.closest(".column");
        const columnID = $column.id;

        addEvent($btn, [
            () => main.deleteColumn(columnID),
            () => main.showMainHTML()
        ])
    })
)(document.querySelectorAll(".column_delete_button"));

const eventToColumnAddBtns = () => pipe(
    ($btnArray) => $btnArray.forEach(($btn) => {
        const $column = $btn.closest(".column");
        const columnID = $column.id;
        addEvent($btn, [() => main.addCardHTML(columnID)]);
    })
)(document.querySelectorAll(".column_add_button"));

const eventToColumnBtns = () => pipe(
    eventToColumnDeleteBtns,
    eventToColumnAddBtns,
)()

export { eventToColumnBtns }

