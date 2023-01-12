import {data} from './data/mainData.js'

function setSectionDeleteButton() {
    const sectionDeleteButtons = document.querySelectorAll(".section_delete_button");

    for (let i of sectionDeleteButtons) {
        let sectionID = i.parentElement.parentElement.id;
        i.addEventListener("click", () => {
            data.deleteSection(sectionID);
            data.showMainHTML();
        });
    }
}

function setSectionAddButton() {
    const sectionAddButtons = document.querySelectorAll(".section_add_button");

    for (let i of sectionAddButtons) {
        let sectionID = i.parentElement.parentElement.id;
        i.addEventListener("click", () => {
            data.addBoxHTML(sectionID, 0);
        })
    }
}

export {setSectionDeleteButton, setSectionAddButton}

