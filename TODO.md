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
- [ ] **★ GitHub Sponsors 프로그램 가입·승인** (본인이 웹에서: https://github.com/sponsors — 신원확인·Stripe 연결 필요). **가입 전까지는 Sponsor 버튼/링크가 동작하지 않음.**
- [~] `@supportURL` 은 이슈 페이지 그대로 유지 (support=문의 용도가 맞음. 후원은 Sponsor 버튼+README로 분리)

## 3. GreasyFork 배포 (자동 업데이트용)
- [ ] GreasyFork 계정 만들기 (웹에서 직접)
- [ ] `higgs-noti.user.js` 업로드
- [ ] `@downloadURL` / `@updateURL` 경로 확인
      (현재: `raw.githubusercontent.com/happybinnyy/higgs-noti/main/higgs-noti.user.js`)
- [ ] 설치 링크를 README에 추가
- 검색 결과: GreasyFork에 힉스필드 "생성 완료 알림" 스크립트는 없음 → 선점 가능

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
