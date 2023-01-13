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

    showMainHTML() {
        const main = document.getElementById("section_holder")

        let html = "";
        for (let section of this.sections) {
            html += section.getSectionHTML();
        }

        main.innerHTML = html;
        setBoxDeleteButton();
        this.setBoxDeleteButtonHover();
        setSectionAddButton();
        setSectionDeleteButton();
        dragHandler();
    }

    refreshNumberBox() {
        const sectionHTMLHeaders = document.getElementsByClassName("number_box");
        for (let section of this.sections) {
            for (let numberBox of sectionHTMLHeaders) {
                if (numberBox.id === section.name) {
                    numberBox.innerHTML = section.boxes.length;
                }
            }
        }
    }

    // TODO: DELETE box
    deleteBox(boxId) {
        for (let section of this.sections) {
            for (let box of section.boxes) {
                if (box.title === boxId) {
                    let index = section.boxes.indexOf(box);
                    section.boxes.splice(index, 1);
                }
            }
        }
        this.showMainHTML();
    }

    addBoxHTML(sectionId, index) {
        const sectionMain = document.getElementById(sectionId).querySelector(".section_main");
        if (index === 0) {
            this.newAddBoxHTML(sectionMain);
        } else {
            // this.switchAddBoxHTML(sectionMain, index);
        }
    }

    newAddBoxHTML(section) {
        section.prepend(getAddBoxHTML());
        this.setBoxAdditionCancelListener();
        this.setBoxAdditionConfirmListener();
    }

    setBoxAdditionCancelListener() {
        let boxCancelButton = document.getElementById("box_addition_cancel");
        boxCancelButton.addEventListener("click", () => {
            let section = boxCancelButton.parentElement.parentElement.parentElement;
            section.removeChild(section.firstChild);
        });
    }

    setBoxAdditionConfirmListener() {
        let boxConfirmButton = document.getElementById("box_addition_confirm");
        boxConfirmButton.addEventListener("click", () => {
            let title = document.getElementsByClassName("box_addition_title")[0].value;
            let main = document.getElementsByClassName("box_addition_text")[0].value;
            let author = "jaehyun cho";
            let section_id = boxConfirmButton.parentElement.parentElement.parentElement.parentElement.id;
            for (let section of this.sections) {
                if (section.name === section_id) {
                    section.boxes.unshift(new Box(title, main, author));
                    addSidebarBlock("jaehyun cho<strong>", section.name + "</strong>에 <strong>" + title + "</strong>를 등록하였습니다.");
                }
            }
            this.showMainHTML();
        });
    }

    // MARK: Double click to modify might not be needed
    // switchAddBoxHTML(section, index) {
    //     let a = getAddBoxHTML();
    // }

    deleteSection(sectionId) {
        for (let section of this.sections) {
            if (section.name === sectionId) {
                let index = data.sections.indexOf(section);
                data.sections.splice(index, 1);
                addSidebarBlock("jaehyun cho", "<strong>" + section.name + "</strong> 칼럼을 삭제하였습니다.");
            }
        }
    }

    // TODO: ADD section
    addSection() {
        let sectionHolder = document.getElementById('section_holder');
        sectionHolder.appendChild(getAddSectionHTML());
        this.addSectionConfirmController();
    }

    addSectionConfirmController() {
        let sectionConfirmButton = document.querySelector(".section_confirm_button");
        sectionConfirmButton.addEventListener("click", () => {
            let sectionName = sectionConfirmButton.previousElementSibling.value;
            let newSection = new Section(sectionName, []);
            this.sections.push(newSection);
            addSidebarBlock("jaehyun cho", "<strong>" + sectionName + "</strong> 칼럼을 등록하였습니다.");
            this.showMainHTML()
        });
    }

    setBoxDeleteButtonHover() {
        const deleteButtons = document.querySelectorAll(".box_delete_button");
        for (let button of deleteButtons) {
            button.addEventListener("mouseover", () => {
                button.parentElement.parentElement.style.border = "solid #FF4343";
                button.parentElement.parentElement.style.backgroundColor = "#FFEEEC";
            });
            button.addEventListener("mouseout", () => {
                button.parentElement.parentElement.style.border = "none";
                button.parentElement.parentElement.style.backgroundColor = "#FFFFFF";
            });
        }
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