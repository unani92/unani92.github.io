---
title: "[SWEA] 2382. [모의 SW 역량테스트] 미생물 격리"
excerpt: "Algorithm"
categories:
  - Algorithm
---



## intro

[문제링크](https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AV597vbqAH0DFAVl&categoryId=AV597vbqAH0DFAVl&categoryType=CODE)

전형적인 시뮬레이션 구현 문제이다. 조건을 일반화하고 빠르게 함수로 구현할 수 있다면 빠르게 풀고 다른 문제로 넘어갈 수 있는 유형이라 생각한다. 

> 정사각형 구역 안에 **K개의 미생물 군집**이 있다. 이 구역은 가로 N개, 세로 N개, 총 **N * N 개의 동일한 크기의 정사각형 셀**들로 이루어져 있다. 미생물들이 구역을 벗어나는걸 방지하기 위해, **가장 바깥쪽 가장자리 부분에 위치한 셀들에는 특수한 약품이 칠해져 있다.** 
>
> 최초 각 미생물 군집의 위치와 군집 내 미생물의 수, 이동 방향이 주어진다. 약품이 칠해진 부분에는 미생물이 배치되어 있지 않다. 이동방향은 상, 하, 좌, 우 네 방향 중 하나이다.
>
> 1. 각 군집들은 1시간마다 이동방향에 있는 다음 셀로 이동
> 2. 미생물 군집이 이동 후 약품이 칠해진 셀에 도착하면 군집 내 미생물의 절반이 죽고, 이동방향이 반대로 바뀐다. 
>    - **살아남은 미생물 수 = 원래 미생물 수를 2로 나눈 후 소수점 이하를 버림 한 값**
>    - 미생물 수가 0이 되면, 군집이 사라지게 된다.
> 3. M 시간 동안 이 미생물 군집들을 격리하였다. M시간 후 남아 있는 미생물 수의 총합을 구하여라.



## 접근 방법

0. 입력 예시

```python
1 1 7 1 # 세로위치(1), 가로위치(1), 미생물 수(7), 이동방향(상)
```

1. 1시간 뒤에 이동하는 미생물의 위치 정보와 미생물 수, 이동방향을 구현하는 함수를 만든다. 

   - 해당 미생물 군집이 상, 하, 좌, 우 이동하는 경우를 분기한다. 
   - 해당 방향으로 이동하는 경우 중에서도 약품이 발린 칸으로 이동하는 경우와 아닌 경우로 분기한다. 

   ```python
   def move(germ,N):
       x,y,n,d = germ
       if d == 1 :
           if x == 1:
               return (x-1,y,n//2,2)
           else :
               return (x-1,y,n,1)
       elif d == 2:
           if x == N-2:
               return (x+1,y,n//2,1)
           else :
               return(x+1,y,n,2)
       elif d == 3:
           if y == 1:
               return (x,y-1,n//2,4)
           else :
               return (x,y-1,n,3)
       else:
           if y == N-2:
               return (x,y+1,n//2,3)
           else :
               return (x,y+1,n,4)
   ```



2. 같은 칸으로 모이는 군집들에 대해 모든 군집의 미생물들이 합쳐치고 가장 많은 미생물의 이동방향을 새 군집의 이동방향으로 정하는 시뮬레이션 구현

   - 같은 칸에 모이는 모든 미생물들이 담긴 리스트를 인자로 받는다.
   - **미생물들을 모두 합치고** 가장 많은 미생물의 방향으로 **이동방향을 정한 이후** 미생물들의 정보를 튜플로 리턴한다.

   ```python
   def combine(lst):
       winner = max(lst,key=lambda x:x[2])
       ssum = 0
       for s in lst:
           ssum += s[2]
       dir = winner[-1]
       return (winner[0],winner[1],ssum,dir)
   ```

   

3. 미생물 정보를 배열에 담지 않고 딕셔너리를 통해 구현하면 시간복잡도를 줄일 수 있다. 

   1. 미생물 정보를 이동 함수에 넣어 정보를 최신화해서 배열에 담는다. 

   ```python
   states = [move(germ,N) for germ in germs]
   ```

   2. 해당 좌표(key), 미생물 정보들이 담긴 배열(value) 쌍으로 만들어진 딕셔너리를 이용한다. 
      - 주의 : **딕셔너리의 키로 리스트를 가질 수 없기 때문**에 미생물 정보는 튜플을 유지해야 한다.

   ```python
   state_dic = dict()
   for x,y,n,d in states:
     if (x,y) not in state_dic.keys():
       state_dic[(x,y)] = []
       state_dic[(x,y)].append((x,y,n,d))
       else :
         state_dic[(x,y)].append((x,y,n,d))
   ```

   3. 같은 좌표의 미생물들은 합쳐주고 그렇지 않은 미생물들은 그대로 fin 배열에 담아준다. 
      - 딕셔너리의 각 키들의 값의 배열의 원소는 1개이거나 여러개이거나 둘 중 하나이다. 
      - 1개이면 독립적인 좌표를 갖고 있다는 의미이니 그대로 새 배열에 담는다. 
      - 여러개이면 미생물 정보를 이용해 1개의 미생물 정보로 합쳐진 결과물을 새 배열에 담는다. 

   ```python
   fin = []
   for state in state_dic.items():
     if len(state[-1]) == 1:
       fin.append(state[-1][0])
       else :
         res = combine(state[-1])
         if res[2] :
           fin.append(res)
   germs = fin
   ```

4. 1,2,3 의 과정들을 M 시간 동안 반복하고 모든 미생물들의 수를 합친다. 

   ```python
   N, M, K = map(int, input().split())
   germs = [tuple(map(int, input().split())) for _ in range(K)]
   
   for _ in range(M):
     ...
     ...
   answer = 0
   for x,y,n,d in germs:
   	answer += n
   ```



## 전체 소스코드

```python
# dir : 1(up) 2(down) 3(left) 4(right)
# germ => x,y,n,d

def move(germ,N):
    x,y,n,d = germ
    if d == 1 :
        if x == 1:
            return (x-1,y,n//2,2)
        else :
            return (x-1,y,n,1)
    elif d == 2:
        if x == N-2:
            return (x+1,y,n//2,1)
        else :
            return(x+1,y,n,2)
    elif d == 3:
        if y == 1:
            return (x,y-1,n//2,4)
        else :
            return (x,y-1,n,3)
    else:
        if y == N-2:
            return (x,y+1,n//2,3)
        else :
            return (x,y+1,n,4)

def combine(lst):
    winner = max(lst,key=lambda x:x[2])
    ssum = 0
    for s in lst:
        ssum += s[2]
    dir = winner[-1]
    return (winner[0],winner[1],ssum,dir)

T = int(input())
for t in range(1, 1+T):
    N, M, K = map(int, input().split())
    germs = [tuple(map(int, input().split())) for _ in range(K)]

    for _ in range(M):
        states = [move(germ,N) for germ in germs]
        state_dic = dict()
        for x,y,n,d in states:
            if (x,y) not in state_dic.keys():
                state_dic[(x,y)] = []
                state_dic[(x,y)].append((x,y,n,d))
            else :
                state_dic[(x,y)].append((x,y,n,d))

        fin = []
        for state in state_dic.items():
            if len(state[-1]) == 1:
                fin.append(state[-1][0])
            else :
                res = combine(state[-1])
                if res[2] :
                    fin.append(res)

        germs = fin

    answer = 0
    for x,y,n,d in germs:
        answer += n

    print(f'#{t} {answer}')
```

 