import { useState, useEffect } from "react";

/* ─── DATA ──────────────────────────────────────────────────────────────────── */

const BASE_USERS = [
  { id: 1, name: "Alex Morgan",  email: "alex@demo.com",  password: "demo123",  role: "student",    initials: "AM" },
  { id: 2, name: "Elena Voss",   email: "elena@demo.com", password: "demo123",  role: "instructor", initials: "EV" },
  { id: 3, name: "Admin User",   email: "admin@demo.com", password: "admin123", role: "admin",      initials: "AU" },
];

const COURSES = [
  {
    id: 1, title: "React Mastery", emoji: "⚛️", cat: "ENGINEERING", by: "Elena Voss", bi: "EV",
    desc: "Master React 18 with hooks, context, concurrent mode, and production patterns.",
    bg: "linear-gradient(135deg,#1a1040,#2d1f70)", tags: ["React","Hooks","TypeScript"],
    secs: [
      { id: 1, name: "Foundations", vids: [
        { id:1,  t:"React Crash Course — Traversy Media",        d:"1:48:42", yt:"w7ejDZ8SWv8" },
        { id:2,  t:"React Full Course 2024 — Bro Code",          d:"4:43:00", yt:"CgkZ7MvWUAA" },
        { id:3,  t:"Props, State & Events — Codevolution",       d:"31:15",   yt:"tddRuVfMYjk" },
      ]},
      { id: 2, name: "Hooks In Depth", vids: [
        { id:4,  t:"useState & useEffect — Web Dev Simplified",  d:"18:40",   yt:"O6P86uwfdR0" },
        { id:5,  t:"useRef & useContext — Web Dev Simplified",   d:"15:20",   yt:"LKlO8vLa57I" },
        { id:6,  t:"Custom Hooks — Jack Herrington",             d:"19:55",   yt:"J-g9ZJha8FE" },
        { id:7,  t:"useMemo & useCallback — Web Dev Simplified", d:"20:02",   yt:"_AyFHriPlU4" },
      ]},
      { id: 3, name: "Advanced Patterns", vids: [
        { id:8,  t:"Context API Deep Dive — Codevolution",       d:"23:05",   yt:"CI8VeG0GI-s" },
        { id:9,  t:"React with TypeScript — freeCodeCamp",       d:"1:08:00", yt:"FJDVKeh7RJI" },
        { id:10, t:"React Performance — Jack Herrington",        d:"22:30",   yt:"MJK4FdKVwrk" },
      ]},
    ],
  },
  {
    id: 2, title: "UX Design Fundamentals", emoji: "🎨", cat: "DESIGN", by: "Marcus Chen", bi: "MC",
    desc: "From wireframes to polished prototypes — human-centered design at scale.",
    bg: "linear-gradient(135deg,#042820,#065f46)", tags: ["Figma","Design Systems","Prototyping"],
    secs: [
      { id: 4, name: "Design Thinking", vids: [
        { id:11, t:"What is UX Design? — CareerFoundry",         d:"14:22",   yt:"t0aCoqXKFOU" },
        { id:12, t:"User Research Methods — NNgroup",            d:"21:10",   yt:"aCCFdBMrne4" },
        { id:13, t:"Design Thinking Process — AJ&Smart",         d:"18:44",   yt:"gHGN6L5QZqE" },
      ]},
      { id: 5, name: "Visual Design", vids: [
        { id:14, t:"Typography Rules — The Futur",               d:"26:03",   yt:"QrOpMTuLHco" },
        { id:15, t:"Color Theory — Flux Academy",                d:"31:02",   yt:"wnEqN7HjL60" },
        { id:16, t:"Figma Auto Layout & Grids",                  d:"22:17",   yt:"zd8wrAdURN0" },
      ]},
      { id: 6, name: "Prototyping", vids: [
        { id:17, t:"Figma for Beginners — DesignCourse",         d:"1:13:25", yt:"II-6dDzc-80" },
        { id:18, t:"Advanced Prototyping in Figma",              d:"19:44",   yt:"iBkXf6u8htI" },
        { id:19, t:"How to Build a Design System",               d:"28:52",   yt:"EK-pHkc5EL4" },
      ]},
    ],
  },
  {
    id: 3, title: "Python for Data Science", emoji: "🐍", cat: "DATA", by: "Aisha Patel", bi: "AP",
    desc: "NumPy, Pandas, Matplotlib, Scikit-Learn — the complete data science toolkit.",
    bg: "linear-gradient(135deg,#1c0a00,#78350f)", tags: ["Python","Pandas","ML"],
    secs: [
      { id: 7, name: "Python & NumPy", vids: [
        { id:20, t:"Python for Beginners — freeCodeCamp",        d:"4:26:51",  yt:"rfscVS0vtbw" },
        { id:21, t:"NumPy Crash Course — freeCodeCamp",          d:"1:00:07",  yt:"QUT1VHiLmmI" },
        { id:22, t:"Complete Pandas Tutorial — Keith Galli",     d:"1:00:02",  yt:"vmEHCJofslE" },
      ]},
      { id: 8, name: "Data Visualization", vids: [
        { id:23, t:"Matplotlib Crash Course — freeCodeCamp",     d:"1:00:39",  yt:"3Xc3CA655Y4" },
        { id:24, t:"Pandas Data Analysis — Corey Schafer",       d:"40:09",    yt:"ZyhVh-qejZQ" },
      ]},
      { id: 9, name: "Machine Learning", vids: [
        { id:25, t:"Scikit-Learn Full Course — freeCodeCamp",    d:"3:01:03",  yt:"0B5eIE_1vpU" },
        { id:26, t:"ML with Python — Sentdex",                   d:"30:16",    yt:"OGxgnH8y2NM" },
        { id:27, t:"Data Science Full Course 2024",              d:"11:06:39", yt:"ua-CiDNNj30" },
      ]},
    ],
  },
  {
    id: 4, title: "Node.js Backend Dev", emoji: "🟩", cat: "ENGINEERING", by: "Tom Okafor", bi: "TO",
    desc: "Build scalable REST APIs and real-time apps with Node.js and Express.",
    bg: "linear-gradient(135deg,#021420,#0c4a6e)", tags: ["Node.js","Express","REST API"],
    secs: [
      { id: 10, name: "Node Fundamentals", vids: [
        { id:28, t:"Node.js Crash Course — Traversy Media",      d:"1:30:02",  yt:"fBNz5xF-Kx4" },
        { id:29, t:"Node.js & Express Full Course",              d:"8:16:48",  yt:"Oe421EPjeBE" },
        { id:30, t:"Express.js Crash Course — Traversy",         d:"1:13:56",  yt:"L72fhZ18l6k" },
      ]},
      { id: 11, name: "REST APIs & Auth", vids: [
        { id:31, t:"REST API with Node — Net Ninja",             d:"52:42",    yt:"BRdcRFvuqsE" },
        { id:32, t:"JWT Auth in Node.js — Traversy",             d:"55:28",    yt:"mbsmsi7l3r4" },
        { id:33, t:"MongoDB & Mongoose Guide",                   d:"1:19:12",  yt:"vjf2E45-Ys0" },
      ]},
      { id: 12, name: "Real-time & Deploy", vids: [
        { id:34, t:"Socket.io Crash Course — Traversy",          d:"30:05",    yt:"jD7FnbI76Hg" },
        { id:35, t:"Deploy Node.js to Production",               d:"1:11:21",  yt:"6gJMoRB3jMg" },
        { id:36, t:"MERN Stack Crash Course",                    d:"1:43:38",  yt:"ktjafK4SgWM" },
      ]},
    ],
  },
];

const TESTIMONIALS = [
  { q:"The sequential unlocking genuinely changed how I learn. I finish every lesson properly now.", name:"Priya Nair", role:"Software Engineer, Bangalore", ini:"PN" },
  { q:"I've tried every platform. This is the first where the design gets out of the way and lets you focus.", name:"David Osei", role:"Product Designer, London", ini:"DO", feat:true },
  { q:"Progress tracking is seamless. Switching from laptop to phone mid-lesson and resuming exactly where I left off.", name:"Sofia Hernandez", role:"Data Analyst, Madrid", ini:"SH" },
  { q:"Enrolled on Friday. By Sunday I had shipped my first side project. Tight, focused, practical.", name:"Kai Yamamoto", role:"Frontend Developer, Tokyo", ini:"KY" },
  { q:"As an instructor, completion data helps me improve content in real time. Invaluable.", name:"Elena Voss", role:"Instructor, React Mastery", ini:"EV" },
  { q:"Clean, dark, distraction-free. Typography communicates quality. I stay longer because it's pleasant.", name:"Amara Diallo", role:"UX Researcher, Paris", ini:"AD" },
];

