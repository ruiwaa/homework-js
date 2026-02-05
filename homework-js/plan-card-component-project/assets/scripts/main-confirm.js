// 상수 설정 (오타 방지)
const ACTIVE_CLASSNAME = 'active'
const PLAN_CARD_CLASSNAME = 'plan-card'
const PLAN_OPTION_CLASSNAME = 'plan-option'
const PLAN_PRICE_CLASSNAME = 'plan-price'
const CARD_BUTTON_CLASSNAME = 'plan-price-button'

// 한 번 찾아 기억된 요소를 시작으로 내부의 요소를 찾는 것이 안전하고 빠름
const planCardsContainer = document.querySelector('.plan-card-info-container')
const planCards = planCardsContainer.querySelectorAll('.' + PLAN_CARD_CLASSNAME)
const priceNumbers = planCardsContainer.querySelectorAll('.' + PLAN_PRICE_CLASSNAME)
const cardInfo = document.querySelector('.selected-option')
const planMessage = cardInfo.querySelector('[data-type="plan-membership"]')
// id 속성으로 요소를 찾을 때는 getElementById()가 가장 빠름
const planName = document.getElementById('plan-membership')

// 선택된 카드 기억을 위한 상태 변수
let selectedCard = null

// 함수 초기 실행
init()

// --------------------------------------------------------------------------
// 함수 선언으로 바꿔 코드의 실행 흐름 파악이 용이하도록 설정
// --------------------------------------------------------------------------
// 함수 표현식(화살표 함수 포함)의 경우, 메모리에 먼저 등록해야 해서 
// 함수 초기 실행 코드보다 먼저 작성되어야 하므로 코드 파악을 위해서는 
// 함수 실행 코드가 있는 파일의 맨 아래로 이동해야 함.
// 코드가 수만 줄일 경우, 코드 파악이 어려움.

/**
 * 초기화 함수
 */
function init() {
  formatPrices()
  eventListening()  
}

/**
 * 가격 포맷 함수
 */
function formatPrices() {
  for (const price of priceNumbers) {
    const changeNum = Number(price.textContent)
    // isNaN() 대신, Number.isNaN()을 사용하는 것이 안전
    if (!Number.isNaN(changeNum)) {
      price.textContent = '₩' + changeNum.toLocaleString()
    }
  }
}

/**
 * 이벤트 리스닝 설정 함수
 */
function eventListening() {
  planCardsContainer.addEventListener('click', handleCardClick)
}

/**
 * 클릭 이벤트 리스너 함수
 * @param {Event} e 이벤트 객체
 * @returns {void}
 */
function handleCardClick(e) {
  const planCard = e.target.closest('.' + PLAN_CARD_CLASSNAME)
  if (!planCard) return

  selectPlanCard(planCard)
  updatePlanOption(planCard)
}

/**
 * 플랜 카드 클릭 이벤트 리스너 함수
 * @param {Element} planCard 플랜 카드 요소
 * @returns {void}
 */
function selectPlanCard(planCard) {
  // 이미 선택된 카드를 다시 클릭한 경우 무시
  if (selectedCard === planCard) return

  // 이전 선택 해제 및 새 카드 선택
  if (selectedCard) deselectCard(selectedCard)
  selectCard(planCard)

  // 현재 선택된 카드를 상태 변수에 기억
  selectedCard = planCard
}

/**
 * 선택된 플랜 옵션 업데이트 함수
 * @param {Element} planCard 플랜 카드 요소
 */
function updatePlanOption(planCard) {
  const planOption = planCard.querySelector('.' + PLAN_OPTION_CLASSNAME)
  const planPrice = planCard.querySelector('.' + PLAN_PRICE_CLASSNAME)

  if (!planOption && !planPrice) return

  const { textContent: membershipValue } = planOption
  const { price: priceData } = planPrice.dataset

  if (planName) planName.textContent = `${membershipValue}` 
  if (planMessage) planMessage.textContent = `플랜(${priceData})을 선택하셨습니다.`
}

/**
 * 플랜 카드 선택 함수
 * @param {Element} card 카드 요소
 */
function selectCard(planCard) {
  const checkmarkIcon = planCard.previousElementSibling
  const cardButton = planCard.querySelector('.' + CARD_BUTTON_CLASSNAME)
  
  planCard.classList.add(ACTIVE_CLASSNAME)
  checkmarkIcon.classList.add(ACTIVE_CLASSNAME)

  if (cardInfo.hidden) removeAttr(cardInfo, 'hidden')

  if (!cardButton) return
  setAttr(cardButton, 'aria-pressed', 'true')
}

/**
 * 기존 플랜 카드 선택 해제 함수
 * @param {Element} card 카드 요소
 */
function deselectCard(card) {
  card.classList.remove(ACTIVE_CLASSNAME)

  // '다른 버튼' 보다 '카드 버튼' 이름이 명확함
  const cardButton = card.querySelector('.' + CARD_BUTTON_CLASSNAME)
  if (cardButton) setAttr(cardButton, 'aria-pressed', 'false')

  // '아이콘' 보다 '체크마크 아이콘' 이름이 명확함
  const checkmarkIcon = card.previousElementSibling
  if (checkmarkIcon) checkmarkIcon.classList.remove(ACTIVE_CLASSNAME)
}

/**
 * 속성 설정 함수
 * @param {Element} element 요소
 * @param {string} attrName 속성 이름
 * @param {string} attrValue 속성 값
 */
function setAttr(element, attrName, attrValue) {
  // [방어] 타입 검사
  if (!element || element.nodeType !== document.ELEMENT_NODE) {
    console.warn('첫 번째 전달된 인자가 유효한 요소(Element) 타입이 아닙니다.')
    return
  }
  if (typeof attrName !== 'string' || typeof attrValue !== 'string') {
    console.warn('설정할 속성 이름과 값은 문자열로 전달되어야 합니다.')
    return
  }
  element.setAttribute(attrName, attrValue)
}

/**
 * 속성 읽기 함수
 * @param {Element} element 요소
 * @param {string} attrName 속성 이름
 */
function removeAttr(element, attrName) {
  // [방어] 타입 검사
  if (!element || element.nodeType !== document.ELEMENT_NODE) {
    console.warn('첫 번째 전달된 인자가 유효한 요소(Element) 타입이 아닙니다.')
    return
  }
  if (typeof attrName !== 'string') {
    console.warn('설정할 속성 이름은 문자열로 전달되어야 합니다.')
    return
  }
  element.removeAttribute(attrName)
}