import { addEvent, pipe } from "./helperFunction/common.js";

const sidebar = document.getElementById("sidebar");

const clickHeaderMenuButton = () => pipe(
    ($headerMenuBtn) => addEvent($headerMenuBtn, [() => sidebar.classList.toggle('invisible')])
)(document.querySelector("#header_menu_button"));


const clickSidebarCloseButton = () => pipe(
    ($sideBarCloseBtn) => addEvent($sideBarCloseBtn, [() => sidebar.classList.toggle('invisible')])
)(document.querySelector("#sidebar_close_button"));

const eventToSideBarBtns = () => pipe(
    clickHeaderMenuButton,
    clickSidebarCloseButton
)()

export { eventToSideBarBtns }