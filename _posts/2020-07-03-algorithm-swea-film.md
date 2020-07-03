---

title: "[SWEA] 2112. [모의 SW 역량테스트] 보호 필름"

excerpt: "Algorithm"

categories:

  - Algorithm

---



## intro

[문제링크](https://swexpertacademy.com/main/code/problem/problemDetail.do?contestProbId=AV5V1SYKAaUDFAWu&categoryId=AV5V1SYKAaUDFAWu&categoryType=CODE)

dfs 문제 해결 시 필요 없는 부분을 빠르게 솎아내는 백트래킹이 중요하다는 것을 알려주는 문제라고 생각한다. 

> 보호 필름의 성능을 검사하기 위해 합격기준 K라는 값을 사용한다.
>
> **단면의 모든 세로방향에 대해서 동일한 특성의 셀들이 K개 이상 연속적으로 있는 경우에만 성능검사를 통과하게 된다.**
>
> <img width="663" alt="스크린샷 2020-07-03 오후 4 07 50" src="https://user-images.githubusercontent.com/53211781/86441577-68650500-bd47-11ea-87f5-171f6619938f.png">
>
> [Fig. 4]는 세 번째 막에 약품 A를 투입하여 특성 A로 변경하고, 여섯 번째 막에 약품 B를 투입하여 특성 B로 변경시킨 경우이다.
>
> 약품 투입횟수 두 번으로 ①~⑧번까지의 모든 세로방향에 대해서 동일한 특성의 셀들이 연속적으로 3개 이상 있기 때문에 성능검사를 통과하였다. (합격기준 K=3)
>
> 두께 D, 가로크기 W인 보호 필름 단면의 정보와 합격기준 K가 주어졌을 때, **약품 투입 횟수를 최소**로 하여 성능검사를 통과할 수 있는 방법을 찾고, **이때의 약품 투입 횟수**를 출력하라. 



## 접근 방식

1. 세로로 충격이 가해졌을 때 주어진 합격기준을 만족하는지 여부를 검사하는 함수를 구현

   - for문을 돌리면서 해당하는 원소와 다음 원소가 같으면 스택을 1개 추가한다.(0부터 시작)
   - 같지 않으면 스택을 0으로 초기화한다.
   - 스택이 `합격기준 - 1` 을 충족하면 해당 세로줄은 검사를 통과한 것으로 간주하고 다음 칸으로 넘어간다. 
   - 세로줄 한개라도 기준 미충족 시 필름 전체가 기준을 통과하지 못한 것이기 때문에 그 즉시 `False` 를 리턴한다.
   - 모든 세로줄이 검사를 통과하면 최종적으로 `True`를 리턴한다.

   ```python
   def inspect(film,K):
       for i in range(W):
           stack = 0
           for j in range(D-1):
               if film[j][i] == film[j+1][i]:
                   stack += 1
               else :
                   stack = 0
               if stack == K-1 :
                   break
           if stack != K-1 :
               return False
       return True
   ```

2. 가로줄 D개 중 n개를 선택해 약품을 바르는 경우이기 때문에 dfs로 조합을 구현한다. 

   - 재귀 깊이가 한 칸 깊어진다는 것은 약품을 한 번 더 바른다는 것과 같다. 

   - 재귀가 끊어지면 약품을 발랐던 가로줄의 상태를 바르기 **이전 상태로 초기화**해야 한다.

     - **백트래킹 포인트** : 필름 전체를 `deepcopy(film)` 으로 복사해 가지고 있는 것은 시간과 메모리 관리에 있어 좋지 못한 선택이다. 따라서 필름에서 약품을 바른 줄의 상태만 저장해 놓고 초기화하는 것이 효과적이다. 
     - 0으로 바꿔주는 약품을 예로 들면 약을 바르려는 줄에서 1인 부분의 좌표를 배열에 저장하고 재귀가 끊어지는 시점에서 배열에 저장된 정보를 바탕으로 원상복구한다. 

     ```python
     # 0으로 바꿔주는 약품을 바르는 경우(1로 바꿔주는 경우는 반대로 하면 된다.)
     switched = []
     for j in range(W):
       if film[i][j] == 1:
         film[i][j] = 0
         switched.append(j)
         
         dfs(L+1, i+1, film)
         
         for j in switched:
           film[i][j] = 1
     ```

   - 상태트리를 간단히 생각해 보면 0으로 바꾸는 약을 바르거나 1로 바꾸는 약을 바르는 2가지 경우가 있다.
   (1) 조합 구현을 통해 약을 발라주려는 줄을 하나 선정한다.
   (2) 0으로 바꾸는 약을 바르고 조합 재귀함수를 다시 호출한다.
   (3) 원상복구 후에 1로 바꿔주는 약을 바르고 재귀함수를 호출한다.
   (4) 약 바르기 전 상태로 원상복구한다.

   - 미리 구현해 놓은 검사 함수를 적용해 검사를 통과하면 기존의 최소값과 비교해 최소값을 업데이트한다. 
   - **백트래킹 포인트** : 이 문제는 최악의 경우 최대 13줄에 대해 재귀가 돌기 때문에 시간초과가 반드시 발생한다. 
     1. 예를 들어 통과 기준이 r이면 같은 종류의 약물을 연속 r줄 발라주면 무조건 통과할 수 밖에 없다. 
        - 따라서 n(<=13)이 몇이건 상관 없이  *n*C*r* 이상으로 재귀가 들어갈 이유가 없다. 
     2. 최소값은 재귀를 통해 업데이트 될 수 있지만 재귀 깊이가 기존의 최소값을 넘어간다면 바로 끊는다. 
        - 더 들어가봤자 기존의 최소값보다 작은 값이 나올 수가 없기 때문이다. 

   

   ## 전체 소스코드 구현

   ```python
   def inspect(film,K):
       for i in range(W):
           stack = 0
           for j in range(D-1):
               if film[j][i] == film[j+1][i]:
                   stack += 1
               else :
                   stack = 0
               if stack == K-1 :
                   break
           if stack != K-1 :
               return False
       return True
   
   def dfs(L,s,film):
       global answer
       if L >= answer:
           return
       if inspect(film,K):
           if L < answer:
               answer = L
           return
       if L == K:
           if L < answer:
               answer = L
           return
       else :
           for i in range(s,D):
               switched = []
               for j in range(W):
                   if film[i][j] == 1:
                       film[i][j] = 0
                       switched.append(j)
               dfs(L+1, i+1, film)
               for j in switched:
                   film[i][j] = 1
   
               switched = []
               for j in range(W):
                   if film[i][j] == 0:
                       film[i][j] = 1
                       switched.append(j)
               dfs(L+1, i+1, film)
               for j in switched:
                   film[i][j] = 0
   
   # 보호 필름의 두께 D, 가로크기 W, 합격기준 K
   T = int(input())
   for t in range(1,1+T):
   
       D, W, K = map(int, input().split())
       films = [list(map(int, input().split())) for _ in range(D)]
       answer = 1000000
       if K == 1:
           print(f'#{t} {0}')
       else :
           dfs(0,0,films)
           print(f'#{t} {answer}')
   ```

   

   