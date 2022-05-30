# 프론트엔드 개발자를 위한 커뮤니티

Portfolio: [배포된 사이트 보기](https://www.sef.today/)

**데이터 연동에 대한 이슈가 있어 개발서버에서만 돌아갑니다. 취업후 손보겠습니다.**

## 목차

1. **제작기간 & 참여인원**
2. **사용기술**
3. **기술 선택의 배경**
4. **프로젝트 개요**
5. **주요기능**
6. **기타**

### 1. 제작기간 & 참여인원

- 2022년 1월 2주간 backend 제작
- 2022년 1월 2주간 frontend 제작
- ~ing 계속 업데이트중
- 개인프로젝트

### 2. 사용기술

**FrontEnd**

- JavaScript + TypeScript
- React17 + Next.js
- Axios + SWR
- Redux-Toolkit + Persist + Persist-transform-encrypt
- Antd + TailwindCSS + Emotion

**BackEnd**

- Django + Django Rest Framework
- Swagger
- JWT
- Gunicorn
- Docker

**DataBase**

- Sqlite → Mysql

**Deploy**

- Vercel
- Hosting.kr
- AWS-LightSail
- AWS-LightSail-Database
- AWS-S3
- Nginx
- Let's Encrypt

### 3. 기술 선택의 배경

- 파이어베이스로 프로젝트를 진행해보니 웹에서의 과금구조가 너무 비싸다고 생각하게 되었습니다.
- Nest 와 Django를 고민하다가 가장 빨리 만들수있는 장고를 선택하게 되었습니다.
- Next는 파일기반 라우팅과 SSR을 장점으로 보고 선택하게 되었습니다. 써보고 훨씬더 만족하고 있습니다.

### 4. 프로젝트 개요

- 처음엔 CRUD만 되는 게시판을 만들려고 했지만 기능을 좀더 붙이기 위해 커뮤니티를 만들게 되었습니다.
- 프론트엔드 개발자를 위한 커뮤니티가 되었습니다.

### 5. 주요기능

- 회원가입
- 로그인
- 게시글 CRU (수정 및 삭제는 구현은 되어있으나 적용안됨. 삭제는 제공하지 않을예정)
- 게시글 추천(Optimistic Ui 적용)
- 게시글 조회수
- 댓글 CR 및 추천
- 대댓글 CR 및 추천
- 인기게시판
- 페이지네이션
- 모든 CRU에는 SSR과 Optimistic Ui와  적용되어 있습니다.


### 6. 기타
### 프로젝트 진행 과정

혼자 만들어가는 과정이기 때문에 전체적인 개요에 대해서는 피그마 없이 정말 가볍고 간단하게 설계를 했습니다.  이번 프로젝트에서 넥스트와 장고 둘다 처음 써보는 것이기 때문에 살짝 걱정이 되었는데 금새 익숙해져서 필요한 대부분의 백엔드를 미리 짜두고 마치 협업을 한다고 가정하고 프론트 하나만 집중해서 진행 했습니다. 형상관리 역시협업하는 컨셉으로 했기 때문에 git flow를 적용시켜 보았습니다.

<img width="278" alt="스크린샷_2022-03-31_오전_12 05 31" src="https://user-images.githubusercontent.com/80582578/162485530-f2b415a1-3de1-4253-b247-f405c488e8f2.png">

깃플로우는 이런느낌으로 쓰고 있으며 개발이 끝나면 브랜치는 머지후 삭제하고 있습니다. 이것도 기록이다 생각하고 계속 스위칭하면서 pull 땡겼더니 내역이 꼬여서 고생했습니다.

여담이지만 develop에 머지시키고 부터는 테스트코드를 연습하려고 했는데 해야할게 너무많아서 테스트코드는 좀 미루기로 했습니다.

<img width="574" alt="스크린샷_2022-03-31_오전_12 08 37" src="https://user-images.githubusercontent.com/80582578/162488683-292d9911-8d6b-4f68-91d5-f066ec99ea2d.png">


이슈관리는 이슈탭에다가 했습니다 FE BE 접두어로 써있는 이유는 프론트엔드 백엔드가 같은 깃허브 레포지토리에 있었는데 이제 배포하려고 보니 서로가 서로의 짐짝이여서 백엔드랑 프론트랑 분리시켜놨습니다.

<img width="390" alt="스크린샷_2022-03-31_오전_12 11 05" src="https://user-images.githubusercontent.com/80582578/162488728-9ab77fbd-f832-485d-88fb-ac8e9045f01f.png">
우선 로고입니다 모든 디자인은 제가 했습니다. 특이한 캐릭터로 디자인 하고싶었습니다. 공룡옷 입은 라이언같은 공룡옷 컨셉이 생각났습니다. 컨셉에 대해서 조사하면서 놀랐던 점은 일반적인 공룡옷은 티라노사우르스의 모티베이션인데 렌더링되는 모델마다 등에 가시가 돋혀있거나 민무늬거나 둘중 하나였습니다. 일반적인 인형옷은 가시돋힌 티라노 사우르스 였습니다. 디자인할거면 뻔한 티라노보다 물고기 디자인은 없을까 생각하여 모사사우르스라는 모델을 적용했습니다. 처음 디자인은 상어가 아나콘다처럼 곰한마리를 꿀꺽 하는 모양새가 나왔습니다. 한참 생각하다가 솔루션이 나왔습니다. 물고기의 눈알을 꺾고 태엽을 달았습니다.

<img width="615" alt="스크린샷_2022-03-31_오전_12 23 32" src="https://user-images.githubusercontent.com/80582578/162488770-c38623c7-9d5d-4d51-813b-f5c4ffa9aa4c.png">

회원가입 페이지입니다.
최대한 간결한 정보만 받기로 결정했습니다.

<img width="412" alt="스크린샷_2022-03-31_오전_12 24 19" src="https://user-images.githubusercontent.com/80582578/162488995-54e30776-c027-4c5c-8102-6b04bff36621.png">

로그인 페이지 입니다. 

<img width="372" alt="스크린샷_2022-03-31_오전_12 25 06" src="https://user-images.githubusercontent.com/80582578/162489008-042d5008-1db4-4d71-a832-45c27d39e43b.png">

로그인 방식은 JWT를 사용했습니다. 프로젝트 중에서 가장 공수가 많이 들어간 기능중 하나가 아닐까 생각합니다. access와 refresh는 쿠키에다가 저장합니다. 쿠키에 expire를 걸고 쿠키 유무에 따라 _app에서 재발급되도록 설계를 했습니다. 이론상 문제될게 없어야 했는데 이것만으론 부족했습니다. 장고에서 인증시간이 지나면 무조건 기존 데이터에 대해서 401을 띄웁니다. 그럼 보던 페이지가 날아가버리는 현상이 있었습니다.  특히 쿠키도 없고 토큰도 만료된 상태라면 오류가 엄청나게 떴습니다. 이를 해결하기 위해서 고민을 엄청 많이 했는데 애초에 처음 로그인할때 post 요청이 swr로 못하기 때문에 발생하는 문제 였습니다. 보통은 그냥 에러를 받아서 처리하면 되는데 생각처럼 안돌아가고 여간 까다로운게 아니였습니다.  그래서 결국 생각해낸 절충안이 에러받으면 헤더부터 없애고 그후에 다른 옵션을 이용해서 에러처리를 하면 깔끔하게 해결됩니다. 그래도 콘솔에 401에러가 나오게 되는데 이걸 없애려면 장고내에서 유저체킹하는 로직을 없애줘야 한다고 합니다.  꼭 필요한 로직이여서 두기로 했습니다.

<img width="644" alt="스크린샷_2022-03-31_오전_12 32 39" src="https://user-images.githubusercontent.com/80582578/162489017-ccd603e1-5c53-4aee-9d00-4844bac8735c.png">

메인페이지 입니다. 로그인 or 회원가입 외에는 볼필요 없는 페이지입니다. 비워두기도 뭐해서 다른사이트들처럼 게시글 맛보기를 제공했습니다. 저의 모든 페이지는 반응형을 제공합니다.

<img width="559" alt="스크린샷_2022-03-31_오전_12 33 59" src="https://user-images.githubusercontent.com/80582578/162489025-71832018-bf4e-4941-8e6d-ff74f5f68299.png">


모든페이지 이야기가 나와서 이야기를 이어보자면 반응형 뿐만 아니라 모든페이지가 서버사이드렌더링입니다. 하지만 서버사이드의 목적은 SEO이기 때문에 isbot이라는 라이브러리의 도움을 받아 봇의 접속여부를 판단 받고 있습니다. 그래서 일반유저는 클라이언트 사이드로 받는대신 swr을 이용한 모든 페이지는 캐싱됩니다. 사용자경험에 큰 기여가 될것이라고 생각합니다.

<img width="546" alt="스크린샷_2022-03-31_오전_12 37 07" src="https://user-images.githubusercontent.com/80582578/162489028-9c72ff90-4e9b-49bf-ab88-e3ad057c6a1b.png">


게시판 리스트는 이러합니다. 페이징과 태그를 지원합니다. 

<img width="581" alt="스크린샷_2022-03-31_오전_12 38 41" src="https://user-images.githubusercontent.com/80582578/162489030-5032f97a-1dd5-4337-9aac-e92030ad9bbc.png">


질문 게시글 내부입니다. 게시글엔 공통적으로 게시글의 정보와 추천을 제공합니다. 질문 게시판의 경우 답변하기가 제공되어 게시글과 똑같은 레벨의 게시글 작성이 가능합니다.

<img width="549" alt="스크린샷_2022-03-31_오전_12 39 51" src="https://user-images.githubusercontent.com/80582578/162489031-c071e656-5938-4f5b-ab98-acc530a221dc.png">


답변 게시물은 즉시 작성할수있으며 모든 게시글은 캐싱처리로 인해서 빠르다는 느낌을 제공합니다.

<img width="564" alt="스크린샷_2022-03-31_오전_12 41 22" src="https://user-images.githubusercontent.com/80582578/162489032-682de887-902c-42c9-946a-e99cd4fed1c0.png">


댓글과 대댓글로 구성이 되어있습니다. 대댓글에 대대댓글은 달수없게 설계했습니다. 마찬가지로 모든 post 동작은 캐싱처리되어 빠른동작을 합니다. 

여기까지 제가 생각하는 최소스펙의 게시판을 짜보았습니다. 지금은 취업을 먼저해야될것 같아 기능추가를 정말 최대한 줄이고 줄이고 줄였지만 앞으로 디벨롭해볼 생각입니다.
