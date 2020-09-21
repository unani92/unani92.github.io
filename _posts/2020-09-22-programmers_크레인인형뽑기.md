---
title: "[프로그래머스] 크레인 인형뽑기 게임" 

excerpt: "Algorithm"

categories:

  - Algorithm

---

솔직히 파이썬으로 20분 컷인데 자바스크립트로 처음 풀어봐서 1시간이나 걸림.....ㅋㅋ

1. 클로저 사용
함수 안에 함수를 정의할 때 내부 함수는 외부 함수의 var 변수에 접근 및 사용할 수 있다. 

2. const 변수는 개발할 때는 필수이지만 알고리즘 풀때는 var로 클로저 사용 유도하는 것도 괜찮은 전략인듯

```javascript
function solution(board, moves) {
  var board = board
  var moves = moves
  var stack = []
  var answer = 0
  
  // 클로저를 사용해 함수 내부에서 외부 변수 사용
  function isZero(n) {
    for (var i=0; i < board.length; i++) {
      if (board[i][n-1] !== 0) {
        return i
      }
    } return null
  }

  // 무브 배열에서 하나씩 꺼내서 적용한다.
  for (var i = 0; i < moves.length; i ++) {
    var x = isZero(moves[i])
    if (x !== null) {
      if (stack[stack.length-1] == board[x][moves[i]-1]) {
        stack.pop()
        answer++
      } else {
        stack.push(board[x][moves[i]-1])
      }
      board[x][moves[i]-1] = 0
    }
  }
  return answer * 2
}
```