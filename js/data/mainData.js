import {getAddSectionHTML, Section} from './section.js'
import {Box, getAddBoxHTML, resizeTextarea} from './box.js'
import {setBoxDeleteButton} from "../popupHandler.js";
import {setSectionAddButton, setSectionDeleteButton} from "../sectionHeaderHandler.js";
import {dragHandler} from "../dragHandler.js";
import {addSidebarBlock} from "./sidebarData.js"
import {deleteSectionData, patchMainData, postSectionData} from "../server/mainData.js";

class Main {
    constructor(sections = []) {
        this.sections = sections
    }

    replaceSection(originalSectionName, newSectionName) {
        this.sections.forEach((section) => {
            if (section.name === originalSectionName) {
                section.name = newSectionName;
            }
        });
    }

    replaceBoxWithTitle(boxTitle, newBox) {
        this.sections.forEach((section) => {
            section.boxes.forEach((box, i) => {
                if (box.title === boxTitle) {
                    section.boxes[i] = newBox;
                }
            })
        })
    }

    showMainHTML() {
        const main = document.querySelector("#section_holder");
        main.innerHTML = this.sections.reduce((acc, section) => acc + section.getSectionHTML(), '');

        this.modifySectionHeaderTextListener();
        setBoxDeleteButton();
        this.setBoxDeleteButtonHover();
        this.setBoxEditButtonListener();
        setSectionAddButton();
        setSectionDeleteButton();
        dragHandler();
        console.log(data);
    }

    modifySectionHeaderTextListener() {
        const sectionHeaderTexts = document.querySelectorAll(".section_header_text");

        [...sectionHeaderTexts].forEach((sectionHeaderText) => {
            sectionHeaderText.addEventListener("dblclick", () => {
                const originalSectionHeader = sectionHeaderText.parentElement;
                const newSectionHeader = document.createElement("div");
                newSectionHeader.className = "section_header";
                newSectionHeader.innerHTML = `
                    <input type="text" class="section_header_text_input section_header_text" placeholder="섹션 제목을 입력하세요"
                     value="${originalSectionHeader.parentElement.id ?? ''}"
                     >
                    <span class="material-symbols-outlined section_confirm_button">check</span>
                `;

                originalSectionHeader.parentElement.replaceChild(newSectionHeader, originalSectionHeader);

                document.querySelector(".section_confirm_button").addEventListener("click", () => {
                    this.replaceSection(newSectionHeader.parentElement.id, newSectionHeader.children[0].value);
                    patchMainData();
                    this.showMainHTML();
                });
            });
        });
    }

    refreshNumberBox() {
        const sectionHTMLHeaders = document.getElementsByClassName("number_box");
        this.sections.forEach((section) => {
            for (const numberBox of sectionHTMLHeaders) {
                if (numberBox.id === section.name) {
                    numberBox.innerHTML = section.boxes.length;
                }
            }
        });
    }

    deleteBox(boxId) {
        this.sections.forEach((section) => {
            section.boxes.forEach((box) => {
                if (box.title === boxId) {
                    const index = section.boxes.indexOf(box);
                    section.boxes.splice(index, 1);
                    patchMainData();
                }
            });
        });
        this.showMainHTML();
    }

    addBoxHTML(sectionId) {
        console.log(document.querySelectorAll(`#${sectionId} > .section_main`));
        const sectionMain = document.querySelectorAll(`#${sectionId} > .section_main`)[0];
        this.newAddBoxHTML(sectionMain);
    }

    newAddBoxHTML(section) {
        section.prepend(getAddBoxHTML());
        resizeTextarea();
        this.setBoxAdditionCancelListener();
        this.setBoxAdditionConfirmListener();
    }

    setBoxAdditionCancelListener() {
        const boxCancelButton = document.querySelector("#box_addition_cancel");
        boxCancelButton.addEventListener("click", () => {
            const section = boxCancelButton.closest(".section_main")
            section.removeChild(section.firstChild);
        });
    }

