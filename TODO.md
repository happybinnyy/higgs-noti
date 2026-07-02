# 힉스노티 (Higgs Noti) — 할 일

> 힉스필드 생성 완료 알림 유저스크립트. 단일 도구 프로젝트.
> 현재 상태: GitHub 공개됨 (https://github.com/happybinnyy/higgs-noti). 저장소명 `higgs-noti`.

## 1. GitHub 공개 ✅ 완료 (2026-07-02)
- [x] 공개 여부 결정 → public
- [x] 리포 생성 + 푸시 → https://github.com/happybinnyy/higgs-noti
- [x] 리포 토픽(태그): `userscript`, `tampermonkey`, `higgsfield`, `ai`

## 2. 후원 (Donation) — GitHub Sponsors 선택 (2026-07-02)
- [x] 후원 플랫폼 정하기 → **GitHub Sponsors**
- [x] `README.md` 후원 섹션 채우기 (Sponsors 링크 + 배지)
- [x] `.github/FUNDING.yml`에 `github: happybinnyy` 추가
- [~] **GitHub Sponsors 프로필 가입** — 신청 제출 완료, 현재 **Pending**. 남은 단계(본인이 웹에서 직접):
  - [ ] Confirm your identity (신원 확인)
  - [ ] Enable GitHub two-factor authentication (2단계 인증 활성화)
  - [ ] Publish your GitHub Sponsors profile (프로필 게시)
  - 위 3단계 + GitHub 승인이 끝나야 리포의 `♥ Sponsor` 버튼과 `github.com/sponsors/happybinnyy` 링크가 실제 동작함 (그 전엔 404).
- [~] `@supportURL` 은 이슈 페이지 그대로 유지 (support=문의 용도가 맞음. 후원은 Sponsor 버튼+README로 분리)

## 3. GreasyFork 배포 (자동 업데이트용) — ⬅ 다른 세션에서 진행할 작업

> 배경: GreasyFork에 힉스필드 "생성 완료 알림" 스크립트는 없음(2026-07-02 검색) → 선점 가능.
> 계정 로그인·게시 버튼 클릭은 **웹에서 사람이 직접** 해야 함(에이전트가 대신 못 함).
> 스크립트 원본: 이 리포 루트 [`higgs-noti.user.js`](higgs-noti.user.js) (GitHub raw로 공개됨, HTTP 200 확인).

### 3-1. 게시 절차 (사람이 웹에서)
- [ ] greasyfork.org 접속 → 우상단 로그인 (GitHub/Google OAuth 또는 이메일)
- [ ] 상단 메뉴 "스크립트" → **"새 스크립트 게시(Post a script you've written)"**
- [ ] 코드 입력 방식 결정 (아래 3-2 참고) 후 `higgs-noti.user.js` 내용 등록
- [ ] 게시(Post script) → GreasyFork 스크립트 페이지 URL 확보

### 3-2. ★ 결정 포인트: 업데이트 소스 (게시 전에 정할 것)
GreasyFork는 자기가 호스팅하는 스크립트의 `@downloadURL`/`@updateURL`을 **무시/제거**하고,
설치·업데이트를 GreasyFork 경유로 관리한다. 두 가지 방식 중 택1:
- **(A) GreasyFork "외부 URL 동기화" 사용 (권장)**: 게시 시 코드 붙여넣기 대신
  "Sync this script from a URL"에 GitHub raw URL을 지정
  → GitHub이 원본(source of truth), GreasyFork가 자동으로 끌어와 갱신.
  → GitHub 스크립트 고치면 GreasyFork도 자동 최신화, 통계·검색은 GreasyFork에서.
  - raw URL: `https://raw.githubusercontent.com/happybinnyy/higgs-noti/main/higgs-noti.user.js` (HTTP 200 확인, 2026-07-02)
- **(B) 코드 직접 붙여넣기**: 매 업데이트마다 GreasyFork에서 수동으로 새 버전 붙여넣어야 함(관리 번거로움).
- [x] A/B 중 방식 확정 → **(A) 외부 URL 동기화** (GitHub이 원본, 자동 갱신)

### 3-3. 게시 후 마무리
- [ ] README "설치" 섹션에 GreasyFork 설치 링크 추가 (Tampermonkey 안내와 병기)
- [ ] (선택) `@version` 올릴 때 GitHub·GreasyFork 버전 일치 확인
- [ ] 힉스노티가 GreasyFork에서 정상 설치되는지 1회 실제 확인

## 4. 브랜딩 (선택)
- [ ] 아이콘/로고 → 스크립트에 `@icon` 추가
- [ ] GitHub Pages 소개 페이지

## 미래: AI Field 사이트
- [ ] 힉스노티 외 다른 AI 편의 도구를 모을 상위 사이트/브랜드 "AI Field" 구상
- [ ] 각 도구는 독립 리포로 두고 AI Field에서 링크·소개하는 구조 검토

## 유지보수 메모
- **깨질 때**: 힉스필드가 `data-job-status` 속성/값을 바꾸면 감지가 멈춤.
  생성 중인 타일을 검사(F12)해 실제 속성 확인 후 스크립트의 `ACTIVE` 정규식/셀렉터 수정.
- 상세 원리·문제해결은 `README.md` 참고.
