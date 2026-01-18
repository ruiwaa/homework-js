/**
 * 필요한 함수들:
1.페이지 번호 관리 함수 - 현재 페이지를 계산하고 반환
2.디자인 업데이트 함수 - 페이지 번호를 받아서 body 클래스 제어
3.탭 접근성 함수 - 페이지 번호를 받아서 각 페이지의 tabindex 제어
4.초기화 함수 - 페이지 로드 시 처음 상태 설정
5.이벤트 리스너 - prev, next 버튼 클릭 시 위 함수들 실행
 */
//페이지 번호 넘길 때마다 다음 페이지 생성

// 버튼을 클릭했을 때 콜백되어야 할 함수
// button.addEventListener('click', () => {
//함수1()-> 함수 값을 함수 2의 인자로 전달하여 사용하는 방식으로 만들기
//함수2()-> 바디에 클래스를 추가/제거해서 바디가 특정 클래스를 가지고 있을때,
//특정 CSS를 보여주도록 디자인
//})

// 변수 사용
const body = document.body
// 게임 디자인 페이지 변수
const chapterOneEl = body.querySelector('[data-type = "chapter-1"]')
const chapterTwoEl = body.querySelector('[data-type = "chapter-2"]')
const chapterThreeEl = body.querySelector('[data-type = "chapter-3"]')

// 게임 이미지 및 문구 컨테이너 변수
const gameLink1 = body.querySelector('.game-link1')
const gameLink2 = body.querySelector('.game-link2')
const gameLink3 = body.querySelector('.game-link3')
const gameLink4 = body.querySelector('.game-link4')
const gameLink5 = body.querySelector('.game-link5')
const gameLink6 = body.querySelector('.game-link6')


// 버튼 요소 변수
const buttonFrontEl = document.querySelector(".prev-btn")
const buttonBackEl = document.querySelector('.next-btn')

const page_1_element = body.querySelector('.page-1')
const page_2_element = body.querySelector('.page-2')
const page_3_element = body.querySelector('.page-3')



//챕터 클래스 네임 변수
const is_chapter_1_class_name = 'is-chapter-1'
const is_chapter_2_class_name = 'is-chapter-2'
const is_chapter_3_class_name = 'is-chapter-3'

// 버튼을 눌렀을 때 페이지 번호와 해당 게임 페이지가 바뀌는 함수 구현
// 현재 페이지 변수 설정
let currentPage = 1
//  1단계:현재 페이지 번호 반환 함수
// 기능: 현재 페이지 번호를 버튼을 누름에 따라서 달라지게 하기

function prevPage(currentNumber) {
 currentNumber = (currentPage - 1) % 4
 if(currentNumber === 0){
  return 3
 }
 //음수 값이 나올 경우, 절댓값으로 변환
 return Math.abs(currentNumber) 
}
function nextPage(currentNumber) {
  currentNumber = (currentPage + 1) % 4
  if(currentNumber === 0){
  return 1}

  return currentNumber

}
// 테스트 코드
console.log(prevPage(0))
console.log(nextPage(3))


// 2단계: 게임 페이지 & 페이지 번호 업데이트 함수
// 기능: 페이지 번호에 따라서 페이지 번호 및 페이지 변환
// 페이지 번호 span 업데이트
function updatePageNumber(currentNumber){
  page_1_element.classList.toggle('active', currentNumber === 1)
  page_2_element.classList.toggle('active', currentNumber === 2)
  page_3_element.classList.toggle('active', currentNumber === 3)


}

// 게임 페이지 디자인 업데이트 및 페이지 텝 제어
function updatePage(currentNumber){
  // 조건문으로 작성한 경우
  // if(currentNumber === 1){
  //   body.classList.add(is_chapter_1_class_name)
  //   body.classList.remove(is_chapter_2_class_name)
  //   body.classList.remove(is_chapter_3_class_name)
  // }
  // else if(currentNumber === 2){
  //   body.classList.add(is_chapter_2_class_name)
  //   body.classList.remove(is_chapter_1_class_name)
  //   body.classList.remove(is_chapter_3_class_name)
  // }
  // else{
  //   body.classList.add(is_chapter_3_class_name)
  //   body.classList.remove(is_chapter_1_class_name)
  //   body.classList.remove(is_chapter_2_class_name)
  // }

  body.classList.toggle(is_chapter_1_class_name, currentNumber === 1)
  body.classList.toggle(is_chapter_2_class_name, currentNumber === 2)
  body.classList.toggle(is_chapter_3_class_name, currentNumber === 3)

  // 탭 제어 조건문 작성
 if (currentNumber === 1) {
    // 1페이지일 때: 1, 2번만 탭 가능하게
    gameLink1.setAttribute('tabindex', '0')
    gameLink2.setAttribute('tabindex', '0')
    // 나머지는 탭 차단
    gameLink3.setAttribute('tabindex', '-1')
    gameLink4.setAttribute('tabindex', '-1')
    gameLink5.setAttribute('tabindex', '-1')
    gameLink6.setAttribute('tabindex', '-1')
 }
 else if (currentNumber === 2){
  gameLink3.setAttribute('tabindex', '0')
  gameLink4.setAttribute('tabindex', '0')

    gameLink1.setAttribute('tabindex', '-1')
    gameLink2.setAttribute('tabindex', '-1')
    gameLink5.setAttribute('tabindex', '-1')
    gameLink6.setAttribute('tabindex', '-1')
 }

 else{
   gameLink5.setAttribute('tabindex', '0')
   gameLink6.setAttribute('tabindex', '0')

    gameLink1.setAttribute('tabindex', '-1')
    gameLink2.setAttribute('tabindex', '-1')
    gameLink3.setAttribute('tabindex', '-1')
    gameLink4.setAttribute('tabindex', '-1')
 }

}


// 앞으로 가기/ 뒤로 가기 버튼을 누를 때마다 위의 함수들이 실행되는 함수 만들기

function handlePreButton(){
  currentPage = prevPage(currentPage)
  updatePage(currentPage)
  updatePageNumber(currentPage)

}
function handleNextButton(){
  currentPage = nextPage(currentPage)
  updatePage(currentPage)
  updatePageNumber(currentPage)
}
buttonFrontEl.addEventListener('click',handlePreButton)
buttonBackEl.addEventListener('click', handleNextButton)

//초기 화면 상태 설정!!
updatePage(1)
updatePageNumber(1)