/* ─── CSS ───────────────────────────────────────────────────────────────────── */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0a0a0a;--bg2:#111;--bg3:#161616;--bg4:#1e1e1e;--bg5:#252525;
  --bd:rgba(255,255,255,0.07);--bd2:rgba(255,255,255,0.13);
  --t:#f5f5f3;--t2:#888884;--t3:#555550;
  --a:#c8f542;--a2:#d4ff4a;
  --cyan:#06b6d4;--red:#ef4444;--amber:#f59e0b;
  --fn:'Inter',sans-serif;--fd:'Bebas Neue',sans-serif;--fs:'DM Serif Display',serif;--fm:'JetBrains Mono',monospace;
}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--t);font-family:var(--fn);overflow-x:hidden}
::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:var(--bg5)}

/* NAV */
.hnav{position:fixed;top:0;left:0;right:0;z-index:300;display:flex;align-items:center;justify-content:space-between;padding:0 48px;height:60px;border-bottom:1px solid var(--bd);background:rgba(10,10,10,0.96);backdrop-filter:blur(12px)}
.hlogo{font-family:var(--fd);font-size:22px;letter-spacing:2px;cursor:pointer}
.hlogo span{color:var(--a)}
.hnav-links{display:flex;gap:36px}
.hnav-link{font-size:10px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;color:var(--t2);cursor:pointer;background:none;border:none;font-family:var(--fn);transition:color .2s}
.hnav-link:hover{color:var(--t)}
.btn-p{font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;padding:10px 24px;background:var(--a);color:#0a0a0a;border:none;cursor:pointer;font-family:var(--fn);transition:all .2s}
.btn-p:hover{background:var(--a2);transform:translateY(-1px)}
.btn-s{font-size:11px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;padding:10px 24px;background:transparent;color:var(--t2);border:1px solid var(--bd2);cursor:pointer;font-family:var(--fn);transition:all .2s}
.btn-s:hover{color:var(--t);border-color:var(--t2)}

/* HERO */
.hero{min-height:100vh;display:flex;flex-direction:column;justify-content:flex-end;padding:0 48px 72px;position:relative;overflow:hidden}
.hero-bg{position:absolute;inset:0;background:linear-gradient(180deg,#0a0a0a 0%,#0d1a0a 60%,#111a08 100%)}
.hero-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(200,245,66,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(200,245,66,.04) 1px,transparent 1px);background-size:80px 80px}
.hero-orb{position:absolute;top:15%;right:5%;width:440px;height:440px;background:radial-gradient(circle,rgba(200,245,66,.07) 0%,transparent 70%);border-radius:50%}
.hero-c{position:relative;z-index:10}
.eyebrow{display:flex;align-items:center;gap:10px;margin-bottom:24px;font-size:10px;font-weight:500;letter-spacing:2px;text-transform:uppercase;color:var(--a)}
.eyebrow-line{width:36px;height:1px;background:var(--a)}
.hero-title{font-family:var(--fd);font-size:clamp(64px,11vw,144px);line-height:.9;letter-spacing:2px;margin-bottom:40px}
.hero-title em{color:var(--a);font-style:normal}
.hero-row{display:flex;align-items:flex-end;justify-content:space-between;gap:32px}
.hero-desc{max-width:380px;font-size:14px;line-height:1.7;color:var(--t2);font-weight:300}
.hero-acts{display:flex;gap:12px;flex-shrink:0}
.hero-scroll{position:absolute;bottom:32px;right:48px;z-index:10;writing-mode:vertical-rl;font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--t3);display:flex;align-items:center;gap:8px}
.hero-scroll-line{width:1px;height:36px;background:var(--t3)}

/* STATS */
.stats{background:var(--bg2);border-top:1px solid var(--bd);border-bottom:1px solid var(--bd);padding:0 48px;display:flex}
.stat{flex:1;padding:28px 0;border-right:1px solid var(--bd);padding-right:40px;margin-right:40px}
.stat:last-child{border-right:none;padding-right:0;margin-right:0}
.stat-n{font-family:var(--fd);font-size:46px;line-height:1;margin-bottom:4px}
.stat-l{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--t3)}

/* MARQUEE */
.mq-wrap{padding:24px 0;border-bottom:1px solid var(--bd);overflow:hidden}
.mq{display:flex;animation:mq 26s linear infinite;width:max-content}
.mq:hover{animation-play-state:paused}
.mq-item{font-family:var(--fd);font-size:34px;letter-spacing:2px;color:var(--t3);white-space:nowrap;padding:0 28px;display:flex;align-items:center;gap:10px}
.mq-dot{width:6px;height:6px;background:var(--a);flex-shrink:0}
@keyframes mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}

/* SECTION */
.sec{padding:80px 0}
.sec-hdr{padding:0 48px;display:flex;align-items:flex-end;justify-content:space-between}
.sec-lbl{font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--a);margin-bottom:12px}
.sec-title{font-family:var(--fd);font-size:clamp(36px,5vw,64px);letter-spacing:1px;line-height:1}
.sec-desc{font-size:12px;color:var(--t2);max-width:280px;line-height:1.6;margin-bottom:16px}

/* COURSE TABS */
.ctabs{padding:0 48px;border-bottom:1px solid var(--bd);margin-top:40px;display:flex}
.ctab{font-size:10px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;padding:13px 20px;cursor:pointer;color:var(--t3);border-bottom:1px solid transparent;margin-bottom:-1px;background:none;border-top:none;border-left:none;border-right:none;font-family:var(--fn);transition:all .2s}
.ctab.on{color:var(--a);border-bottom-color:var(--a)}

/* COURSE ROWS */
.crow{display:grid;grid-template-columns:68px 1fr auto;align-items:center;padding:22px 48px;border-bottom:1px solid var(--bd);cursor:pointer;gap:20px;position:relative;overflow:hidden;transition:border-color .2s}
.crow::before{content:'';position:absolute;left:0;top:0;bottom:0;width:0;background:var(--a);opacity:.04;transition:width .35s}
.crow:hover::before{width:100%}
.crow:first-child{border-top:1px solid var(--bd)}
.crow-n{font-family:var(--fd);font-size:17px;color:var(--t3)}
.crow-title{font-family:var(--fd);font-size:24px;letter-spacing:1px;line-height:1;transition:color .2s}
.crow:hover .crow-title{color:var(--a)}
.crow-desc{font-size:11px;color:var(--t2);margin-top:4px}
.crow-r{display:flex;align-items:center;gap:20px;flex-shrink:0}
.crow-ml{font-size:8px;letter-spacing:1.5px;text-transform:uppercase;color:var(--t3);margin-bottom:2px}
.crow-mv{font-size:11px;color:var(--t2)}
.crow-em{font-size:20px;width:44px;height:44px;display:flex;align-items:center;justify-content:center;background:var(--bg3);flex-shrink:0}
.crow-arr{font-size:14px;color:var(--t3);transition:all .2s;flex-shrink:0}
.crow:hover .crow-arr{color:var(--a);transform:translateX(4px)}

/* COURSE DETAIL DRAWER */
.cdetail{background:var(--bg2);border-top:1px solid rgba(200,245,66,.12);border-bottom:1px solid rgba(200,245,66,.12);overflow:hidden;transition:max-height .45s cubic-bezier(.4,0,.2,1),opacity .3s;max-height:0;opacity:0}
.cdetail.open{max-height:560px;opacity:1}
.cdetail-in{padding:36px 48px;display:grid;grid-template-columns:1fr 1fr;gap:40px}
.dl{font-size:8px;letter-spacing:2px;text-transform:uppercase;color:var(--t3);margin-bottom:6px}
.dv{font-size:12px;color:var(--t2);line-height:1.6;margin-bottom:16px}
.dtitle{font-family:var(--fs);font-size:18px;margin-bottom:16px;line-height:1.4;font-style:italic}
.chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:8px}
.chip{font-size:9px;padding:4px 10px;border:1px solid var(--bd2);color:var(--t3)}
.vlist{margin-top:12px}
.vrow{display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--bd);font-size:11px;color:var(--t2)}
.vrow:last-child{border-bottom:none}
.vnum{font-family:var(--fm);font-size:9px;color:var(--t3);width:18px;flex-shrink:0}
.vtitle{flex:1}
.vdur{font-size:9px;color:var(--t3);flex-shrink:0}

