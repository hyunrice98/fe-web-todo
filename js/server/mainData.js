import {data} from "../data/mainData.js";
import {Section} from "../data/section.js";
import {Box} from "../data/box.js";

const HOST = "http://localhost:3000";

async function getMainData() {
    await fetch(HOST + "/data", {method: 'GET'})
        .then((response) => {
            return response.json();
        }).then((mainJSON) => {
            parseMainData(mainJSON);
        }).catch((error) => console.log(error));
}

function parseMainData(mainJSON) {
    mainJSON.forEach((sectionJSON) => {
        data.sections.push(parseSectionData(sectionJSON));
    });
    console.log(data);
}

function parseSectionData(sectionJSON) {
    let section = new Section()
    section.name = sectionJSON['name'];
    section.boxes = sectionJSON['boxes'].map(function (box) {
        let b = new Box();
        b.title = box['title'];
        b.main = box['main'];
        b.author = box['author'];
        return b;
    });
    return section;
}

async function uploadBox(sectionIndex, box) {
    console.log(JSON.stringify(box));
    await fetch(`${HOST}/data/${sectionIndex}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(box)
    });
}

async function patchMainData() {
    await fetch(HOST + "/data", {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
    JSON.stringify(data);
}

export {getMainData, patchMainData}