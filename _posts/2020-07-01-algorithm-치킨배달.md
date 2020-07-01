---

title: "[Algorithm] 백준 15686 : 치킨배달"
excerpt: "Algorithm"
categories:

  - Algorithm

---



## intro

[문제 링크](https://www.acmicpc.net/problem/15686)

> 크기가 N×N인 도시가 있다. **0은 빈 칸, 1은 집, 2는 치킨집이다.**
>
> ```bash
> 0 2 0 1 0
> 1 0 1 0 0
> 0 0 0 0 0
> 0 0 0 1 1
> 0 0 0 1 2
> ```
>
> 임의의 두 칸 (r1, c1)과 (r2, c2) 사이의 거리는 **|r1-r2| + |c1-c2|**로 구한다.
>
> **치킨 거리**는 집과 가장 가까운 치킨집 사이의 거리이다. 즉, 치킨 거리는 집을 기준으로 정해지며, 각각의 집은 **치킨 거리**를 가지고 있다. **도시의 치킨 거리**는 모든 집의 **치킨 거리**의 합이다.
>
> 도시에 있는 치킨집 중에서 **최대 M개를 고르고**, 나머지 치킨집은 모두 폐업시켜야 한다. 어떻게 고르면, **도시의 치킨 거리**가 가장 작게 될지 구하는 프로그램을 작성하시오.



## 접근방법

1. 치킨집들 중에서 폐업 시킬 치킨집을 조합을 통해 뽑는다. 

   - 도시 배열을 만들면서 집과 치킨집의 좌표를 담은 배열을 만들어 준다.

   - 예를 들어 치킨집 5개 중에서 최대 3개를 살리면 2개의 치킨집을 골라 폐업을 시킨다. 
   - 폐업한 치킨집을 골랐으면 폐업 여부를 표시하는 배열(check)을 만들고 1로 표시한다.

   ```python
   N, M = map(int, input().split())
   city = [list(map(int, input().split())) for _ in range(N)]
   houses = [(i,j) for i in range(N) for j in range(N) if city[i][j] == 1]
   chickens = [(i,j) for i in range(N) for j in range(N) if city[i][j] == 2]
   close = len(chickens) - M
   check = [0] * len(chickens)
   ```

2. 폐업할 치킨집을 선정하는 과정을 조합을 통해 구현한다. 

   - (0 ~ 치킨집 개수) 사이에서 하나를 뽑는 과정을 구현한다. 
     - 치킨집의 좌표를 뽑아내고 해당 치킨집을 폐업시킨다.(`city[x][y] = 2` => `city[x][y] = 0`)
     - check배열에 해당 치킨집이 폐업했다는 사실을 표시한다.(`check[i] = 1`)
     - 폐업 카운트를 하나 늘리고(`N+1`), 뽑은 위치 다음부터 시작하기 위한 변수를 저장한다(`i+1`)
     - 정해진 개수가 폐업할 때 까지 재귀호출을 통해 위 과정을 반복한다. 
     - 재귀가 끊어졌을 때(return 이후) 다시 돌아와 폐업시켰던 치킨집을 다시 초기화한다.
   - 정해진 개수만큼 폐업이 완료되면 치킨거리를 구해준다.

   ```python
   def guzozojung(N,s): 
       global answer
       if N == close:
           res = 0
           for house in houses:
               res += distance(house)
               if res < answer: 
                   return
           if res < answer: 
               answer = res
   
       else :
           for i in range(s,len(chickens)):
               x,y = chickens[i]
               
               city[x][y] = 0
               check[i] = 1
               guzozojung(N+1,i+1)
               city[x][y] = 2
               check[i] = 0
   ```

3. 치킨거리를 구해준다.
   - 각각의 집을 인자로 받아 가장 가까운 치킨집의 거리를 출력하는 배열을 만든다. 
     - 2번의 과정을 통해 폐업된 치킨집을 제외하고 **폐업되지 않은** 치킨집의 좌표를 배열에 담는다.(`renew_chicken`)
     - 시간 절약을 위해 거리가 1인 치킨집이 있으면 다른 치킨집은 볼 것도 없이 **최단거리 1을 출력**한다.
     - 최단거리 치킨집의 거리를 최종적으로 출력한다. 
   - :bulb: backtracking point : 현재까지 더해 나간 치킨집 사이의 최단거리가 **전에 구해놓았던 도시 전체의 치킨거리보다 크면** 다른 집과 치킨집 사이의 거리를 더이상 계산하지 않는다.
   - 현재의 치킨거리가 전에 구해놓았던 최단 치킨거리보다 작은 경우에만 결과값을 업데이트한다.



## 전체 소스코드

```python
def distance(house):
    r1,c1 = house[0],house[1]
    result = float("inf")
    renew_chicken = [chickens[i] for i in range(len(check)) if check[i] == 0]
    for r2,c2 in renew_chicken:
        if abs(r1-r2) + abs(c1-c2) == 1: 
            return 1
        elif abs(r1-r2) + abs(c1-c2) < result:
            result = abs(r1-r2) + abs(c1-c2)
    return result

def guzozojung(N,s): 
    global answer
    if N == close:
        res = 0
        for house in houses:
            res += distance(house)
            if res > answer: 
                return
        if res < answer: 
            answer = res
    else :
        for i in range(s,len(chickens)):
            x,y = chickens[i]
            
            city[x][y] = 0
            check[i] = 1
            guzozojung(N+1,i+1)
            city[x][y] = 2
            check[i] = 0

N, M = map(int, input().split())
city = [list(map(int, input().split())) for _ in range(N)]
houses = [(i,j) for i in range(N) for j in range(N) if city[i][j] == 1]
chickens = [(i,j) for i in range(N) for j in range(N) if city[i][j] == 2]
check = [0] * len(chickens)
close = len(chickens) - M

answer = float("inf")
guzozojung(0,0)

print(answer)
```

