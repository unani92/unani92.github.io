---
title: "[Vue JS] props, emit 연습하기 - 유투브 클론코딩"
excerpt: "Javascript"
categories:
  - Javascript
---

## Intro

vue는 기본적으로 `v-model`이라는 양방향 데이터 바인딩 디렉티브를 제공한다. `v-model`은 한 컴포넌트 내에서 사용자의 입력값을 컴포넌트의 데이터와 바인딩하기에는 좋은 디렉티브이지만, 데이터 흐름을 추적하고 디버깅 측면에서 **부모자식 혹은 동일 레벨의 컴포넌트**와의 데이터 바인딩을 위해 사용하기에 좋은 방법이라 하기 어렵다. 

따라서 다른 컴포넌트와 데이터 흐름을 비교적 쉽게 추적하게 하기 위해서는 단방향 바인딩이 권장된다. 이를 위한 단방향 데이터 흐름은 `pros`와 `emit`을 통해 구현할 수 있다.

### `props`

> prop는 **상위 컴포넌트의 정보를 하위 컴포넌트로 전달**하기 위한 사용자 지정 특성입니다. 하위 컴포넌트는`props` 옵션을 사용하여 수신 할 것으로 기대되는 props를 명시적으로 선언해야합니다. (출처 : vue 공식문서)

###  `emit`

> emit은 다른 컴포넌트에게 이벤트를 전달하기 위해 사용할 수 있다. 예를 들어 자식 컴포넌트에서 사용자지정 이벤트를 만들어 부모 컴포넌트에게 전달할 수 있다. 부모 컴포넌트는 자식 컴포넌트에서 만들어진 사용자지정 이벤트를 받아(`v-on`) 특정 동작을 수행할 수 있다. 

```vue
// 자식 컴포넌트에서 이벤트를 선언
this.$emit('update:foo', newValue)
```

```vue
// 부모 컴포넌트에서 이벤트를 받아 특정 동작을 수행
<component :foo="bar" @update:foo="val => bar = val"></component>
```



## 유투브 클론코딩에 응용하기

![제목 없는 프레젠테이션](https://user-images.githubusercontent.com/53211781/85205077-bfd0a180-b353-11ea-8138-c220ed7f18a1.jpg)

### 1. 컴포넌트 구성

다음과 같이 유투브 클론코딩을 해보려고 한다. 우선 컴포넌트를 기능별로 나눠보면 `1. 영화 검색 메뉴`,` 2. 동영상`, `3. 동영상 목록`,  `4. 동영상 링크` 이렇게 구성해 볼 수 있다. 

#### `videoList.vue`

```vue
<template>
  <div class="about my-4">
    <h1>영화 검색</h1>
    <VideoSearchBar/>
    <div class="viewbody row">
      <VideoDetail/>
      <VideoItems/>
      <!-- 개별 비디오는 VideoItems의 자식 컴포넌트들입니다. -->
    </div>
  </div>
</template>
```



### 2. VideoSearchBar

1. `Input`태그와  `icon` 태그에 이벤트 발생 시 동작하는 함수(`onInput`) 를 선언한다. 
2.  `input-change` 이벤트 발생 시 사용자의 입력값을 함께 넘겨줄 준비를 한다. (`this.$emit(event name, data)`)

#### `videoSearchBar.vue`

```vue
<templates>
  <input @keypress.enter="onInput" class="Input" type="text" placeholder="영화를 검색합니다">
  <i @click="onInput" class="fas fa-search"/>
</templates>

<script>
	export default {
    methods: {
      onInput(event) {
        const ptag = event.target.parentNode;
        const keyword = ptag.querySelector("input")
        const inputText = keyword.value
        if (inputText){
          this.$emit('input-change', inputText)
          keyword.placeholder = keyword.value
          keyword.value = null
        }
      }
    }
  }
</script>
```

3. 자식 컴포넌트에서 정의한 이벤트를 부모 컴포넌트에서 받아서 주어진 함수(`onInput`)를 실행한다. 
4. Ajax 요청을 통해 받은 응답을 데이터에 담아준다. 

#### `videoView.vue`

```vue
<template>
  <div>
    <input @keypress.enter="onInput" class="Input" type="text" placeholder="영화를 검색합니다">
  	<i @click="onInput" class="fas fa-search"/>
  </div>
</template>

<script>
  export default {
    name: "Index",
    data() {
      return {
        videos:[],
        selectedVod: null
      }
    }
    methods: {
      onInput(inputText) {
        axios.get(API_URL,{
          params: {
            ...(유투브 API 가이드 참조)
          })
          .then(
          response => {
            this.videos = response.data.items
            this.selectedVod = response.data.items[0]
          }
      )
      .catch(error => alert(error))
  	}
  }
</script>
```



### 3. VideoDetail

1. 최상위 컴포넌트에서 `selectedVod` 를 videoDetail 컴포넌트로 바인딩을 해준다. 

#### `videoList.vue`

```vue
<VideoDetail :selectedVod="selectedVod"/>
```

2. Props를 통해 바인딩한 데이터를 받아준다. 
3. 받은 데이터를 해당 컴포넌트의 상황에 맞춰 다양하게 활용한다.

#### `videoDetail.vue`

```vue
<template>
	<div>
    <iframe :src="videoUrl" />
  </div>
</template>
<script>
  export default{
    computed() {
      videoUrl() {
        return `https://www.youtube.com/embed/${this.selectedVod.id.videoId}`
      }
    }
  	props: {
      selectedVod: Object
    },  
  }
