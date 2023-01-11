import {data} from './data/mainData.js'

function setSectionDeleteButton() {
    const sectionDeleteButtons = document.querySelectorAll(".section_delete_button")

    for (let i of sectionDeleteButtons) {
        let sectionID = i.parentElement.parentElement.id;
        i.addEventListener("click", () => {
            data.deleteSection(sectionID);
            data.showMainHTML();
            console.log(data);
        });
    }
}

export {setSectionDeleteButton}

