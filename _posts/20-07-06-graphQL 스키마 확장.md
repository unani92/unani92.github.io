---

title: "[Graph QL] GraphQL Schema 확장하기"

excerpt: "Graph QL"

categories:

  - Graph QL

---



## schema 확장하기

여러개의 object들이 담긴 배열을 불러오는 쿼리와 개별 object를 불러오는 쿼리를 구현하고자 한다. 



###  1. 배열에 담긴 모든 object 불러오기

people 쿼리를 요청할 때 출력되는 데이터의 형태는 배열이다. 따라서 배열 안에 원소는 Person의 스키마를 따른다. 

##### `schema.graphql`

```graphql
type Person {
    id: Int!,
    name: String!,
    age: Int!,
    gender: String!
}
type Query {
    # 배열에 담긴 전체 Person 들을 리턴받기 위해
    people: [Person]!,
}
```



db는 다음과 같이 구성되어 있다고 가정하자

##### `db.js`

```javascript
export const people = [
  {
    id: 1,
    name: "unani",
    age: 28,
    gender: "male"
  },
  {...},
   {...},
  {
    id: 4,
    ...
  },
]
```



##### `resolvers.js`

```javascript
import { people } from "../DB/db"

const resolvers = {
  Query: {
    people: () => people,
  }
}

export default resolvers
```

db.js에서 people을 받아와 people 쿼리 요청 시 응답을 수행한다. 

<img width="1043" alt="스크린샷 2020-07-06 오후 9 45 39" src="https://user-images.githubusercontent.com/53211781/86594557-33201780-bfd2-11ea-8d30-41286db4b229.png">



### 2. 특정 id를 가진 object 출력하기

person(id) 로 쿼리 요청이 들어올 경우 해당 id를 가진 객체를 출력하고자 한다. 

##### `schema.graphql`

```graphql
type Person {
    id: Int!,
    name: String!,
    age: Int!,
    gender: String!
}
type Query {
    # 배열에 담긴 전체 Person 들을 리턴받기 위해
    person(id: Int!): Person!,
}
```



id가 일치하는 객체를 추출하기 위해 db.js에서 함수를 정의한다. 

##### `db.js`

```javascript
export function getById(id) {
    return people.find(person => person.id === id)
}
```



db.js에서 받아온 함수를 실행해 person 쿼리 요청 시 응답을 수행한다. 

##### `resolvers.js`

```javascript
import { getById } from "../DB/db"

const resolvers = {
  Query: {
    person: (_,{ id }) => getById(id)
  }
}

export default resolvers
```

