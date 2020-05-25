---
title: "Vanilla JS로 momentum 클론코딩하기 1"
excerpt: "Javascript"
categories:
  - Javascript
---

![image-20200520001229052](https://user-images.githubusercontent.com/53211781/82825194-c2bbac00-9ee5-11ea-95e7-aaa95fb7e5ec.png)

## 클론코딩 컨셉
> 화면에 큰 시계와 함께 간단하게 toDo 리스트를 작성하고 수정 및 삭제할 수 있는 앱을 vanilla JS로 클론코딩해 보았다. 

### 변수 할당

DOM 조작을 통해 시계를 집어넣을 공간은 다음과 같다. 
```html
<div class="clock">
    <h1 class="my-5">00:00</h1>
</div>
```
> h1 태그 안의 내용은 더미 텍스트로 어차피 시간에 맞춰저 해당 내용은 변할 것이다. 구글 모멘텀을 보고 똑같이 글자 크기를 1000%로 하니(`font-size: 1000%;`) 얼추 비슷하게 나왔다. 

`querySelector()` 메서드를 통해 시계를 넣고자 하는 노드를 뽑고 변수에 저장한다. 
    - 해당하는 div를 먼저 추출하고 div의 자식에 해당하는 h1을 뽑아낸다.
```javascript
const clockDiv = document.querySelector(".clock")
const clockTitle = clockDiv.querySelector("h1")
```

### 시간 표시 함수 만들기


#### 시간 표시 함수의 콜백함수화
결국 최종 목표는 매 초마다 변화하는 시각을 사용자 뷰에 표시하는 것이다. 이를 위해 시간표시용 함수가 1초에 한번씩 업데이트가 되도록 만들어야 한다. 이를 위해 `setInterval(callback,microsecond)` 함수를 사용한다.
```javascript
function init() {
    setInterval(getTime,1000);
}
init();
```

#### 시간 표시 함수(getTime) 만들기 
```javascript
const getTime = function() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    clockTitle.innerText = `${amFm(hours)} : ${amFm(minutes)} : ${amFm(seconds)}`;
}
```
`const date = new Date()`를 통해 현재의 날짜 및 시간을 추출한다. 할당된 date 객체는 다양한 인스턴스들을 가지고 있으며 연도, 날짜, 시간, 분, 초 등 다양한 값들을 추출할 수 있다. 추출된 숫자들을 각각의 변수들에 담아주고 이를 출력하면 될 줄 알았으나.....

#### 출력 형식 조정하기
1자리수 시간은 1자리로 출력된다는 문제가 있다. 예를 들어 오후 10시 1분 1초라고 하면 22:1:1 이런 식의 출력이 나온다는 의미이다. 시간값을 인자로 받는 함수 `amFm(time)` 하나를 더 만들어 출력 형식을 모든 경우에 2자리 숫자로 보정할 수 있다. 간단하게 **10보다 작은 수는 앞에 00 형식으로 만들기 위해 interpolation을 이용한다.**
```javascript
const amFm = function(time) {
    if (time < 10) {
        return `0${time}`
    } else {
        return time
    }
}
```