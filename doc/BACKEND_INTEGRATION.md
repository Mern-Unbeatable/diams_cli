# Backend Ready Hole — API Implementation Guide

Ei guide follow kore dummy data theke real API te switch korba.  
Stack: **Axios** + **TanStack Query** (Zustand lagbe na).

---

## 1. Folder structure (already set)

```
src/api/
  axiosInstance.js     → Axios instance + interceptors
  endpoints.js         → Sob endpoint ek file e
  crud.js              → apiGet / apiPost / apiPut / apiPatch / apiDelete
  queryClient.js       → QueryClient defaults
  AppQueryProvider.jsx → Provider (main.jsx e already wired)
  queryKeys.js         → Query key factory
  queryState.js        → Common loading / error flags
  ApiState.jsx         → ApiLoading / ApiError / ApiStateGate UI
  index.js             → Barrel export
  examples.usage.js    → Short code patterns
```

---

## 2. Environment setup

1. Project root e `.env` banau (`.env.example` theke copy):

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

2. Production e same variable hosting panel / CI te set korba.
3. `baseURL` change korle `src/api/axiosInstance.js` e auto apply hobe.

---

## 3. Endpoint add / update

Sob path `src/api/endpoints.js` e thakbe. Example:

```js
customers: {
  list: "/customers",
  detail: (id) => `/customers/${id}`,
  create: "/customers",
  update: (id) => `/customers/${id}`,
  remove: (id) => `/customers/${id}`,
},
```

Niyom:
- Path change → **sudhu** `endpoints.js` edit
- Component / hook e hardcode URL likhba na

---

## 4. Auth token (backend JWT ashar pore)

`axiosInstance.js` request interceptor e already:

```js
Authorization: `Bearer ${token}`
```

Backend ready hole:

1. Login API theke `token` (ba `accessToken`) paba
2. `AuthContext` e session save korba:

```js
localStorage.setItem(
  AUTH_STORAGE_KEY,
  JSON.stringify({
    email,
    name,
    role,
    token: data.accessToken, // ← real token
  }),
);
```

3. Interceptor auto header e pathabe  
4. `401` hole interceptor e logout / login redirect uncomment korba

---

## 5. Hooks folder banau (recommended)

```
src/hooks/
  queries/
    useCustomers.js
    useOrders.js
    useTickets.js
  mutations/
    useCreateCustomer.js
    useUpdateCustomer.js
```

Hook e API logic, page e sudhu UI.

---

## 6. List (GET) implement

```jsx
// src/hooks/queries/useCustomers.js
import { useQuery } from "@tanstack/react-query";
import { apiGet, ENDPOINTS, queryKeys, getQueryState } from "@/api";

export const useCustomers = (filters = {}) => {
  const query = useQuery({
    queryKey: queryKeys.customers.list(filters),
    queryFn: () =>
      apiGet(ENDPOINTS.customers.list, {
        params: filters, // ?page=1&status=active
      }),
  });

  return {
    ...query,
    ...getQueryState(query),
  };
};
```

Page e:

```jsx
import { useCustomers } from "@/hooks/queries/useCustomers";
import { ApiStateGate, getQueryState } from "@/api";

const CustomersPage = () => {
  const customersQuery = useCustomers({ page: 1 });

  return (
    <ApiStateGate
      state={getQueryState(customersQuery)}
      onRetry={customersQuery.refetch}
      emptyMessage="No customers found."
    >
      {(data) => <DataTable data={data} />}
    </ApiStateGate>
  );
};
```

Dummy `CUSTOMERS_DATA` / config file **remove** kore table te API `data` pathaba.

---

## 7. Detail (GET by id)

```jsx
export const useCustomer = (id) => {
  const query = useQuery({
    queryKey: queryKeys.customers.detail(id),
    queryFn: () => apiGet(ENDPOINTS.customers.detail(id)),
    enabled: Boolean(id), // id na thakle call hobe na
  });

  return { ...query, ...getQueryState(query) };
};
```

---

## 8. Create / Update / Delete (mutations)

```jsx
// src/hooks/mutations/useCreateCustomer.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPost, ENDPOINTS, queryKeys, getMutationState } from "@/api";

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload) => apiPost(ENDPOINTS.customers.create, payload),
    onSuccess: () => {
      // List auto refresh
      queryClient.invalidateQueries({
        queryKey: queryKeys.customers.all,
      });
    },
  });

  return { ...mutation, ...getMutationState(mutation) };
};
```

