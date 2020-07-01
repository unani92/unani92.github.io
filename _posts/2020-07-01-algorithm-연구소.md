---
title: "[Algorithm] 백준 14502 : 연구소"
excerpt: "Algorithm"
categories:

  - Algorithm

---



## intro

[문제 링크](https://www.acmicpc.net/problem/14502)

~~코로나 시국에 맞는~~ BFS DFS를 모두 사용해서 해결할 수 있는 좋은 문제라고 생각한다. 

> 연구소는 크기가 N×M인 직사각형으로 나타낼 수 있으며, 직사각형은 1×1 크기의 정사각형으로 나누어져 있다. 연구소는 빈 칸, 벽으로 이루어져 있으며, 벽은 칸 하나를 가득 차지한다. 
>
> 일부 칸은 바이러스가 존재하며, 이 바이러스는 상하좌우로 인접한 빈 칸으로 모두 퍼져나갈 수 있다. 새로 세울 수 있는 **벽의 개수는 3개이며, 꼭 3개를 세워야 한다.**
>
> **0은 빈 칸, 1은 벽, 2는 바이러스가 있는 곳이다.** 
>
> ```bash
> 2 1 0 0 1 1 2
> 1 0 1 0 1 2 2
> 0 1 1 0 1 2 2
> 0 1 0 0 0 1 2
> 0 0 0 0 0 1 1
> 0 1 0 0 0 0 0
> 0 1 0 0 0 0 0
> ```
>
> 
>
> 벽을 3개 세운 뒤, 바이러스가 퍼질 수 없는 곳을 안전 영역이라고 한다. 위의 지도에서 안전 영역의 크기는 27이다.
>
> 연구소의 지도가 주어졌을 때 얻을 수 있는 안전 영역 크기의 최댓값을 구하는 프로그램을 작성하시오.



## 접근 방식

1. 벽을 반드시 세 개 세워야 한다 : 0이 적혀 있는 칸 3개를 골라 1로 바꿔주어야 한다.. 라고 이해했다. 

   - 연구소 배열 중에서 0이 있는 칸의 좌표들을 모두 blank_room 배열에 담았다. 
   - 바이러스가 있는 칸 역시 start 배열에 담았다.

   ```python
   N, M = map(int, sys.stdin.readline().split())
   lab = [list(map(int, sys.stdin.readline().split())) for _ in range(N)]
   start = [(i,j) for i in range(N) for j in range(M) if lab[i][j] == 2]
   blank_room = [(i,j) for i in range(N) for j in range(M) if lab[i][j] == 0]
   ```

2. 빈 방들 중에서 3개를 뽑는다면 이는 조합으로 풀 수 있을 것이라 판단했다. 
   - 순열로 3개를 뽑아도 문제는 풀리지만 중복이 반드시 발생하기 때문에 시간적으로 손해를 본다. 
   - 1,2,3번 방을 뽑으나 3,2,1번 방을 뽑아 벽을 세우는 것(0 -> 1)은 **같다.**

3. 벽을 세우는 함수를 구현한다. 
   - (0 ~ 빈 방 개수) 사이에서 하나를 뽑는 과정을 구현한다. 
     - 빈 방 하나를 뽑아 x,y,좌표를 추출하고 실험실에 벽을 만든다(`lab[x][y] = 1`)
     - 벽 개수 카운트를 하나 늘리고(`cnt+1`), 뽑은 위치 다음부터 시작하기 위한 변수를 저장한다(`i+1`)
     - 벽이 3개가 될 때 까지 재귀호출을 통해 위 과정을 반복한다.
     - 재귀가 끊어졌을 때(return 이후) 다시 돌아와 만들었던 벽을 초기화한다(`lab[x][y] = 1`)   
   - 벽 3개가 만들어지면 바이러스를 퍼뜨리고 감염되지 않은 방의 개수를 구한다.(`corona(start,lab)`)
     - 기존에 저장된 값보다 큰 경우에만 answer를 갱신해 준다. 

```python
def wall(cnt,s):
    global answer
    if cnt == 3: 
        res = corona(start,lab)
        if res > answer: 
            answer = res
        return

    else :
        for i in range(s,len(blank_room)):
            x,y = blank_room[i]
            lab[x][y] = 1
            wall(cnt+1,i+1)
            lab[x][y] = 0
```

4. 바이러스를 퍼뜨리고 감염되지 않는 방의 개수를 구하는 함수를 구현한다. 

   - 연구실에 바이러스를 퍼뜨리고 개수를 세는 것 까지는 좋으나 개수를 센 이후에는 **초기화 과정**이 필요하다. 다른 곳에 벽을 세우는 경우에도 개수를 세고 어느 값이 더 큰지 비교해야 하기 때문이다. 

   - 이를 위해 **연구소 배열을 복제**( `copy.deepcopy(lab)`)하는 방법을 선택했다.

   - 바이러스를 퍼뜨리는 과정은 **bfs를 통해 구현**하였다. 

     - 이전에 만들어 놓은 바이러스들의 좌표가 담긴 배열을 deque 객체로 만든다.
     - 델타 탐색을 하는 과정에서 **벽을 만나지 않는다면 0을 2로 바꿔준다.**
     - 큐 배열이 빈 배열이 될 때 까지 bfs 과정을 반복하면 바이러스가 퍼지는 과정을 구현할 수 있다.

   - 남아있는 0을 세어 결과값으로 리턴한다.

     ```python
     from collections import deque
     from copy import deepcopy
     
     def corona(start,lab):
         simulate = deepcopy(lab)
         result = 0
         queue = deque(start)
         while queue:
             x,y = queue.popleft()
             for dx,dy in (1,0),(0,1),(-1,0),(0,-1):
                 nx,ny = x+dx,y+dy
                 if 0 <= nx < N and 0 <= ny < M and not simulate[nx][ny]:
                     queue.append((nx,ny))
                     simulate[nx][ny] = 2
         for i in simulate:
             for j in i : 
                 if j == 0 : 
                     result += 1
         return result
     ```

     

     

## 전체 소스코드



```python
from collections import deque
from copy import deepcopy
import sys

def corona(start,lab):
    simulate = deepcopy(lab)
    result = 0
    queue = deque(start)
    while queue:
        x,y = queue.popleft()
        for dx,dy in (1,0),(0,1),(-1,0),(0,-1):
            nx,ny = x+dx,y+dy
            if 0 <= nx < N and 0 <= ny < M and not simulate[nx][ny]:
                queue.append((nx,ny))
                simulate[nx][ny] = 2
    for i in simulate:
        for j in i : 
            if j == 0 : 
                result += 1
    return result

def wall(cnt,s):
    global answer
    if cnt == 3: 
        res = corona(start,lab)
        if res > answer: 
            answer = res
        return

    else :
        for i in range(s,len(blank_room)):
            x,y = blank_room[i]
            lab[x][y] = 1
            wall(cnt+1,i+1)
            lab[x][y] = 0

N, M = map(int, sys.stdin.readline().split())
lab = [list(map(int, sys.stdin.readline().split())) for _ in range(N)]
start = [(i,j) for i in range(N) for j in range(M) if lab[i][j] == 2]
blank_room = [(i,j) for i in range(N) for j in range(M) if lab[i][j] == 0]

answer = 0

wall(0,0)
print(answer)
```

