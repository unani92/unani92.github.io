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
      },{
        "title": "[React JS] React 입문하기 - 설치, 프로젝트 시작, component, props",
        "excerpt":"리액트 설치하기 리액트를 시작하기 위해서는 node 환경에서 npx를 설치해야 한다. 윈도우의 경우에는 node 공식 홈페이지에서 다운 받을 수 있으며, 맥 환경에서는 홈브류를 통해 쉽게 다운로드 가능하다.(최신 버전을 설치해도 큰 문제는 없으나 버전 호환이 확실하지 않은 경우에는 이미 안정성이 보장된 버전을 특정해 설치도 가능하다.) $ brew install node@[version] npm과 npx npm은...","categories": ["Javascript"],
        "tags": [],
        "url": "http://localhost:4000/javascript/react-%EC%9E%85%EB%AC%B8%ED%95%98%EA%B8%B0/",
        "teaser": "http://localhost:4000/assets/images/background.jpeg"
      },{
        "title": "[Typescript] Typescript 입문하기 - 왜 Typescript를 사용하나요?",
        "excerpt":"intro: 사용하는 이유 자바스크립트의 장점이자 단점인 자유도로 인해 프로젝트가 거대해지고 협업 주체들이 많아질수록 단점이 부각된다. 예를 들어 디버깅을 하는 상황에서 특정 부분에서 undefined가 발생해 코드가 실행되지 않는다던가 하는 상황에서 엄격한 규칙이 없는 js는 문제가 있다. 따라서 타입스크립을 통해 엄격한 형식을 강제함으롬써 이러한 문제들을 줄이기 위해 사용한다. 0. 개발환경 만들기 typescript...","categories": ["Javascript"],
        "tags": [],
        "url": "http://localhost:4000/javascript/typescript_intermediate/",
        "teaser": "http://localhost:4000/assets/images/background.jpeg"
      },{
        "title": "[Algorithm] 백준 14502 : 연구소",
        "excerpt":"intro 문제 링크 코로나 시국에 맞는 BFS DFS를 모두 사용해서 해결할 수 있는 좋은 문제라고 생각한다. 연구소는 크기가 N×M인 직사각형으로 나타낼 수 있으며, 직사각형은 1×1 크기의 정사각형으로 나누어져 있다. 연구소는 빈 칸, 벽으로 이루어져 있으며, 벽은 칸 하나를 가득 차지한다. 일부 칸은 바이러스가 존재하며, 이 바이러스는 상하좌우로 인접한 빈 칸으로...","categories": ["Algorithm"],
        "tags": [],
        "url": "http://localhost:4000/algorithm/algorithm-%EC%97%B0%EA%B5%AC%EC%86%8C/",
        "teaser": "http://localhost:4000/assets/images/background.jpeg"
      },{
        "title": "[Algorithm] 백준 15686 : 치킨배달",
        "excerpt":"intro 문제 링크 크기가 N×N인 도시가 있다. 0은 빈 칸, 1은 집, 2는 치킨집이다. 0 2 0 1 0 1 0 1 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 1 2 임의의 두 칸 (r1, c1)과 (r2, c2) 사이의 거리는 ** r1-r2...","categories": ["Algorithm"],
        "tags": [],
        "url": "http://localhost:4000/algorithm/algorithm-%EC%B9%98%ED%82%A8%EB%B0%B0%EB%8B%AC/",
        "teaser": "http://localhost:4000/assets/images/background.jpeg"
      },{
        "title": "[SWEA] 2112. [모의 SW 역량테스트] 보호 필름",
        "excerpt":"intro 문제링크 dfs 문제 해결 시 필요 없는 부분을 빠르게 솎아내는 백트래킹이 중요하다는 것을 알려주는 문제라고 생각한다. 보호 필름의 성능을 검사하기 위해 합격기준 K라는 값을 사용한다. 단면의 모든 세로방향에 대해서 동일한 특성의 셀들이 K개 이상 연속적으로 있는 경우에만 성능검사를 통과하게 된다. [Fig. 4]는 세 번째 막에 약품 A를 투입하여 특성...","categories": ["Algorithm"],
        "tags": [],
        "url": "http://localhost:4000/algorithm/algorithm-swea-film/",
        "teaser": "http://localhost:4000/assets/images/background.jpeg"
      },{
        "title": "[SWEA] 2382. [모의 SW 역량테스트] 미생물 격리",
        "excerpt":"intro 문제링크 전형적인 시뮬레이션 구현 문제이다. 조건을 일반화하고 빠르게 함수로 구현할 수 있다면 빠르게 풀고 다른 문제로 넘어갈 수 있는 유형이라 생각한다. 정사각형 구역 안에 K개의 미생물 군집이 있다. 이 구역은 가로 N개, 세로 N개, 총 N * N 개의 동일한 크기의 정사각형 셀들로 이루어져 있다. 미생물들이 구역을 벗어나는걸 방지하기...","categories": ["Algorithm"],
        "tags": [],
        "url": "http://localhost:4000/algorithm/algorithm-swea-germ/",
        "teaser": "http://localhost:4000/assets/images/background.jpeg"
      },{
        "title": "[Graph QL] GraphQL Schema 확장하기",
        "excerpt":"schema 확장하기 여러개의 object들이 담긴 배열을 불러오는 쿼리와 개별 object를 불러오는 쿼리를 구현하고자 한다. 1. 배열에 담긴 모든 object 불러오기 people 쿼리를 요청할 때 출력되는 데이터의 형태는 배열이다. 따라서 배열 안에 원소는 Person의 스키마를 따른다. schema.graphql type Person { id: Int!, name: String!, age: Int!, gender: String! } type Query...","categories": ["Graph QL"],
        "tags": [],
        "url": "http://localhost:4000/graph%20ql/graphQL-%EC%8A%A4%ED%82%A4%EB%A7%88-%ED%99%95%EC%9E%A5/",
        "teaser": "http://localhost:4000/assets/images/background.jpeg"
      },{
        "title": "[Graph QL] GraphQL Schema 확장하기",
        "excerpt":"schema 확장하기 여러개의 object들이 담긴 배열을 불러오는 쿼리와 개별 object를 불러오는 쿼리를 구현하고자 한다. 1. 배열에 담긴 모든 object 불러오기 people 쿼리를 요청할 때 출력되는 데이터의 형태는 배열이다. 따라서 배열 안에 원소는 Person의 스키마를 따른다. schema.graphql type Person { id: Int!, name: String!, age: Int!, gender: String! } type Query...","categories": ["Graph QL"],
        "tags": [],
        "url": "http://localhost:4000/graph%20ql/graphQL-%EC%8A%A4%ED%82%A4%EB%A7%88-%ED%99%95%EC%9E%A5/",
        "teaser": "http://localhost:4000/assets/images/background.jpeg"
      },{
        "title": "[Graph QL] GraphQL 입문하기",
        "excerpt":"intro 1. 시작하기 $ npm i graphql-yoga 2. 왜 Graph QL 인가? REST API와의 비교 내가 본 설명 중에서 가장 쉽게 설명된 GQL vs REST API : GraphQL이 뭔가요(얄팍한 코딩사전) 기존의 REST API는 url을 통해 요청(request)을 보내면 이에 대응하는 응답으로서 JSON이나 XML이 넘오오는 방식이었다. 하지만 이는 치명적인 문제가 있었다. 정해진...","categories": ["Javascript"],
        "tags": [],
        "url": "http://localhost:4000/javascript/graphql-%EC%9E%85%EB%AC%B8%ED%95%98%EA%B8%B0/",
        "teaser": "http://localhost:4000/assets/images/background.jpeg"
      }]
