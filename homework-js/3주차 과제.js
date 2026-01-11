// 변수, 상수 작성 과제
let favoritemovie = '윤희에게'
const LIGHTSPEED = '299,792,458 m/s'
let is_complete_email_valificaiton = true
let productInventory = 47 + '개'
let memberPoint = 15_8000 + '점'
const APIBASICSEVER = 'https://api.example.com'
let postView = 1_234
let deliveryStatus = '배송중'
let can_use_coupon = true
const MAXIMUMUPLOADFILESIZE =  10485760
let UserRatingScore = parseFloat(85.5) + '점'
let agree_receive_notifications = true

//함수 작성 과제
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
//1번 환영 메시지 생성
function welconeMessage (name, membershipScore){
  // 일반 회원 환영 메시지 반환문 작성
  //return '안녕하세요,' + name + '님!' + ' 즐거운 쇼핑되세요.'
  // 삼항 연산자를 활용하여 변수 선언 
  // 멤버십 등급 매개변수에 따라서 Vip를 참으로 기준하여, 삼항 연산자 사용
  const message = membershipScore === 'VIP' ?  '🌟 VIP ' + name + '님, ' + '특별한 혜택이 준비되어 있습니다!': '안녕하세요,' + name + '님!' + ' 즐거운 쇼핑되세요.'
  return message
}
//테스트 코드
console.log(welconeMessage('예지', 'VIP'))
console.log(welconeMessage('예지', 'basic'))


// 2번 배송비 계산
//
 const deliveryFees = function (ordrerPrice, deliveryArea){
  //배송 지역(키값)에 따른 배송비(값) 객체 만들기
  const fees = {
  "제주" : 6_000 ,
  "도서" : 6_000
  }
  // 논리 연산자를 활용하여 주문 금액에 따른 배송비를 반환하는 변수 만들기
  const calculateDeliveryFee =  (ordrerPrice <= 0 || ordrerPrice >= 50_000) && '0' || (fees[deliveryArea] || 3_000)
 return parseInt(calculateDeliveryFee) + '원'
 }

 //테스트 코드
 //주문 금액 5만원 이상 구매시 배송비
 console.log(deliveryFees(50000,'제주'))
 // 배송지역이 일반 지역일 때 배송비
 console.log(deliveryFees(5000,'경기')) 
 // 배송지역이 제주 또는 도서지역일 떄 배송비
 console.log(deliveryFees(30000, '도서'))
// 배송지역이 빈 문자열인 경우
console.log(deliveryFees(10000, ''))

 
//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// 3번 비밀번호 유효성 검사

//.length 속성 & AND 연산자 사용하여 화살표 함수 표현식 작성
const passwordValidationm = (password) => {
  return (password.length >= 8 && password.length <= 20)

}
//테스트 코드
console.log(passwordValidationm('12345678'))
console.log(passwordValidationm('123456789012345678901'))


//--------------------------------------------------------------------------------------------------------------------------------------------------------------
// 4번 포인트 적립 계산
function earnPoints (paymentAmount, membershipLevel) {
  const calculateEarnpoints = ((membershipLevel === 'VIP' && paymentAmount * 0.05) || (membershipLevel === 'GOLD' && paymentAmount * 0.03) || (membershipLevel === 'SILVER' && paymentAmount * 0.01) || (membershipLevel === '일반' && paymentAmount * 0.005))
  // 소수점은 반환하지 않게 하기 위해 parseInt를 반환값에 적용
  return parseInt(calculateEarnpoints) +'포인트'
}
//테스트 코드
console.log(earnPoints(100000,'VIP'))
console.log(earnPoints(100000,'GOLD'))
console.log(earnPoints(100000,'SILVER'))
console.log(earnPoints(100000,'일반'))

//--------------------------------------------------------------------------------------------------------------------------------------------------------------
