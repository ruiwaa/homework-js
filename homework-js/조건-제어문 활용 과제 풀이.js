// 2번 배송비 계산
//
  let shippingFee = null
 const deliveryFees = function (orderPrice, deliveryArea){
  orderPrice = parseInt(orderPrice)
if(orderPrice <= 0 || 50_000 <= orderPrice ){
  shippingFee = 0
}
 else if(deliveryArea === '제주' || deliveryArea === '도서'){
  shippingFee = 6_0000
 }
  else {
    shippingFee = 3_000
  }
 return shippingFee + '원'
 }
//테스트 코드
 //주문 금액 5만원 이상 구매시 배송비
 console.log(deliveryFees('60000원','도서'))
 // 배송지역이 일반 지역일 때 배송비
 console.log(deliveryFees(5000,'경기')) 
 // 배송지역이 제주 또는 도서지역일 떄 배송비
 console.log(deliveryFees(30000, '도서'))
// 배송지역이 빈 문자열인 경우
console.log(deliveryFees(10000, ''))

//4번 포인트 적립 계산
const getPoints = function(purchasePrice, membershipGrade){
  purchasePrice = parseInt(purchasePrice)
  let countPoints = null
  if(membershipGrade === 'VIP'){
    countPoints = purchasePrice * 0.05
  }
  else if (membershipGrade === 'GOLD'){
    countPoints = purchasePrice * 0.03
  }
  else if(membershipGrade === 'SILVER'){
    countPoints = purchasePrice * 0.01
  }
  else {
    countPoints = purchasePrice * 0.005
  }
  return countPoints + '점'
}
console.log(getPoints(100000,'VIP'))
console.log(getPoints(100000,'GOLD'))
console.log(getPoints(100000,'SILVER'))
console.log(getPoints(100000,'일반'))

// 5번 영화 티켓 가격 계산
const movieTicketPrice = function (movieType, is_earlybird_discount, audienceCount ){

  const movieTypePrice = {
  '일반': 14_000,
  '3D': 17_000,
  'IMAX': 20_000
}
let earlybirdDiscount = null
//반환값에 반복되는 변수이름 간소화하기 위해 새로운 변수 선언
let basePrice = movieTypePrice[movieType]

if(is_earlybird_discount === true){
 earlybirdDiscount = movieTypePrice[movieType] * 0.2
} else{
  earlybirdDiscount = 0
}
  return (basePrice - earlybirdDiscount) * parseInt(audienceCount)
}
//테스트 코드
// 일반 영화, 조조 할인 O, 4명
console.log(movieTicketPrice('일반', true, 4)) 
// 3D 영화, 조조 할인 X, 2명
console.log(movieTicketPrice('3D', false, 2)) 
// IMAX 영화, 조조 할인 O, 3명
console.log(movieTicketPrice('IMAX', true, 3))   