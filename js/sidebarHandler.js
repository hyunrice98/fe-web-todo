const sidebar = document.getElementById("sidebar");

function clickHeaderMenuButton() {
    document.querySelector("#header_menu_button").addEventListener("click", () => {
        sidebar.classList.remove('invisible');
        sidebar.classList.add('visible');
    });
}

function clickSidebarCloseButton() {
    document.querySelector("#sidebar_close_button").addEventListener("click", () => {
        sidebar.classList.remove('visible');
        sidebar.classList.add('invisible');
    });
}

export {clickHeaderMenuButton, clickSidebarCloseButton}