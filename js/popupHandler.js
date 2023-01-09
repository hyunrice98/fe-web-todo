const popup = document.getElementById("popup_overlay")

function clickBoxDeleteButton() {
    const boxDeleteButton = document.querySelectorAll(".box_delete_button");

    for (let i of boxDeleteButton) {
        i.addEventListener("click", () => {
            popup.style.visibility = "visible";
            popup.style.opacity = "1";
        });
    }
}

function clickPopupCancelButton() {
    const popupCancelButton = document.querySelector("#popup_cancel_button");
    popupCancelButton.addEventListener("click", () => {
        popup.style.visibility = "hidden";
        popup.style.opacity = "0";
    });
}

function clickPopupDeleteButton() {
    // TODO: add what to do aspect from showing popup
}

export {clickBoxDeleteButton, clickPopupCancelButton}