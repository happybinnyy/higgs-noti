// ==UserScript==
// @name         Higgs Noti — Higgsfield Generation Notifier
// @name:ko      힉스노티 — 힉스필드 생성 완료 알림
// @name:zh-CN   Higgs Noti — Higgsfield 生成完成通知
// @name:ru      Higgs Noti — уведомление о завершении генерации Higgsfield
// @name:es      Higgs Noti — Notificador de generación de Higgsfield
// @name:pt-BR   Higgs Noti — Notificador de geração do Higgsfield
// @name:ja      Higgs Noti — Higgsfield 生成完了通知
// @namespace    https://github.com/happybinnyy/higgs-noti
// @version      1.1.0
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
// @grant        GM_setValue
// @grant        GM_getValue
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

  // ── 완료 감지 ──
  // 진행중=ACTIVE(queued/processing 등), 그 외(완료 등)=rest. 모두 data-asset-id 보유.
  // 진행중이던 tile이 사라졌을 때:
  //   (a) 같은 화면이면 → 완료.  (b) 폴더 이동/스크롤로 그리드가 통째로 바뀐 것이면 → 무시(오탐 방지).
  // "같은 화면인지"는 직전 non-active tile들이 지금도 절반 이상 남아있는지(겹침)로 판정.
  // (완료 시 tile의 id가 바뀌는 경우가 있어, "같은 id 전환"이 아니라 "화면 안정성"으로 본다.)
  const ACTIVE = /^(queued|processing|running|pending|in_progress|inprogress|generating|starting|rendering|initializing|waiting)$/;
  function scan(){
    const active = new Set(), rest = new Set();
    document.querySelectorAll('[data-job-status]').forEach(el=>{
      const id = el.getAttribute('data-asset-id');
      if (!id) return;
      (ACTIVE.test((el.getAttribute('data-job-status')||'').toLowerCase()) ? active : rest).add(id);
    });
    return { active, rest };
  }
  const overlap = (a,b)=>{ let n=0; a.forEach(x=>{ if(b.has(x)) n++; }); return n; };
  const fmtS = (s)=>{ if(s<60) return s+'초'; const m=Math.floor(s/60), r=s%60; return r ? m+'분 '+r+'초' : m+'분'; };
  const fmt = (ms)=> fmtS(Math.round(ms/1000));

  // ── 통계 저장/조회 (GM_setValue 우선, 없으면 localStorage) ──
  const SKEY = 'hf_noti_stats_v1';
  function loadStats(){ try{ if(typeof GM_getValue!=='undefined'){ const v=GM_getValue(SKEY,''); return v?JSON.parse(v):[]; } }catch(e){} try{ return JSON.parse(localStorage.getItem(SKEY)||'[]'); }catch(e){ return []; } }
  function saveStats(a){ const s=JSON.stringify(a); try{ if(typeof GM_setValue!=='undefined'){ GM_setValue(SKEY,s); return; } }catch(e){} try{ localStorage.setItem(SKEY,s); }catch(e){} }
  function recordDone(durSec){ const a=loadStats(); a.push({t:Date.now(), d:durSec}); if(a.length>3000) a.splice(0,a.length-3000); saveStats(a); }

  // ── 통계 패널 ──
  const WD=['일','월','화','수','목','금','토'];
  const pad=n=>('0'+n).slice(-2);
  function agg(){
    const a=loadStats();
    const d0=new Date(); d0.setHours(0,0,0,0);
    const w0=new Date(d0); w0.setDate(d0.getDate()-((d0.getDay()+6)%7));      // 이번주 월요일 00:00
    const ds=a.map(r=>r.d).filter(x=>x>0), sum=ds.reduce((p,c)=>p+c,0);
    const stat=ds.length?{avg:Math.round(sum/ds.length),min:Math.min.apply(0,ds),max:Math.max.apply(0,ds),sum}:{avg:0,min:0,max:0,sum:0};
    const byDay=[0,0,0,0,0,0,0], byHour=new Array(24).fill(0);
    a.forEach(r=>{ const dt=new Date(r.t); byDay[dt.getDay()]++; byHour[dt.getHours()]++; });
    return {a, today:a.filter(r=>r.t>=d0.getTime()).length, week:a.filter(r=>r.t>=w0.getTime()).length, total:a.length, stat, byDay, byHour};
  }
  function bars(arr, labels){
    const max=Math.max.apply(0,[1].concat(arr));
    return arr.map((v,i)=>'<div style="display:flex;align-items:center;gap:6px;margin:1px 0"><span style="width:26px;color:#aaa;font-size:11px">'+labels[i]+'</span><span style="flex:1;background:#333;border-radius:3px;overflow:hidden"><span style="display:block;height:9px;width:'+Math.round(v/max*100)+'%;background:#4a9eff"></span></span><span style="width:22px;text-align:right;color:#ccc;font-size:11px">'+v+'</span></div>').join('');
  }
  function panelHTML(){
    const g=agg();
    const recent=g.a.slice(-15).reverse().map(r=>{ const dt=new Date(r.t); return '<div style="display:flex;justify-content:space-between;font-size:12px;padding:2px 0;border-bottom:1px solid #2a2a2a"><span style="color:#bbb">'+(dt.getMonth()+1)+'/'+dt.getDate()+' ('+WD[dt.getDay()]+') '+pad(dt.getHours())+':'+pad(dt.getMinutes())+'</span><span style="color:#fff">'+fmtS(r.d)+'</span></div>'; }).join('') || '<div style="color:#888;font-size:12px">아직 기록 없음</div>';
    const tile=(n,l)=>'<div style="flex:1;background:#1e1e1e;border-radius:8px;padding:8px;text-align:center"><div style="font-size:20px;font-weight:700">'+n+'</div><div style="font-size:11px;color:#999">'+l+'</div></div>';
    return '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px"><b style="font-size:15px">🎬 생성 통계</b><span id="__hf_x" style="cursor:pointer;color:#888;font-size:18px">×</span></div>'
     +'<div style="display:flex;gap:8px;margin-bottom:10px">'+tile(g.today,'오늘')+tile(g.week,'이번주')+tile(g.total,'전체')+'</div>'
     +'<div style="font-size:12px;color:#ccc;margin-bottom:10px;line-height:1.7">소요 시간 · 평균 <b>'+fmtS(g.stat.avg)+'</b> / 최소 '+fmtS(g.stat.min)+' / 최대 '+fmtS(g.stat.max)+' / 합계 '+fmtS(g.stat.sum)+'</div>'
     +'<div style="font-size:12px;color:#999;margin:6px 0 3px">요일별</div>'+bars(g.byDay, WD)
     +'<div style="font-size:12px;color:#999;margin:8px 0 3px">시간대별 (0~23시)</div>'+bars(g.byHour, g.byHour.map((_,i)=>i))
     +'<div style="font-size:12px;color:#999;margin:8px 0 3px">최근 기록</div>'+recent
     +'<div style="display:flex;gap:8px;margin-top:12px"><button id="__hf_csv" style="flex:1;background:#4a9eff;color:#fff;border:0;border-radius:6px;padding:8px;cursor:pointer;font-size:12px">CSV 내보내기</button><button id="__hf_reset" style="background:#333;color:#ccc;border:0;border-radius:6px;padding:8px 12px;cursor:pointer;font-size:12px">초기화</button></div>';
  }
  function exportCSV(){
    const a=loadStats();
    const rows=[['완료일시','소요초','소요','요일','시']].concat(a.map(r=>{ const dt=new Date(r.t); return [dt.getFullYear()+'-'+pad(dt.getMonth()+1)+'-'+pad(dt.getDate())+' '+pad(dt.getHours())+':'+pad(dt.getMinutes())+':'+pad(dt.getSeconds()), r.d, fmtS(r.d), WD[dt.getDay()], dt.getHours()]; }));
    const csv='﻿'+rows.map(r=>r.map(c=>'"'+String(c).replace(/"/g,'""')+'"').join(',')).join('\n');
    const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));
    const link=document.createElement('a'); link.href=url; link.download='higgs-noti-stats.csv'; link.click(); setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  function isPanelOpen(){ const p=document.getElementById('__hf_panel__'); return p && p.style.display==='block'; }
  function openPanel(){
    let p=document.getElementById('__hf_panel__');
    if(!p){ p=document.createElement('div'); p.id='__hf_panel__';
      p.style.cssText='position:fixed;bottom:66px;right:16px;z-index:2147483647;width:300px;max-height:72vh;overflow:auto;background:#141414;color:#fff;padding:14px;border-radius:12px;border:1px solid #333;box-shadow:0 8px 32px rgba(0,0,0,.5);font:400 13px/1.4 system-ui,sans-serif';
      document.body.appendChild(p);
    }
    p.innerHTML=panelHTML(); p.style.display='block';
    p.querySelector('#__hf_x').onclick=()=>{ p.style.display='none'; };
    p.querySelector('#__hf_csv').onclick=exportCSV;
    p.querySelector('#__hf_reset').onclick=()=>{ if(confirm('생성 통계 기록을 모두 삭제할까요?')){ saveStats([]); openPanel(); } };
  }
  (function statBtn(){
    const b=document.createElement('div'); b.id='__hf_statbtn__'; b.textContent='📊'; b.title='힉스노티 생성 통계';
    b.style.cssText='position:fixed;bottom:16px;right:16px;z-index:2147483646;width:44px;height:44px;border-radius:50%;background:#141414;border:1px solid #333;box-shadow:0 4px 16px rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center;font-size:20px;cursor:pointer';
    b.onclick=()=>{ const p=document.getElementById('__hf_panel__'); if(p && p.style.display==='block') p.style.display='none'; else openPanel(); };
    document.body.appendChild(b);
  })();

  let prev = scan();
  const startAt = new Map();                          // asset-id → 진행중으로 처음 본 시각(ms). 완료 시 경과시간 계산.
  prev.active.forEach(id=> startAt.set(id, Date.now()));
  console.log('[힉스알림] 시작, 진행중 =', prev.active.size);
  banner('알림 실행됨 (진행중 '+prev.active.size+')');

  setInterval(()=>{
    const now = Date.now();
    const cur = scan();
    cur.active.forEach(id=>{ if(!startAt.has(id)) startAt.set(id, now); });   // 새로 시작된 작업 시각 기록
    const stable = prev.rest.size===0 ? true : overlap(prev.rest, cur.rest) >= prev.rest.size*0.5;
    const done = [];
    prev.active.forEach(id=>{ if (!cur.active.has(id)) done.push(id); });     // 진행중이던 tile이 사라짐
    if (cur.active.size !== prev.active.size)
      console.log('[힉스알림] 진행중 =', cur.active.size, '| stable=', stable, '| finished=', done.length);
    if (stable && done.length > 0) {
      let maxMs = 0;
      done.forEach(id=>{ const t=startAt.get(id); if(t){ const ms=now-t; if(ms>maxMs) maxMs=ms; recordDone(Math.round(ms/1000)); } startAt.delete(id); });
      notify('영상 생성 완료! ('+done.length+'개, '+fmt(maxMs)+' 걸림)');
      if (isPanelOpen()) openPanel();                 // 패널 열려 있으면 즉시 갱신
    }
    prev = cur;
  }, 2000);
})();
