# Higgs Noti

[English](README.md) | [한국어](README.ko.md) | [简体中文](README.zh-CN.md) | [Русский](README.ru.md) | [Español](README.es.md) | [Português (BR)](README.pt-BR.md) | **日本語**

Higgsfield（[higgsfield.ai](https://higgsfield.ai)）で動画生成が完了すると通知してくれるブラウザ用ユーザースクリプトです。
生成完了のタイミングは毎回異なるため、タブをずっと見張る手間がなくなります。

> ⚠️ **非公式**ツールです。Higgsfield とは一切関係ありません。
> ページ（DOM）を読み取って通知を表示するだけで、コンテンツの収集・再配布や課金の回避は行いません。

## 機能

- **画面バナー** — 権限不要、常に表示
- **サウンド** — ページを一度クリックした後から再生されます（ブラウザの自動再生ポリシー）
- **デスクトップ通知** — OS/ブラウザの通知を許可している場合
- **タブタイトルの ✅ 表示** — 別のタブにいても気づけます
- **生成統計パネル** — 右下の 📊 ボタン：今日/今週/全体の件数、生成所要時間の統計、曜日・時間帯の分布、CSV エクスポート

## インストール

1. ブラウザに [Tampermonkey](https://www.tampermonkey.net/) をインストール
2. ★ **ユーザースクリプトの実行権限をオンにする** — これをしないと、インストールしてもスクリプトは**まったく動きません**。ブラウザごとに異なります：
   - **Chrome / Edge (138+)**：`chrome://extensions` → Tampermonkey の**詳細** → **「ユーザースクリプトを許可」**をオン
   - **Chrome / Edge（旧バージョン）**：`chrome://extensions` → 右上の**「デベロッパーモード」**をオン
   - **Whale**：「ユーザースクリプトを許可」のトグルが**存在しません**。通常の Tampermonkey (5.x) では実行できないため、ストアから **Tampermonkey Legacy**（MV2）をインストールしてください。この権限なしで動作します。
3. [`higgs-noti.user.js`](higgs-noti.user.js) を開いてインストール → Higgsfield のタブを更新（F5）
4. 右上に `🎬 Notifier running (active N)` バナーが表示されれば正常です

## 仕組み

生成中のタイルには `data-job-status="queued"`/`"processing"` などの**ジョブ状態属性**が付きます。
「進行中」のタイルが消えたとき、**残りの一覧（画面）がそのままであれば**（＝本当の完了）通知を出します。
フォルダの切り替えやスクロールで一覧全体が変わった場合は完了と区別するため、誤検知はありません。

## トラブルシューティング

- **バナーすら出ない** → 「ユーザースクリプトを許可」がオフ、またはスクリプトが無効です。
  F12 コンソールで `[힉스알림] 시작, 진행중 = N` ログを確認してください。
- **OS 通知だけ出ない** → Windows の集中モードをオフにし、サイトの通知を「許可」に設定してください。
  （バナー・サウンドが正常なら、スクリプト自体は問題ありません）
- **完了が検知されない** → Higgsfield が `data-job-status` の属性名/値を変更したためです。
  生成中のタイルを検証（F12）して実際の属性を確認し、スクリプトの `ACTIVE` 正規表現/セレクターを修正してください。

## 支援（寄付）

このツールが役に立ったら、ぜひ支援をご検討ください 🙏

[![Sponsor](https://img.shields.io/badge/Sponsor-%E2%9D%A4-db61a2?logo=githubsponsors)](https://github.com/sponsors/happybinnyy)

- GitHub Sponsors: https://github.com/sponsors/happybinnyy

リポジトリ上部の **♥ Sponsor** ボタンからも支援できます。

## ライセンス

[MIT](LICENSE)

---

<sub>Higgs Noti は、さまざまな AI 便利ツールを集める今後の **AI Field** プロジェクトの最初のツールです。</sub>
