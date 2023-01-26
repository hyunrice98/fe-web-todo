import {main} from "../data/mainData.js";
import {Column} from "../data/column.js";
import {Card} from "../data/card.js";
import { pipe } from "../helper/commonFunction.js";
import { HEADER, HOST, METHOD } from "../helper/commonVariable.js";

async function getMainData() {
    await fetch(HOST + "/data", {method: METHOD.GET})
        .then((response) => response.json())
        .then((mainJSON) => parseMainData(mainJSON))
        .catch((error) => console.log(error));
}

const parseMainData = (mainJSON) =>
    mainJSON.forEach((columnJSON) => main.columns.push(parseColumnData(columnJSON)));

const parseColumnData = (columnJSON) => pipe(
    (newColumn) => {
        newColumn.id = columnJSON['id'];
        newColumn.name = columnJSON['name'];
        newColumn.cards = columnJSON['cards']

        .map((card) => pipe(
                (newCard) => {
                    newCard.id = card['id'];
                    newCard.title = card['title'];
                    newCard.main = card['main'];
                    newCard.author = card['author'];

                    return newCard
                }
            )(new Card())
        );

        return newColumn;
    }
)(new Column());

async function patchMainData() {
    for (const column of main.columns) {
        await fetch(HOST + "/data/" + column.id, {
            method: METHOD.PATCH,
            headers: HEADER.PATCH,
            body: JSON.stringify(column)
        });
    }
}

async function postColumnData(column) {
    await fetch(HOST + '/data/', {
        method: METHOD.POST,
        headers: HEADER.POST,
        body: JSON.stringify(column)
    });
}

const deleteColumnData = async (columnID) => 
    await fetch(HOST + '/data/' + columnID, {method: METHOD.DELETE});

export {getMainData, patchMainData, postColumnData, deleteColumnData}