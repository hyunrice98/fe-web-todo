import { pipe, addEvent } from "../helper/commonFunction.js";
import { ID_DIVISTION_NUMBER } from "../helper/commonVariable.js"

class Card {
    constructor(title, main, author) {
        this.id = Math.floor(Math.random() * ID_DIVISTION_NUMBER);
        this.title = title;
        this.main = main;
        this.author = author;
    }

    getTemplate = () => `
        <li class="card" id="${this.title}" draggable="true">
            <div class="card_title" id="${this.title}">
                <p class="card_title_text">${this.title}</p>
                <span class="material-symbols-outlined card_delete_button">close</span>
                <span class="material-symbols-outlined card_edit_button">edit</span>
            </div>
            <p class="card_main_text">${this.main}</p>
            <p class="card_author_text"> author by ${this.author} </p>
        </li>
    `;
}

const getCardRegisterTemplate = (title, text) => pipe(
    () => document.createElement("li"),
    ($cardRegisterForm) => {
        $cardRegisterForm.classList.add("card", "card_addtion");
        $cardRegisterForm.innerHTML = `
            <label>
                <input class="card_title_text card_addition_title" placeholder="제목을 입력하세요" type="text" value="${title ?? ''}">
            </label>
            <label>
                <textarea class="card_main_text card_addition_text" placeholder="내용을 입력하세요" rows="1">${text ?? ''}</textarea>
            </label>
            <div class="button_container">
                <button class="grey_button" id="card_addition_cancel">취소</button>
                <button class="blue_button" id="card_addition_confirm">등록</button>
            </div>
            `

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

export {Card, getCardRegisterTemplate, resizeCardInput}