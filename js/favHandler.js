import {data} from "./data/mainData.js"

function favHandler() {
    const favButton = document.querySelector("#fav");

    favButton.addEventListener("click", () => {
        data.addColumn();
    });
}

export {favHandler}