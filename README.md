# MBTI Test

MBTI 테스트를 진행하고 결과를 확인할 수 있는 웹 애플리케이션입니다.  
상태 관리를 위해 Zustand와 React Query를 활용했습니다.  

## 🚀 배포 
### https://mbti-test-gilt.vercel.app/

## 🛠️ 기술 스택

![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-000000?style=for-the-badge&logo=zustand&logoColor=white)
![React Query](https://img.shields.io/badge/React%20Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)

![json-server](https://img.shields.io/badge/json--server-333333?style=for-the-badge&logo=json&logoColor=white)
![Glitch](https://img.shields.io/badge/Glitch-2800ff?style=for-the-badge&logo=glitch&logoColor=white)

![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## ✨ 주요 기능

### 1. 로그인 및 인증 관리  
- `Zustand`를 활용하여 **로그인 상태, 토큰 유효 시간, 회원 정보**를 관리합니다.
- 로그인 후, `Navigate`의 `state`를 사용하여 **사용자가 원래 보고 있던 페이지**로 이동하도록 구현했습니다.
  
![RedirectFrom](https://github.com/user-attachments/assets/f91b53af-03f8-4af9-9bd4-f5fa112cf6f2)

### 2. 유효 시간 동기화   
- 브라우저를 종료했다가 다시 열어도, 로그인 시점 기준으로 남은 유효 시간을 유지합니다.
- `Zustand`의 `persist`를 활용하여 **accessToken**을 저장하며, 이를 `jwt-decode`로 분석해 발급 시점을 확인합니다.
- 이 발급 시점을 `localStorage`에 저장하고, 이를 기준으로 남은 유효 시간을 계산하여 표시합니다.
  
![유효 시간 동기화](https://github.com/user-attachments/assets/6abec995-1f3b-46a2-ad8f-6ec924b17b56)

### 3. 토큰 유효성 검사 및 자동 로그아웃  
- `React Query`를 활용하여 일정 주기마다 토큰의 유효성을 검사합니다.
- `refetchInterval`을 설정하여, 남은 유효 시간이 1초 미만이면 유효성 검사를 1초마다 하도록 구현했습니다.
- `enabled: !!accessToken`를 통해 **accessToken**이 존재할 때만 실행합니다.
- 토큰이 만료되면 자동으로 로그아웃됩니다.
  
![자동 로그아웃](https://github.com/user-attachments/assets/c2d78efd-6e88-4272-bda4-8362b58a1590)

### 4. 테스트 결과 관리 (CRUD)  
- `React Query`를 활용하여 테스트 결과를 관리합니다.  
- 결과 데이터를 `json-server`에서 불러오고, 수정 및 삭제할 수 있도록 구현되었습니다.  

### 5. 로딩 화면 처리  
- 데이터를 불러오는 동안 `React Query`의 `isPending` 상태를 활용하여 로딩 화면을 표시합니다.  
- 사용자 경험을 개선하기 위해 로딩 UI를 적용하였습니다.
  
![로딩](https://github.com/user-attachments/assets/a8ad5e68-a3e8-4401-8548-fccb5cffca30)

### 6. 카카오톡 공유하기  
- 공유된 링크에는 `testId`가 포함되며, 해당 링크로 접속하면 **로그인 없이도** 해당 결과를 조회할 수 있습니다.

---

## 📝 문제 해결

- 리렌더링될 이유가 없는 컴포넌트가 리렌더링되는 문제
  #### [너는 왜 계속 리렌더링되니?(feat.react-scan)](https://dlawi0108.tistory.com/67)

- useEffect의 의존성 배열이 빈 배열인데도 2번 실행되는 이유
  #### [useEffect에서 alert가 2번 호출된 이유](https://dlawi0108.tistory.com/66)

## 🤔 느낀 점

**기존에는 API 통신 후 데이터를 받아오면 `useEffect` 내부에서 `setState`로 상태를 업데이트해야 해서 번거로운 점이 많았습니다.** 

하지만 `react-query`를 사용하면서 **데이터가 변경되면 해당 `queryKey`값을 가진 캐시가 자동으로 refetch**되어 훨씬 간편하게 관리할 수 있었습니다.
아직 `staleTime`이나 `refetch`와 같은 개념을 완벽하게 이해하지 못했지만, 이를 공부하면 더욱 편리하게 상태 관리를 할 수 있을 것 같습니다.

그리고 이번에는 **Refresh Token** 없이 구현했기 때문에 토큰 유효성 검사에 대해 완벽하게 공부한 것은 아니지만, 그래도 `accessToken`을 기준으로 직접 적용해 볼 수 있어서 좋은 경험이었습니다.
