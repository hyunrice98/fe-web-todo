import {data} from "./data/mainData.js"
import {Section} from "./data/section.js";

function favHandler() {
    const favButton = document.querySelector("#fav");

    favButton.addEventListener("click", () => {
        data.addSection();
    });
}

export {favHandler}