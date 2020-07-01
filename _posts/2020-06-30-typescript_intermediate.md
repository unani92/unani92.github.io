---
title: "[Typescript] Typescript 입문하기 - 왜 Typescript를 사용하나요?"
excerpt: "Javascript"
categories:
  - Javascript
---

## intro: 사용하는 이유
> 자바스크립트의 **장점이자 단점인 자유도**로 인해 프로젝트가 거대해지고 협업 주체들이 많아질수록 단점이 부각된다. 예를 들어 디버깅을 하는 상황에서 특정 부분에서 undefined가 발생해 코드가 실행되지 않는다던가 하는 상황에서 엄격한 규칙이 없는 js는 문제가 있다. 따라서 타입스크립을 통해 **엄격한 형식을 강제**함으롬써 이러한 문제들을 줄이기 위해 사용한다. 

## 0. 개발환경 만들기

#### typescript 설치하기
```commandline
$ npm i -g typescript
```
#### tsconfig 파일 생성 및 설정
프로젝트의 루트 디렉토리에 설정 파일(`tsconfig.json`)을 만들고 ts 파일 컴파일 옵션과 ts 규칙을 적용받을 파일과 제외할 파일을 설정할 수 있다. 
```json
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "ES2015",
        // sourceMap은 ts 규칙에 맞게 코딩 중인지 
        // 디버그가 가능하도록해주는 SourceMap을 생성여부를 설정하는 인자이다.
        "sourceMap": true,
    },
    "include": ["index.ts"],
    "exclude": [
        "node_modules"
    ]
}
```
설정 이후 `$ tsc` 를 통해 ts 파일을 js로 컴파일이 가능하다. 컴파일 결과물은 컴파일 옵션에서 `outDir`를 저장경로를 설정할 수 있지만 미 작성 시 디폴트는 루트 디렉토리이다. 

#### 사용자 지정 커멘드 만들기
`package.json`
```json
{
  "scripts": {
    "start": "node index.js",
    "prestart": "tsc"
  },
}
```
`$ npm start` 입력 시 `$ tsc`를 먼저 실행하고 `$ node index.js`를 실행해준다. 
이를 통해 컴파일이 끝나면 컴파일된 결과물을 node로 실행할 수 있게 된다.

## 1. 사용 예시 

다음 예시과 같이 함수 실행 시 인자 하나가 부족한 상황에서
js 였으면 undefined가 나오면서 실행 자체는 되는 상황이지만, 
ts 에서는 js파일로 **컴파일을 거부하며 에러를 출력**한다.
```typescript
const name = "nicolas",
  age = 20,
  gender = "male"

const sayHi = (name, age, gender)  => {
  console.log(`Hello ${name} is ${gender}, ${age} old`)
}
sayHi(name,age)

export {}
```

하지만 선택 인자로 사용하고 싶은데 사용을 강제하기만 할 수는 없다.
이러한 상황에서는 ? 를 통해 선택인자임을 알려줄 수 있다. 
ex) `(name, age, gender?)`, 이렇게 선택인자임을 알려주면 컴파일 시 에러를 출력하지 않는다. 

## 2. 타입 정해주기

인자의 개수를 정해주는 것 외에 각 인자들의 타입을 정해줄 수 있다. 
타입을 정하고 나서 함수를 사용하면 함수에 정한 타입의 인자가 들어오지 않으면
마찬가지로 **컴파일을 거부하며 에러를 출력**한다.
```typescript
const sayHi = (name:string, age:number, gender?:string):void  => {
    console.log(`Hello ${name} is ${gender}, ${age} old`)
}

sayHi("unani",44,"male")

export {}
```

또한 **함수의 리턴 타입**도 정해줄 수 있다. 위의 코드의 함수는 리턴값이 없다. 따라서 `void`로 리턴 타입을 설정할 수 있다. 
하지만 `void` 로 함수의 리턴 타입을 정했음에도 불구하고 함수의 리턴값이 있다면 마찬가지로 **컴파일을 거부하며 에러를 출력**한다.

아래의 코드는 리턴값이 있다. 리턴값의 타입은 문자열이기 때문에 함수의 리턴 타입을 `string`으로 정함으로써 에러를 방지할 수 있다.
```typescript
const sayHi = (name:string, age:number, gender?:string):string  => {
    return `Hello ${name} is ${gender}, ${age} old`
}

sayHi("unani",44,"male")

export {}
```

## 3. typescript watch mode

- tsc watch 패키지를 설치한다. 
```bash
$ npm i tsc-watch --dev
```
- `$ npm start` 커맨드를 설정해 준다. 
tsc-watch 커맨드가 성공적으로 적용되면 dist/index.js 를 실행해 주세요 라는 의미이다. 

package.json
```json
{
  "scripts": {
    "start": "tsc-watch --onSuccess \"node dist/index.js\" "
  },
}
```
- src 폴더를 생성해 index.ts를 넣어주고, dist 폴더에 컴파일된 index.js가 저장되게 설정한다. 

tsconfig.json
```json
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "ES2015",
        "sourceMap": true,
        "outDir": "dist"
    },
    "include": ["src/**/*"],
    "exclude": [
        "node_modules"
    ]
}
```
src에 있는 모든 ts 파일은 ts 규칙의 적용을 받고(`include`) 
컴파일된 결과물은 dist 폴더에 저장된다(`outDir`).

- `$ npm start`를 실행한다. 
- ts 파일의 내용이 바뀌어 저장할때마다 컴파일이 진행된다.

```bash
5:08:23 ├F10: PM┤ - File change detected. Starting incremental compilation...

5:08:23 ├F10: PM┤ - Found 0 errors. Watching for file changes.
Hello unani is male, 28 old
```

## 4. interface
함수 정의 시 인자의 타입을 정해주는 것 까지는 알았다. 하지만 이 역시 문제가 있다. 
인자가 여러개일 경우 코드가 지저분해진다. 그리고 언패킹을 할 경우 distruct에 문제가 있다.
따라서 인터페이스를 통해 인자들의 자료형을 한 번에 정리하고 언패킹을 할 수 있다. 
```typescript
interface Human {
  name: string,
  age: number,
  gender: string
}

const person = {
  name: "unani",
  age: 20,
  gender: "male"
}

const sayHi = (person: Human):string => {
  return (`Hello ${person.name} is ${person.gender}, ${person.age} old`)
}
```

## 5. class Interface
하지만 인터페이스는 js에서 사용할 수 없다. 따라서 클래스를 통해 인터페이스를 구현해 사용할 수 있다. 
js에서는 인자의 속성을 정의할 필요가 없지만 ts에서는 속성을 알려주어야 한다. 

```typescript
class Human {
  public name: string
  public gender: string
  public age: number
  constructor(name:string, gender:string, age:number) {
    this.name = name; this.age = age; this.gender = gender;
  }
}

const sayHi = (person: Human):string => {
  return (`Hello ${person.name} is ${person.gender}, ${person.age} old`)
}

const Unani = new Human("unani","male",28)

var output = sayHi(Unani)
console.log(output)

export {}
```
`public` 속성이 아닌 `private` 속성이라면 클래스 내부에서만 접근할 수 있는 변수가 되기 때문에 ts에서 인터페이스로서 인자를 활용할 수 없다. 따라서 이 경우에도 **컴파일을 거부하며 에러를 출력**한다.
