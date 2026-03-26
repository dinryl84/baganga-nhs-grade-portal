# Grade Portal — Master Reference Document

**Project:** Student Grade Viewing Portal — DepEd JHS  
**School:** Baganga National High School  
**Version:** 5.0 — All stages complete, portal live  
**Date updated:** 2026  
**Status:** Fully deployed and tested — ready for real student/teacher data

---

## How to use this document

Paste this entire file at the start of a new Claude session. Claude will read it and continue the project exactly where we left off. This is the single source of truth for all decisions made during planning.

---

## 1. Project Overview

A mobile-friendly website where students of Baganga National High School can view their grades. Teachers encode grades in Google Sheets provided and configured by the admin. The site reads from those sheets and displays grades per subject per quarter in one combined view.

| Field | Value |
|---|---|
| Target users | DepEd JHS students (Baganga NHS) |
| Grade level | Junior High School (Grades 7–10) |
| Curriculum | DepEd Order 8, s. 2015 — JHS core subjects |
| Deployment | GitHub Pages — https://dinryl84.github.io/baganga-nhs-grade-portal/ |
| Total cost | Zero — 100% free stack |

### 1.1 Core features

- Students log in with LRN + password (default password = LRN)
- Students must change their default password on first login (enforced, not optional)
- Students can view Q1–Q4 grades per subject
- Q1, Q2, Q3 tabs show that quarter's grade only (not cumulative)
- Q4 tab shows final average = (Q1+Q2+Q3+Q4) / 4 per subject
- All averages are rounded to whole numbers
- All subjects from all teachers are combined into one grade card view
- Quarter tab switcher — past quarters always accessible even when a new quarter is current
- Pending quarters show `—` instead of blank or zero
- Grades below 75 are highlighted in red automatically
- Teachers encode grades in their Google Sheet — no website access needed
- Admin can reset a student's password from the Central Accounts Sheet
- Students can change their password anytime from the dashboard
- `fillDefaultPasswords()` script auto-fills SHA-256 hash and FALSE for new student rows

---

## 2. Tech Stack

All components are free. No server, no monthly cost, no framework dependencies.

| Layer | Technology | Why |
|---|---|---|
| Frontend | HTML + CSS + Vanilla JS | No framework needed — simpler to build and maintain |
| Hosting | GitHub Pages | Free, permanent HTTPS URL, supports custom HTML/JS |
| Backend / API | Google Apps Script | Reads sheets, validates login, hashes passwords — all free |
| Database | Google Sheets | Teacher-friendly input, no separate DB setup needed |
| Password hashing | SHA-256 via `Utilities.computeDigest()` | Built into Apps Script — no external library |
| Session | localStorage (token, LRN, name, section) | Lightweight — no backend session management needed |
| Config | `config.js` (static JS file on GitHub Pages) | Maps sections to their subject API URLs + tab names |

---

## 3. System Architecture

### 3.1 Two types of Apps Script deployments

| Type | Sheet | Purpose | Actions handled |
|---|---|---|---|
| **Central API** | Central Accounts Sheet (admin-owned) | Login, password change, student identity | `login`, `changePassword` |
| **Subject API** | Each teacher's spreadsheet (teacher-owned) | Grade data only — reads the correct tab based on section | `getGrades` |

### 3.2 Teacher spreadsheet structure (v3)

Each teacher owns **one spreadsheet** containing **multiple tabs** — one tab per subject-section they handle.

**Tab naming rule:** `Subject-GradeLevel-Section` (e.g. `Math-Grade7-Sampaguita`)

> Admin creates and names all tabs before sharing with teacher. Teachers never create, rename, or delete tabs.

### 3.3 How data flows

**Student login:**
1. Student enters LRN + password on `index.html`
2. Portal calls **Central API** via GET → `login` action
3. Central Sheet checks LRN, compares hashed password
4. Returns: `token`, `lrn`, `name`, `section`, `passwordChanged`
5. Portal stores all in `localStorage`
6. If `passwordChanged = false` → redirect to `change-password.html?first=true`
7. If `passwordChanged = true` → redirect to `dashboard.html`

**Grade fetch (dashboard):**
1. Dashboard reads `section` from `localStorage`
2. Looks up `config.js` → gets list of subjects for that section
3. Fires all subject API calls in parallel using `Promise.all`
4. Each call passes `{ action: "getGrades", lrn, tab }` to the teacher's Subject API
5. Subject API opens the specified tab and returns grades for that LRN
6. Dashboard combines all results and renders one complete grade card

**Password change:**
1. Student submits current + new password
2. Portal calls **Central API** → `changePassword` action
3. Central Sheet updates hashed password, sets `passwordChanged = TRUE`
4. Redirect to `dashboard.html`

### 3.4 Critical fix — Central API uses doGet not doPost

The login page sends requests via URL parameters (GET), not POST body. The Central API must handle both via a shared `handleRequest()` function. This was a key bug fixed during testing.

---

## 4. Google Sheet Structure

### 4.1 Central Accounts Sheet

