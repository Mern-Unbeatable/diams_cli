# Features (TanStack Query)

Server state lives in `src/features/<name>/`. HTTP client + QueryClient live in `src/lib/`.

## Layer diagram

```text
UI (src/pages)
    ↓  useOrders() / useCreateOrder()
Feature hooks (src/features/<x>/queries)
    ↓  fetchOrders()
Feature API (src/features/<x>/api)
    ↓  apiClient + ENDPOINTS
HTTP client (src/lib/api)
    ↓
Backend
```

App wiring: `src/lib/query` (`queryClient` + `AppQueryProvider`).

## Folder convention

```text
src/lib/
  api/
    client.js          # Axios instance + interceptors
    endpoints.js       # Path map
    errors.js          # getErrorMessage
    index.js
  query/
    queryClient.js
    AppQueryProvider.jsx
    index.js

src/features/<feature>/
  api/<feature>.api.js
  queries/
    <feature>.keys.js
    <feature>.queries.js
    <feature>.mutations.js
  index.js             # public barrel
```

Reference: **`orders`** — import from `@/features/orders`.

## Rules

1. Server state lives only in TanStack Query (form drafts may use local state).
2. Every `queryFn` forwards `signal`.
3. Every query uses a key factory — no inline key arrays in pages.
4. Mutations invalidate with `onSettled`, not `onSuccess`.
5. Dependent queries use `enabled: !!id`.
6. No `useEffect` + fetch for server data going forward.
7. Override `staleTime` only when the domain needs it, with a why-comment.

## Legacy (removed)

The old `src/api/` package (`crud.js`, `queryKeys.js`, `ApiState.jsx`, `queryState.js`, `examples.usage.js`) was deleted. Do not recreate it.

| Concern | Current location |
| ------- | ---------------- |
| HTTP client | `src/lib/api/client.js` |
| Endpoints | `src/lib/api/endpoints.js` |
| QueryClient / Provider | `src/lib/query/` |
| Feature keys/hooks | `src/features/<x>/` |
| Error message helper | `src/lib/api/errors.js` |

## Migration (page using mock/`useEffect`)

1. Confirm paths in `ENDPOINTS`.
2. Add `features/<x>/api/<x>.api.js` using `apiClient`.
3. Add key factory + query/mutation hooks.
4. Export from `features/<x>/index.js`.
5. In the page: `import { useOrders } from "@/features/orders"`.
6. Remove local fetch state; keep UI-only state.
7. Smoke-test with Devtools (`npm run dev`).

## Checklist

- [ ] Endpoints confirmed
- [ ] Feature api forwards `signal`
- [ ] Key factory hierarchical
- [ ] Mutations use `onSettled` + targeted keys
- [ ] Page uses hooks only
- [ ] Logout clears cache (`queryClient.clear`)
- [ ] Build + eslint clean for touched files

## Smoke test

1. Temporarily call `useOrders()` in a mounted component.
2. Devtools: one `['orders','list',…]` entry; re-render → no duplicate fetch while fresh.
3. Navigate away/back within 30s → no refetch.
4. `npm run build && npm run preview` → no Devtools UI.

## Follow-ups

- Real JWT + 401 handling in `client.js`
- Migrate admin Orders page onto `useOrders`
- Optimistic updates / infinite queries when backend contracts exist
