import { pipe } from "../helper/commonFunction.js";
import { ID_DIVISTION_NUMBER } from "../helper/commonVariable.js";
import { columnTemplate, emptyColumnTemplate } from "../template.js";

class Column {
    id;
    name;
    cards;

    getID = () =>  this.id
    getName = () => this.name

    constructor(name = '', card = []) {
        this.id = Math.floor(Math.random() * ID_DIVISTION_NUMBER);
        this.name = name;
        this.cards = card;
    }

    getTemplate = () => pipe(
        () => this.cards.reduce((runningString, $card) => runningString + $card.getTemplate(), ''),
        (allCardTemplate) => columnTemplate(this.name, this.cards.length, allCardTemplate)
    )();
}

const getNewColumnTemplate = () => pipe(
    () => document.createElement("li"),
    ($column) => {
        $column.classList.add("column");
        $column.innerHTML = emptyColumnTemplate;

        return $column;
    }
)();

export {Column, getNewColumnTemplate}