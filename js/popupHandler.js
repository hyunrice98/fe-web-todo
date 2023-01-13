import {data} from './data/mainData.js'
import {addSidebarBlock} from "./data/sidebarData.js";

const popup = document.getElementById("popup_overlay");

function setBoxDeleteButton() {
    const boxDeleteButtons = document.querySelectorAll(".box_delete_button");

    for (let i of boxDeleteButtons) {
        let id = i.parentElement.id;
        i.addEventListener("click", () => {
            showModal(id);
            setPopupCancelButton();
            setPopupDeleteButton(id);
        });
    }
}

function showModal() {
    popup.innerHTML = `
    <div id="popup" class="popup">
        <p class="popup_text">선택한 카드를 삭제할까요?</p>
        <div class="button_container" id="box_deletion_popup_buttons">
            <button class="grey_button" id="popup_cancel">취소</button>
            <button class="blue_button" id="popup_delete">삭제</button>
        </div>
    </div>
    `
    popup.style.visibility = "visible";
    popup.style.opacity = "1";
}

function setPopupCancelButton() {
    let cancelButton = document.getElementById("popup_cancel");
    cancelButton.addEventListener("click", () => {
        popup.innerHTML = ``;
        popup.style.visibility = "hidden";
        popup.style.opacity = "0";
    });
}

function setPopupDeleteButton(id) {
    let deleteButton = document.getElementById("popup_delete");
    deleteButton.addEventListener("click", () => {
        popup.innerHTML = ``;
        popup.style.visibility = "hidden";
        popup.style.opacity = "0";
        data.deleteBox(id);
        addSidebarBlock("jaehyun cho", "<strong>" + id + "</strong>를 삭제하였습니다.");
    });
}

export {setBoxDeleteButton}