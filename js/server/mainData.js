import {main} from "../data/mainData.js";
import {Column} from "../data/column.js";
import {Card} from "../data/card.js";

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
    mainJSON.forEach((columnJSON) => {
        main.columns.push(parseColumnData(columnJSON));
    });
}

function parseColumnData(columnJSON) {
    let column = new Column();
    column.id = columnJSON['id'];
    column.name = columnJSON['name'];
    column.cards = columnJSON['cards'].map(function (card) {
        let tempCard = new Card();
        tempCard.id = card['id'];
        tempCard.title = card['title'];
        tempCard.main = card['main'];
        tempCard.author = card['author'];
        return tempCard;
    });
    return column;
}

async function patchMainData() {
    for (const column of main.columns) {
        await fetch(HOST + "/data/" + column.id, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(column)
        });
    }
}

async function postColumnData(column) {
    await fetch(HOST + '/data/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(column)
    });
}

async function deleteColumnData(columnID) {
    await fetch(HOST + '/data/' + columnID, {
        method: 'DELETE'
    });
}

export {getMainData, patchMainData, postColumnData, deleteColumnData}