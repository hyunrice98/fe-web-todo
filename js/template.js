// modal
const cardDeletePopUpTemplate = () => `
        <div id="popup" class="popup">
            <p class="popup_text">선택한 카드를 삭제할까요?</p>
            <div class="button_container" id="card_deletion_popup_buttons">
                <button class="grey_button" id="popup_cancel">취소</button>
                <button class="blue_button" id="popup_delete">삭제</button>
            </div>
        </div>
    `;

// column
const columnTemplate = (columnName, columnLength, cardTemplate) => `
    <li class="column" id="${columnName}">
    <div class="column_header">
        <p class="column_header_text">${columnName}</p>
        <div class="number_circle" id="${columnName}">${columnLength}</div>
        <span class="material-symbols-outlined column_add_button">add</span>
        <span class="material-symbols-outlined column_delete_button">close</span>
    </div>
    <ol class="column_main">${cardTemplate}</ol>
    </li>
`

const emptyColumnTemplate = () => `
    <div class="column_header">
    <input type="text" class="column_header_text_input column_header_text" placeholder="섹션 제목을 입력하세요">
    <span class="material-symbols-outlined column_confirm_button">check</span>
    </div>
    <ol class="column_main">
    </ol>
`

// card
const cardTemplate = (cardTitle, cardContent, cardAuthor) => `
    <li class="card" id="${cardTitle}" draggable="true">
    <div class="card_title" id="${cardTitle}">
        <p class="card_title_text">${cardTitle}</p>
        <span class="material-symbols-outlined card_delete_button">close</span>
        <span class="material-symbols-outlined card_edit_button">edit</span>
    </div>
    <p class="card_main_text">${cardContent}</p>
    <p class="card_author_text"> author by ${cardAuthor} </p>
    </li>
`

const cardRegisterFormTemplate = (title, text) => `
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

// sideBar
const menuMoveTemplate = (cardID, prevColumName, nextColumnName) => `
    <strong>${cardID}</strong>를 
    <strong>${prevColumName}</strong>에서 
    <strong>${nextColumnName}</strong>로 이동하였습니다.
`

const menuDeleteTemplate = (id) => `<strong>${id}</strong>를 삭제하였습니다.`;

export { 
    cardDeletePopUpTemplate,
    columnTemplate, emptyColumnTemplate,
    cardTemplate, cardRegisterFormTemplate,
    menuMoveTemplate, menuDeleteTemplate
}