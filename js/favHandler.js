import {main} from "./data/mainData.js"

function favHandler() {
    const favButton = document.querySelector("#fav");

    favButton.addEventListener("click", () => {
        main.addColumn();
    });
}

export {favHandler}