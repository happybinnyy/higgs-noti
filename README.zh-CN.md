# Higgs Noti

[English](README.md) | [한국어](README.ko.md) | **简体中文** | [Русский](README.ru.md) | [Español](README.es.md) | [Português (BR)](README.pt-BR.md) | [日本語](README.ja.md)

一个浏览器用户脚本，当 Higgsfield（[higgsfield.ai](https://higgsfield.ai)）上的视频生成完成时通知你。
每次生成所需时间都不同，因此你不必一直盯着标签页。

> ⚠️ **非官方**工具，与 Higgsfield 没有任何关联。
> 它仅读取页面（DOM）来弹出通知，不会收集或再分发内容，也不会绕过任何付费。

## 功能

- **页面横幅** — 无需权限，始终可见
- **提示音** — 在你至少点击过页面一次之后才会播放（浏览器自动播放策略）
- **桌面通知** — 允许操作系统/浏览器通知时
- **标签页标题 ✅ 标记** — 即使在其他标签页也能注意到
- **生成统计面板** — 右下角 📊 按钮：今日/本周/全部数量、生成耗时统计、星期与时段分布、CSV 导出

## 安装

1. 在浏览器中安装 [Tampermonkey](https://www.tampermonkey.net/)
2. ★ **开启用户脚本执行权限** — 不开启的话，即使安装了脚本也**完全不会运行**。各浏览器方法不同：
   - **Chrome / Edge (138+)**：`chrome://extensions` → Tampermonkey **详情** → 开启**“允许用户脚本”**
   - **Chrome / Edge（旧版）**：`chrome://extensions` → 右上角开启**“开发者模式”**
   - **Whale 浏览器**：**完全没有**“允许用户脚本”开关，普通 Tampermonkey (5.x) 无法运行用户脚本 → 请改从商店安装 **Tampermonkey Legacy**（MV2），它无需此权限即可运行。
3. 打开 [`higgs-noti.user.js`](higgs-noti.user.js) 进行安装 → 刷新 Higgsfield 标签页（F5）
4. 右上角出现 `🎬 Notifier running (active N)` 横幅即表示正常

## 工作原理

正在生成的图块带有 `data-job-status="queued"`/`"processing"` 等**任务状态属性**。
当一个“进行中”的图块消失时，**只有在列表（画面）其余部分保持不变**（即真正完成）的情况下才会弹出通知。
如果因为切换文件夹或滚动导致整个列表发生变化，则会与“完成”区分开来，因此不会误报。

## 故障排查

- **连横幅都不出现** → “允许用户脚本”被关闭，或脚本被禁用。
  请在 F12 控制台查看 `[힉스알림] 시작, 진행중 = N` 日志。
- **仅缺少系统通知** → 关闭 Windows 专注助手，并将站点通知设为“允许”。
  （若横幅/提示音正常，则脚本本身没问题）
- **无法检测完成** → Higgsfield 更改了 `data-job-status` 属性/值。
  请检查（F12）正在生成的图块，确认实际属性后，修改脚本中的 `ACTIVE` 正则/选择器。

## 赞助

如果这个工具帮到了你，欢迎赞助支持 🙏

[![Sponsor](https://img.shields.io/badge/Sponsor-%E2%9D%A4-db61a2?logo=githubsponsors)](https://github.com/sponsors/happybinnyy)

- GitHub Sponsors: https://github.com/sponsors/happybinnyy

你也可以通过仓库顶部的 **♥ Sponsor** 按钮进行赞助。

## 许可证

[MIT](LICENSE)

---

<sub>Higgs Noti 是即将推出的 **AI Field** 项目的第一个工具，该项目将汇集各种 AI 便利工具。</sub>
