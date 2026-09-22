# Features (TanStack Query)

Server state is grouped by **audience / shell**, then by **dashboard role**.

```text
src/features/
  auth/                         # login, session, current-user
  public/                       # marketing + checkout catalog
    plans/
    addOns/
  dash/                         # behind ProtectedRoute
    admin/                      # admin role domains
    collaborator/               # partner portal domains
    user/                       # end-user account domains
```

Demo mode is **on by default** (`VITE_USE_API_MOCKS` !== `"false"`).

## Import paths

| Audience | Import |
| -------- | ------ |
| Auth | `@/features/auth` |
| Public plans/add-ons | `@/features/public/plans`, `@/features/public/addOns` |
| Admin barrel | `@/features/dash/admin` |
| Admin orders | `@/features/dash/admin/orders` |
| Collaborator barrel | `@/features/dash/collaborator` |
| User barrel | `@/features/dash/user` |

Optional top barrels: `@/features/public`, `@/features/dash`, `@/features`.

## Per-feature layout

```text
src/features/<audience>/.../<feature>/
  mocks/<feature>.mock.js
  api/<feature>.api.js
  queries/
    <feature>.keys.js
    <feature>.queries.js
    <feature>.mutations.js   # when writes exist
  index.js
```

## Query key namespaces

Keys are prefixed so public / admin / role caches never collide:

- public → `["public", "plans", …]`
- admin → `["dash", "admin", "orders", …]`
- collaborator → `["dash", "collaborator", "orders", …]`
- user → `["dash", "user", "bills", …]`
- auth → `["auth", …]`

## Layer diagram

```text
UI (pages)
    ↓  hooks from @/features/...  ·  schemas from feature validation / @/lib/validation
Feature queries
    ↓
Feature api  →  USE_API_MOCKS ? mocks : apiClient + ENDPOINTS
    ↓
src/lib/api  ·  src/lib/provider  ·  src/lib/auth  ·  src/lib/storage  ·  src/lib/config
```

## Feature map

### `auth/`
login / me / logout — `@/features/auth`

### `public/`
| Feature | Path |
| ------- | ---- |
| plans | `public/plans` |
| addOns | `public/addOns` |

(`coverage` skipped — no feature domain yet.)

### `dash/admin/`
customers · orders · identity · plans · addOns · esim · billing · support ·
notifications · users · reports · settings · auditLogs

### `dash/collaborator/`
customers · orders · activations · commissions · invoices · notifications ·
profile · identity · plans · support

### `dash/user/`
overview (includes my-line + profile) · usage · bills · payments · esim ·
support · notifications

## Rules

1. Server state only in TanStack Query.
2. `queryFn` forwards `signal`.
3. Key factories only — no inline keys in pages.
4. Mutations invalidate with `onSettled`.
5. Dependent queries use `enabled: !!id`.
6. Seed data stays in `mocks/`.

## Switch to real API

```env
VITE_USE_API_MOCKS=false
VITE_API_BASE_URL=https://your-api.example/api
```
