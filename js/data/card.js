class Card {
    constructor(title, main, author) {
        this.id = Math.floor(Math.random() * 1000000000);
        this.title = title
        this.main = main
        this.author = author
    }

    getCardHTML() {
        return `
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
}

function getAddCardHTML(title, text) {
    const li = document.createElement("li");
    li.classList.add("card", "card_addition");
    li.innerHTML = `
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
    return li;
}

function resizeTextarea() {
    let cardAdditionText = document.querySelector(".card_addition_text");
    cardAdditionText.style.height = cardAdditionText.scrollHeight + "px";
    cardAdditionText.oninput = function () {
        cardAdditionText.style.height = "";
        cardAdditionText.style.height = cardAdditionText.scrollHeight + "px";
    }
}

export {Card, getAddCardHTML, resizeTextarea}