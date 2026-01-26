// 활성화/비활성화 aria-hidden 속성 추가/제거 제어해야함



//요소 선택(버튼 및 해당 컨텐츠)후 변수 선언

const buttonList = document.querySelectorAll('button')
console.log(buttonList)
const tabContentList = document.querySelectorAll('.tab-content')
console.log(tabContentList)


//금액 쉼표 표시 및 숫자값으로 반환되게 작성


/**
 * 버튼 클릭 시 연결되어야 할 것
 * 1. 활성화/비활성화 aria-hidden 속성으로 아티클 추가/제거 제어해야함✅
 * 2. 버튼에 해당되는 컨텐츠가 나오도록 클래스 추가✅
 * 3. 해당 컨텐츠를 선택하면, 나머지 컨텐츠에 활성화 클래스 네임 제거✅
 * 4. 해당 버튼 탭을 누르면 다른 버튼 탭을 읽지 않도록 aria-selected 추가/제거
 * 
 */


for(let i =0, l= buttonList.length; i < l; i++){
  const buttonItem = buttonList[i]
  buttonItem.addEventListener('click',()=>{
    for(let contentindex = 0, articleLength = tabContentList.length; contentindex < articleLength; contentindex++){
      const articleItem = tabContentList[contentindex]
     if(i === contentindex) {
        articleItem.classList.add('is-active')
        articleItem.setAttribute('aria-hidden', 'false')
        buttonItem.setAttribute('aria-selected', 'true')  
      } else {
        articleItem.classList.remove('is-active')
        articleItem.setAttribute('aria-hidden', 'true')
        buttonList[contentindex].setAttribute('aria-selected', 'false')
      }
    }
  }
)
}

// forEach 문 활요

// 함수 대입하여 이벤트 생성

//테스트 코드
console.log(buttonList)
console.log(tabContentList)
