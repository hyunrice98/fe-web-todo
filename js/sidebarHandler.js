const sidebarHandler = document.getElementById("sidebar");

function clickMenuBar() {
    document.querySelector("#header_menu_button").addEventListener("click", () => {
        sidebarHandler.style.visibility = "visible";
        sidebarHandler.style.opacity = "1";
    });
}

function clickSidebarClose() {
    document.querySelector("#sidebar_close_button").addEventListener("click", () => {
        sidebarHandler.style.visibility = "hidden";
        sidebarHandler.style.opacity = "0";
    });
}

export {clickMenuBar, clickSidebarClose}