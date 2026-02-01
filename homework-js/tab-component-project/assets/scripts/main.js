// 활성화/비활성화 aria-hidden 속성 추가/제거 제어해야함

//요소 선택(버튼 및 해당 컨텐츠)후 변수 선언

const buttonList = document.querySelectorAll("button");
console.log(buttonList);
const tabContentList = document.querySelectorAll(".tab-content");
console.log(tabContentList);

//금액 쉼표 표시 및 숫자값으로 반환되게 작성

/**
 * 버튼 클릭 시 연결되어야 할 것
 * 1. 활성화/비활성화 aria-hidden 속성으로 아티클 추가/제거 제어해야함✅
 * 2. 버튼에 해당되는 컨텐츠가 나오도록 클래스 추가✅
 * 3. 해당 컨텐츠를 선택하면, 나머지 컨텐츠에 활성화 클래스 네임 제거✅
 * 4. 해당 버튼 탭을 누르면 다른 버튼 탭을 읽지 않도록 aria-selected 추가/제거
 *
 */

for (let i = 0, l = buttonList.length; i < l; i++) {
  const buttonItem = buttonList.item(i);
  buttonItem.addEventListener("click", () => {
    for (
      let contentindex = 0, articleLength = tabContentList.length;
      contentindex < articleLength;
      contentindex++
    ) {
      const articleItem = tabContentList[contentindex];
      if (i === contentindex) {
        articleItem.classList.add("is-active");
        articleItem.setAttribute("aria-hidden", "false");
        articleItem.setAttribute("aria-selected", "true");
        buttonItem.setAttribute("aria-pressed", "true");
      } else {
        articleItem.classList.remove("is-active");
        articleItem.setAttribute("aria-hidden", "true");
        articleItem.setAttribute("aria-selected", "false");
        buttonList[contentindex].setAttribute("aria-pressed", "false");
      }
    }
  });
}

// !!! 목요일에 해볼것: 접근성 관련 함수 만들어야함
// 개발자 도구에서 selected가 전혀 접근성이 지켜지지 않음
/**
 * aria 상태 속성을 목적에 맞게 사용해야 하는데요. 

버튼의 경우, '누른다/누르지않는다' 상태를 가지는 것이 
'선택한다/선택하지않는다' 상태 의미 보다 적절해요. 
버튼을 누른다고 하지, 선택한다고 말하지 않으니까요. 😊 

반면 탭 패널에서 탭은 여러 탭 중 하나를 '선택한다는 의미를 가져요.
물론 탭을 '누른다'는 것처럼 생각할 수 있겠지만, 여러 탭 중 하나를 
'선택한다'는 의미가 더 자연스럽습니다. 

그래서 탭 역할을 하는 요소에는 aria-selected를 사용한 거겠죠.
그리고 해당 요소가 탭임을 명시하기 위해 role="tab"을 설정하고, 
role="tablist" 요소 내부에서 사용할 때 의미가 보다 명확해집니다. 

이와 달리, 버튼은 단독으로 aria-pressed를 사용할 수 있어요. 🙂
 */

// forEach 문 활요

// 함수 대입하여 이벤트 생성

//테스트 코드
console.log(buttonList);
console.log(tabContentList);
