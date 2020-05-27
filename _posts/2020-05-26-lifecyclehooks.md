---
title: "[Vue JS] 무한스크롤과 라이프사이클 Hook"
excerpt: "Javascript"
categories:
  - Javascript
---

## intro

### Life Cycle Hook in Vue
![image](https://user-images.githubusercontent.com/53211781/82904340-4a182680-9f9d-11ea-8b91-22043d0bd02e.png)
<이미지 출처 : https://codingexplained.com/coding/front-end/vue-js/vue-instance-lifecycle-hooks>

> Vue 인스턴스가 생성되고 소멸되기까지의 과정 속에서 콜백 함수를 걸어줌으로써 DOM 조작을 할 수 있다.
> 다시말해 인스턴스가 생성(Create), HTML 노드와 연결되고(Mount) 변화되는(Update) 되는 순간을 JS로 탐지하고(Hook)
> 적절한 function을 통해 조작할 수 있다. 

Vue의 라이프사이클 Hook을 이해하고 적절한 타이밍에 DOM 조작을 함으로써 무한스크롤이 구현된 간단한 APP을 만들어 보았다. 

### vue 인스턴스 생성하기
![image](https://user-images.githubusercontent.com/53211781/82914027-fcee8180-9fa9-11ea-9df1-cb718d463fe6.png)

다음과 같은 사진과 문구 5000개가 쏟아지는데 이를 무한스크롤로 구현하려 한다. 

준비 과정은 평소와 크게 다르지 않다. 다만 비동기처리를 위한 라이브러리와 무한스크롤을 위한 `scrollmonitor` CDN을 추가로 로딩한다.
```html
<div id="app">

</div>
<div id="bottomSensor"></div>
<!--Vue CDN-->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<!--무한스크롤 구현을 위한 라이브러리 CDN-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/scrollmonitor/1.2.0/scrollMonitor.js" integrity="sha256-BseZlDlA+yL4qu+Voi82iFa5aaifralQEXIjOjaXgeo=" crossorigin="anonymous"></script>
<!--비동기처리를 위한 axios 라이브러리 CDN-->
<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
```
#### JS
```javascript
const app = new Vue({
    el: "#app",
    data: {
        photos: [],
        page: 1,    
    },
})
```
 
## Created
> `data, computed, methods, watch` 등에 접근이 가능
> 아직 DOM에 추가되지는 않은 상태

### 사진을 불러오는 매서드 정의하기
```html
<div id="app">
  <div v-for="photo in photos">
    <h5>{{photo.title}}</h5>
    <img :src="photo.thumbnailUrl" alt="">
  </div>
</div>
```
#### JS
```javascript
const app = new Vue({
    el: "#app",
    data: {
        photos: [],
        page: 1,    
    },
    methods: {
        getPhotos: function() {
            const option = {
                param: {
                    params: {
                        _page: this.page++,
                        _limit: 5,
                    }
                }
            }
            axios.get("https://jsonplaceholder.typicode.com/photos",options)
                .then(
                    res => {
                        this.photos = [...this.photos,...res.data]
                    })   
        }
    }
})
```
axios 객체는 특정 API나 URL에서 **파라미터 값을 같이 넘겨주어 GET 요청을 보낼 수 있다.** 
API를 설명하자면 더미데이터를 가져올 수 있도록 오픈된 API이며
파라미터 값으로 페이지와 한 페이지에 몇 개의 데이터를 넘겨줄 지 설정할 수 있다.

### `getPhtotos` 함수를 통해 사용자 뷰에 사진을 보여주는 과정
1. API url을 GET 요청을 통해 불러와 promise 객체로 만든다.
    - 요청을 넘겨줄 때 url 뒤에 붙여줄 파라미터 변수를 같이 넘겨준다.
2. 요청을 통해 가져온 데이터들을 `photos` 배열에 concat한다. 
3. `v-for` 디렉티브를 통해 `photos` 배열에 담긴 데이터를 하나씩 빼준다. 

### Created 되는 순간에 콜백함수 적용하기
```javascript
const app = new Vue({
            ...
            ...
    created: {
        this.getPhotos()
    }
})
```
Vue 인스턴스가 아직 DOM에 추가되지는 않은 상태이지만 `data와 method`를 **추적할 수 있다.** 
data를 세팅하거나 이벤트 선언, 특히 **(1)ajax 요청을 보내기 좋은 단계**이다.
또한, **(2)미리 데이터를 준비해야 사용자 뷰에 노출이 가능** 하기 때문에
`Created` 단계에서 데이터를 불러오는 것이 필요하다. 

## Mounted
> Vue 인스턴스가 DOM에 부착되고 난 이후 실행되는 단계이다. 
> 따라서 `this.$el`에 접근이 가능하며 모든 요소에 접근이 가능하다. 

### 무한스크롤 구현 매서드 정의
> 무한스크롤을 구현하기 위해서는 **스크롤이 바닥으로 내려갔다는 사실을 Vue 인스턴스가 인식**하는 데 부터 시작한다.
> 스크롤이 `bottomSensor` 박스를 만난다는 것은 스크롤이 바닥으로 내려갔다는 것을 의미한다. 
> app과 관련된 Vue 인스턴스가 DOM에 완전히 부착이 되어야 스크롤이 바닥으로 내려갔을 때 app에서 사진을 새로 불러올 수 있다. 
> 따라서 완전히 부착된(`mounted`) 상태에서 무한스크롤의 콜백이 실행되는 것이 적절하다. 
```html
<div id="app"></div>
<div id="bottomSensor"></div>
```
#### 스크롤 이벤트 활용하기(scrollMonitor 공식문서 참조)
1. 스크롤이 바닥으로 왔음을 인식할 수 있도록 HTML 노드를 선택한다. 
2. 스크롤과 관련된 이벤트를 생성하기 위한 scrollMonitor 객체를 생성한다.
3. 생성된 객체가 스크롤에 들어오면(`enterViewport`) `getPhotos` 콜백을 실행한다. 
```javascript
const app = new Vue({
        ...
    methods: {
            ...
            ...
        //무한스크롤 구현 부분
        addScrollWatcher: function () {
            const bottomSensor = document.querySelector("#bottomSensor")
            const watcher = scrollMonitor.create(bottomSensor)
            watcher.enterViewport(() => {
                // 서버 과부하를 막기 위한 안전장치 0.5초
                setTimeout(() => {
                  this.getPhotos()
                },500)
            })
        }
    },
    mounted: function () {
        this.addScrollWatcher()
    }
})
```
## Updated
> Vue 인스턴스가 실제 DOM에 붙고(`mounted`) 난 이후 호출된다. 
> 변경된 data를 DOM을 이용해 접근하려 할 때 적합하다. 
> 따라서 mounted된 이후 뷰포트가 꽉 찰 때 까지 데이터를 불러오고 싶을 경우 사용할 수 있다. 

#### 화면을 꽉 채울 때 까지 데이터 불러오기
데이터 객체가 바뀌고 나서 화면이 다시 렌더된 이후(예 : 무한스크롤 로직 1회 실행이 된 이후)에 `updated` Hook을 실행한다.
1. HTML 노드를 불러와 `scrollMonitor` 객체를 만들어서 변수에 담아준다.
2. 해당 객체가 보인다면(스크롤이 바닥까지 내려왔다면) 스크롤 바닥까지 데이터를 불러온다.
```javascript
const app = new Vue({
        ...
    methods: {
            ...
        data: {
                photos: [],
                page: 1,    
                },
        //무한스크롤 구현 부분
        loadUntilViewportIsFull: function () {
                const bottomSensor = document.querySelector("#bottomSensor")
                const watcher = scrollMonitor.create(bottomSensor)
                if (watcher.isFullyInViewport) {
                    this.getPhotos()
                }
            }
    },
    updated: function () {
        this.loadUntilViewportIsFull()
    }
})
