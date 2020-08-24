\---

title: "[SWEA] 4613. 러시아 국기 같은 깃발" 

excerpt: "Algorithm"

categories:



  \- Algorithm

\---



## intro

[문제링크]()

> ‘W’는 흰색, ‘B’는 파란색, ‘R’은 빨간색을 의미한다. ‘W’, ‘B’, ‘R’외의 다른 문자는 입력되지 않는다.
>
> 첫 번째 예제이다. 왼쪽에 있는 그림이 입력이다. 중간에 있는 그림에 X가 적힌 칸들을 새롭게 색칠하여 오른쪽에 있는 그림과 같은 깃발을 만들면 최적이다.
>
> <img width="545" alt="스크린샷 2020-08-24 오후 11 09 25" src="https://user-images.githubusercontent.com/53211781/91054911-e61a0280-e65e-11ea-9625-d002ac7f1a98.png">
>
> 이렇게 러시아 국기 같은 깃발을 만들기 위해서 새로 칠해야 하는 칸의 개수의 최솟값을 구하여라.



## 접근방법

조합으로 접근할 수 있다. 예를 들어 4줄이 주어질 때 1,2,3 중 숫자 1,2 **2개를 선택**하면 1줄은 흰색, 1줄은 파랑색, 나머지 2줄은 빨간색으로 채울 수 있다. 이러한 **경우의 수를 모두 탐색** 후 최소값을 구하면 되기 때문이다. 



러시아 깃발은 3색이기 때문에 아무리 많은 줄이 주어져도 *n*C*2* 의 경우의 수만 탐색하면 된다. 



### DFS 알고리즘

조합의 경우의 수를 모두 탐색하는 DFS 알고리즘을 작성한다. 

1. 1에서 N(케이스에서 주어지는 세로의 길이)까지의 숫자 중에서 2개를 뽑기 전까지 재귀를 돌린다. 
2. 2개를 뽑으면 해당하는 색이 칠해지지 않은 곳을 카운트한다. 
3. 카운트 함수를 통해 나온 결과값과 기존의 최소값을 비교해 더 작으면 갱신한다. 

```python
def dfs(L,s):
  global answer
  if L == 2 :
    result = count(res[0],res[1])
    if answer > result:
      answer = result
    return
  else:
    for i in range(s,len(nums)):
      res[L] = nums[i]
      dfs(L+1,i+1)
```

 

### 카운트하기

1. 상기한 dfs 로직을 통해 1에서 N까지의 수 중 2개를 뽑은 상태이다
2. 0 ~ a-1 번째 줄까지는 흰색으로 칠해지지 않은 곳을 흰색으로 칠한다. 
3. a ~ b-1, b ~ N-1 번째줄까지 각각의 색으로 칠한다. 
4. 2, 3번에서 구한 값을 모두 더해주면 1 사이클이 완성된다. 

```python
def color(i, c):
    result = 0
     
    for j in range(M):
        if flags[i][j] != c:
            result += 1
             
    return result
 
def count(a,b):
    result = 0
     
    for i in range(0,N):
        if i < a :
            result += color(i, 'W')
        elif a <= i < b:
            result += color(i, 'B')
        else :
            result += color(i,'R')
 
    return result
```





## 전체 소스코드



```python
def color(i, c):
    result = 0
     
    for j in range(M):
        if flags[i][j] != c:
            result += 1
             
    return result
 
def count(a,b):
    result = 0
     
    for i in range(0,N):
        if i < a :
            result += color(i, 'W')
        elif a <= i < b:
            result += color(i, 'B')
        else :
            result += color(i,'R')
 
    return result
 
def dfs(L,s):
    global answer
    if L == 2 :
        result = count(res[0],res[1])
        if answer > result:
            answer = result
        return
    else :
        for i in range(s,len(nums)):
            res[L] = nums[i]
            dfs(L+1,i+1)
 
T = int(input())
for t in range(1, 1+T):
 
    N, M = map(int, input().split())
    flags = [list(input()) for _ in range(N)]
    nums = [i for i in range(N) if i]
 
    res = [None,None]
    answer = 999999999999
 
    dfs(0,0)
 
    print(f'#{t} {answer}')
```