    setBoxAdditionConfirmListener(boxTitle = '') {
        const boxConfirmButton = document.querySelector("#box_addition_confirm");
        boxConfirmButton.addEventListener("click", () => {
            const title = document.getElementsByClassName("box_addition_title")[0].value;
            const main = document.getElementsByClassName("box_addition_text")[0].value;
            const author = "jaehyun cho";

            if (title === '' || main === '') {
                return;
            }

            const section_id = boxConfirmButton.closest(".section").id;
            this.sections.forEach((section) => {
                if (section.name === section_id) {
                    if (boxTitle !== '') {
                        this.replaceBoxWithTitle(boxTitle, new Box(title, main, author));
                        patchMainData();
                        addSidebarBlock("jaehyun cho",
                            `<strong>${section.name}</strong>의 <strong>${title}</strong>를 수정하였습니다.`
                        );
                    } else {
                        section.boxes.unshift(new Box(title, main, author));
                        patchMainData();
                        addSidebarBlock("jaehyun cho",
                            `<strong>${section.name}</strong>에 <strong>${title}</strong>를 등록하였습니다.`
                        );
                    }
                }
            });
            this.showMainHTML();
        });
    }

    deleteSection(sectionId) {
        this.sections.forEach((section) => {
            if (section.name === sectionId) {
                const index = data.sections.indexOf(section);
                const sectionID = data.sections[index].id;
                deleteSectionData(sectionID);
                data.sections.splice(index, 1);
                addSidebarBlock("jaehyun cho",
                    `<strong>${section.name}</strong> 칼럼을 삭제하였습니다.`
                );
            }
        })
    }

    addSection() {
        const sectionHolder = document.querySelector("#section_holder");
        sectionHolder.appendChild(getAddSectionHTML());
        this.addSectionConfirmController();
    }

    addSectionConfirmController() {
        const sectionConfirmButton = document.querySelector(".section_confirm_button");
        sectionConfirmButton.addEventListener("click", () => {
            const sectionName = sectionConfirmButton.previousElementSibling.value;
            if (sectionName === '') return;
            const newSection = new Section(sectionName, []);
            this.sections.push(newSection);
            postSectionData(newSection);
            addSidebarBlock("jaehyun cho",
                `<strong>${sectionName}</strong> 칼럼을 등록하였습니다.`
            );
            this.showMainHTML();
        });
    }

    setBoxDeleteButtonHover() {
        const deleteButtons = document.querySelectorAll(".box_delete_button");
        deleteButtons.forEach((button) => {
            const targetBox = button.closest(".box");
            button.addEventListener("mouseover", () => {
                targetBox.style.outline = "solid #FF4343";
                targetBox.style.backgroundColor = "#FFEEEC";
            });
            button.addEventListener("mouseout", () => {
                targetBox.style.outline = "none";
                targetBox.style.backgroundColor = "#FFFFFF";
            });
        })
    }

    setBoxEditButtonListener() {
        const modifyButtons = document.querySelectorAll(".box_edit_button");
        modifyButtons.forEach((button) => {
            button.addEventListener("click", () => {
                const targetBox = button.closest(".box");
                this.switchAddBoxHTML(targetBox);
            });
            button.addEventListener("mouseover", () => {
                button.style.color = "#0075DE";
            });
            button.addEventListener("mouseout", () => {
                button.style.color = "#000000";
            });
        });
    }

    switchAddBoxHTML(targetBox) {
        const newBox = getAddBoxHTML(targetBox.id, targetBox.children[1].innerHTML);
        targetBox.parentElement.replaceChild(newBox, targetBox);
        resizeTextarea();
        const boxTitle = targetBox.id
        const cancelAddBoxButton = document.querySelector("#box_addition_cancel");
        cancelAddBoxButton.addEventListener("click", () => {
            cancelAddBoxButton.closest(".section_main").replaceChild(targetBox, newBox);
        });

        this.setBoxAdditionConfirmListener(boxTitle);
    }
}

let data = new Main();

export {data, Main}