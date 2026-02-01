/**
 * 
 * 자바스크립트로 제어해야 할 것들
 * 1. 배타적 선택 (Exclusive Selection)
 3개의 요금제 중 단 하나만 선택 가능 (클릭 시, 다른 카드의 선택 해제)
2. 데이터 바인딩 (Data Binding)
선택된 카드의 요금제 이름(name)과 가격(Price) 정보를 
읽어와 하단 메시지 영역에 동적으로 표시
3. 플랜카드 가격 쉼표 안에 넣기
 */

// 변수 선언
const planCards =document.querySelectorAll('.plan-card')
const planCard = document.querySelector('.plan-card')
const priceCard1 = document.querySelector('[data-plan="price-card-1"]')
const priceCard2 = document.querySelector('[data-plan="price-card-2"]')
const priceCard3 = document.querySelector('[data-plan="price-card-3"]')

const active = () => {
  planCards.forEach((card) =>{
    card.addEventListener('click', (e) => {
    const icon = e.currentTarget.previousElementSibling
    e.currentTarget.classList.toggle('active')
    icon.classList.toggle('active')
  })
})
}
priceCard1.addEventListener('click', active)

