# Higgs Noti

**English** | [한국어](README.ko.md) | [简体中文](README.zh-CN.md) | [Русский](README.ru.md) | [Español](README.es.md) | [Português (BR)](README.pt-BR.md) | [日本語](README.ja.md)

A browser userscript that notifies you when a video generation finishes on Higgsfield ([higgsfield.ai](https://higgsfield.ai)).
Generation time varies every time, so you no longer need to keep watching the tab.

> ⚠️ **Unofficial** tool. Not affiliated with Higgsfield in any way.
> It only reads the page (DOM) to show a notification — it does not collect or redistribute content, nor bypass any payment.

## Features

- **On-page banner** — no permission needed, always visible
- **Sound** — plays once you've clicked the page at least once (browser autoplay policy)
- **Desktop notification** — when OS/browser notifications are allowed
- **Tab title ✅ marker** — noticeable even when you're on another tab
- **Generation stats panel** — the 📊 button (bottom-right): today/this-week/all counts, generation-time stats, weekday & hour distribution, and CSV export

## Installation

1. Install [Tampermonkey](https://www.tampermonkey.net/) in your browser
2. ★ **Enable userscript execution permission** — without this the script **will not run at all**, even after installing. It differs per browser:
   - **Chrome / Edge (138+)**: `chrome://extensions` → Tampermonkey **Details** → turn **"Allow User Scripts"** ON
   - **Chrome / Edge (older)**: `chrome://extensions` → turn **"Developer mode"** ON (top right)
   - **Whale**: there is **no "Allow User Scripts" toggle at all**, so regular Tampermonkey (5.x) cannot run userscripts → install **Tampermonkey Legacy** (MV2) from the store instead; it works without this permission.
3. Open [`higgs-noti.user.js`](higgs-noti.user.js) to install → refresh the Higgsfield tab (F5)
4. It works if a `🎬 Notifier running (active N)` banner appears at the top right

## How it works

Tiles that are generating carry a **job-status attribute** such as `data-job-status="queued"`/`"processing"`.
When an in-progress tile disappears, it fires a notification **only if the rest of the list (view) stayed the same** — i.e. a real completion.
If the whole list changes because you switched folders or scrolled, that's told apart from a completion, so there are no false alarms.

## Troubleshooting

- **No banner at all** → "Allow User Scripts" is off, or the script is disabled.
  Check the `[힉스알림] 시작, 진행중 = N` log in the F12 console.
- **Only the OS notification is missing** → turn off Windows Focus Assist and set the site notification to "Allow".
  (if the banner/sound work, the script itself is fine)
- **Completion isn't detected** → Higgsfield changed the `data-job-status` attribute/value.
  Inspect a generating tile (F12), check the actual attribute, then adjust the `ACTIVE` regex/selector in the script.

## Donation

If this tool helped you, please consider supporting it 🙏

[![Sponsor](https://img.shields.io/badge/Sponsor-%E2%9D%A4-db61a2?logo=githubsponsors)](https://github.com/sponsors/happybinnyy)

- GitHub Sponsors: https://github.com/sponsors/happybinnyy

You can also sponsor via the **♥ Sponsor** button at the top of the repo.

## License

[MIT](LICENSE)

---

<sub>Higgs Noti is the first tool of the upcoming **AI Field** project, which will gather various AI convenience tools.</sub>