/* TESTIMONIALS */
.test-sec{padding:80px 48px}
.test-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--bd);margin-top:48px}
.tc{background:var(--bg);padding:28px 22px;position:relative;overflow:hidden}
.tc::before{content:'"';position:absolute;top:-20px;right:14px;font-family:var(--fd);font-size:110px;color:var(--a);opacity:.05;line-height:1}
.tc-stars{display:flex;gap:2px;margin-bottom:12px;color:var(--a);font-size:10px}
.tc-q{font-family:var(--fs);font-size:13px;line-height:1.75;margin-bottom:20px;font-style:italic;position:relative;z-index:1}
.tc-div{width:22px;height:1px;background:var(--a);margin-bottom:14px}
.tc-auth{display:flex;align-items:center;gap:10px}
.tc-av{width:30px;height:30px;background:var(--bg4);display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:600;color:var(--t2)}
.tc-name{font-size:11px;font-weight:600}
.tc-role{font-size:9px;color:var(--t3);margin-top:1px}
.tc.feat{border:1px solid rgba(200,245,66,.12);background:var(--bg2)}
.tc.feat .tc-q{font-size:15px}

/* HOW */
.how{padding:80px 48px;background:var(--bg2);border-top:1px solid var(--bd);border-bottom:1px solid var(--bd)}
.how-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--bd);margin-top:48px}
.how-step{background:var(--bg2);padding:28px 22px}
.how-n{font-family:var(--fd);font-size:52px;color:var(--a);opacity:.25;line-height:1;margin-bottom:14px}
.how-t{font-family:var(--fd);font-size:18px;letter-spacing:1px;margin-bottom:8px}
.how-d{font-size:11px;color:var(--t2);line-height:1.7}

/* CTA */
.cta{padding:120px 48px;text-align:center;position:relative;overflow:hidden}
.cta-bg{position:absolute;inset:0;background:radial-gradient(ellipse at center 60%,rgba(200,245,66,.06) 0%,transparent 65%)}
.cta-c{position:relative;z-index:1}
.cta-title{font-family:var(--fd);font-size:clamp(48px,8vw,96px);letter-spacing:2px;line-height:.92;margin-bottom:22px}
.cta-title span{color:var(--a)}
.cta-sub{font-size:13px;color:var(--t2);margin-bottom:36px;font-weight:300}
.cta-btns{display:flex;align-items:center;justify-content:center;gap:12px}

/* FOOTER */
.footer{padding:36px 48px;border-top:1px solid var(--bd);display:flex;align-items:center;justify-content:space-between}
.footer-logo{font-family:var(--fd);font-size:16px;letter-spacing:2px;color:var(--t3)}
.footer-logo span{color:var(--a)}
.footer-links{display:flex;gap:24px}
.footer-lnk{font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:var(--t3);cursor:pointer}
.footer-copy{font-size:9px;color:var(--t3)}

/* LOGGED-IN BANNER */
.loggedin-banner{padding:16px 48px;background:rgba(200,245,66,.05);border-bottom:1px solid rgba(200,245,66,.12);display:flex;align-items:center;justify-content:space-between}

/* ── APP SHELL ── */
.app{display:flex;height:100vh;overflow:hidden}
.app-nav{width:58px;background:var(--bg2);border-right:1px solid var(--bd);display:flex;flex-direction:column;align-items:center;padding:12px 0;gap:4px;flex-shrink:0;z-index:100}
.app-logo{width:32px;height:32px;background:var(--a);display:flex;align-items:center;justify-content:center;font-family:var(--fd);font-size:15px;color:#0a0a0a;margin-bottom:16px;cursor:pointer;flex-shrink:0}
.app-ni{width:40px;height:40px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--t3);transition:color .15s;border-radius:8px}
.app-ni:hover{color:var(--t2);background:var(--bg3)}
.app-ni.on{color:var(--a);background:rgba(200,245,66,.08)}
.app-sp{flex:1}

/* SIDEBAR */
.aside{width:264px;background:var(--bg2);border-right:1px solid var(--bd);display:flex;flex-direction:column;overflow:hidden;flex-shrink:0}
.aside-hd{padding:16px 12px 12px;border-bottom:1px solid var(--bd)}
.aside-lbl{font-size:8px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--t3);margin-bottom:9px}
.aside-search{display:flex;align-items:center;gap:6px;background:var(--bg3);border:1px solid var(--bd);padding:6px 10px}
.aside-search input{background:none;border:none;outline:none;color:var(--t);font-family:var(--fn);font-size:11px;flex:1}
.aside-body{overflow-y:auto;flex:1;padding:6px}
.sc{border:1px solid var(--bd);background:var(--bg3);margin-bottom:5px;cursor:pointer;transition:all .15s;overflow:hidden}
.sc:hover{border-color:var(--bd2)}
.sc.on{border-color:rgba(200,245,66,.3);background:rgba(200,245,66,.03)}
.sc-thumb{height:52px;display:flex;align-items:center;justify-content:center;font-size:20px}
.sc-body{padding:7px 9px 9px}
.sc-badge{font-size:8px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--t3);margin-bottom:3px}
.sc-title{font-size:11px;font-weight:500;margin-bottom:5px}
.sc-bar{height:1px;background:var(--bg5)}
.sc-bar-fill{height:100%;background:var(--a);transition:width .3s}

