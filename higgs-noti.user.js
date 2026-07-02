// ==UserScript==
// @name         Higgs Noti — Higgsfield Generation Notifier
// @name:ko      힉스노티 — 힉스필드 생성 완료 알림
// @name:zh-CN   Higgs Noti — Higgsfield 生成完成通知
// @name:ru      Higgs Noti — уведомление о завершении генерации Higgsfield
// @name:es      Higgs Noti — Notificador de generación de Higgsfield
// @name:pt-BR   Higgs Noti — Notificador de geração do Higgsfield
// @name:ja      Higgs Noti — Higgsfield 生成完了通知
// @namespace    https://github.com/happybinnyy/higgs-noti
// @version      1.0.2
// @description  Notifies with an in-page banner, a sound, and a desktop notification when a Higgsfield video generation finishes. Unofficial, not affiliated with Higgsfield.
// @description:ko 힉스필드 영상 생성이 끝나면 화면 배너 + 소리 + 데스크톱 알림으로 알려줍니다. 비공식 도구(제작사와 무관).
// @description:zh-CN 当 Higgsfield 视频生成完成时，通过页面横幅、提示音和桌面通知提醒你。非官方工具，与 Higgsfield 无关。
// @description:ru Уведомляет баннером на странице, звуком и уведомлением на рабочем столе о завершении генерации видео в Higgsfield. Неофициальный, не связан с Higgsfield.
// @description:es Avisa con un banner en pantalla, un sonido y una notificación de escritorio cuando termina la generación de un vídeo en Higgsfield. No oficial, sin relación con Higgsfield.
// @description:pt-BR Avisa com um banner na tela, um som e uma notificação na área de trabalho quando a geração de um vídeo no Higgsfield termina. Não oficial, sem vínculo com a Higgsfield.
// @description:ja Higgsfield の動画生成が完了すると、画面バナー・音・デスクトップ通知で知らせます。非公式で、Higgsfield とは無関係です。
// @author       happybinnyy
// @match        https://higgsfield.ai/*
// @match        https://*.higgsfield.ai/*
// @grant        GM_notification
// @run-at       document-idle
// @license      MIT
// @homepageURL  https://github.com/happybinnyy/higgs-noti
// @supportURL   https://github.com/happybinnyy/higgs-noti/issues
// @downloadURL  https://raw.githubusercontent.com/happybinnyy/higgs-noti/main/higgs-noti.user.js
// @updateURL    https://raw.githubusercontent.com/happybinnyy/higgs-noti/main/higgs-noti.user.js
// ==/UserScript==
(function () {
  'use strict';

  // ── 소리 ──
  let ac = null;
  const ensure = () => { try { ac = ac || new (window.AudioContext||window.webkitAudioContext)(); if (ac.state==='suspended') ac.resume(); } catch(e){} };
  document.addEventListener('click', ensure, { once: true });
  function beep(){ ensure(); if(!ac) return; try{ const o=ac.createOscillator(),g=ac.createGain(); o.connect(g);g.connect(ac.destination); o.type='sine';o.frequency.value=880;g.gain.value=0.25; o.start(); setTimeout(()=>o.stop(),700);}catch(e){} }

  // ── 화면 안 배너 (권한 불필요, 무조건 보임) ──
  function banner(msg){
    let b = document.getElementById('__hf_banner__');
    if(!b){
      b = document.createElement('div');
      b.id = '__hf_banner__';
      b.style.cssText = 'position:fixed;top:16px;right:16px;z-index:2147483647;background:#111;color:#fff;padding:14px 18px;border-radius:10px;font:600 14px/1.4 system-ui,sans-serif;box-shadow:0 6px 24px rgba(0,0,0,.4);border:1px solid #444;max-width:320px;cursor:pointer;';
      b.onclick = ()=>{ b.style.display='none'; window.focus(); };
      document.body.appendChild(b);
    }
    b.textContent = '🎬 ' + msg;
    b.style.display = 'block';
    clearTimeout(b.__t);
    b.__t = setTimeout(()=>{ b.style.display='none'; }, 15000);
  }

  // ── 통합 알림: 배너 + 소리 + OS알림(가능하면) + 탭 제목 ──
  function notify(msg){
    banner(msg); beep();
    try { GM_notification({ title:'힉스필드 🎬', text:msg, timeout:15000, onclick:()=>window.focus() }); }
    catch(e){ try { if(window.Notification){ if(Notification.permission==='granted') new Notification('힉스필드 🎬',{body:msg}); else if(Notification.permission!=='denied') Notification.requestPermission(); } } catch(_){} }
    if(!/^✅/.test(document.title)) document.title='✅ '+document.title;
  }
  window.addEventListener('focus', ()=>{ document.title=document.title.replace(/^✅ /,''); });

  // ── 완료 감지: 작업 tile을 asset-id로 추적, "진행중 → 완료" 전환만 알림 ──
  // 실측(2026-07-02): 완료돼도 tile은 사라지지 않고 data-job-status가 "completed"로 바뀐다.
  //   진행중=queued/processing 등(ACTIVE), 완료=completed 등(DONE). 모두 data-asset-id 보유.
  // → 이전에 진행중이던 id가 "완료 상태로 바뀐" 경우에만 알림.
  //   화면 전환/스크롤로 tile이 통째로 사라지는 경우(id 소멸)는 완료로 치지 않아 오탐 없음.
  const ACTIVE = /^(queued|processing|running|pending|in_progress|inprogress|generating|starting|rendering|initializing|waiting)$/;
  const DONE   = /^(completed|complete|succeeded|success|done|finished|ready)$/;
  function scan(){
    const active = new Set(), done = new Set();
    document.querySelectorAll('[data-job-status]').forEach(el=>{
      const id = el.getAttribute('data-asset-id');
      if (!id) return;
      const s = (el.getAttribute('data-job-status')||'').toLowerCase();
      if (ACTIVE.test(s)) active.add(id);
      else if (DONE.test(s)) done.add(id);
    });
    return { active, done };
  }

  let prev = scan().active;
  console.log('[힉스알림] 시작, 진행중 =', prev.size);
  banner('알림 실행됨 (진행중 '+prev.size+')');

  setInterval(()=>{
    const { active, done } = scan();
    let finished = 0;
    prev.forEach(id=>{ if (!active.has(id) && done.has(id)) finished++; });  // 진행중→완료 전환만
    if (active.size !== prev.size) console.log('[힉스알림] 진행중 =', active.size);
    if (finished > 0) notify('영상 생성 완료! ('+finished+'개)');
    prev = active;
  }, 2000);
})();
