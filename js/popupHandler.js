import { main } from './data/mainData.js'
import { addSidebarBlock } from "./data/sidebarData.js";
import { addEvent } from './helperFunction/common.js';

const popup = document.getElementById("popup_overlay");

function showPopup() {
    popup.classList.toggle('invisible');
    popup.innerHTML = `
        <div id="popup" class="popup">
            <p class="popup_text">선택한 카드를 삭제할까요?</p>
            <div class="button_container" id="card_deletion_popup_buttons">
                <button class="grey_button" id="popup_cancel">취소</button>
                <button class="blue_button" id="popup_delete">삭제</button>
            </div>
        </div>
    `;
}

function eventToPopupCancelBtn() {
    const cancelButton = document.getElementById("popup_cancel");
    addEvent(cancelButton, [
        () => popup.innerHTML = ``,
        () => popup.classList.toggle('invisible')
    ])
}

function eventToPopupDeleteBtn(id) {
    const deleteButton = document.getElementById("popup_delete");
    addEvent(deleteButton, [
        () => popup.innerHTML = ``,
        () => popup.classList.toggle('invisible'),
        () => main.deleteCard(id),
        () => addSidebarBlock(`<strong>${id}</strong>를 삭제하였습니다.`)
    ]);
}

function eventToCardDeleteBtns() {
    const cardDeleteBtns = document.querySelectorAll(".card_delete_button");
    cardDeleteBtns.forEach(($btn) => {
        const id = $btn.parentElement.id;
        addEvent($btn, [
            () => showPopup(id),
            () => eventToPopupCancelBtn(),
            () => eventToPopupDeleteBtn(id)
        ])
    });
}

export { eventToCardDeleteBtns }