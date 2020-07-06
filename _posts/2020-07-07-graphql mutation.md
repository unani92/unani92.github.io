---

title: "[Graph QL] GraphQL Schema - 데이터 생성 및 삭제하기"

excerpt: "Graph QL"

categories:

  - Graph QL

---

## Mutation

지금까지 데이터의 조회를 위한 Query에 대해서 알아봤다면, 지금부터는 데이터를 생성하고 삭제하는 Mutation에 대해 알아보자



### 1. add Movie

우선 스키마를 정의하는 부분에서 addMovie 요청이 들어왔을 시 출력되어야 할 데이터의 타입을 정의한다. 

```graphql
type Movie {
    id: Int!,
    name: String!,
    score: Int!,
}
type Mutation {
    addMovie(name:String!,score:Int!): Movie!,
}
```

영화의 이름과 평점을 입력하면 Movie의 스키마에 맞게 결과물이 출력되어 보여질 것을 정의한 것이다. 



##### `db.js`

```javascript
export function addMovie(name,score) {
  const newMovie = {
    id: movies[movies.length-1].id + 1,
    name,
    score
  }
  movies.push(newMovie)
  return newMovie
}
```

사용자의 입력값을 받아 새로운 object를 만들고 기존의 데이터 배열에 추가해준다. 



##### `resolvers.js`

```javascript
import { addMovie } from "../DB/db"

const resolvers = {
  Mutation: {
    addMovie: (_, { name, score }) =>  addMovie(name,score),
  }
}

export default resolvers
```

사용자의 입력값과 함께 addMovie 요청이 들어오면 db.js에서 정의한 대로 새로운 영화 객체를 만드는 작업을 수행한다. 



<img width="1129" alt="스크린샷 2020-07-07 오전 12 09 30" src="https://user-images.githubusercontent.com/53211781/86608961-2e655e80-bfe6-11ea-82c9-4c9df4fd1be1.png">

<img width="1060" alt="스크린샷 2020-07-07 오전 12 10 30" src="https://user-images.githubusercontent.com/53211781/86609037-4b019680-bfe6-11ea-9888-541fcc8ff223.png">



### 2. delete Movie

스키마를 정의하는 부분에서 deleteMovie 요청이 들어왔을 시 출력되어야 할 데이터의 타입을 정의한다. 

```graphql
type Movie {
    id: Int!,
    name: String!,
    score: Int!,
}
type Mutation {
    deleteMovie(id:Int!): String!,
}
```

영화의 id를 입력하면 쿼리 수행 결과(성공 혹은 실패)를 보여주기 위해 string 형태가 올 것임을 정의한다. 



##### `db.js`

```javascript
export function deleteMovie(id) {
  const result =  movies.filter(movie => movie.id !== id)
  if (result.length !== movies.length) {
    movies = result
    return "successfully deleted"
  } else {
    return "id cannot found"
  }
}
```

db에 저장되어 있는 번호를 사용자가 입력한다면 해당 번호의 영화를 지울 수 있기 때문에 **movies 배열을 재조정하고 성공했음**을 리턴할 수 있다. 하지만 없는 번호를 입력하면 해당 번호의 영화를 지울 수 없기 때문에 **삭제에 실패했음을 리턴**할 수 있다. 



##### `resolvers.js`

```javascript
import { deleteMovie } from "../DB/db"

const resolvers = {
  Mutation: {
    deleteMovie: (_, { id }) =>  deleteMovie(id),
  }
}

export default resolvers
```

사용자의 입력값과 함께 addMovie 요청이 들어오면 db.js에서 정의한 대로 새로운 영화 객체를 만드는 작업을 수행한다. 



<img width="1120" alt="스크린샷 2020-07-07 오전 12 58 25" src="https://user-images.githubusercontent.com/53211781/86613755-fd3c5c80-bfec-11ea-8c80-eb2338734e2a.png">

<img width="1074" alt="스크린샷 2020-07-07 오전 12 59 16" src="https://user-images.githubusercontent.com/53211781/86613847-17763a80-bfed-11ea-9fd9-837a79fdbf62.png">

