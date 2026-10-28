# FUNewsManagementSystem — SBA301 Assignment 01 (Reference Implementation)

A ReactJS + Vite frontend reference for **Assignment 01 – Working with ReactJS application**. This is an **AI-assisted learning reference, not an independently authored student submission**. Review, adapt, test, and be able to explain and modify every part. The original course HTML/CSS template was not attached; this project uses an independent custom dashboard design, so compare/replace the styling with your class template if required.

## Requirements
- Node.js 18+ and npm (Node 20 LTS recommended).
- No Java, Spring Boot, SQL Server, MongoDB, database or backend required.

## Run in VS Code / PowerShell

```powershell
cd FUNews_Assignment01_Reference
npm install
npm run dev
```

Open the URL Vite displays (usually `http://localhost:5173`). To check production compilation:

```powershell
npm run build
npm run preview
```

### Test credentials
- Username: `Admin`
- Password: `Admin`

**Security warning:** this is demo-only mock authentication. Credentials are hardcoded for the assignment and are **not suitable for production**. The application does not authenticate Staff accounts.

## Features
1. Mock login, validation, logout and sessionStorage session state.
2. Responsive admin layout, AI-created SVG FUNews logo, Dashboard, Categories, News Articles, Users and Settings.
3. Category, News and User CRUD (table, shared Create/Edit dialog, Delete confirmation).
4. Case-insensitive Search, empty and no-result states.
5. News selects an existing category and author. Status 1=Active/0=Inactive; role 1=Admin/2=Staff.
6. localStorage persists mock records between reloads. Settings > Reset data restores seed records.
7. Deleting a Category or User referenced by News is blocked to preserve data consistency.

## Architectural map
- `src/App.jsx`: shared data state, auth/navigation, CRUD state transitions, validation, relational rules and page selection.
- `src/pages/Login.jsx`: controlled login form, mock authentication trigger.
- `src/components/Layout.jsx`: shared Header, Sidebar, navigation, logout.
- `src/components/CrudPage.jsx`: generic management table, Search, Create/Update modal and Delete confirmation.
- `src/components/Modal.jsx`: reusable popup presentation.
- `src/data/seed.js`: mock Category, News and User records.
- `src/data/storage.js`: storage read/write/reset and session key.
- `src/styles/app.css`: responsive layout and component styling.
- `src/assets/logo.svg`: AI-authored vector brand logo.

## State flow
`Login submit` → check Admin/Admin → `sessionStorage + setUser` → render layout. `Add/Edit` → prepare form and dialog mode → controlled inputs → validate → `onSave` → immutable state update in `App` → React renders list → effect writes localStorage. `Delete` → confirm → relation guard → filter source array → render + persist. Search derives a filtered list using `useMemo`, does not modify stored records.

## Known limitations and design decisions
- Uses state-based navigation, not React Router (simpler for this assignment, no deep links).
- Records live only in the user's browser, not in a shared server.
- Mock passwords are stored in client-side demo records. Do not reuse real passwords.
- This implementation is not a replacement for the HTML/CSS template supplied separately by the instructor.
- Demo login remains Admin/Admin even if the Admin record in mock Users changes.
- Confirmation of resetting demo data uses `window.confirm`; Delete uses a custom React modal.
- No screenshots, manual test pass results or real debugging evidence are claimed before executing these checks on your machine.

## Submission preparation
1. Rename root folder to your required `StudentName_ClassCode` value.
2. Check the teacher-provided HTML/CSS template, revise design and assets if needed.
3. Read all modules and document your own design decisions.
4. Run all tests in `docs/TEST_MATRIX.md`; record **Actual / Pass / screenshot** honestly.
5. Update `docs/AI_USAGE_LOG.md` with what you actually used and changed.
6. Take screenshots and prepare live code explanation and modification demonstration.
7. Zip project **without** `node_modules` or `dist`.

## AI usage attribution
Initial reference project structure, JSX, CSS, logo SVG and documentation were created with AI assistance in response to an Assignment 01 implementation request. Verify functionality yourself and record adapted changes; do not claim independent authorship.
