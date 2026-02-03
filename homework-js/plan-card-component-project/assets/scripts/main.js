/**
 * 자바스크립트로 제어해야 할 것들
 * 1. 배타적 선택 (Exclusive Selection)
 3개의 요금제 중 단 하나만 선택 가능 (클릭 시, 다른 카드의 선택 해제)✅
2. 데이터 바인딩 (Data Binding)
선택된 카드의 요금제 이름(name)과 가격(Price) 정보를 
읽어와 하단 메시지 영역에 동적으로 표시
3. 플랜카드 가격 쉼표 안에 넣기 ✅
 */


// 1 단계: 팔요한 변수값 할당
const planCards =document.querySelectorAll('.plan-card')
const planCard = document.querySelector('.plan-card')
const priceNumber = document.querySelectorAll('.plan-price')
const selectedOption = document.querySelector('.selected-option')




// 2 단계: plan-price 가격 쉼표 추가 
for(const price of priceNumber){
  const changeNum = Number(price.textContent)
  if(!isNaN(changeNum) ){
    price.textContent = '₩' + changeNum.toLocaleString()
  } 
  
} 

// 3 단계: 함수 생성
// 1) 이전에 선택된 카드 비활성화 함수 만들기
const removeSelected = (card) => {

  //카드와 아이콘에 클래스명 제거
  card.classList.remove('active')
  const icon = card.previousElementSibling
  if(icon) icon.classList.remove('active')

}

// 2) 속성 제어 함수 만들기 
// 추가
function setAttr(element, attrName, attrValue){
  element.setAttribute(attrName, attrValue)

}
// 삭제
function removeAttr(element, attrName, attrValue){
  if(attrValue === null){
    element.removeAttribute(attrName)
  }
}

// 3) 플랜 카드 클릭 이벤트 핸들러 함수 
const handleSelect = (card) => {
const icon = card.previousElementSibling
const button = card.querySelector('.plan-price-button')

  // 3-1 선택되지 않은 플랜 카드 비활성화
  planCards.forEach((selectedCard) => {
    if(selectedCard !== card) {
      removeSelected(selectedCard)
  

      const otherButton = selectedCard.querySelector('.plan-price-button')
      if(otherButton) setAttr(otherButton, 'aria-pressed', 'false')
    }
  })

  // 3-2 현재 플랜 카드 활성화되었을 시 추가될 기능들
  //3-2-1 플랜 카드에 active 클래스명 추가
  card.classList.add('active')
  //3-2-2 아이콘에 active 클래스명 추가
  icon.classList.add('active')
  //3-2-3 플랜 카드에 속성 설정(아티클에 탭속성 추가)
  setAttr(card, 'tabindex', '0') 
  //3-2-4 선택 버튼 클릭 후 옵션 선택 텍스트의 hidden 속성 삭제
  removeAttr(selectedOption,'hidden',null) 
  
  //3-2-5 버튼에 aria-pressed 속성 추가
  
  if(button) {
  setAttr(button, 'aria-pressed', 'true')
}
  
}

// 4) 플랜 카드 선택시 나타내는 선택된 옵션 박스 함수
// 기능: 각 플랜카드 선택 시 다른 텍스트가 표시 되어야 함

const showOptionInfo = function (card){
  // 필요한 변수 할당
      const cardParentElement = card.parentElement
      const wrpperParentElement = cardParentElement.parentElement
      const optionInfo = wrpperParentElement.nextElementSibling
      const dataPrice =  card.querySelector('.plan-price')
      const priceValue = dataPrice.dataset.price
      const membership = card.querySelector('.plan-option')
      const membershipValue = membership.textContent
      const strong = optionInfo.querySelector('#plan-membership')
      const span = optionInfo.querySelector('[data-type="plan-membership"]')

      // 해당 아티클 요소 선택 시 해당 멤버쉽 등급과 가격이 보이도록 설정
      strong? (strong.textContent = `${membershipValue}`): null
      span? span.textContent = `플랜(${priceValue})을 선택하셨습니다.` : null

  
    }

    
// 4단계: 활성화 클래스 추가 했을 때 발생하는 이벤트 함수들 연결
// 클릭 및 엔터 
const active = () => {
  planCards.forEach((card) => {

    // 클릭 이벤트에 handleSelect & showOptionInfo 함수 연결
    card.addEventListener('click', (e) => {
      handleSelect(e.currentTarget)
      showOptionInfo(e.currentTarget)
    }    
   , {capture: true}) // 버튼을 클릭했을 때 아티클 요소까지 클릭이 될 수 있게 캡쳐링 사용

   

   // 엔터키 이벤트에 handleSelect & showOptionInfo 함수 연결
    card.addEventListener('keydown', (e) => {
      if(e.key === 'Enter') {
        handleSelect(e.currentTarget)
        showOptionInfo(e.currentTarget)
      }
    })
})
}
// 함수 실행
active()

/**
 * 1. [기차놀이 금지] 부모의 부모의 옆집 찾기 금지
 * - 피드백: .parentElement.parentElement...는 HTML 구조가 바뀌면 바로 에러남.
 * - 💡 힌트: '가장 가까운 조상'을 찾는 .closest('.class')를 쓰거나, 
 *           결과를 보여줄 곳은 상단에 전역 변수로 딱 찍어놓으세요.
 */

/**
 * 2. [이벤트 위임] 사장님 한 명에게만 명령하기
 * - 피드백: 카드 100개에 각각 리스너를 다는 건 비효율적임 (메모리 낭비).
 * - 💡 힌트: 카드들의 부모(.card-wrapper)에 리스너를 딱 하나만 달고, 
 *           클릭된 놈이 누구인지(e.target) 보고 판단하세요.
 */

/**
 * 3. [상태 대칭] 켰으면 확실하게 끄기
 * - 피드백: 활성화할 때 class, aria, tabindex를 다 건드렸다면, 비활성화할 때도 다 치워야 함.
 * - 💡 힌트: removeSelected 함수를 '완벽한 청소기'로 만드세요. 
 *           (클래스 제거, 속성 초기화 로직을 이 안에 다 때려넣기!)
 */

/**
 * 4. [방어운전] "없을 수도 있다"고 생각하기
 * - 피드백: querySelector가 null을 뱉으면 그 뒤의 코드가 싹 다 죽어버림.
 * - 💡 힌트: 'if (변수)' 로 감싸서 "존재할 때만 실행해!"라고 명령하거나, 
 *           변수 뒤에 '?'를 붙여서(Optional Chaining) 안전하게 보호하세요.
 */

/**
 * 5. [키보드 배려] 마우스 없는 사용자 생각하기
 * - 피드백: 엔터키(Enter) 대응이 없으면 키보드만 쓰는 사용자는 이 서비스를 못 씀.
 * - 💡 힌트: 'click' 리스너 옆에 'keydown' 리스너도 하나 친구로 만들어주고, 
 *           e.key === 'Enter'일 때 똑같은 기능을 실행시켜주세요.
 */