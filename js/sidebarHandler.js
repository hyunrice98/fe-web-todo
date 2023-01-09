const sidebar = document.getElementById("sidebar");

function clickHeaderMenuButton() {
    document.querySelector("#header_menu_button").addEventListener("click", () => {
        sidebar.style.visibility = "visible";
        sidebar.style.opacity = "1";
    });
}

function clickSidebarCloseButton() {
    document.querySelector("#sidebar_close_button").addEventListener("click", () => {
        sidebar.style.visibility = "hidden";
        sidebar.style.opacity = "0";
    });
}

export {clickHeaderMenuButton, clickSidebarCloseButton}