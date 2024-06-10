## [최종 발표자료 보러가기](https://docs.google.com/presentation/d/e/2PACX-1vQUcHRtOuFwj0a8N5oigyEV6WJdl1LqsW66oX-JDnCxmga_al-MWjOg4zYbIF20PA/pub?start=false&loop=false&delayms=3000&slide=id.p1)

## 프로젝트 개요
![브로슈어](https://github.com/rhtjddls123/hello_react/assets/60644352/3013c385-bcc5-4267-b709-9effd23dde12)

## 시스템 아키텍처
![시스템아키텍처3d](https://github.com/rhtjddls123/Agricultural-product-classification/assets/60644352/c74f62e7-9916-4d69-a967-aef28ddbfc40)

## 알고리즘
![](https://velog.velcdn.com/images/jjjk0605/post/f0d30293-81e9-4ff1-8f51-370327d8ec4d/image.png)

![image](https://github.com/rhtjddls123/Agricultural-product-classification/assets/60644352/aa092eec-b0c4-465e-8ff1-6d3577510174)


## 개발환경

- `react-native`
- `node v20.12.2`
- `python flask`
- `express`
- `expo`

## 폴더구조

```
capstone
├─ AI			// ai모델을 학습시킨 코드입니다.
│
├─ BE
│  ├─ express    	// express서버를 관리합니다.
│  ├─ models 		// cnn모델들을 관리합니다.
│  │   ├─ apple     
│  │   ├─ cabbage   
│  │   └─ radish    
│  │
│  └─ python	         // flask서버와 딥러닝 모델을 관리합니다.
│  
└─ FE
   ├─ assets            // 정적파일들을 관리합니다.
   ├─ components        // 컴포넌트들을 관리합니다.
   ├─ screens           // 스크린들을 관리합니다.
   ├─ types             // 타입들을 관리합니다.
   └─ utils             // 함수들을 관리합니다.
 

```

## Commit 규칙

```
Init:	프로젝트 초기 생성
Feat:	새로운 기능 추가
Fix:	버그 수정
Design:	CSS 등 사용자 UI 디자인 변경
Remove:	파일 삭제
Chore:	위에 걸리지 않는 기타 변경사항
```

## Screen

- HistoryScreen: 이전 진단결과를 볼 수 있는 히스토리 페이지
- HomeScreen: 농산물을 선택하고 사진을 찍을 수 있는 메인 페이지
- LoginScreen: 로그인을 페이지
- ProfileScreen: 내 정보를 확인하고 변경, 탈퇴를 할 수 있는 페이지
- RegisterScreen: 회원가입 페이지
- ResultScreen: 진단 결과를 보여주는 페이지

## 시연영상
https://github.com/rhtjddls123/Agricultural-product-classification/assets/60644352/f60eaa1d-38a8-486f-9b74-3780d118248a

