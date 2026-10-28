# Test matrix — record actual results on your device

Guide cases 1–35. All entries below are **NOT RUN** pending your local manual verification.

| # | Area | Case | Steps | Expected | Actual | Result | Evidence |
|---:|---|---|---|---|---|---|---|
| 1 | Login | Empty | Submit empty username/password | Shows validation; no login | — | NOT RUN | — |
| 2 | Login | Wrong credential | Submit incorrect account | Does not enter admin | — | NOT RUN | — |
| 3 | Login | Valid Admin | Admin/Admin | Admin dashboard appears | — | NOT RUN | — |
| 4 | Auth | Logout | Log out from admin | Returns to login | — | NOT RUN | — |
| 5 | Layout | Menu completeness | Inspect sidebar | Five menus shown | — | NOT RUN | — |
| 6 | Navigation | All menus | Click each menu | Correct page without full reload | — | NOT RUN | — |
| 7 | Category | Read | Open management screen | Rows shown | — | NOT RUN | — |
| 8 | Category | Create valid | Submit valid new record | New row appears | — | NOT RUN | — |
| 9 | Category | Create invalid | Submit missing required field | Error and no new row | — | NOT RUN | — |
| 10 | Category | Update | Edit a record and save | Only intended row changes | — | NOT RUN | — |
| 11 | Category | Delete cancel | Click Delete then Cancel | Record preserved | — | NOT RUN | — |
| 12 | Category | Delete confirm | Click Delete then Confirm | Record removed | — | NOT RUN | — |
| 13 | Category | Search hit | Enter matching keyword | Only matches shown | — | NOT RUN | — |
| 14 | Category | Search miss | Enter unmatched keyword | No-result state | — | NOT RUN | — |
| 15 | News | Read | Open management screen | Rows shown | — | NOT RUN | — |
| 16 | News | Create valid | Submit valid new record | New row appears | — | NOT RUN | — |
| 17 | News | Create invalid | Submit missing required field | Error and no new row | — | NOT RUN | — |
| 18 | News | Update | Edit a record and save | Only intended row changes | — | NOT RUN | — |
| 19 | News | Delete cancel | Click Delete then Cancel | Record preserved | — | NOT RUN | — |
| 20 | News | Delete confirm | Click Delete then Confirm | Record removed | — | NOT RUN | — |
| 21 | News | Search hit | Enter matching keyword | Only matches shown | — | NOT RUN | — |
| 22 | News | Search miss | Enter unmatched keyword | No-result state | — | NOT RUN | — |
| 23 | Users | Read | Open management screen | Rows shown | — | NOT RUN | — |
| 24 | Users | Create valid | Submit valid new record | New row appears | — | NOT RUN | — |
| 25 | Users | Create invalid | Submit missing required field | Error and no new row | — | NOT RUN | — |
| 26 | Users | Update | Edit a record and save | Only intended row changes | — | NOT RUN | — |
| 27 | Users | Delete cancel | Click Delete then Cancel | Record preserved | — | NOT RUN | — |
| 28 | Users | Delete confirm | Click Delete then Confirm | Record removed | — | NOT RUN | — |
| 29 | Users | Search hit | Enter matching keyword | Only matches shown | — | NOT RUN | — |
| 30 | Users | Search miss | Enter unmatched keyword | No-result state | — | NOT RUN | — |
| 31 | News | Relation | Create a News with selected category | Valid categoryId used | — | NOT RUN | — |
| 32 | User | Role | Inspect user roles | 1=Admin, 2=Staff | — | NOT RUN | — |
| 33 | Status | Display | Inspect active/inactive statuses | 1=Active, 0=Inactive | — | NOT RUN | — |
| 34 | Data | Empty | Delete all unreferenced rows | Empty state, no crash | — | NOT RUN | — |
| 35 | Persistence | Reload | Make CRUD change and refresh | Records retained | — | NOT RUN | — |

## Further negative/edge tests
- Search uppercase/lowercase and leading/trailing spaces.
- Search during Create/Edit; ensure source array unchanged.
- Edit two different records sequentially; verify modal prefill resets correctly.
- Attempt to delete Category or User referenced by a News record; deletion must be blocked.
- Reload after CRUD and check records persist.
- Reset storage; verify seed data restored.
- Attempt invalid category/author when datasets are empty.
