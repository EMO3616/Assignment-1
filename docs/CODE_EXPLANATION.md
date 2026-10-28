# Giải thích code và chuẩn bị interview

## 1. Execution flow
1. Browser loads `index.html`, executing `src/main.jsx`.
2. `createRoot(...).render(<App />)` mounts React.
3. `App` obtains records through `readData()` and login identity from `sessionStorage`.
4. If `user` is null, React renders `Login`; on `Admin / Admin`, `onLogin` updates sessionStorage and React state.
5. The authenticated app renders `Layout`, which displays the active page selected by `page` state.
6. Each management page receives records, field definitions and callbacks from App.
7. Clicking Add/Edit opens a controlled form in a reusable modal. Submitting validates and calls `onSave`.
8. `setData(old => ...)` creates a new array/object without mutating existing React state; React re-renders the table.
9. `useEffect` writes the new data to `localStorage`. Refresh loads it again from storage.

## 2. Input → Trigger → Transform → Output
| Flow | Input | Trigger | Transform | Output |
|---|---|---|---|---|
| Login | username/password | submit | empty check + exact Admin/Admin match | user state and admin screen / error |
| Create | dialog form | submit | validate, generate new unique numeric ID, append immutably | new row + persist |
| Update | selected record | Edit → submit | prefill, validate, replace by ID | updated row + persist |
| Delete | selected ID | Delete → Confirm | check relation guards, `filter` by ID | removed row + persist |
| Search | keyword | onChange | trim/lowercase, compare supported fields | derived visible rows only |
| Logout | user session | Sign out click | clear sessionStorage and user state | login screen |

## 3. Điểm cần giải thích
- `props` are inputs from App to Layout / CrudPage; React `state` is mutable via setters, not direct assignment.
- `useMemo` creates filtered display results based on source records and keyword; it never deletes source records.
- `key={record.id}` gives stable identity when React reconciles table rows.
- Controlled fields have `value` and `onChange` tied to React state.
- `preventDefault()` prevents browser form navigation on submit.
- For Create, `Math.max` allocates an ID beyond existing IDs; for Update, `map` replaces exactly the matching ID; for Delete, `filter` excludes it.
- `App` owns shared collections because the dashboard and management pages read the same state; form/modal state stays local to `CrudPage`.
- `status` 1/0 maps to Active/Inactive; role 1/2 maps to Admin/Staff.
- A News article refers to `categoryId` and `createdBy`; deletion of referenced entities is blocked to prevent orphaned relationships.

## 4. Design decisions (6 mandatory)
| Choice | Selected | Why | If requirements change |
|---|---|---|---|
| Navigation | state-based | no routing requirement/dependency | add React Router + protected routes for deep links |
| State ownership | App owns collections | central dashboard/table consistency | Context or external store for larger app |
| Persistence | localStorage | no backend required; survives refresh | replace storage module with API layer |
| Dialog reuse | same modal for create/update | smaller surface area and consistent UX | extract entity-specific editors if fields diverge |
| Search strategy | `useMemo` derived filtered list | immutable source remains intact | add server-side filter/query on large data |
| Folder structure | pages/components/data/styles | separation of visual, state and storage concerns | move domain CRUD logic into services/hooks |

## 5. Live change you should practice alone
Add a status selector to the Category toolbar and combine it with keyword Search. Explain which state, filtering expression, interface and test cases change. The assignment rubric evaluates your ability to make an unfamiliar change without blindly copying AI output.
