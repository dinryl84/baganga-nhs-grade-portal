// ============================================================
// config.js — Grade Portal, Baganga NHS
// Central configuration file — loaded by all pages
// ============================================================

// ── Central API ───────────────────────────────────────────────
const CENTRAL_API = "https://script.google.com/macros/s/AKfycbwYY8tLLuOPOrUfOAzyIcJQTt1vMxvuJpNjMiVK5EA8EVHDiFNfZ28KK3sfl5LePYuL/exec";

// ── Salt ──────────────────────────────────────────────────────
const SALT = "baganga_nhs_2025";

// ── Teacher API URLs ──────────────────────────────────────────
// TSHARED — placeholder for teachers not yet deployed
const TSHARED   = "https://script.google.com/macros/s/AKfycbyLGoR7U-qYijaGkCaPbc6wh54IfZZkZYJzWttRgVgT-1bBIltoa7mxP6VEnOSSq8y6/exec";

// Teacher-specific deployment URLs (1 spreadsheet per teacher)
const T_DUTERTE = "https://script.google.com/macros/s/AKfycbxM_bj7cjxr6LgnOEngc98KGOFNvTBTrEvG9EzH7LNNrK7g4ZXIvzTs2Os9P_Ele-63mw/exec";

// ── Section registry ──────────────────────────────────────────
const SECTIONS = {

  // ── GRADE 9 — Jacinto ────────────────────────────────────
  "Grade 9-Jacinto": [
    { subject: "Science", url: TSHARED, tab: "Science-Grade9-Jacinto" },
  ],

  // ── GRADE 12 — Marcos ────────────────────────────────────
  "Grade 12-Marcos": [
    { subject: "Araling Panlipunan", url: TSHARED, tab: "AP-Grade12-Marcos"   },
    { subject: "Mathematics",        url: TSHARED, tab: "Math-Grade12-Marcos" },
  ],

  // ── GRADE 12 — Duterte ───────────────────────────────────
  "Grade 12-Duterte": [
    { subject: "Araling Panlipunan", url: T_DUTERTE, tab: "AP-Grade12-Duterte" },
  ],

  // ── Add more sections below as you import them ────────────
};