</script>

```



### 4. VideoItems & VideoItem

이 컴포넌트들은 부모 컴포넌트로부터 영상들(`videos`)도 받아야 하지만(props) 부모 컴포넌트에게 사용자가 클릭한 동영상이 무엇인지 통해 넘겨줘야( `$emit()` ) 한다. 따라서 props와 emit 모두가 사용된다. 

#### props

1. 앞선 요청으로 인해 생성된 videos 데이터를 자식 컴포넌트로 넘겨준다. 

##### `videoList.vue`

```vue
<VideoItems :videos="videos"/>
```

2. 이것을 받아 `v-for` 을 활용해 각각의 video로 쪼갠 뒤 이것을 자식 컴포넌트인 각각의 videoItem에 다시 넘겨준다. 

##### `videoItems.vue`

```vue
<template>
  <ul class="col-md-12 col-lg-4">
    <VideoItem
      v-for="video in videos"
      :key="video.etag"
      :video="video"
    />
  </ul>
</template>
<script>
  import VideoItem from "./VideoItem";
    export default {
      name: "VideoItems",
      components: {
        VideoItem
      },
      props: {
        videos: Array
      },
    }
</script>
```

3. 받은 데이터를 해당 컴포넌트의 상황에 맞춰 적절히 사용한다. 

##### `videoItem.vue`

```vue
<template>
  <li>
    <img :src="thumbnail">
    <div class="media-body d-flex justify-content-center align-items-center">
      <span v-html="video.snippet.title"/>
    </div>
  </li>
</template>

<script>
  export default {
    name: "VideoItem",
    props: {
      video: Object,
    },
    data() {
      return {
        thumbnail: this.video.snippet.thumbnails.default.url
      }
    },
  }
</script>
```



#### emit

1. `videoItem` 을 클릭하면 `videoItems`로 이벤트와 해당 비디오 데이터를 넘겨준다. 

##### `videoItem.vue`

```vue
<li @click="onVideoSelect">
<script>
  methods: {
    onVideoSelect() {this.$emit('selectVideo',this.video)}
  }
</script>
```

2. `videoItem` 에서 신호를 받으면 `videoList`로 다시 넘겨준다.

##### `videoItems.vue`

```vue
<VideoItem @selectVideo="onVideoSelect"/>
<script>
  methods: {
    onVideoSelect(video) {this.$emit("selectVideo",video)}
  }
</script>
```

3. `videoList` 에서 신호를 받아 selectedVod 데이터를 바꿔준다. 

##### `videoList.vue`

```vue
<VideoItems @selectVideo="onVideoSelect" :videos="videos"/>
<script>
  export default {
    name: "Index",
    data() {
      return {
					...
        selectedVod: null
      }
    }
    methods: {
      	...
    		...
    	onVideoSelect(video) {this.selectedVod = video}
  }
</script>
```

4. 상기한 props 데이터 흐름을 통해 `selectedVod`를 `videoDetail` 컴포넌트로 넘겨준다. 

