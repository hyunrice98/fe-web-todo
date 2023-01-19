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
}

function parseSectionData(sectionJSON) {
    let section = new Section();
    section.id = sectionJSON['id'];
    section.name = sectionJSON['name'];
    section.boxes = sectionJSON['boxes'].map(function (box) {
        let b = new Box();
        b.id = box['id'];
        b.title = box['title'];
        b.main = box['main'];
        b.author = box['author'];
        return b;
    });
    return section;
}

async function patchMainData() {
    for (const section of data.sections) {
        await fetch(HOST + "/data/" + section.id, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(section)
        });
    }
}

async function postSectionData(section) {
    await fetch(HOST + '/data/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(section)
    });
}

async function deleteSectionData(sectionID) {
    await fetch(HOST + '/data/' + sectionID, {
        method: 'DELETE'
    });
}

export {getMainData, patchMainData, postSectionData, deleteSectionData}