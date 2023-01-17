import {data} from './data/mainData.js'

function setSectionDeleteButton() {
    const sectionDeleteButtons = document.querySelectorAll(".section_delete_button");

    for (const i of sectionDeleteButtons) {
        const sectionID = i.closest(".section").id;
        i.addEventListener("click", () => {
            data.deleteSection(sectionID);
            data.showMainHTML();
        });
    }
}

function setSectionAddButton() {
    const sectionAddButtons = document.querySelectorAll(".section_add_button");

    for (const i of sectionAddButtons) {
        const sectionID = i.closest(".section").id;
        i.addEventListener("click", () => {
            data.addBoxHTML(sectionID);
        })
    }
}

export {setSectionDeleteButton, setSectionAddButton}

