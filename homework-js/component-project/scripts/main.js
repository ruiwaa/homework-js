// 호버일 때 이미지가 커지는 것 제어

//페이지 번호 넘길 때마다 다음 페이지 생성

// 버튼을 클릭했을 때 콜백되어야 할 함수
// button.addEventListener('click', () => {
//함수1()-> 함수 값을 함수 2의 인자로 전달하여 사용하는 방식으로 만들기
//함수2()-> 바디에 클래스를 추가/제거해서 바디가 특정 클래스를 가지고 있을때,
//특정 CSS를 보여주도록 디자인
//})

// 변수 사용
const body = document.body
const chapterOne = body.querySelector('[data-type = "chapter-1"]')
const chapterTwo = body.querySelector('[data-type = "chapter-2"]')
const chapterThree = body.querySelector('[data-type = "chapter-3"]')


const buttonFrontEl = document.querySelector("button")
const buttonBackEl = document.querySelector('.next-btn')

const page_1_class_name = body.querySelector('.page-1')
const page_2_class_name = body.querySelector('.page-2')
const page_3_class_name = body.querySelector('.page-3')

const is_chapter_1_class_name = 'is-chapter-1'
const is_chapter_2_class_name = 'is-chapter-2'
const is_chapter_3_class_name = 'is-chapter-3'

