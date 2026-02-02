/**
 * 자바스크립트로 제어해야 할 것들
 * 1. 배타적 선택 (Exclusive Selection)
 3개의 요금제 중 단 하나만 선택 가능 (클릭 시, 다른 카드의 선택 해제)✅
2. 데이터 바인딩 (Data Binding)
선택된 카드의 요금제 이름(name)과 가격(Price) 정보를 
읽어와 하단 메시지 영역에 동적으로 표시
3. 플랜카드 가격 쉼표 안에 넣기 ✅
 */


// 변수 선언
const planCards =document.querySelectorAll('.plan-card')
const planCard = document.querySelector('.plan-card')
const priceCard1 = document.querySelector('[data-plan="price-card-1"]')
const priceCard2 = document.querySelector('[data-plan="price-card-2"]')
const priceCard3 = document.querySelector('[data-plan="price-card-3"]')
const priceNumber = document.querySelectorAll('.plan-price')
const selectedOption = document.querySelector('.selected-option')




// plan-price 가격 쉼표 추가 
for(const price of priceNumber){
  const changeNum = Number(price.textContent)
  if(!isNaN(changeNum) ){
    price.textContent = '₩' + changeNum.toLocaleString()
  } 
  
  
} 

// 플랜 카드 이벤트 핸들러 함수 (클릭 시 나올 이벤트)
const handleSelect = (card) => {
  const icon = card.previousElementSibling

  // 선택되지 않은 요소 비활성화
  planCards.forEach((selectedCard) => {
    if(selectedCard !== card) {
      removeSelected(selectedCard)
    }
  })

  // 현재 카드 활성화되었을 시 추가될 기능들
  //1. 플랜 카드에 active 클래스명 추가
  card.classList.add('active')
  //2. 아이콘에 active 클래스명 추가
  icon.classList.add('active')
  //3. 플랜 카드에 속성 쓰기
  setAttr(card, 'tabindex', '0') 
  //4. 선택 버튼 클릭 후 옵션 선택 텍스트의 hidden 속성 삭제
  removeAttr(selectedOption,'hidden',null) 
  

  // 버튼에 aria-pressed 속성 추가
  const button = card.querySelector('.plan-price-button')
  if(button) {
  setAttr(button, 'aria-pressed', 'true')
}
  
}

const showOptionInfo = function (card){
    // 여기서 각 플랜카드 선택 시 다른 텍스트가 표시 되어야 함
      const cardParentElement = card.parentElement
      const wrpperParentElement = cardParentElement.parentElement
      const optionInfo = wrpperParentElement.nextElementSibling
      const dataPrice =  card.querySelector('.plan-price')
      const priceValue = dataPrice.dataset.price
      const membership = card.querySelector('.plan-option')
      const membershipValue = membership.textContent
      const strong = optionInfo.querySelector('#plan-membership')
      const span = optionInfo.querySelector('[data-type="plan-membership"]')

      strong? (strong.textContent = `${membershipValue}`): null
      span? span.textContent = `플랜(${priceValue})을 선택하셨습니다.` : null

  
    }

    
// 활성화 클래스 추가 했을 때 발생하는 이벤트 함수들 연결
//클릭 및 엔터 
const active = () => {
  planCards.forEach((card) => {

    // 클릭 이벤트에 handleSelect 함수 연결
    card.addEventListener('click', (e) => {
      handleSelect(e.currentTarget)
      showOptionInfo(e.currentTarget)
    }    
   , {capture: true})

   

   // 엔터키 이벤트도 추가
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

// 이전에 선택된 카드 비활성화 함수 만들기
const removeSelected = (card) => {

  //카드와 아이콘에 클래스명 제거
  card.classList.remove('active')
  const icon = card.previousElementSibling
  if(icon) icon.classList.remove('active')

 
}

// 속성 제어 함수 만들기 (추가/삭제)
function setAttr(element, attrName, attrValue){
  element.setAttribute(attrName, attrValue)

}
function removeAttr(element, attrName, attrValue){
  if(attrValue === null){
    element.removeAttribute(attrName)
  }
}