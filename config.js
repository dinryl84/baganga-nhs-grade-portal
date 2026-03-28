// ============================================================
// config.js — Grade Portal, Baganga NHS
// Central configuration file — loaded by all pages
// ============================================================

// ── Central API ───────────────────────────────────────────────
const CENTRAL_API = "https://script.google.com/macros/s/AKfycbzXAZuYKQidl6PAZbeGvqceaYGASvqUh11RZIyewMIIyFRDI0YwgHKjPSuI8S6QEWQo9Q/exec";

// ── Salt ──────────────────────────────────────────────────────
const SALT = "baganga_nhs_2025";

// ── Teacher API URLs ──────────────────────────────────────────
// SHARED TEMPLATE URL — used for all teachers
const TSHARED = "https://script.google.com/macros/s/AKfycbwdYC-DZR36LW1t3sXeN55MGYrUNiOIyP-ey8frG-q_8wv-Br0c7Ey6jLvxbucgE645kg/exec";

// ── Section registry ──────────────────────────────────────────
const SECTIONS = {

  // ── GRADE 12 — Marcos ────────────────────────────────────
  "Grade 12-Marcos": [
    { subject: "Araling Panlipunan", url: TSHARED, tab: "AP-Grade12-Marcos"   },
    { subject: "Mathematics",        url: TSHARED, tab: "Math-Grade12-Marcos" },
  ],

  // ── Add more sections below as you import them ────────────
  // "Grade 12-Duterte": [
  //   { subject: "Araling Panlipunan", url: TSHARED, tab: "AP-Grade12-Duterte" },
  // ],

};
