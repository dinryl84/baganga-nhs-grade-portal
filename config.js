// ============================================================
// config.js — Grade Portal, Baganga NHS
// Central configuration file — loaded by all pages
// ============================================================

// ── Central API ───────────────────────────────────────────────
const CENTRAL_API = "https://script.google.com/macros/s/AKfycbwYY8tLLuOPOrUfOAzyIcJQTt1vMxvuJpNjMiVK5EA8EVHDiFNfZ28KK3sfl5LePYuL/exec";

// ── Salt ──────────────────────────────────────────────────────
const SALT = "baganga_nhs_2025";

// ── Teacher API URLs ──────────────────────────────────────────
// SHARED TEMPLATE URL — used for all teachers
const TSHARED = "https://script.google.com/macros/s/AKfycbwdYC-DZR36LW1t3sXeN55MGYrUNiOIyP-ey8frG-q_8wv-Br0c7Ey6jLvxbucgE645kg/exec";

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
  // ── Add more sections below as you import them ────────────
};
