---
title: "[Vue JS] Routing 연습하기(with lodash)"
excerpt: "Javascript"
categories:
  - Javascript
---

## intro : vue에서의 routing이란 
> 서버 사이드에서 라우팅은 URI에 해당하는 html을 렌더링하는 것이다. 
> 하지만 SPA 방식의 앱에서 라우팅은 DOM 조작을 통해 해당하는 뷰를 구현할 수 있다. 

이러한 차이를 단적으로 설명하자면 **새로고침** 을 통해 말할 수 있다. 
서버사이드의 라우팅은 새로운 `html페이지를 렌더링`해서 사용자에게 보여주기 때문에 **새로고침** 과정이 필연적이다. 
하지만 SPA 방식의 라우팅은 서버와의 통신이 일어나지 않고 `브라우저의 JS`를 통해 단일 페이지에서 수정되는 부분만 바뀌기 때문에 **새로고침이 일어나지 않는다.** 

## Routing 구현하기
<img width="823" alt="스크린샷 2020-05-28 오전 12 48 59" src="https://user-images.githubusercontent.com/53211781/83042870-1a405000-a07d-11ea-9127-3097c167c04b.png">

이미지와 같이 vue cli에서 제공하는 기능을 활용해 네비게이션바가 있는 vue app을 만들어보자

### 1. route 기능 붙이기
```bash
$ vue add route

? What do you want to generate? Initial framework
? Use history mode for router? Yes
```

여기서 `history mode`는 yes로 설정해주자. No라고 한다면 `hash mode`가 설정된다.
이는 url에 hash(#)을 사용해 url을 불러온다. `history mode`는 **hash(#)을 제거한 url**을 사용한다. 

설치가 완료되면 `../src/router` 디렉터리가 생성된다. router 폴더 안에는 `index.js` 파일이 자동으로 생성된다. 

### 2. index.js 파헤치기

#### index.js
```vuejs
import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "@/views/Index";
Vue.use(VueRouter)

const routes = [
{ path: '/', name: 'Index', component: Index, },
]

// eslint-disable-next-line no-new
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
```

서버사이드 렌더링의 예시인 Django로 따지면 `urls.py` 패턴과 유사한 로직이다. 

```python
from django.urls import path
from . import views

app_name = 'app_name'
urlpatterns = [
    path('app/route', views.function, name="name")
]
```

장고의 function에 해당하는 (1)`component를 import`하고 (2)`url 패턴을 지정`해주고
(3)`component를 명시`함으로써 라우팅 기능을 구현할 수 있다. 

그렇다면 component는 어디에 어떻게 작성할 수 있는가?

### 3. Component 구성하기

component는 `app.vue`, `router`, `components` 등과 같은 곳에 있는
`src` 폴더 하위에 views 디렉터리에 위치시킨다. `BASE_DIR/src/views/views` 
views 디렉터리가 없으면 폴더를 생성한다. 

#### index.vue

vue 파일의 구성은 `<template>`,`<script>`,`<style scoped>` 로 이루어진다. 
**vue 파일 각각은 SPA의 기능 하나 하나를 의미**한다. 이러한 파일(개별 기능)들이 모여 `APP.vue` 에서 취합함으로써
싱글 페이지 어플리케이션 하나가 완성이 된다. 
```vue
<template>
  <div>
    <h1>Index</h1>
    <p>제공하는 기능</p>
    <p>로또 번호 추첨 | 점심메뉴 추천</p>
  </div>
</template>

<script>
    export default {
        name: "Index"
    }
</script>
```

#### 번외 : lodash 라이브러리 사용하기
> 종종 랜덤 샘플링, 수학적 기능을 자바스크립트를 통해 사용하고자 할 일이 있다.
> 하지만 자바스크립트는 이러한 기능을 구현하기 어렵다.(물론 가능은 하지만....)
> 따라서 이러한 활동을 쉽게 할 수 있는 라이브러리를 활용하고자 한다. 
> https://www.npmjs.com/package/lodash

##### install
```bash
$ npm i lodash
```
##### import
```vue
<script >
  import _ from 'lodash'
</script>
```

#### Lotto.vue

##### `<script>` `getLottoNumber()`
빈 number 값을 설정한 뒤 버튼을 클릭하면 작동하게 될 `getLottoNumber`를 만들어준다. 
숫자 6개를 샘플링하면 [] 안에 담겨저 나오고 대괄호까지 출력되기 때문에 약간의 조치를 취했다. 
1에서 46의 범위 안에서 랜덤 숫자를 하나 출력하는데 이것을 6번 진행하면 임의의 로또번호 6개를 뽑을 수 있다.

##### `<template>`
- 사용자가 제출할 수 없는 input 태그를 만들고 그곳에 number를 바인딩한다. 
- 버튼 클릭 시 함수가 동작하도록 이벤트를 걸어준다. `v-on:click === @click`

```vue
<template>
  <div>
    <h1 class="my-3">Lotto</h1>
    <p><input v-bind:value="number" class="Input" type="text" disabled></p>
    <button @click="getLottoNumber" class="btn btn-success">번호 추천</button>
  </div>
</template>

<script>
  import _ from 'lodash'
    export default {
        name: "Lotto",
        data() {
            return {
                number:""
            }
        },
        methods: {
            getLottoNumber() {
              this.number = ""
              for (let i=0; i<6; i++) {
                  this.number += (String(_.sample(_.range(1,46))) + " ")
                }
            }
        }
    }
</script>

<style scoped>
  .Input {
    width: 250px;
    text-align: center;
    font-size: 1rem;
    border: 0;
    outline: 0;
    background: transparent;
    border-bottom: 3px solid black;
  }
</style>
```

### App.vue 에 컴포넌트 연결하기

라우터는 **네비게이션 바**와 개별 컴포넌트들의 **내용** 두개로 구성된다. 
- `<router-link to="url">` : `../src/router/index.js` 에서 정의한 url 패턴에 맞게 네비게이션바를 만든다.
- `<router-view/>` : 라우터 링크에 해당하는 부분만을 바꿔 컴포넌트 `<template>`에서 정의한 내용을 보여준다.

```vue
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Index</router-link> |
      <router-link to="/lotto">Lotto</router-link> |
      <router-link to="/lunch">Lunch</router-link>
    </div>
    <router-view/>
  </div>
</template>
```
<img width="551" alt="스크린샷 2020-05-28 오전 2 13 06" src="https://user-images.githubusercontent.com/53211781/83051332-dbb09280-a088-11ea-87d1-440204565027.png">

url은 바뀌었지만 새로고침 렌더링이 발생하지 않는다. 즉 **서버로 요청을 보내는 것이 아니라는 의미**이다. 
다만 라우팅이 이루어지면 브라우저의 JS가 **DOM 조작을 통해 해당하는 부분만을 바꿔 렌더링**하는 것이 SPA의 라우팅이라고 할 수 있다.

