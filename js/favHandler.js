import {main} from "./data/mainData.js"
import { addEvent, pipe } from "./helperFunction/common.js";

const favHandler = () => pipe(
    ($favBtn) => addEvent($favBtn, [() => main.addColumn()])
)(document.querySelector("#fav"));

export {favHandler}