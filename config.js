// config.js
// Central API — handles login and password change for all students
const CENTRAL_API = "https://script.google.com/macros/s/AKfycbxGngqSATA2aY7gciwFsuyOnu-ZDGP8C-BzIYks2O1fhOmexY_YC-1XwFB6GUzS363-/exec";
// Salt — must match the salt used in both Apps Scripts
const SALT = "baganga_nhs_2025";

// Section registry — maps each section to its subject list
// Each subject entry:
//   subject  — display name shown on the grade card
//   url      — the teacher's Subject API (one URL per teacher spreadsheet)
//   tab      — the tab name inside that spreadsheet to read from
const SECTIONS = {

  // ── GRADE 7 ──
  "Grade 7-Sampaguita": [
    { subject: "Mathematics",  url: "https://script.google.com/macros/s/AKfycbxGQanAYLf8BTwZEcq3g5e2WE57o4gIp0QZd7BE799eY-hYZMNJ2JNZI_6ZKz33HltM/exec", tab: "Math-Grade7-Sampaguita" },
    { subject: "Science",      url: "https://script.google.com/macros/s/AKfycbxGQanAYLf8BTwZEcq3g5e2WE57o4gIp0QZd7BE799eY-hYZMNJ2JNZI_6ZKz33HltM/exec", tab: "Science-Grade7-Sampaguita" },
    { subject: "Filipino",     url: "https://script.google.com/macros/s/AKfycbxGQanAYLf8BTwZEcq3g5e2WE57o4gIp0QZd7BE799eY-hYZMNJ2JNZI_6ZKz33HltM/exec", tab: "Filipino-Grade7-Sampaguita" },
    { subject: "English",      url: "https://script.google.com/macros/s/AKfycbxGQanAYLf8BTwZEcq3g5e2WE57o4gIp0QZd7BE799eY-hYZMNJ2JNZI_6ZKz33HltM/exec", tab: "English-Grade7-Sampaguita" },
    { subject: "Araling Panlipunan", url: "https://script.google.com/macros/s/AKfycbxGQanAYLf8BTwZEcq3g5e2WE57o4gIp0QZd7BE799eY-hYZMNJ2JNZI_6ZKz33HltM/exec", tab: "AP-Grade7-Sampaguita" },
    { subject: "MAPEH",        url: "https://script.google.com/macros/s/AKfycbxGQanAYLf8BTwZEcq3g5e2WE57o4gIp0QZd7BE799eY-hYZMNJ2JNZI_6ZKz33HltM/exec", tab: "MAPEH-Grade7-Sampaguita" },
    { subject: "TLE",          url: "https://script.google.com/macros/s/AKfycbxGQanAYLf8BTwZEcq3g5e2WE57o4gIp0QZd7BE799eY-hYZMNJ2JNZI_6ZKz33HltM/exec", tab: "TLE-Grade7-Sampaguita" },
    { subject: "ESP",          url: "https://script.google.com/macros/s/AKfycbxGQanAYLf8BTwZEcq3g5e2WE57o4gIp0QZd7BE799eY-hYZMNJ2JNZI_6ZKz33HltM/exec", tab: "ESP-Grade7-Sampaguita" },
  ],
  "Grade 7-Ilang-ilang": [
    { subject: "Mathematics",  url: "https://script.google.com/macros/s/AKfycbxGQanAYLf8BTwZEcq3g5e2WE57o4gIp0QZd7BE799eY-hYZMNJ2JNZI_6ZKz33HltM/exec", tab: "Math-Grade7-Ilang-ilang" },
    { subject: "Science",      url: "https://script.google.com/macros/s/AKfycbxGQanAYLf8BTwZEcq3g5e2WE57o4gIp0QZd7BE799eY-hYZMNJ2JNZI_6ZKz33HltM/exec", tab: "Science-Grade7-Ilang-ilang" },
    // ... additional subjects
  ],

  // ── GRADE 8 ──
  "Grade 8-Sampaguita": [
    { subject: "Mathematics",  url: "https://script.google.com/macros/s/AKfycbxGQanAYLf8BTwZEcq3g5e2WE57o4gIp0QZd7BE799eY-hYZMNJ2JNZI_6ZKz33HltM/exec", tab: "Math-Grade8-Sampaguita" },
    // ... additional subjects
  ],

  // ── GRADE 9 ──
  // ...

  // ── GRADE 10 ──
  // ...
};
