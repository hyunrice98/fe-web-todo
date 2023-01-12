import {data} from "./data/mainData.js";

function dragHandler() {
    let dragged = null;

    // dragged object transparency injection
    const source = document.getElementsByClassName("box");
    for (let b of source) {
        b.addEventListener("dragstart", (event) => {
            dragged = event.target;
            event.target.classList.add("dragging");
        });
        b.addEventListener("dragend", event => {
            event.target.classList.remove("dragging");
        });
    }

    // data transfer after drag
    const target = document.getElementsByClassName("section");
    for (let s of target) {
        s.addEventListener("dragover", (event) => {
            event.preventDefault();
        });
        s.addEventListener("drop", (event) => {
            event.preventDefault();
            if (event.target.className === "section") {
                dragged.parentNode.removeChild(dragged);
                event.target.appendChild(dragged);
            } else {
                return
            }

            let tempBox;
            for (let section of data.sections) {
                for (let box of section.boxes) {
                    if (box.title === dragged.id) {
                        tempBox = box;
                        let index = section.boxes.indexOf(box);
                        section.boxes.splice(index, 1);
                    }
                }
            }

            let targetId = event.target.id;
            for (let section of data.sections) {
                if (section.name === targetId) {
                    section.boxes.push(tempBox);
                }
            }
            data.refreshNumberBox();
        });
    }
}

export {dragHandler}