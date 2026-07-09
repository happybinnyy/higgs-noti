# 힉스노티 (Higgs Noti)

[English](README.md) | **한국어** | [简体中文](README.zh-CN.md) | [Русский](README.ru.md) | [Español](README.es.md) | [Português (BR)](README.pt-BR.md) | [日本語](README.ja.md)

힉스필드([higgsfield.ai](https://higgsfield.ai))에서 **영상 생성이 끝나면** 알려주는 브라우저 유저스크립트입니다.
생성 완료 시점이 매번 달라 탭을 계속 지켜봐야 하는 번거로움을 없애줍니다.

> ⚠️ **비공식(unofficial)** 도구입니다. Higgsfield 제작사와 아무 관련이 없습니다.
> 페이지 화면(DOM)만 읽어 알림을 띄울 뿐, 콘텐츠를 수집·재배포하거나 결제를 우회하지 않습니다.

## 기능

- **화면 배너** — 권한 불필요, 무조건 보임
- **소리** — 페이지를 한 번 클릭해 둔 뒤부터 재생됨 (브라우저 자동재생 정책)
- **데스크톱 알림** — OS/브라우저 알림 허용 시
- **탭 제목 ✅ 표시** — 다른 탭에 있어도 눈에 띔
- **생성 통계 패널** — 우측 하단 📊 버튼: 오늘/이번주/전체 개수, 소요 시간 통계, 요일·시간대 분포, CSV 내보내기

## 설치

1. 브라우저에 [Tampermonkey](https://www.tampermonkey.net/) 설치
2. ★ **"사용자 스크립트 허용(Allow User Scripts)" 켜기** — 최신 크롬/엣지/웨일 필수
   `확장 관리 → 개발자 모드 ON → Tampermonkey 세부정보 → 사용자 스크립트 허용 ON`
   (이게 꺼져 있으면 스크립트가 아예 실행되지 않습니다)
3. [`higgs-noti.user.js`](higgs-noti.user.js) 를 열어 설치 → 힉스필드 탭 새로고침(F5)
4. 우측 상단에 `🎬 알림 실행됨 (진행중 N)` 배너가 뜨면 정상

## 동작 원리

생성 중인 타일에는 `data-job-status="queued"`/`"processing"` 같은 **작업 상태 속성**이 붙습니다.
진행 중이던 타일이 사라졌을 때, **목록(화면)의 나머지가 그대로면 = 진짜 완료**로 보고 알림을 띄웁니다.
폴더 이동이나 스크롤로 목록이 통째로 바뀌는 경우는 완료와 구분해 **오탐을 방지**합니다.

## 문제 해결

- **배너조차 안 뜸** → "사용자 스크립트 허용"이 꺼져 있거나 스크립트가 비활성.
  F12 콘솔에서 `[힉스알림] 시작, 진행중 = N` 로그를 확인하세요.
- **OS 알림만 안 뜸** → 윈도우 집중 지원 OFF, 브라우저 사이트 알림 "허용".
  (배너·소리가 정상이면 스크립트 자체는 OK)
- **완료 감지가 안 됨** → 힉스필드가 `data-job-status` 속성/값을 바꾼 것.
  생성 중인 타일을 검사(F12)해 실제 속성을 확인한 뒤 스크립트의 `ACTIVE` 정규식/셀렉터를 수정하세요.

## 후원 (Donation)

이 도구가 도움이 되었다면 후원으로 응원해 주세요 🙏

[![Sponsor](https://img.shields.io/badge/Sponsor-%E2%9D%A4-db61a2?logo=githubsponsors)](https://github.com/sponsors/happybinnyy)

- GitHub Sponsors: https://github.com/sponsors/happybinnyy

리포 상단의 **♥ Sponsor** 버튼으로도 후원할 수 있습니다.

## 라이선스

[MIT](LICENSE)

---

<sub>힉스노티는 앞으로 여러 AI 편의 도구를 모으는 **AI Field** 프로젝트의 첫 도구입니다.</sub>
