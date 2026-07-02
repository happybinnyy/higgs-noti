// ==UserScript==
// @name         Higgsfield Generation Done Notifier
// @name:ko      힉스필드 생성 완료 알림
// @namespace    https://github.com/<GITHUB_USER>/aifield
// @version      1.0.0
// @description  Notifies with an in-page banner, a sound, and a desktop notification when a Higgsfield video generation finishes. Unofficial, not affiliated with Higgsfield.
// @description:ko 힉스필드 영상 생성이 끝나면 화면 배너 + 소리 + 데스크톱 알림으로 알려줍니다. 비공식 도구(제작사와 무관).
// @author       <YOUR_NAME>
// @match        https://higgsfield.ai/*
// @match        https://*.higgsfield.ai/*
// @grant        GM_notification
// @run-at       document-idle
// @license      MIT
// @homepageURL  https://github.com/<GITHUB_USER>/aifield
// @supportURL   <DONATION_OR_ISSUES_URL>
// @downloadURL  https://raw.githubusercontent.com/<GITHUB_USER>/aifield/main/higgsfield-notify/higgsfield-notify.user.js
// @updateURL    https://raw.githubusercontent.com/<GITHUB_USER>/aifield/main/higgsfield-notify/higgsfield-notify.user.js
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

  // ── 완료 감지: data-job-status 가 "진행 중"인 작업 수 "감소" = 완료 ──
  // 생성 중 타일엔 data-job-status="queued"/"processing" 등이 붙는다.
  // 시작 → 진행중 +1(알림 X) / 완료 → 상태가 바뀌거나 요소 사라져 -1(알림 O).
  const ACTIVE = /^(queued|processing|running|pending|in_progress|inprogress|generating|starting|rendering|initializing|waiting)$/;
  function getActive(){
    let n = 0;
    document.querySelectorAll('[data-job-status]').forEach(el=>{
      if (ACTIVE.test((el.getAttribute('data-job-status')||'').toLowerCase())) n++;
    });
    return n;
  }

  let last = getActive();
  console.log('[힉스알림] 시작, 진행중 =', last);
  banner('알림 실행됨 (진행중 '+last+')');

  setInterval(()=>{
    const now = getActive();
    if (now !== last) console.log('[힉스알림] 진행중 =', now);
    if (now < last) notify('영상 생성 완료! (진행중 '+last+' → '+now+')');
    last = now;
  }, 2000);
})();
