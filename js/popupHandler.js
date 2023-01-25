import { main } from './data/mainData.js'
import { addSidebarBlock } from "./data/sidebarData.js";
import { addEvent, pipe } from './helper/commonFunction.js';
import { cardDeletePopUpTemplate, menuDeleteTemplate } from './template.js';

const popup = document.getElementById("popup_overlay");

function showPopup() {
    popup.classList.toggle('invisible');
    popup.innerHTML = cardDeletePopUpTemplate();
}

const eventToPopupCancelBtn = () => pipe(
    ($cancelBtn) => addEvent($cancelBtn, [
        () => popup.innerHTML = ``,
        () => popup.classList.toggle('invisible')
    ])
)(document.getElementById("popup_cancel"));

const eventToPopupDeleteBtn = (id) => pipe(
    ($deleteBtn) => addEvent($deleteBtn, [
        () => popup.innerHTML = ``,
        () => popup.classList.toggle('invisible'),
        () => main.deleteCard(id),
        () => addSidebarBlock(menuDeleteTemplate(id))
    ])
)(document.getElementById("popup_delete"));

const eventToCardDeleteBtns = () => pipe(
    ($cardDeleteBtns) => 
        $cardDeleteBtns.forEach(($btn) => {
        const id = $btn.parentElement.id;
        addEvent($btn, [
            () => showPopup(id),
            () => eventToPopupCancelBtn(),
            () => eventToPopupDeleteBtn(id)
        ]);
    })
)(document.querySelectorAll(".card_delete_button"));

export { eventToCardDeleteBtns }