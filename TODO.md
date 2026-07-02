# AI필드 (AIfield) — 할 일

> 이 프로젝트에서 진행할 작업 목록. 완료하면 `[x]`로 체크.
> 현재 상태: 로컬 git 저장소 생성 완료(main, 커밋 2개). GitHub 미공개.

## 1. GitHub 공개
- [ ] 공개 여부 결정 (public / private)
- [ ] 리포 생성 + 푸시
  ```bash
  gh repo create AIfield --public --source=. --remote=origin --push \
    --description "AI필드 — AI 웹서비스 편의 유저스크립트 모음 (비공식)"
  ```
  (`gh`는 이미 happybinnyy로 로그인됨)
- [ ] 리포 설명·토픽(태그) 정리: `userscript`, `tampermonkey`, `higgsfield`, `ai` 등

## 2. 후원 (Donation) 연결
- [ ] 후원 플랫폼 정하기 (Ko-fi / Buy Me a Coffee / GitHub Sponsors / Toss)
- [ ] `README.md` 후원 섹션의 `<LINK>` 채우기
- [ ] 스크립트 헤더 `@supportURL` 을 후원 링크로 교체 (지금은 이슈 페이지)
      파일: `higgsfield-notify/higgsfield-notify.user.js`

## 3. GreasyFork 배포 (자동 업데이트용)
- [ ] GreasyFork 계정 만들기
- [ ] `higgsfield-notify.user.js` 업로드
- [ ] `@downloadURL` / `@updateURL` 경로 확인
      (현재: `raw.githubusercontent.com/happybinnyy/AIfield/main/higgsfield-notify/...`)
- [ ] 설치 링크를 README에 추가

## 4. 브랜딩 (선택)
- [ ] 아이콘/로고 → 스크립트에 `@icon` 추가
- [ ] 도메인 `AIfield.*` 가용성 확인 (instantdomainsearch / porkbun / cloudflare)
- [ ] GitHub Pages 소개 페이지 (`happybinnyy.github.io/AIfield`)

## 5. 도구 로드맵
- [x] **higgsfield-notify** — 힉스필드 영상 생성 완료 알림 (v1.0.0, 작동 확인 완료)
- [ ] 다음 도구 아이디어 정리 (다른 AI 웹서비스용 편의 스크립트)

## 유지보수 메모
- **higgsfield-notify 깨질 때**: 힉스필드가 `data-job-status` 속성/값을 바꾸면 감지가 멈춤.
  생성 중인 타일을 검사(F12)해 실제 속성 확인 후 스크립트의 `ACTIVE` 정규식/셀렉터 수정.
- 상세 원리·문제해결은 `higgsfield-notify/README.md` 참고.
