/**
 * 자바스크립트로 제어해야 할 것들
 * 1. 배타적 선택 (Exclusive Selection)
 3개의 요금제 중 단 하나만 선택 가능 (클릭 시, 다른 카드의 선택 해제)✅
2. 데이터 바인딩 (Data Binding)
선택된 카드의 요금제 이름(name)과 가격(Price) 정보를 읽어와 하단 메시지 영역에 동적으로 표시✅
3. 플랜카드 가격 쉼표 안에 넣기 ✅
 */


// 1 단계: 필요한 변수값 할당
const planCardsContainer = document.querySelector('.plan-card-info-container')
const planCards =document.querySelectorAll('.plan-card')
const priceNumbers = document.querySelectorAll('.plan-price')
const selectedOption = document.querySelector('.selected-option')
const strong = document.querySelector('#plan-membership')
const span = document.querySelector('[data-type="plan-membership"]')


// 2 단계: plan-price 가격 쉼표 추가 함수
const formatPrices = () => {
for(const price of priceNumbers){
  const changeNum = Number(price.textContent)
  if(!isNaN(changeNum) ){
    price.textContent = '₩' + changeNum.toLocaleString()
  } 
}

  
} 


// 3 단계: 함수 생성

// 1) 이전에 선택된 카드 비활성화 함수 만들기
const removeSelected = (card) => {

  //카드와 아이콘에 클래스명 제거 & 버튼 속성 제거
  card.classList.remove('active')
  const otherButton = card.querySelector('.plan-price-button')
  const icon = card.previousElementSibling
  if(icon) icon.classList.remove('active')
  if(otherButton) {setAttr(otherButton, 'aria-pressed', 'false')

   }

}

// 2) 속성 제어 함수 만들기 

// 추가
const setAttr= (element, attrName, attrValue) => {
  element.setAttribute(attrName, attrValue)

}
// 삭제
const removeAttr = (element, attrName) => {
    element.removeAttribute(attrName)
}

// 3) 플랜 카드 클릭 이벤트 핸들러 함수 
const handleSelect = (target) => {
const icon = target.previousElementSibling
const button = target.querySelector('.plan-price-button')

  // 3-1 선택되지 않은 플랜 카드 비활성화
  // 타켓이 아닐 시 카드들 속성 및 클래스명 삭제
  planCards.forEach((selectedCard) => {
    if(selectedCard !== target) {
      // 비활성화 함수 사용
      removeSelected(selectedCard)
    }
  })

  // 3-2 현재 플랜 카드 활성화되었을 시 추가될 기능들

  //3-2-1 플랜 카드에 active 클래스명 추가
  target.classList.add('active')

  //3-2-2 아이콘에 active 클래스명 추가
  icon.classList.add('active')

  //3-2-4 선택 버튼 클릭 후 옵션 선택 텍스트의 hidden 속성 삭제
  removeAttr(selectedOption,'hidden') 
  
  //3-2-5 버튼에 aria-pressed 속성 추가
  if(!button) return
  setAttr(button, 'aria-pressed', 'true')

  
}

// 4) 플랜 카드 선택시 나타내는 선택된 옵션 박스 함수
// 기능: 각 플랜카드 선택 시 다른 텍스트가 표시 되어야 함

const showOptionInfo = (target) => {
  // 필요한 변수 할당
      const membershipValue = target.querySelector('.plan-option').textContent
      const priceData = target.querySelector('.plan-price').dataset.price
      
      // 해당 아티클 요소 선택 시 해당 멤버쉽 등급과 가격이 보이도록 설정
      strong? (strong.textContent = `${membershipValue}`): null
      span? span.textContent = `플랜(${priceData})을 선택하셨습니다.` : null

  
    }

    

// 4단계: 활성화 클래스 추가 했을 때 발생하는 이벤트 함수들 연결(이벤트 위임)

   const active = () => {

    // 클릭 이벤트에 handleSelect & showOptionInfo 함수 연결
    planCardsContainer.addEventListener('click', (e) => {
      // 아티클 부모 요소에 이벤트 연결하고 아티클은 이벤트 위임 받음
      const planCardEvent = e.target.closest('.plan-card')
      if(!planCardEvent) return 

      //함수 연결
      handleSelect(planCardEvent)
      showOptionInfo(planCardEvent)
    }    
   ) 

}

// 함수 초기 실행
formatPrices()
active()