Update:

```jsx
mutationFn: ({ id, payload }) =>
  apiPut(ENDPOINTS.customers.update(id), payload),
```

Delete:

```jsx
mutationFn: (id) => apiDelete(ENDPOINTS.customers.remove(id)),
```

Page e:

```jsx
const createCustomer = useCreateCustomer();

const onSubmit = async (formData) => {
  try {
    await createCustomer.mutateAsync(formData);
    // toast / close modal
  } catch {
    // error: createCustomer.errorMessage
  }
};
```

---

## 9. Optional: resource factory

Same CRUD pattern onek resource e:

```js
import { createResourceApi, ENDPOINTS } from "@/api";

const customersApi = createResourceApi(ENDPOINTS.customers);

await customersApi.list({ params: { page: 1 } });
await customersApi.getById("123");
await customersApi.create(payload);
await customersApi.update("123", payload);
await customersApi.remove("123");
```

---

## 10. Loading & error (common)

```jsx
import { getQueryState, ApiLoading, ApiError, ApiStateGate } from "@/api";

const state = getQueryState(query);

// Option A — gate (recommended)
<ApiStateGate state={state} onRetry={query.refetch}>
  {(data) => <MyTable data={data} />}
</ApiStateGate>

// Option B — manual
if (state.isLoading) return <ApiLoading />;
if (state.isError) return <ApiError message={state.errorMessage} onRetry={query.refetch} />;
```

Mutation:

```jsx
const m = getMutationState(createCustomer);
// m.isLoading, m.isError, m.errorMessage
```

---

## 11. Response shape

`crud.js` auto unwrap kore:

- `{ data: ... }` → `data`
- `{ result: ... }` → `result`
- raw array/object → as-is

Backend jodi different envelope use kore (`{ success, payload }`), `crud.js` er `unwrap()` function e adjust korba — **ek jaygay**.

---

## 12. Migration checklist (per page)

1. `endpoints.js` e path thik ache kina check
2. `queryKeys.js` e key add (lagle)
3. `useXQuery` / `useXMutation` hook likho
4. Page theke dummy `import { XXX_DATA }` remove
5. `ApiStateGate` diye loading/error handle
6. Create/Update/Delete er pore `invalidateQueries`
7. Network tab e request/response verify
8. 401 / validation error message check

### Priority order (suggested)

1. Auth login (real token)
2. Admin Customers / Orders list
3. Support tickets
4. User eSIM / Payments
5. Collaborator commissions / orders

---

## 13. Do / Don’t

**Do**
- Endpoint sudhu `endpoints.js` e
- Data fetch sudhu TanStack Query hook diye
- Error message `getErrorMessage` diye
- List invalidate after mutation

**Don’t**
- Component e raw `axios.get(...)`
- Hardcoded full URL
- Dummy + API data ek sathe mix (switch clear rakho)
- Prottek page e alada loading spinner reinvent

---

## 14. Quick copy-paste template

```jsx
import { useQuery } from "@tanstack/react-query";
import {
  apiGet,
  ENDPOINTS,
  queryKeys,
  getQueryState,
  ApiStateGate,
} from "@/api";

export const useExampleList = (filters = {}) => {
  const query = useQuery({
    queryKey: queryKeys.customers.list(filters), // change key
    queryFn: () =>
      apiGet(ENDPOINTS.customers.list, { params: filters }), // change endpoint
  });
  return { ...query, ...getQueryState(query) };
};

// In page:
const listQuery = useExampleList({ page: 1 });

return (
  <ApiStateGate state={getQueryState(listQuery)} onRetry={listQuery.refetch}>
    {(data) => <DataTable data={data} />}
  </ApiStateGate>
);
```

---

## 15. Status

| Item | Status |
|------|--------|
| Axios instance | Ready |
| Endpoints map | Ready (placeholder paths) |
| CRUD helpers | Ready |
| TanStack Query provider | Wired in `main.jsx` |
| Common loading/error UI | Ready |
| Real hooks per feature | Backend ready hole add korba |
| Dummy UI data | Ekhono active — replace gradually |

Backend URL + real response shape confirm hole first page (Customers) diye start kora best.
