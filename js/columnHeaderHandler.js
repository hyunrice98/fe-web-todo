import {main} from './data/mainData.js'

function setColumnDeleteButton() {
    const columnDeleteButtons = document.querySelectorAll(".column_delete_button");

    for (const i of columnDeleteButtons) {
        const columnID = i.closest(".column").id;
        i.addEventListener("click", () => {
            main.deleteColumn(columnID);
            main.showMainHTML();
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

