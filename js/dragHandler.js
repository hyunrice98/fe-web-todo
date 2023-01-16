import {data} from "./data/mainData.js";
import {addSidebarBlock} from "./data/sidebarData.js";

function dragHandler() {
    let dragged = null;

    // dragged object transparency injection
    const boxes = document.getElementsByClassName("box");
    [...boxes].forEach((box) => {
        box.addEventListener("dragstart", (event) => {
            dragged = event.target;
            event.target.classList.add("dragging");
        });
        box.addEventListener("dragend", (event) => {
            event.target.classList.remove("dragging");
        });
    });

    // data transfer after drag
    const target = document.getElementsByClassName("section");
    [...target].forEach((section) => {
        section.addEventListener("dragover", (event) => {
            event.preventDefault();
        });
        section.addEventListener("drop", (event) => {
            event.preventDefault();
            if (event.target.className === "section") {
                dragged.parentNode.removeChild(dragged);
                event.target.appendChild(dragged);
            } else return;

            let tempSectionName;
            let tempBox;
            for (const section of data.sections) {
                section.boxes.forEach((box) => {
                    if (box.title === dragged.id) {
                        tempBox = box;
                        tempSectionName = section.name;
                        const index = section.boxes.indexOf(box);
                        section.boxes.splice(index, 1);
                    }
                });
            }

            const targetId = event.target.id;
            data.sections.forEach((section) => {
                if (section.name === targetId) {
                    section.boxes.push(tempBox);
                    addSidebarBlock("jaehyun cho",
                        `<strong>${dragged.id}</strong>를 <strong>${tempSectionName}</strong>에서 <strong>${section.name}</strong>로 이동하였습니다.`
                    );
                }
            });
            data.refreshNumberBox();
        });
    });
}

export {dragHandler}