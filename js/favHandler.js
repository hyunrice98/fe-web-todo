import {main} from "./data/mainData.js"
import { addEvent, pipe } from "./helper/commonFunction.js";

const favHandler = () => pipe(
    ($favBtn) => addEvent($favBtn, [main.addColumn])
)(document.querySelector("#fav"));

export {favHandler}