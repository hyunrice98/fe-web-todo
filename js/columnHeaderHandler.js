import {data} from './data/mainData.js'

function setColumnDeleteButton() {
    const columnDeleteButtons = document.querySelectorAll(".column_delete_button");

    for (const i of columnDeleteButtons) {
        const columnID = i.closest(".column").id;
        i.addEventListener("click", () => {
            data.deleteColumn(columnID);
            data.showMainHTML();
        });
    }
}

function setColumnAddButton() {
    const columnAddButtons = document.querySelectorAll(".column_add_button");

    for (const i of columnAddButtons) {
        const columnID = i.closest(".column").id;
        i.addEventListener("click", () => {
            data.addCardHTML(columnID);
        })
    }
}

export {setColumnDeleteButton, setColumnAddButton}