/* TOPBAR */
.topbar{height:52px;padding:0 22px;border-bottom:1px solid var(--bd);display:flex;align-items:center;justify-content:space-between;background:var(--bg2);flex-shrink:0}
.topbar-title{font-family:var(--fd);font-size:16px;letter-spacing:1px}
.topbar-r{display:flex;align-items:center;gap:9px}
.topbar-role{font-size:8px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;padding:3px 9px;background:rgba(200,245,66,.09);color:var(--a)}
.topbar-av{width:28px;height:28px;background:var(--a);display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#0a0a0a;cursor:pointer}

/* CATALOG */
.cat-wrap{padding:36px}
.cat-hero{margin-bottom:28px}
.cat-hl{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--a);margin-bottom:10px;display:flex;align-items:center;gap:8px}
.cat-hl-line{width:22px;height:1px;background:var(--a)}
.cat-ht{font-family:var(--fd);font-size:clamp(28px,4vw,44px);letter-spacing:1px;line-height:1;margin-bottom:8px}
.cat-ht em{color:var(--a);font-style:normal}
.cat-hs{font-size:12px;color:var(--t2)}
.cat-filters{display:flex;margin-bottom:22px;border-bottom:1px solid var(--bd)}
.cat-f{font-size:9px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;padding:10px 16px;cursor:pointer;color:var(--t3);border-bottom:1px solid transparent;margin-bottom:-1px;background:none;border-top:none;border-left:none;border-right:none;font-family:var(--fn);transition:all .15s}
.cat-f.on{color:var(--a);border-bottom-color:var(--a)}
.cat-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px}
.cc{border:1px solid var(--bd);background:var(--bg2);cursor:pointer;transition:all .2s;overflow:hidden}
.cc:hover{border-color:rgba(200,245,66,.22);transform:translateY(-2px)}
.cc-thumb{height:110px;display:flex;align-items:center;justify-content:center;font-size:40px;position:relative}
.cc-ov{position:absolute;inset:0;background:linear-gradient(to bottom,transparent 40%,rgba(0,0,0,.4))}
.cc-body{padding:12px}
.cc-cat{font-size:8px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--t3);margin-bottom:5px}
.cc-title{font-family:var(--fd);font-size:18px;letter-spacing:.5px;margin-bottom:5px;line-height:1.1}
.cc-desc{font-size:11px;color:var(--t2);line-height:1.5;margin-bottom:8px}
.cc-tags{display:flex;gap:4px;flex-wrap:wrap;margin-bottom:10px}
.cc-tag{font-size:9px;padding:2px 8px;border:1px solid var(--bd2);color:var(--t3)}
.cc-foot{display:flex;align-items:center;justify-content:space-between;padding-top:9px;border-top:1px solid var(--bd)}
.cc-by{font-size:9px;color:var(--t3);display:flex;align-items:center;gap:4px}
.cc-by-av{width:15px;height:15px;background:var(--bg4);display:flex;align-items:center;justify-content:center;font-size:6px;font-weight:700}
.cc-btn{font-size:9px;font-weight:600;letter-spacing:1px;text-transform:uppercase;padding:6px 12px;cursor:pointer;font-family:var(--fn);border:none;transition:all .15s}
.cc-btn.enrolled{background:rgba(200,245,66,.1);color:var(--a)}
.cc-btn.free{background:var(--a);color:#0a0a0a}
.cc-btn.free:hover{background:var(--a2)}

/* LEARNING */
.learn{display:flex;height:calc(100vh - 52px);overflow:hidden}
.learn-panel{width:272px;border-right:1px solid var(--bd);background:var(--bg2);overflow-y:auto;flex-shrink:0}
.lp-hd{padding:16px 13px;border-bottom:1px solid var(--bd)}
.lp-title{font-family:var(--fd);font-size:16px;margin-bottom:2px}
.lp-sub{font-size:9px;color:var(--t3);margin-bottom:10px}
.lp-prog{display:flex;align-items:center;gap:9px}
.lp-bar{flex:1;height:1px;background:var(--bg4)}
.lp-bar-fill{height:100%;background:var(--a);transition:width .4s}
.lp-pct{font-family:var(--fm);font-size:10px;color:var(--a)}
.lp-body{padding:6px}
.lp-sec-lbl{font-size:8px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--t3);padding:8px 7px 5px}
.lp-item{display:flex;align-items:center;gap:8px;padding:6px 8px;cursor:pointer;transition:background .12s;margin-bottom:1px}
.lp-item:hover{background:var(--bg3)}
.lp-item.on{background:rgba(200,245,66,.05)}
.lp-item.locked{opacity:.35;cursor:not-allowed}
.lp-dot{width:17px;height:17px;display:flex;align-items:center;justify-content:center;font-size:7px;flex-shrink:0;border:1px solid var(--bd2)}
.lp-dot.done{background:var(--a);border-color:var(--a);color:#0a0a0a;font-weight:700}
.lp-dot.playing{border-color:var(--a);color:var(--a)}
.lp-vt{font-size:11px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.lp-vd{font-size:9px;color:var(--t3);margin-top:1px}

.learn-main{flex:1;overflow-y:auto}
/* VIDEO CONTAINER — 16:9 */
.vid-wrap{width:100%;position:relative;padding-top:56.25%;background:#000}
.vid-wrap iframe{position:absolute;top:0;left:0;width:100%;height:100%;border:none;display:block}
.learn-meta{padding:20px 24px}
.learn-yt{display:inline-flex;align-items:center;gap:4px;font-size:9px;padding:3px 8px;background:rgba(255,0,0,.12);color:#ff4444;border:1px solid rgba(255,0,0,.2);margin-bottom:10px}
.learn-bc{font-size:8px;letter-spacing:1.5px;text-transform:uppercase;color:var(--t3);margin-bottom:10px;display:flex;align-items:center;gap:5px}
.learn-vt{font-family:var(--fd);font-size:22px;margin-bottom:4px}
.learn-vs{font-size:10px;color:var(--t3);margin-bottom:16px}
.learn-acts{display:flex;gap:8px;margin-bottom:20px}
.la{font-size:9px;font-weight:500;letter-spacing:1px;text-transform:uppercase;padding:7px 13px;border:1px solid var(--bd2);background:none;color:var(--t3);cursor:pointer;font-family:var(--fn);transition:all .15s}
.la:hover{border-color:var(--t2);color:var(--t2)}
.la.p{background:var(--a);border-color:var(--a);color:#0a0a0a}
.la.p:hover{background:var(--a2)}
.la:disabled{opacity:.28;cursor:not-allowed}
.learn-nav{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.ln-btn{padding:10px 12px;border:1px solid var(--bd);background:none;color:var(--t3);font-size:9px;font-family:var(--fn);cursor:pointer;transition:all .15s}
.ln-btn:hover:not(:disabled){border-color:var(--t2);color:var(--t)}
.ln-btn:disabled{opacity:.2;cursor:not-allowed}
.ln-btn.nxt{background:var(--a);border-color:var(--a);color:#0a0a0a;font-weight:600}
.ln-btn.nxt:hover{background:var(--a2)}
.done-banner{margin:0 24px 14px;padding:10px 16px;background:rgba(200,245,66,.06);border:1px solid rgba(200,245,66,.18);display:flex;align-items:center;gap:9px}
.locked-view{display:flex;flex-direction:column;align-items:center;justify-content:center;height:260px;gap:9px}

/* PROFILE */
.prof{padding:36px}
.prof-hd{display:flex;align-items:flex-start;gap:18px;margin-bottom:36px;padding-bottom:36px;border-bottom:1px solid var(--bd)}
.prof-av{width:52px;height:52px;background:var(--a);display:flex;align-items:center;justify-content:center;font-family:var(--fd);font-size:20px;color:#0a0a0a;flex-shrink:0}
.prof-name{font-family:var(--fd);font-size:28px;letter-spacing:1px;margin-bottom:3px}
.prof-email{font-size:11px;color:var(--t3);margin-bottom:7px}
.prof-role{font-size:8px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;padding:3px 9px;background:rgba(200,245,66,.1);color:var(--a);display:inline-flex}
.ps-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--bd);margin-bottom:36px}
.ps-card{background:var(--bg);padding:20px 18px}
.ps-v{font-family:var(--fd);font-size:36px;line-height:1;margin-bottom:4px}
.ps-l{font-size:8px;letter-spacing:1.5px;text-transform:uppercase;color:var(--t3)}
.er-list{display:flex;flex-direction:column;gap:1px;background:var(--bd)}
.er-row{background:var(--bg);padding:16px 20px;display:flex;align-items:center;gap:14px;cursor:pointer;transition:background .15s}
.er-row:hover{background:var(--bg3)}
.er-ico{width:40px;height:40px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
.er-t{font-family:var(--fd);font-size:15px;margin-bottom:2px}
.er-s{font-size:9px;color:var(--t3);margin-bottom:6px}
.er-bar{height:1px;background:var(--bg4)}
.er-fill{height:100%;background:var(--a)}
.er-pct{font-family:var(--fm);font-size:11px;color:var(--a);flex-shrink:0}

/* ADMIN */
.adm{padding:36px}
.adm-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--bd);margin-bottom:36px}
.adm-s{background:var(--bg);padding:20px 18px}
.adm-sv{font-family:var(--fd);font-size:36px;color:var(--a);line-height:1;margin-bottom:4px}
.adm-sl{font-size:8px;letter-spacing:1.5px;text-transform:uppercase;color:var(--t3)}
.adm-grid{display:grid;grid-template-columns:2fr 1fr;gap:16px}
.adm-card{border:1px solid var(--bd);background:var(--bg2)}
.adm-ch{padding:12px 16px;border-bottom:1px solid var(--bd);font-size:8px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--t3)}
.adm-table{width:100%;border-collapse:collapse;font-size:11px}
.adm-table th{font-size:8px;letter-spacing:1.5px;text-transform:uppercase;color:var(--t3);padding:8px 13px;text-align:left;border-bottom:1px solid var(--bd);font-weight:500}
.adm-table td{padding:10px 13px;border-bottom:1px solid var(--bd);color:var(--t2)}
.adm-table tr:last-child td{border-bottom:none}
.adm-table tr:hover td{background:var(--bg3)}
.urole{font-size:8px;font-weight:600;letter-spacing:1px;text-transform:uppercase;padding:2px 8px}
.urole-student{background:rgba(6,182,212,.09);color:var(--cyan)}
.urole-instructor{background:rgba(245,158,11,.09);color:var(--amber)}
.urole-admin{background:rgba(239,68,68,.09);color:var(--red)}
.adm-cr{padding:11px 16px;border-bottom:1px solid var(--bd);display:flex;align-items:center;gap:9px}
.adm-cr:last-child{border-bottom:none}

/* AUTH */
.auth-page{min-height:100vh;display:grid;grid-template-columns:1fr 1fr}
.auth-l{background:var(--bg2);border-right:1px solid var(--bd);padding:48px;display:flex;flex-direction:column;justify-content:space-between}
.auth-l-logo{font-family:var(--fd);font-size:22px;letter-spacing:2px;cursor:pointer}
.auth-l-logo span{color:var(--a)}
.auth-l-title{font-family:var(--fd);font-size:clamp(40px,5vw,64px);letter-spacing:1px;line-height:.93;margin-bottom:16px}
.auth-l-title em{color:var(--a);font-style:normal}
.auth-l-sub{font-size:12px;color:var(--t2);line-height:1.65;max-width:280px}
.auth-l-ft{font-size:9px;color:var(--t3)}
.auth-r{padding:48px;display:flex;align-items:center;justify-content:center;background:var(--bg)}
.auth-form{width:100%;max-width:320px}
.auth-ft{font-family:var(--fd);font-size:28px;letter-spacing:1px;margin-bottom:6px}
.auth-fs{font-size:11px;color:var(--t3);margin-bottom:28px}
.af{margin-bottom:12px}
.af-lbl{font-size:8px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;color:var(--t3);margin-bottom:6px;display:block}
.af-input{width:100%;background:var(--bg3);border:1px solid var(--bd);padding:9px 12px;color:var(--t);font-family:var(--fn);font-size:12px;outline:none;transition:border-color .2s}
.af-input:focus{border-color:var(--a)}
.af-submit{width:100%;padding:11px;background:var(--a);color:#0a0a0a;border:none;font-family:var(--fn);font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;margin-top:5px;transition:all .15s}
.af-submit:hover{background:var(--a2)}
.af-switch{text-align:center;margin-top:18px;font-size:11px;color:var(--t3)}
.af-switch a{color:var(--a);cursor:pointer}
.af-err{font-size:10px;color:var(--red);margin-bottom:8px;padding:8px 12px;background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.2)}
.af-roles{display:flex;gap:6px;margin-bottom:14px}
.af-role{flex:1;padding:7px;border:1px solid var(--bd);background:none;color:var(--t3);font-family:var(--fn);font-size:9px;font-weight:500;letter-spacing:1px;text-transform:uppercase;cursor:pointer;transition:all .15s}
.af-role.on{border-color:var(--a);background:rgba(200,245,66,.07);color:var(--a)}
.af-demo{margin-top:20px;padding:12px;border:1px solid var(--bd);background:var(--bg3)}
.af-demo-lbl{font-size:8px;letter-spacing:1.5px;text-transform:uppercase;color:var(--t3);margin-bottom:7px}
.af-demo-item{font-size:9px;color:var(--t2);margin-bottom:3px;font-family:var(--fm)}

/* NOTIF */
.notif{position:fixed;bottom:22px;right:22px;background:var(--bg3);border:1px solid rgba(200,245,66,.22);padding:11px 16px;font-size:11px;color:var(--t);z-index:9999;animation:nIn .3s ease;display:flex;align-items:center;gap:8px;max-width:300px}
.notif-dot{width:5px;height:5px;background:var(--a);flex-shrink:0}
@keyframes nIn{from{transform:translateY(12px);opacity:0}to{transform:translateY(0);opacity:1}}
`;

/* ─── ICONS ─────────────────────────────────────────────────────────────────── */
const ICONS = {
  home:    "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  grid:    "M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z",
  play:    "M5 3l14 9-14 9V3z",
  user:    "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  settings:"M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z M12 8v4 M12 16h.01",
  logout:  "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9",
  search:  "M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0",
};
const Ic = ({ n, s = 15 }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    {ICONS[n].split(" M").map((p, i) => <path key={i} d={i === 0 ? p : "M" + p} />)}
  </svg>
);

/* ─── NOTIF ─────────────────────────────────────────────────────────────────── */
const Notif = ({ msg, onClose }) => {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, []);
  return <div className="notif"><div className="notif-dot" />{msg}</div>;
};

/* ─── HOME PAGE ──────────────────────────────────────────────────────────────── */
const HomePage = ({ onGoToAuth, onGoToDashboard, user, embedded }) => {
  const [exp, setExp] = useState(null);
  const [cat, setCat] = useState("ALL");
  const cats = ["ALL", "ENGINEERING", "DESIGN", "DATA"];
  const rows = cat === "ALL" ? COURSES : COURSES.filter(c => c.cat === cat);
  const mq = ["React","Python","Node.js","UX Design","TypeScript","Figma","Machine Learning","REST APIs"];

  const scroll = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <div>
      {/* ── NAV (hidden when embedded inside app shell) */}
      {!embedded && (
        <nav className="hnav">
          <div className="hlogo">learnly<span>.</span></div>
          <div className="hnav-links">
            <button className="hnav-link" onClick={() => scroll("courses")}>Courses</button>
            <button className="hnav-link" onClick={() => scroll("how")}>How It Works</button>
            <button className="hnav-link" onClick={() => scroll("testimonials")}>Testimonials</button>
          </div>
          <div style={{ display:"flex", gap:10 }}>
            {user ? (
              <button className="btn-p" onClick={onGoToDashboard}>Go to Dashboard →</button>
            ) : (
              <>
                <button className="btn-s" style={{ padding:"8px 18px" }} onClick={() => onGoToAuth("login")}>Sign In</button>
                <button className="btn-p" style={{ padding:"8px 18px" }} onClick={() => onGoToAuth("register")}>Get Started</button>
              </>
            )}
          </div>
        </nav>
      )}

      {/* ── LOGGED-IN BANNER (shown when embedded) */}
      {embedded && user && (
        <div className="loggedin-banner">
          <div style={{ fontSize:11, color:"var(--t2)" }}>
            Welcome back, <strong style={{ color:"var(--a)" }}>{user.name.split(" ")[0]}</strong>
            <span style={{ color:"var(--t3)" }}> · {user.role}</span>
          </div>
          <button className="btn-p" style={{ padding:"7px 18px", fontSize:10 }} onClick={onGoToDashboard}>
            Go to Dashboard →
          </button>
        </div>
      )}

      {/* ── HERO */}
      <section className="hero" style={{ paddingTop: embedded ? 0 : undefined }}>
        <div className="hero-bg" /><div className="hero-grid" /><div className="hero-orb" />
        <div className="hero-c">
          <div className="eyebrow"><div className="eyebrow-line" />Structured video learning</div>
          <div className="hero-title">MASTER<br />SKILLS THAT<br /><em>MATTER.</em></div>
          <div className="hero-row">
            <div className="hero-desc">Sequential courses with locked progression. Every lesson unlocked by completing the last — because real mastery is built step by step.</div>
            <div className="hero-acts">
              {user ? (
                <button className="btn-p" onClick={onGoToDashboard}>Go to Dashboard →</button>
              ) : (
                <>
                  <button className="btn-p" onClick={() => onGoToAuth("register")}>Start Learning Free</button>
                  <button className="btn-s" onClick={() => scroll("courses")}>Browse Courses →</button>
                </>
              )}
            </div>
          </div>
        </div>
        {!embedded && <div className="hero-scroll"><div className="hero-scroll-line" />Scroll</div>}
      </section>

      {/* ── STATS */}
      <div className="stats">
        {[{n:"4,200+",l:"Active Learners"},{n:"36",l:"Real Videos"},{n:"94%",l:"Completion Rate"},{n:"4.9/5",l:"Average Rating"}].map((s,i)=>(
          <div key={i} className="stat"><div className="stat-n">{s.n}</div><div className="stat-l">{s.l}</div></div>
        ))}
      </div>

      {/* ── MARQUEE */}
      <div className="mq-wrap">
        <div className="mq">{[...mq,...mq,...mq].map((item,i)=><div key={i} className="mq-item"><div className="mq-dot"/>{item.toUpperCase()}</div>)}</div>
      </div>

      {/* ── COURSES */}
      <section id="courses" className="sec">
        <div className="sec-hdr">
          <div><div className="sec-lbl">Our Curriculum</div><div className="sec-title">COURSE<br />CATALOG</div></div>
          <div style={{ textAlign:"right" }}>
            <div className="sec-desc">Real YouTube videos from top educators. Sequential lock ensures you build skills properly.</div>
            <button className="btn-p" onClick={user ? onGoToDashboard : () => onGoToAuth("register")}>
              {user ? "Go to Dashboard →" : "Enroll Now →"}
            </button>
          </div>
        </div>
        <div className="ctabs">
          {cats.map(c=><button key={c} className={`ctab ${cat===c?"on":""}`} onClick={()=>setCat(c)}>{c}</button>)}
        </div>
        <div>
          {rows.map((c,i)=>(
            <div key={c.id}>
              <div className="crow" onClick={()=>setExp(exp===c.id?null:c.id)}>
                <div className="crow-n">0{i+1} / 0{rows.length}</div>
                <div style={{display:"flex",alignItems:"center",gap:16}}>
                  <div className="crow-em">{c.emoji}</div>
                  <div><div className="crow-title">{c.title.toUpperCase()}</div><div className="crow-desc">{c.desc}</div></div>
                </div>
                <div className="crow-r">
                  <div><div className="crow-ml">Sector</div><div className="crow-mv">{c.cat}</div></div>
                  <div><div className="crow-ml">Videos</div><div className="crow-mv">{c.secs.flatMap(s=>s.vids).length}</div></div>
                  <div className="crow-arr">{exp===c.id?"↑":"→"}</div>
                </div>
              </div>
              <div className={`cdetail ${exp===c.id?"open":""}`}>
                <div className="cdetail-in">
                  <div>
                    <div className="dtitle">"{c.desc}"</div>
                    <div className="dl">Instructor</div><div className="dv">{c.by}</div>
                    <div className="dl">Technologies</div>
                    <div className="chips">{c.tags.map(t=><div key={t} className="chip">{t}</div>)}</div>
                    <button className="btn-p" style={{marginTop:16}} onClick={user ? onGoToDashboard : ()=>onGoToAuth("register")}>
                      {user ? "Go to Dashboard →" : "Enroll in this course →"}
                    </button>
                  </div>
                  <div>
                    <div className="dl">Curriculum</div>
                    {c.secs.map(sec=>(
                      <div key={sec.id} style={{marginBottom:12}}>
                        <div style={{fontSize:9,fontWeight:600,letterSpacing:1,textTransform:"uppercase",color:"var(--t2)",marginBottom:4}}>{sec.name}</div>
                        <div className="vlist">{sec.vids.map((v,vi)=>(
                          <div key={v.id} className="vrow">
                            <div className="vnum">{String(vi+1).padStart(2,"0")}</div>
                            <div className="vtitle">{v.t}</div>
                            <div className="vdur">{v.d}</div>
                          </div>
                        ))}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS */}
      <section id="how" className="how">
        <div className="sec-lbl">Process</div>
        <div className="sec-title" style={{fontFamily:"var(--fd)",fontSize:"clamp(36px,5vw,64px)",letterSpacing:1,lineHeight:1}}>HOW IT<br />WORKS</div>
        <div className="how-grid">
          {[{n:"01",t:"ENROLL",d:"Browse the catalog and enroll instantly. No prerequisites, no gatekeeping."},{n:"02",t:"WATCH",d:"Real YouTube videos from top educators. Sequential lock ensures proper skill building."},{n:"03",t:"TRACK",d:"Progress saved in real-time. Resume exactly where you left off on any device."},{n:"04",t:"MASTER",d:"Complete every section to finish the course. Sequential mastery, every time."}].map((s,i)=>(
            <div key={i} className="how-step"><div className="how-n">{s.n}</div><div className="how-t">{s.t}</div><div className="how-d">{s.d}</div></div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS */}
      <section id="testimonials" className="test-sec">
        <div className="sec-lbl">Student Voices</div>
        <div style={{fontFamily:"var(--fd)",fontSize:"clamp(36px,5vw,64px)",letterSpacing:1,lineHeight:1}}>WHAT LEARNERS<br />ARE SAYING</div>
        <div className="test-grid">
          {TESTIMONIALS.map((t,i)=>(
            <div key={i} className={`tc ${t.feat?"feat":""}`}>
              <div className="tc-stars">{"★★★★★"}</div>
              <div className="tc-q">{t.q}</div>
              <div className="tc-div"/>
              <div className="tc-auth">
                <div className="tc-av">{t.ini}</div>
                <div><div className="tc-name">{t.name}</div><div className="tc-role">{t.role}</div></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA */}
      <section className="cta">
        <div className="cta-bg"/>
        <div className="cta-c">
          <div className="cta-title">READY TO<br /><span>START?</span></div>
          <div className="cta-sub">Join 4,200+ learners building real skills through structured, sequential video courses.</div>
          <div className="cta-btns">
            {user ? (
              <button className="btn-p" style={{padding:"14px 40px"}} onClick={onGoToDashboard}>Go to Dashboard →</button>
            ) : (
              <>
                <button className="btn-p" style={{padding:"14px 40px"}} onClick={()=>onGoToAuth("register")}>Create Free Account</button>
                <button className="btn-s" style={{padding:"14px 24px"}} onClick={()=>onGoToAuth("login")}>I already have an account</button>
              </>
            )}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-logo">learnly<span>.</span></div>
        <div className="footer-links">{["Courses","About","Instructors","Contact"].map(l=><div key={l} className="footer-lnk">{l}</div>)}</div>
        <div className="footer-copy">© 2025 Learnly. All rights reserved.</div>
      </footer>
    </div>
  );
};

/* ─── AUTH PAGE ──────────────────────────────────────────────────────────────── */
const AuthPage = ({ mode: initMode, onLogin, onRegister, users, onBack }) => {
  const [mode, setMode] = useState(initMode || "login");
  const [role, setRole] = useState("student");
  const [form, setForm] = useState({ name:"", email:"", password:"" });
  const [err, setErr] = useState("");

  const submit = () => {
    setErr("");
    if (mode === "login") {
      const e = form.email.trim().toLowerCase();
      const p = form.password.trim();
      const u = users.find(x => x.email.toLowerCase() === e && x.password === p);
      if (!u) { setErr("Invalid email or password. Try: alex@demo.com / demo123"); return; }
      onLogin(u);
    } else {
      if (!form.name.trim() || !form.email.trim() || !form.password.trim()) { setErr("All fields are required."); return; }
      if (users.find(x => x.email.toLowerCase() === form.email.trim().toLowerCase())) { setErr("Email already registered."); return; }
      const newUser = {
        id: Date.now(),
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        role,
        initials: form.name.trim().split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase(),
      };
      onRegister(newUser);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-l">
        <div className="auth-l-logo" onClick={onBack}>learnly<span>.</span></div>
        <div>
          <div className="auth-l-title">LEARN.<br />GROW.<br /><em>MASTER.</em></div>
          <div className="auth-l-sub">Real YouTube videos. Sequential progression. Real-time progress tracking.</div>
        </div>
        <div className="auth-l-ft">© 2025 Learnly. Built for serious learners.</div>
      </div>
      <div className="auth-r">
        <div className="auth-form">
          <div className="auth-ft">{mode==="login" ? "WELCOME BACK" : "CREATE ACCOUNT"}</div>
          <div className="auth-fs">{mode==="login" ? "Sign in to continue learning." : "Start your learning journey today."}</div>

          {mode === "register" && (
            <>
              <div style={{marginBottom:14}}>
                <div className="af-lbl">Your Role</div>
                <div className="af-roles">
                  {["student","instructor","admin"].map(r=>(
                    <button key={r} className={`af-role ${role===r?"on":""}`} onClick={()=>setRole(r)}>
                      {r.charAt(0).toUpperCase()+r.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="af">
                <label className="af-lbl">Full Name</label>
                <input className="af-input" placeholder="Your full name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
              </div>
            </>
          )}

          <div className="af">
            <label className="af-lbl">Email Address</label>
            <input className="af-input" type="email" placeholder="you@example.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
          </div>
          <div className="af">
            <label className="af-lbl">Password</label>
            <input className="af-input" type="password" placeholder="••••••••" value={form.password}
              onChange={e=>setForm({...form,password:e.target.value})}
              onKeyDown={e=>e.key==="Enter"&&submit()} />
          </div>

          {err && <div className="af-err">{err}</div>}
          <button className="af-submit" onClick={submit}>{mode==="login" ? "Sign In →" : "Create Account →"}</button>

          <div className="af-switch">
            {mode==="login"
              ? <><span>No account? </span><a onClick={()=>{setMode("register");setErr("");}}>Register here</a></>
              : <><span>Have an account? </span><a onClick={()=>{setMode("login");setErr("");}}>Sign in</a></>}
          </div>

          <div className="af-demo">
            <div className="af-demo-lbl">Demo Credentials</div>
            <div className="af-demo-item">student: alex@demo.com / demo123</div>
            <div className="af-demo-item">instructor: elena@demo.com / demo123</div>
            <div className="af-demo-item">admin: admin@demo.com / admin123</div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── SIDEBAR ────────────────────────────────────────────────────────────────── */
const Sidebar = ({ enrolled, activeId, onSelect, progress }) => {
  const [q, setQ] = useState("");
  const list = COURSES.filter(c => enrolled.includes(c.id) && c.title.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="aside">
      <div className="aside-hd">
        <div className="aside-lbl">My Courses</div>
        <div className="aside-search"><Ic n="search" s={10}/><input placeholder="Search..." value={q} onChange={e=>setQ(e.target.value)}/></div>
      </div>
      <div className="aside-body">
        {list.length===0 && <div style={{padding:16,fontSize:10,color:"var(--t3)",textAlign:"center"}}>No enrolled courses</div>}
        {list.map(c=>{
          const done=(progress[c.id]||[]).length, total=c.secs.flatMap(s=>s.vids).length, pct=Math.round((done/total)*100);
          return (
            <div key={c.id} className={`sc ${activeId===c.id?"on":""}`} onClick={()=>onSelect(c)}>
              <div className="sc-thumb" style={{background:c.bg}}>{c.emoji}</div>
              <div className="sc-body">
                <div className="sc-badge">{c.cat}</div>
                <div className="sc-title">{c.title}</div>
                <div className="sc-bar"><div className="sc-bar-fill" style={{width:`${pct}%`}}/></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ─── LEARNING PAGE ──────────────────────────────────────────────────────────── */
const LearnPage = ({ course, progress, onProgress, notify }) => {
  const allVids = course.secs.flatMap(s => s.vids);
  const [activeId, setActiveId] = useState(allVids[0]?.id);
  const [done, setDone] = useState(new Set(progress[course.id] || []));

  // Reset when course changes
  useEffect(() => {
    setActiveId(allVids[0]?.id);
    setDone(new Set(progress[course.id] || []));
  }, [course.id]);

  const vid = allVids.find(v => v.id === activeId) || allVids[0];
  const idx = allVids.findIndex(v => v.id === vid?.id);
  const prev = idx > 0 ? allVids[idx-1] : null;
  const next = idx < allVids.length-1 ? allVids[idx+1] : null;

  const isLocked = v => {
    const i = allVids.findIndex(x => x.id === v.id);
    return i > 0 && !done.has(allVids[i-1]?.id);
  };

  const markDone = id => {
    const s = new Set(done);
    s.add(id);
    setDone(s);
    onProgress(course.id, [...s]);
    notify("Lesson complete — next one unlocked!");
  };

  const pct = Math.round((done.size / allVids.length) * 100);
  const curSec = course.secs.find(s => s.vids.find(v => v.id === vid?.id));

  return (
    <div className="learn">
      {/* Lesson panel */}
      <div className="learn-panel">
        <div className="lp-hd">
          <div className="lp-title">{course.title}</div>
          <div className="lp-sub">{course.by}</div>
          <div className="lp-prog">
            <div className="lp-bar"><div className="lp-bar-fill" style={{width:`${pct}%`}}/></div>
            <div className="lp-pct">{pct}%</div>
          </div>
        </div>
        <div className="lp-body">
          {course.secs.map(sec => (
            <div key={sec.id}>
              <div className="lp-sec-lbl">{sec.name}</div>
              {sec.vids.map(v => {
                const isDone = done.has(v.id);
                const isPlaying = vid?.id === v.id;
                const locked = isLocked(v);
                return (
                  <div key={v.id}
                    className={`lp-item ${isPlaying?"on":""} ${locked?"locked":""}`}
                    onClick={() => !locked && setActiveId(v.id)}>
                    <div className={`lp-dot ${isDone?"done":isPlaying?"playing":""}`}>
                      {isDone ? "✓" : locked ? "🔒" : isPlaying ? "▶" : ""}
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <div className="lp-vt">{v.t}</div>
                      <div className="lp-vd">{v.d}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Video area */}
      <div className="learn-main">
        {vid && (isLocked(vid) ? (
          <div className="locked-view">
            <div style={{fontSize:28,opacity:.3}}>🔒</div>
            <div style={{fontSize:11,color:"var(--t2)"}}>Complete the previous lesson to unlock this one.</div>
          </div>
        ) : (
          <>
            {/* 16:9 iframe container */}
            <div className="vid-wrap">
              <iframe
                key={vid.yt}
                src={`https://www.youtube-nocookie.com/embed/${vid.yt}?rel=0&modestbranding=1&enablejsapi=1`}
                title={vid.t}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            <div className="learn-meta">
              {done.has(vid.id) && (
                <div className="done-banner">
                  <span style={{color:"var(--a)",fontSize:12}}>✓</span>
                  <div>
                    <div style={{fontSize:10,fontWeight:600,color:"var(--a)"}}>Lesson Complete</div>
                    <div style={{fontSize:9,color:"var(--t3)"}}>Keep going!</div>
                  </div>
                </div>
              )}

              <div className="learn-yt">▶ YouTube · {vid.d}</div>
              <div className="learn-bc">
                <span>{course.title}</span>
                <span style={{opacity:.4}}>→</span>
                <span>{curSec?.name}</span>
              </div>
              <div className="learn-vt">{vid.t}</div>
              <div className="learn-vs">{vid.d} · {course.by}</div>

              <div className="learn-acts">
                <button className="la p" onClick={() => markDone(vid.id)}
                  disabled={done.has(vid.id)} style={done.has(vid.id)?{opacity:.35}:{}}>
                  {done.has(vid.id) ? "✓ Completed" : "Mark Complete"}
                </button>
                <button className="la">Bookmark</button>
                <button className="la">Notes</button>
              </div>

              <div className="learn-nav">
                <button className="ln-btn" disabled={!prev} onClick={() => prev && setActiveId(prev.id)}>
                  ← {prev?.t || "First lesson"}
                </button>
                <button className="ln-btn nxt" disabled={!next}
                  onClick={() => { markDone(vid.id); if(next) setTimeout(()=>setActiveId(next.id), 100); }}>
                  {next?.t || "Course Complete"} →
                </button>
              </div>
            </div>
          </>
        ))}
      </div>
    </div>
  );
};

