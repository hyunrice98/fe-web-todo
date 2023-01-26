import { getNewColumnTemplate } from "./data/column.js";
import { main } from "./data/mainData.js";
import { addEvent, pipe } from "./helper/commonFunction.js";

const addColumn = () => pipe(
    ($columnHolder) => $columnHolder.appendChild(getNewColumnTemplate()),
    () => main.addColumnConfirmController()
)(document.querySelector("#column_holder"));

const favHandler = () => pipe(
    ($favBtn) => addEvent($favBtn, [addColumn])
)(document.querySelector("#fav"));

export {favHandler}