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
// Handles login and password change for all students
const CENTRAL_API = "https://script.google.com/macros/s/AKfycbzXAZuYKQidl6PAZbeGvqceaYGASvqUh11RZIyewMIIyFRDI0YwgHKjPSuI8S6QEWQo9Q/exec";

// ── Salt ──────────────────────────────────────────────────────
// Must match the salt used in both Apps Scripts — do not change
const SALT = "baganga_nhs_2025";

// ── Section registry ──────────────────────────────────────────
// Add one entry per section. Each subject needs:
//   subject — display name on the grade card
//   url     — the teacher's Subject API URL
//   tab     — exact tab name inside that spreadsheet
const SECTIONS = {

  // ── GRADE 7 ──────────────────────────────────────────────
  // PLACEHOLDER — replace with your real section name
  "Grade 7-Sampaguita": [
    {
      subject: "Mathematics",
      url: "https://script.google.com/macros/s/AKfycbxHCJ0LmhjclI3cKJGy2_S99SxmI5K7OB5_5dO-OaFkJyWSJRQWFJad3iXimmcIA27zGg/exec",
      tab: "Math-Grade7-Sampaguita"
    },
    // Add more subjects below — copy and paste this block for each:
    // {
    //   subject: "Science",
    //   url: "PASTE_TEACHER_API_URL_HERE",
    //   tab: "Science-Grade7-Sampaguita"
    // },
    // {
    //   subject: "English",
    //   url: "PASTE_TEACHER_API_URL_HERE",
    //   tab: "English-Grade7-Sampaguita"
    // },
    // {
    //   subject: "Filipino",
    //   url: "PASTE_TEACHER_API_URL_HERE",
    //   tab: "Filipino-Grade7-Sampaguita"
    // },
    // {
    //   subject: "Araling Panlipunan",
    //   url: "PASTE_TEACHER_API_URL_HERE",
    //   tab: "AP-Grade7-Sampaguita"
    // },
    // {
    //   subject: "Edukasyon sa Pagpapakatao",
    //   url: "PASTE_TEACHER_API_URL_HERE",
    //   tab: "EsP-Grade7-Sampaguita"
    // },
    // {
    //   subject: "Technology and Livelihood Education",
    //   url: "PASTE_TEACHER_API_URL_HERE",
    //   tab: "TLE-Grade7-Sampaguita"
    // },
    // {
    //   subject: "MAPEH",
    //   url: "PASTE_TEACHER_API_URL_HERE",
    //   tab: "MAPEH-Grade7-Sampaguita"
    // },
  ],

  // Add more sections below — copy and paste this block for each:
  // "Grade 7-Ilang-ilang": [
  //   {
  //     subject: "Mathematics",
  //     url: "PASTE_TEACHER_API_URL_HERE",
  //     tab: "Math-Grade7-Ilang-ilang"
  //   },
  // ],

  // ── GRADE 8 ──────────────────────────────────────────────
  // "Grade 8-Sampaguita": [
  //   {
  //     subject: "Mathematics",
  //     url: "PASTE_TEACHER_API_URL_HERE",
  //     tab: "Math-Grade8-Sampaguita"
  //   },
  // ],

  // ── GRADE 9 ──────────────────────────────────────────────
  // "Grade 9-Sampaguita": [
  //   {
  //     subject: "Mathematics",
  //     url: "PASTE_TEACHER_API_URL_HERE",
  //     tab: "Math-Grade9-Sampaguita"
  //   },
  // ],

  // ── GRADE 10 ─────────────────────────────────────────────
  // "Grade 10-Sampaguita": [
  //   {
  //     subject: "Mathematics",
  //     url: "PASTE_TEACHER_API_URL_HERE",
  //     tab: "Math-Grade10-Sampaguita"
  //   },
  // ],

};
