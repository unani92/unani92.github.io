var store = [{
        "title": "Vanilla JS로 momentum 클론코딩하기 1",
        "excerpt":"클론코딩 컨셉 화면에 큰 시계와 함께 간단하게 toDo 리스트를 작성하고 수정 및 삭제할 수 있는 앱을 vanilla JS로 클론코딩해 보았다. 변수 할당 DOM 조작을 통해 시계를 집어넣을 공간은 다음과 같다. &lt;div class=\"clock\"&gt; &lt;h1 class=\"my-5\"&gt;00:00&lt;/h1&gt; &lt;/div&gt; h1 태그 안의 내용은 더미 텍스트로 어차피 시간에 맞춰저 해당 내용은 변할 것이다. 구글 모멘텀을...","categories": ["Javascript"],
        "tags": [],
        "url": "http://localhost:4000/javascript/Vanilla-JS%EB%A1%9C-momentum-%ED%81%B4%EB%A1%A0%EC%BD%94%EB%94%A9%ED%95%98%EA%B8%B0-1/",
        "teaser": "http://localhost:4000/assets/images/background.jpeg"
      },{
        "title": "Vanilla JS로 momentum 클론코딩하기 2",
        "excerpt":"기본 컨셉 1. 할 일을 입력 후 enter를 친다. 2. toDo List에 업데이트된다. 3. 할일 마감 후 toDo의 글자부분을 클릭하면 Complete로 이동한다. 4. 이동된 toDo는 취소선이 그어지며, 클릭 시 다시 toDo List로 이동한다. 5. 수정 및 삭제는 ToDo List, Completed 어디에서도 가능하다. 초기 변수 선언 및 할당 const form =...","categories": ["Javascript"],
        "tags": [],
        "url": "http://localhost:4000/javascript/Vanilla-JS%EB%A1%9C-momentum-%ED%81%B4%EB%A1%A0%EC%BD%94%EB%94%A9%ED%95%98%EA%B8%B02/",
        "teaser": "http://localhost:4000/assets/images/background.jpeg"
      },{
        "title": "Axios 라이브러리를 통한 비동기처리 방식",
        "excerpt":"Index : 비동기 처리란 무엇인가? 정의 : 특정 코드의 연산이 끝날 때까지 코드의 실행을 멈추지 않고 다음 코드를 먼저 실행하는 자바스크립트의 처리 이것은 왜 필요한가? 이렇듯 특정 로직의 실행이 끝날 때까지 기다려주지 않고 나머지 코드를 먼저 실행하는 일은 브라우저에서 효율적인 작업을 위해 필요하다. 이해를 위해 일상적인 사례를 비유로 들어보자 오늘...","categories": ["Javascript"],
        "tags": [],
        "url": "http://localhost:4000/javascript/axios-%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC%EB%A5%BC-%ED%86%B5%ED%95%9C-%EB%B9%84%EB%8F%99%EA%B8%B0%EC%B2%98%EB%A6%AC-%EB%B0%A9%EC%8B%9D/",
        "teaser": "http://localhost:4000/assets/images/background.jpeg"
      },{
        "title": "[Vue JS] 무한스크롤과 라이프사이클 Hook",
        "excerpt":"intro Life Cycle Hook in Vue &lt;이미지 출처 : https://codingexplained.com/coding/front-end/vue-js/vue-instance-lifecycle-hooks&gt; Vue 인스턴스가 생성되고 소멸되기까지의 과정 속에서 콜백 함수를 걸어줌으로써 DOM 조작을 할 수 있다. 다시말해 인스턴스가 생성(Create), HTML 노드와 연결되고(Mount) 변화되는(Update) 되는 순간을 JS로 탐지하고(Hook) 적절한 function을 통해 조작할 수 있다. Vue의 라이프사이클 Hook을 이해하고 적절한 타이밍에 DOM 조작을 함으로써...","categories": ["Javascript"],
        "tags": [],
        "url": "http://localhost:4000/javascript/lifecyclehooks/",
        "teaser": "http://localhost:4000/assets/images/background.jpeg"
      },{
        "title": "[Vue JS] Routing 연습하기(with lodash)",
        "excerpt":"intro : vue에서의 routing이란 서버 사이드에서 라우팅은 URI에 해당하는 html을 렌더링하는 것이다. 하지만 SPA 방식의 앱에서 라우팅은 DOM 조작을 통해 해당하는 뷰를 구현할 수 있다. 이러한 차이를 단적으로 설명하자면 새로고침 을 통해 말할 수 있다. 서버사이드의 라우팅은 새로운 html페이지를 렌더링해서 사용자에게 보여주기 때문에 새로고침 과정이 필연적이다. 하지만 SPA 방식의 라우팅은...","categories": ["Javascript"],
        "tags": [],
        "url": "http://localhost:4000/javascript/vue_cli_route/",
        "teaser": "http://localhost:4000/assets/images/background.jpeg"
      },{
        "title": "[Vue JS] 디렉티브 속성들을 활용한 Todo app 구현하기",
        "excerpt":"intro v-on : Vanilla JS의 addEventListener와 같다. shortcut으로 @로 대신할 수도 있다. v-bind : HTML의 속성의 값에 대해 interpolate을 할 때 사용한다. shortcut으로 :로 대신할 수 있다. &lt;a :href=\"googleUrl\"&gt;Google&lt;/a&gt; &lt;a v-bind:href=\"naverUrl\"&gt;Naver&lt;/a&gt; &lt;script &gt; new Vue({ ... ... data: { googleUrl: \"https://google.com\", naverUrl: \"https://naver.com\", randomImageUrl: \"https://picsum.photos/200\", altText:\"random-image\", } }) &lt;/script&gt; v-model...","categories": ["Javascript"],
        "tags": [],
        "url": "http://localhost:4000/javascript/vue-%EB%94%94%EB%A0%89%ED%8B%B0%EB%B8%8C-%EC%86%8D%EC%84%B1/",
        "teaser": "http://localhost:4000/assets/images/background.jpeg"
      },{
        "title": "[Django] 세상에서 제일 쉽고 빠른 토큰 방식의 인증 구현하기",
        "excerpt":"articles/serializers.py 외부키로 연결된 user를 채우기 위해 accounts/serializers.py 를 가져온다. 완전히 DB에 저장되기 전에 not null constraint를 방지하기 위해 required=False 인자를 채워준다. from rest_framework import serializers from .models import Article from accounts.serializers import UserSerializer class ArticleListSerializer(serializers.ModelSerializer): class Meta: model = Article fields = ['id', 'title','content' ,'created_at'] class ArticleSerializer(serializers.ModelSerializer): user = UserSerializer(required=False)...","categories": ["Django"],
        "tags": [],
        "url": "http://localhost:4000/django/Django-%ED%86%A0%ED%81%B0-%EB%B0%A9%EC%8B%9D-%EC%9D%B8%EC%A6%9D/",
        "teaser": "http://localhost:4000/assets/images/background.jpeg"
      },{
        "title": "[Vue JS] props, emit 연습하기 - 유투브 클론코딩",
        "excerpt":"Intro vue는 기본적으로 v-model이라는 양방향 데이터 바인딩 디렉티브를 제공한다. v-model은 한 컴포넌트 내에서 사용자의 입력값을 컴포넌트의 데이터와 바인딩하기에는 좋은 디렉티브이지만, 데이터 흐름을 추적하고 디버깅 측면에서 부모자식 혹은 동일 레벨의 컴포넌트와의 데이터 바인딩을 위해 사용하기에 좋은 방법이라 하기 어렵다. 따라서 다른 컴포넌트와 데이터 흐름을 비교적 쉽게 추적하게 하기 위해서는 단방향 바인딩이...","categories": ["Javascript"],
        "tags": [],
        "url": "http://localhost:4000/javascript/props_emit/",
        "teaser": "http://localhost:4000/assets/images/background.jpeg"
      }]
