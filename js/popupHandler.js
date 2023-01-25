import {main} from './data/mainData.js'
import {addSidebarBlock} from "./data/sidebarData.js";

const popup = document.getElementById("popup_overlay");

function setCardDeleteButton() {
    const cardDeleteButtons = document.querySelectorAll(".card_delete_button");

    cardDeleteButtons.forEach((button) => {
        const id = button.parentElement.id;
        button.addEventListener("click", () => {
            showPopup(id);
            setPopupCancelButton();
            setPopupDeleteButton(id);
        });
    });
}

function showPopup() {
    popup.innerHTML = `
    <div id="popup" class="popup">
        <p class="popup_text">선택한 카드를 삭제할까요?</p>
        <div class="button_container" id="card_deletion_popup_buttons">
            <button class="grey_button" id="popup_cancel">취소</button>
            <button class="blue_button" id="popup_delete">삭제</button>
        </div>
    </div>
    `
    popup.classList.remove('invisible');
    popup.classList.add('visible');
}

function setPopupCancelButton() {
    const cancelButton = document.getElementById("popup_cancel");
    cancelButton.addEventListener("click", () => {
        popup.innerHTML = ``;
        popup.classList.remove('visible');
        popup.classList.add('invisible');
    });
}

function setPopupDeleteButton(id) {
    const deleteButton = document.getElementById("popup_delete");
    deleteButton.addEventListener("click", () => {
        popup.innerHTML = ``;
        popup.classList.remove('visible');
        popup.classList.add('invisible');
        main.deleteCard(id);
        addSidebarBlock("<strong>" + id + "</strong>를 삭제하였습니다.");
    });
}

export {setCardDeleteButton}