import { pipe, addEvent } from "../helper/commonFunction.js";
import { ID_DIVISTION_NUMBER } from "../helper/commonVariable.js"
import { cardTemplate, cardRegisterFormTemplate } from "../template.js";

class Card {
    constructor(title, main, author) {
        this.id = Math.floor(Math.random() * ID_DIVISTION_NUMBER);
        this.title = title;
        this.main = main;
        this.author = author;
    }

    getTemplate = () => cardTemplate(this.title, this.main, this.author);
}

const getCardRegisterNode = (title, text) => pipe(
    () => document.createElement("li"),
    ($cardRegisterForm) => {
        $cardRegisterForm.classList.add("card", "card_addtion");
        $cardRegisterForm.innerHTML = cardRegisterFormTemplate(title, text);

        return $cardRegisterForm;
    }
)();

const resizeCardInput = () => pipe(
    () => document.querySelector(".card_addition_text"),
    ($cardInput) => {
        $cardInput.style.height = $cardInput.scrollHeight + "px";
        return $cardInput;
    },
    ($cardInput) => {
        addEvent($cardInput, [
            () => {
                $cardInput.style.height = "";
                $cardInput.style.height = $cardInput.scrollHeight + "px";
            }
        ], "input")
    }
)();

export {Card, getCardRegisterNode, resizeCardInput}