class Box {
    constructor(title, main, author) {
        this.title = title
        this.main = main
        this.author = author
    }

    getBoxHTML() {
        return `
            <li class="box">
                <div class="box_title">
                    <p class="box_title_text"> ${this.title} </p>
                    <span class="material-symbols-outlined box_delete_button">close</span>
                </div>
                <p class="box_main_text"> ${this.main} </p>
                <p class="box_author_text"> author by ${this.author} </p>
            </li>
        `;
    }
}

export {Box}