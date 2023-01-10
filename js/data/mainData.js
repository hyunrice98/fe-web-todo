import {Section} from './section.js'
import {Box} from './box.js'

class Main {
    constructor(section) {
        this.section = section
    }

    getMainHTML() {
        const main = document.getElementById("section_holder")

        let html = "";
        for (let section of this.section) {
            html += section.getSectionHTML();
            // console.log(section);
        }

        main.innerHTML = html;
    }
}

let data = new Main(
    [
        new Section('해야할 일', [
            new Box('Github 공부하기', 'add, commit, push', 'web'),
            new Box('블로그에 포스팅할 것', '*Github 공부내용 *모던 자바스크립트 1장 공부내용', 'web')
        ]),
        new Section('하고 있는 일', []),
        new Section('완료한 일', [
            new Box('제목제목', '내용내용내용', '작가')
        ])
    ]
);

export {data, Main}