/* ─── CATALOG PAGE ───────────────────────────────────────────────────────────── */
const CatalogPage = ({ enrolled, onEnroll, onOpen, notify }) => {
  const [f, setF] = useState("all");
  const rows = f === "all" ? COURSES : COURSES.filter(c => c.cat.toLowerCase() === f);
  return (
    <div className="cat-wrap">
      <div className="cat-hero">
        <div className="cat-hl"><div className="cat-hl-line"/>Course Catalog</div>
        <div className="cat-ht">BROWSE <em>ALL COURSES</em></div>
        <div className="cat-hs">Real YouTube videos from top educators — structured into sequential learning paths.</div>
      </div>
      <div className="cat-filters">
        {["all","engineering","design","data"].map(c=>(
          <button key={c} className={`cat-f ${f===c?"on":""}`} onClick={()=>setF(c)}>{c.toUpperCase()}</button>
        ))}
      </div>
      <div className="cat-grid">
        {rows.map(c => {
          const isEnrolled = enrolled.includes(c.id);
          return (
            <div key={c.id} className="cc" onClick={()=>isEnrolled&&onOpen(c)}>
              <div className="cc-thumb" style={{background:c.bg}}>
                <span style={{fontSize:40,position:"relative",zIndex:1}}>{c.emoji}</span>
                <div className="cc-ov"/>
              </div>
              <div className="cc-body">
                <div className="cc-cat">{c.cat}</div>
                <div className="cc-title">{c.title.toUpperCase()}</div>
                <div className="cc-desc">{c.desc}</div>
                <div className="cc-tags">{c.tags.map(t=><div key={t} className="cc-tag">{t}</div>)}</div>
                <div className="cc-foot">
                  <div className="cc-by"><div className="cc-by-av">{c.bi}</div>{c.by}</div>
                  <button
                    className={`cc-btn ${isEnrolled?"enrolled":"free"}`}
                    onClick={e=>{
                      e.stopPropagation();
                      isEnrolled ? onOpen(c) : (onEnroll(c.id), notify(`Enrolled in ${c.title}!`));
                    }}>
                    {isEnrolled ? "Continue →" : "Enroll Free"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ─── PROFILE PAGE ───────────────────────────────────────────────────────────── */
const ProfilePage = ({ user, enrolled, progress, onOpen }) => {
  const ec = COURSES.filter(c => enrolled.includes(c.id));
  const totalDone = Object.values(progress).reduce((a,v)=>a+v.length, 0);
  return (
    <div className="prof">
      <div className="prof-hd">
        <div className="prof-av">{user.initials}</div>
        <div>
          <div className="prof-name">{user.name.toUpperCase()}</div>
          <div className="prof-email">{user.email}</div>
          <div className="prof-role">{user.role}</div>
        </div>
      </div>
      <div className="ps-grid">
        {[{v:enrolled.length,l:"Enrolled"},{v:totalDone,l:"Completed"},{v:`${enrolled.length*3}h`,l:"Hours"},{v:totalDone*10,l:"XP"}].map((s,i)=>(
          <div key={i} className="ps-card"><div className="ps-v">{s.v}</div><div className="ps-l">{s.l}</div></div>
        ))}
      </div>
      <div style={{marginBottom:12,fontSize:8,letterSpacing:2,textTransform:"uppercase",color:"var(--t3)"}}>My Courses</div>
      <div className="er-list">
        {ec.length===0 && <div style={{padding:24,fontSize:11,color:"var(--t3)",textAlign:"center"}}>No courses enrolled yet.</div>}
        {ec.map(c=>{
          const d=(progress[c.id]||[]).length, tot=c.secs.flatMap(s=>s.vids).length, p=Math.round((d/tot)*100);
          return (
            <div key={c.id} className="er-row" onClick={()=>onOpen(c)}>
              <div className="er-ico" style={{background:c.bg}}>{c.emoji}</div>
              <div style={{flex:1}}>
                <div className="er-t">{c.title.toUpperCase()}</div>
                <div className="er-s">{c.by} · {tot} videos</div>
                <div className="er-bar"><div className="er-fill" style={{width:`${p}%`}}/></div>
              </div>
              <div className="er-pct">{p}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ─── ADMIN PAGE ─────────────────────────────────────────────────────────────── */
const AdminPage = ({ users }) => (
  <div className="adm">
    <div style={{marginBottom:28}}>
      <div style={{fontFamily:"var(--fd)",fontSize:40,letterSpacing:1,marginBottom:4}}>ADMIN PANEL</div>
      <div style={{fontSize:11,color:"var(--t3)"}}>Platform overview and user management.</div>
    </div>
    <div className="adm-stats">
      {[{v:users.length,l:"Total Users"},{v:COURSES.length,l:"Courses"},{v:COURSES.reduce((a,c)=>a+c.secs.flatMap(s=>s.vids).length,0),l:"Real Videos"},{v:users.filter(u=>u.role==="student").length*2,l:"Enrollments"}].map((s,i)=>(
        <div key={i} className="adm-s"><div className="adm-sv">{s.v}</div><div className="adm-sl">{s.l}</div></div>
      ))}
    </div>
    <div className="adm-grid">
      <div className="adm-card">
        <div className="adm-ch">User Management</div>
        <table className="adm-table">
          <thead><tr><th>User</th><th>Email</th><th>Role</th></tr></thead>
          <tbody>
            {users.map(u=>(
              <tr key={u.id}>
                <td><div style={{display:"flex",alignItems:"center",gap:7}}>
                  <div style={{width:20,height:20,background:"var(--bg4)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:7,fontWeight:700}}>{u.initials}</div>
                  <span style={{color:"var(--t)"}}>{u.name}</span>
                </div></td>
                <td>{u.email}</td>
                <td><span className={`urole urole-${u.role}`}>{u.role}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="adm-card">
        <div className="adm-ch">Course Roster</div>
        {COURSES.map(c=>(
          <div key={c.id} className="adm-cr">
            <span style={{fontSize:14}}>{c.emoji}</span>
            <div style={{flex:1}}>
              <div style={{fontSize:10,fontWeight:500,color:"var(--t)"}}>{c.title}</div>
              <div style={{fontSize:8,color:"var(--t3)"}}>{c.secs.flatMap(s=>s.vids).length} videos · {c.by}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ─── ROOT APP ───────────────────────────────────────────────────────────────── */
export default function App() {
  // "screen" can be: "home" | "auth" | "app"
  const [screen, setScreen]       = useState("home");
  const [authMode, setAuthMode]   = useState("login");
  const [user, setUser]           = useState(null);
  const [users, setUsers]         = useState(BASE_USERS);
  // "page" is only used inside "app" screen
  const [page, setPage]           = useState("catalog");
  const [course, setCourse]       = useState(null);
  const [enrolled, setEnrolled]   = useState([1]);
  const [progress, setProgress]   = useState({});
  const [notif, setNotif]         = useState(null);

  const notify = msg => setNotif(msg);

  const doLogin = u => {
    setUser(u);
    setScreen("app");
    setPage(u.role === "admin" ? "admin" : "catalog");
  };

  const doRegister = u => {
    setUsers(prev => [...prev, u]);
    setUser(u);
    setScreen("app");
    setPage("catalog");
  };

  // LOGOUT — only when user explicitly clicks the logout button
  const doLogout = () => {
    setUser(null);
    setCourse(null);
    setPage("catalog");
    setScreen("home");
  };

  // Logo / home nav — keeps user logged in, just switches page
  const goHome = () => setPage("home");

  const openCourse = c => { setCourse(c); setPage("learning"); };

  const PAGES = { home:"HOME", catalog:"COURSE CATALOG", learning:course?.title?.toUpperCase()||"LEARNING", profile:"MY PROFILE", admin:"ADMIN PANEL" };
  const NAV = [
    { id:"home",    icon:"home"     },
    { id:"catalog", icon:"grid"     },
    ...(course ? [{ id:"learning", icon:"play" }] : []),
    { id:"profile", icon:"user"     },
    ...(user?.role === "admin" ? [{ id:"admin", icon:"settings" }] : []),
  ];

  return (
    <>
      <style>{CSS}</style>

      {screen === "home" && (
        <HomePage
          user={user}
          embedded={false}
          onGoToAuth={m => { setAuthMode(m); setScreen("auth"); }}
          onGoToDashboard={() => setScreen("app")}
        />
      )}

      {screen === "auth" && (
        <AuthPage
          mode={authMode}
          users={users}
          onLogin={doLogin}
          onRegister={doRegister}
          onBack={() => setScreen("home")}
        />
      )}

      {screen === "app" && user && (
        <div className="app">
          {/* Side nav */}
          <nav className="app-nav">
            <div className="app-logo" onClick={goHome} title="Home">L</div>
            {NAV.map(n => (
              <div key={n.id} className={`app-ni ${page===n.id?"on":""}`}
                title={n.id.charAt(0).toUpperCase()+n.id.slice(1)}
                onClick={() => setPage(n.id)}>
                <Ic n={n.icon} s={16}/>
              </div>
            ))}
            <div className="app-sp"/>
            {/* Logout is ONLY here — clicking logo/home never logs out */}
            <div className="app-ni" title="Logout" onClick={doLogout}><Ic n="logout" s={16}/></div>
          </nav>

          {/* Learning sidebar */}
          {page === "learning" && course && (
            <Sidebar enrolled={enrolled} activeId={course.id} onSelect={openCourse} progress={progress}/>
          )}

          {/* Main content */}
          <div style={{flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>
            <div className="topbar">
              <div className="topbar-title">{PAGES[page] || "LEARNLY"}</div>
              <div className="topbar-r">
                <div className="topbar-role">{user.role}</div>
                <div className="topbar-av" onClick={()=>setPage("profile")}>{user.initials}</div>
              </div>
            </div>
            <div style={{flex:1,overflowY:"auto"}}>
              {page==="home"     && <HomePage user={user} embedded={true} onGoToAuth={m=>{setAuthMode(m);setScreen("auth");}} onGoToDashboard={()=>setPage("catalog")}/>}
              {page==="catalog"  && <CatalogPage enrolled={enrolled} onEnroll={id=>setEnrolled(p=>p.includes(id)?p:[...p,id])} onOpen={openCourse} notify={notify}/>}
              {page==="learning" && course && <LearnPage course={course} progress={progress} onProgress={(id,l)=>setProgress(p=>({...p,[id]:l}))} notify={notify}/>}
              {page==="profile"  && <ProfilePage user={user} enrolled={enrolled} progress={progress} onOpen={openCourse}/>}
              {page==="admin"    && <AdminPage users={users}/>}
            </div>
          </div>
        </div>
      )}

      {notif && <Notif msg={notif} onClose={()=>setNotif(null)}/>}
    </>
  );
}
