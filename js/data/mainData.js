import {Section} from './section.js'
import {Box, getAddBoxHTML} from './box.js'
import {setBoxDeleteButton} from "../popupHandler.js";
import {setSectionDeleteButton} from "../sectionHeaderHandler.js";

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
        setSectionDeleteButton();
    }

    deleteBox(boxId) {
        for (let section of this.sections) {
            for (let box of section.box) {
                if (box.title === boxId) {
                    let index = section.box.indexOf(box);
                    section.box.splice(index, 1);
                }
            }
        }
        this.showMainHTML();
    }

    addBoxHTML(sectionId, index) {
        const sectionMain = document.getElementById(sectionId).querySelector(".section_main");
        if (index === 0) {
            console.log(sectionMain.id);
            this.newAddBoxHTML(sectionMain);
        } else {
            // this.switchAddBoxHTML(sectionMain, index);
        }
    }

    newAddBoxHTML(section) {
        section.prepend(getAddBoxHTML());
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
            }
        }
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