**Tab: `Accounts`**

| Col | Header | Notes |
|---|---|---|
| A | LRN | 12-digit Learner Reference Number |
| B | Last name | Student surname |
| C | First name | Student given name |
| D | Section | e.g. `Grade 7-Sampaguita` — must exactly match config.js key |
| E | Password (hashed) | SHA-256 hash of password + SALT |
| F | Password changed | `TRUE` or `FALSE` |

**Password reset procedure:**
1. Find student row in Accounts tab
2. Delete col E value (script will treat it as blank and skip — manually paste the hash)
3. Set col F to `FALSE`
4. Run `fillDefaultPasswords()` to auto-fill the default hash

### 4.2 Teacher Spreadsheet

Each teacher's spreadsheet has **multiple grade tabs** plus one shared EditLog tab.

**Each grade tab: `Subject-GradeLevel-Section`**

| Col | Header |
|---|---|
| A | LRN |
| B | Last name |
| C | First name |
| D | Q1 |
| E | Q2 |
| F | Q3 |
| G | Q4 |

**Tab: `EditLog`**

| Col | Header |
|---|---|
| A | Timestamp |
| B | Editor email |
| C | Tab name |
| D | Note |

---

## 5. Authentication & Security

### 5.1 Password hashing

- Algorithm: SHA-256 via `Utilities.computeDigest()`
- Salt: `baganga_nhs_2025`
- Formula: `hash = SHA256(password + "baganga_nhs_2025")`
- Default password = student's LRN
- Default hash for LRN `123456789012` = `e6f682cca0411f015b85e74d85bf59110366b3d7f1b6dcb7cb4b3bdbc4ee435d`

### 5.2 Session storage (localStorage)

| Key | Value |
|---|---|
| `gp_token` | Session token |
| `gp_lrn` | Student's LRN |
| `gp_name` | Student's full name |
| `gp_section` | Student's section |

### 5.3 Password rules (enforced on frontend)

- Minimum 8 characters
- Must contain at least one number
- Cannot be the same as the student's LRN
- Must match the confirm field

---

## 6. Config File (`config.js`)

```javascript
const CENTRAL_API = "https://script.google.com/macros/s/AKfycbzXAZuYKQidl6PAZbeGvqceaYGASvqUh11RZIyewMIIyFRDI0YwgHKjPSuI8S6QEWQo9Q/exec";
const SALT = "baganga_nhs_2025";

// Teacher API URLs — add one constant per teacher
const T1 = "https://script.google.com/macros/s/AKfycbxHCJ0LmhjclI3cKJGy2_S99SxmI5K7OB5_5dO-OaFkJyWSJRQWFJad3iXimmcIA27zGg/exec";
// const T2 = "PASTE_NEXT_TEACHER_URL_HERE";

const SECTIONS = {
  "Grade 7-Sampaguita": [
    { subject: "Mathematics", url: T1, tab: "Math-Grade7-Sampaguita"    },
    { subject: "Science",     url: T1, tab: "Science-Grade7-Sampaguita" },
  ],
  "Grade 7-Apple": [
    { subject: "English", url: T1, tab: "English-Grade7-Apple" },
  ],
  // Add more sections as teachers are set up
};
```

---

## 7. UI Pages

| File | Purpose | Status |
|---|---|---|
| `index.html` | Login screen | ✅ Live |
| `dashboard.html` | Grade card — subject cards, quarter switcher | ✅ Live |
| `change-password.html` | Forced on first login; voluntary anytime | ✅ Live |
| `profile.html` | Student info + logout | ✅ Live |
| `config.js` | Section registry | ✅ Live |

### 7.1 Grade display rules

| Situation | What the student sees |
|---|---|
| Quarter cell is blank in sheet | `—` |
| Q1/Q2/Q3 tab selected | That quarter's grade only |
| Q4 tab selected | Final average = (Q1+Q2+Q3+Q4) / 4 |
| All averages | Rounded to whole number |
| Any quarter grade < 75 | Shown in red |
| Subject average < 75 | Average in red, Remarks pill says Failed |
| All subjects passed | Overall remarks: Passed pill in green |

### 7.2 Design style

- Mobile-first — designed for student phones
- Clean card-based layout — one card per subject
- Passing mark: **75** (DepEd standard)
- Font: Plus Jakarta Sans
- Colors: blue = active/current, green = passed, red = failed/below 75, amber = Q2/Q3 in progress
- Bottom navigation: Grades | Profile | Password

### 7.3 Quarter switcher behavior

| Tab state | Visual | Behavior |
|---|---|---|
| Done (past quarter) | Neutral, tappable | Loads that quarter's grade |
| Current (active quarter) | Blue highlight, bold | Default on page load |
| Pending (future quarter) | Grayed out, 50% opacity | Disabled — not tappable |

---

## 8. Deployed URLs

