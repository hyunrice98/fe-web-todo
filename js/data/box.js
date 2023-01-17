class Box {
    constructor(title, main, author) {
        this.title = title
        this.main = main
        this.author = author
    }

    getBoxHTML() {
        return `
            <li class="box" id="${this.title}" draggable="true">
                <div class="box_title" id="${this.title}">
                    <p class="box_title_text">${this.title}</p>
                    <span class="material-symbols-outlined box_delete_button">close</span>
                    <span class="material-symbols-outlined box_edit_button">edit</span>
                </div>
                <p class="box_main_text">${this.main}</p>
                <p class="box_author_text"> author by ${this.author} </p>
            </li>
        `;
    }
}

function getAddBoxHTML(title, text) {
    const li = document.createElement("li");
    li.classList.add("box", "box_addition");
    li.innerHTML = `
        <label>
            <input class="box_title_text box_addition_title" placeholder="제목을 입력하세요" type="text" value="${title ?? ''}">
        </label>
        <label>
            <textarea class="box_main_text box_addition_text" placeholder="내용을 입력하세요" rows="1">${text ?? ''}</textarea>
        </label>
        <div class="button_container">
            <button class="grey_button" id="box_addition_cancel">취소</button>
            <button class="blue_button" id="box_addition_confirm">등록</button>
        </div>
    `
    return li;
}

export {Box, getAddBoxHTML}