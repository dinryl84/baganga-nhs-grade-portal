// ============================================================
// config.js — Grade Portal, Baganga NHS
// Central configuration file — loaded by all pages
//
// HOW TO UPDATE:
// 1. Add your real section names as keys in SECTIONS
// 2. For each section, list all subjects with:
//    - subject: display name shown on the grade card
//    - url:     the teacher's Subject API /exec URL
//    - tab:     the exact tab name inside that teacher's spreadsheet
// ============================================================

// ── Central API ───────────────────────────────────────────────
const CENTRAL_API = "https://script.google.com/macros/s/AKfycbxhlUgCZ-tg3tVq1i3SDVS9msEDCh80epni1N8ER98fzI7lsIS4Axw2Ldq1iF3x7quUEg/exec";

// ── Salt ──────────────────────────────────────────────────────
const SALT = "baganga_nhs_2025";

// ── Teacher API URLs ──────────────────────────────────────────
// Give each teacher URL a name so it's easy to reuse below
const T1 = "https://script.google.com/macros/s/AKfycbxHCJ0LmhjclI3cKJGy2_S99SxmI5K7OB5_5dO-OaFkJyWSJRQWFJad3iXimmcIA27zGg/exec";
// const T2 = "PASTE_NEXT_TEACHER_URL_HERE";
// const T3 = "PASTE_NEXT_TEACHER_URL_HERE";

// ── Section registry ──────────────────────────────────────────
const SECTIONS = {

  // ── GRADE 7 — Sampaguita ─────────────────────────────────
  "Grade 7-Sampaguita": [
    { subject: "Mathematics", url: T1, tab: "Math-Grade7-Sampaguita"    },
    { subject: "Science",     url: T1, tab: "Science-Grade7-Sampaguita" },
    // Add more subjects as more teachers are set up:
    // { subject: "English",  url: T2, tab: "English-Grade7-Sampaguita" },
    // { subject: "Filipino", url: T2, tab: "Filipino-Grade7-Sampaguita" },
  ],

  // ── GRADE 7 — Apple ──────────────────────────────────────
  "Grade 7-Apple": [
    { subject: "English", url: T1, tab: "English-Grade7-Apple" },
    // Add more subjects as more teachers are set up:
    // { subject: "Mathematics", url: T2, tab: "Math-Grade7-Apple" },
  ],

  // ── GRADE 7 — Banana ─────────────────────────────────────
  // "Grade 7-Banana": [
  //   { subject: "Mathematics", url: T2, tab: "Math-Grade7-Banana" },
  // ],

  // ── GRADE 8 ───────────────────────────────────────────────
  // "Grade 8-Sampaguita": [
  //   { subject: "Mathematics", url: T2, tab: "Math-Grade8-Sampaguita" },
  // ],

  // ── GRADE 9 ───────────────────────────────────────────────
  // "Grade 9-Sampaguita": [
  //   { subject: "Mathematics", url: T2, tab: "Math-Grade9-Sampaguita" },
  // ],

  // ── GRADE 10 ──────────────────────────────────────────────
  // "Grade 10-Sampaguita": [
  //   { subject: "Mathematics", url: T2, tab: "Math-Grade10-Sampaguita" },
  // ],

};
