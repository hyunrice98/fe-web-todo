import {getAddSectionHTML, Section} from './section.js'
import {Box, getAddBoxHTML} from './box.js'
import {setBoxDeleteButton} from "../popupHandler.js";
import {setSectionAddButton, setSectionDeleteButton} from "../sectionHeaderHandler.js";
import {dragHandler} from "../dragHandler.js";
import {addSidebarBlock} from "./sidebarData.js"

class Main {
    constructor(sections) {
        this.sections = sections
    }

    replaceSection(originalSectionName, newSectionName) {
        this.sections.forEach((section) => {
            if (section.name === originalSectionName) {
                section.name = newSectionName;
            }
        });
    }

    replaceBox(originalBoxTitle, newBox) {
        this.sections.forEach((section) => {
            section.boxes.forEach((box) => {
                if (box.title === originalBoxTitle) {
                    box = newBox;
                }
            })
        })
    }

    deleteBoxWithTitle(boxTitle) {
        this.sections.forEach((section) => {
            section.boxes.forEach((box, i) => {
                if (box.title === boxTitle) {
                    section.boxes.splice(i, 1);
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
                }
            });
        });
        this.showMainHTML();
    }

    addBoxHTML(sectionId) {
        const sectionMain = document.querySelectorAll(`.${sectionId}, .section_main`)[0];
        this.newAddBoxHTML(sectionMain);
    }

    newAddBoxHTML(section) {
        section.prepend(getAddBoxHTML());
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
                        this.deleteBoxWithTitle(boxTitle);
                    }
                    section.boxes.unshift(new Box(title, main, author));
                    addSidebarBlock("jaehyun cho",
                        `<strong>${section.name}</strong>에 <strong>${title}</strong>를 등록하였습니다.`
                    );
                }
            });
            this.showMainHTML();
        });
    }

    deleteSection(sectionId) {
        this.sections.forEach((section) => {
            if (section.name === sectionId) {
                const index = data.sections.indexOf(section);
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
            addSidebarBlock("jaehyun cho",
                `<strong>${sectionName}</strong> 칼럼을 등록하였습니다.`
            );
            this.showMainHTML()
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
        const boxTitle = targetBox.id
        const cancelAddBoxButton = document.querySelector("#box_addition_cancel");
        cancelAddBoxButton.addEventListener("click", () => {
            cancelAddBoxButton.closest(".section_main").replaceChild(targetBox, newBox);
        });

        this.setBoxAdditionConfirmListener(boxTitle);
    }
}

let data = new Main(
    [
        new Section('해야할 일', [
            new Box('Github 공부하기', 'add, commit, push', 'web'),
            new Box('블로그에 포스팅할 것', '*Github 공부내용 *모던 자바스크립트 1장 공부내용', 'web')
        ]),
        new Section('하고 있는 일', []),
        new Section('완료한 일', [
            new Box('제목제목', '내용내용내용', '작가')
        ])
    ]
);

export {data, Main}