| Component | URL |
|---|---|
| GitHub Pages | https://dinryl84.github.io/baganga-nhs-grade-portal/ |
| GitHub Repo | https://github.com/dinryl84/baganga-nhs-grade-portal |
| Central API | https://script.google.com/macros/s/AKfycbzXAZuYKQidl6PAZbeGvqceaYGASvqUh11RZIyewMIIyFRDI0YwgHKjPSuI8S6QEWQo9Q/exec |
| T1 — Subject API | https://script.google.com/macros/s/AKfycbxHCJ0LmhjclI3cKJGy2_S99SxmI5K7OB5_5dO-OaFkJyWSJRQWFJad3iXimmcIA27zGg/exec |

---

## 9. Build Stages

| Stage | Name | Status |
|---|---|---|
| 1 | Google Sheet setup — Central Accounts Sheet | ✅ Done |
| 2 | Central Apps Script — login + password change API | ✅ Done |
| 3 | Subject Apps Script — grade fetch API, tab-based | ✅ Done |
| 4 | Login page — `index.html` | ✅ Done |
| 5 | Grade dashboard — `dashboard.html` | ✅ Done |
| 6 | Change password page — `change-password.html` | ✅ Done |
| 7 | Config file — `config.js` | ✅ Done |
| 8 | Profile page — `profile.html` | ✅ Done |
| 9 | Deploy + test | ✅ Done |

---

## 10. Key Decisions Log

| Decision | Chosen option | Reason |
|---|---|---|
| Student login method | LRN as username, LRN as default password | LRN is unique and already known to students |
| Grade data source | Google Sheets | Teacher-friendly — no new tool to learn |
| Sheet structure | One spreadsheet per teacher, tabs per subject-section | Matches how teachers are organized |
| Tab naming convention | `Subject-GradeLevel-Section` | Unique, readable, directly usable as the `tab` parameter |
| Tab creation responsibility | Admin creates and names all tabs | Prevents spelling mismatches with config.js |
| Central API request method | doGet + doPost both handled via `handleRequest()` | Frontend sends GET requests via URL params — doPost alone caused undefined session data bug |
| Quarter grade display | Q1/Q2/Q3 = that quarter's grade only; Q4 = final average of all 4 | Matches DepEd grading convention |
| Average rounding | `Math.round()` — whole numbers only | Cleaner display for students |
| Default password setup | `fillDefaultPasswords()` Apps Script function | Auto-fills SHA-256 hash + FALSE for all empty rows in one click |
| Password storage | SHA-256 + salt in Central Accounts Sheet | Free, secure, no external DB |
| Password salt | `baganga_nhs_2025` | Prevents rainbow table attacks |
| Hosting | GitHub Pages | Free, supports custom HTML/CSS/JS |
| Frontend framework | Vanilla HTML/CSS/JS | No build tools or config needed |
| Passing mark | 75 (DepEd standard) | Standard DepEd JHS passing grade |
| Caching | Cache-control meta tags on all pages | Prevents students from seeing stale versions after updates |

---

## 11. Admin Procedures

### Adding new students
1. Add row to Central Accounts Sheet: LRN, Last name, First name, Section — leave E and F blank
2. Add same student rows (LRN + name) to each relevant subject tab in the teacher's spreadsheet
3. Run `fillDefaultPasswords()` in Apps Script — auto-fills hash and FALSE for all blank rows
4. Student logs in with LRN as password and is forced to set a new one

### Adding new teachers
1. Create one new Google Spreadsheet for the teacher
2. Add tabs named `Subject-GradeLevel-Section` for each section that teacher handles
3. Add an `EditLog` tab
4. Paste Subject API script into Apps Script editor
5. Deploy as Web App (Execute as: Me, Who has access: Anyone) — record the URL
6. Add the URL as a new constant (T2, T3, etc.) in `config.js`
7. Add subject entries for each section in `config.js`
8. Share the spreadsheet with the teacher's Google account

### Adding new sections
1. Add a new key to `SECTIONS` in `config.js`
2. List all subjects with their `url` and `tab` values
3. Make sure the section name exactly matches column D in the Central Accounts Sheet

### Resetting a student password
1. Find student row in Accounts tab
2. Clear column E (password hash)
3. Set column F to `FALSE`
4. Run `fillDefaultPasswords()` — will refill the default hash
5. Tell the student to log in with their LRN as the password

---

## 12. Scripts Reference

### Central API (in Central Accounts Sheet)
- `login` — validates LRN + hashed password, returns session data
- `changePassword` — verifies old password, saves new hash, sets passwordChanged = TRUE
- `fillDefaultPasswords()` — fills default hash + FALSE for all rows with empty password column
- Handles both GET and POST via shared `handleRequest()` function

### Subject API (in each teacher's spreadsheet)
- `getGrades` — opens named tab, finds LRN row, returns Q1–Q4 (nulls for blank cells)
- Returns `{ missing: true }` if tab or LRN not found — dashboard shows `—` gracefully
- `onEditTrigger` — logs every teacher edit to EditLog tab (must be installed as installable trigger)

---

*Grade Portal — Master Reference — Baganga National High School — v5.0*
