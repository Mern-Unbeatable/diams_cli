# ROLE

You are a senior backend architect + implementer. Build the production-grade backend for **NovaSky**, a telecom / eSIM portal with a public marketing + checkout funnel and three role dashboards (admin, collaborator, user).

# CONTEXT — FRONTEND REALITY (verified from FRONTEND_E2E_ANALYSIS.md)

The frontend is a Vite 7 + React 19 JavaScript SPA that is **UI-complete but demo-driven**:

- **Auth today is fake:** `AuthContext` + `DUMMY_USERS` + `localStorage` key `novasky_auth`. Session shape = `{ email, name, role }`. NO token issued. Passwords checked client-side.
- **RBAC is client-only:** `ProtectedRoute`, `RoleRoute`, `DashLayout` nav allowlist. Not a security boundary.
- **Payment UI is decorative:** uncontrolled card inputs, CTA is a plain `Link` to confirmation. NOT a PSP.
- **Data is mock/local:** pages consume `@/config/*` and co-located `*Data.js`. A full TanStack Query feature scaffold exists (~33 domains, ~195 files under `src/features/`) but pages DO NOT call the hooks yet.
- **HTTP layer already prepared (frontend side):**
  - `src/lib/api/client.js` — Axios instance, `baseURL = import.meta.env.VITE_API_BASE_URL`, 30s timeout, JSON
  - `src/lib/api/interceptors.js` — attaches `Authorization: Bearer <token>` if `token || accessToken` present in session; **401 handling is a no-op stub (must be completed on the frontend side, but backend must return proper 401)**
  - `src/lib/api/endpoints.js` — central endpoint map (treat as the **authoritative contract surface**)
  - `src/lib/api/mock.js` — mock helpers (`delay`, filters, `findById`); toggle via `VITE_USE_API_MOCKS` (default ON)
- **Query defaults expected by frontend:** `staleTime 60s`, `gcTime 5min`, `refetchOnWindowFocus false`, query `retry <2` (skip 401/403/404), mutation `retry 0`.
- **Session helpers:** `src/lib/auth/session.js` reads `token || accessToken`.
- **Roles:** exactly three — `admin`, `collaborator`, `user`.
- **Route surface that MUST be backed** (from the frontend route tree):
  - `/auth/login`, `/auth/me`, `/auth/logout` (feature `features/auth`)
  - Public: plans catalog, plan detail, add-ons, checkout funnel (personal-info, verification, payment, confirmation, activation)
  - Admin: customers, orders, identity, plans, addOns, esim, billing, support, notifications, users, reports, settings, auditLogs
  - Collaborator: customers, orders, activations, commissions, invoices, notifications, profile, identity, plans, support
  - User: overview, usage, bills, payments, esim, support, notifications, my-information, security, plans-options
- **Validation:** Zod schemas exist on frontend at `lib/validation/common.schemas.js`, `features/auth/validation/login.schema.js`, `features/dash/user/support/validation/ticket.schema.js`, `lib/validation/change-password.schema.js`, `features/dash/collaborator/profile/validation/*`. **Backend must mirror these rules** (they are the current source of truth for field shape).

# NON-NEGOTIABLE REQUIREMENTS

1. **Do NOT copy the frontend demo auth model.** Replace with real auth:
   - Passwords hashed with **argon2id** (preferred) or bcrypt cost ≥ 12.
   - Access token = **short-lived JWT (≤ 15 min)** in httpOnly, Secure, SameSite=Lax cookie (preferred) OR Authorization header — but pick ONE and document it. Frontend already supports `Bearer` header, so Bearer is acceptable for v1 with the caveat documented.
   - Refresh token = opaque, rotating, stored hashed in DB, revocable, httpOnly cookie.
   - Rate-limit login. Lockout after N failed attempts.
   - Logout must **invalidate the refresh token server-side** (frontend calls `queryClient.clear()` on logout — backend must kill the session).

2. **RBAC must be enforced server-side on every protected route.** Client guards are UX only. Use role + resource-ownership checks. Three roles: `admin`, `collaborator`, `user`.
   - Admin: full tenant scope.
   - Collaborator: scoped to their own customers/orders/activations/commissions — **never** global.
   - User: scoped to `self` only (own line, bills, usage, tickets, esim).
   - Return **403** (not 404) only when the user is authenticated but forbidden; return **404** when the resource doesn't exist OR the user must not know it exists (choose per resource, document the choice).

3. **Payment must be PSP-hosted.** Never accept raw PAN/CVV on your API. Use Stripe (PaymentIntents + Elements) or equivalent. Backend responsibilities:
   - Create PaymentIntent / SetupIntent
   - Receive + verify webhook signatures
   - Idempotency keys on all payment mutations
   - Never log card data
   - Return only `client_secret` + status to frontend

4. **All list endpoints must support** the shape the frontend `DataTable` + TanStack Query expects:
   - Query params: `page`, `pageSize`, `q`, `sort`, `order`, plus per-domain filters
   - Response: `{ data: [...], meta: { page, pageSize, total, totalPages } }`
   - 404 on missing detail resources (frontend skips retry on 404)
   - 401 on unauthenticated (frontend will logout + redirect after interceptor is finished)
   - 403 on forbidden (frontend shows "Access denied" toast)
   - 429 on rate limit (frontend shows warning toast)
   - 422 with `{ errors: { field: [msg] } }` for validation — frontend maps to RHF field errors

5. **Error envelope (consistent everywhere):**

   ```json
   {
     "error": {
       "code": "STRING_CODE",
       "message": "human readable",
       "details": {},
       "requestId": "uuid"
     }
   }
   ```

   Success responses return the resource directly (not wrapped), except lists which use `{ data, meta }`.

6. **Environment parity with frontend:**
   - Backend must be reachable at `VITE_API_BASE_URL` (frontend env var).
   - CORS allowlist must include the frontend origin(s) for dev + prod.
   - Cookies (if used) require `credentials: true` in CORS.

7. **Observability + safety baseline:**
   - Structured JSON logs with `requestId` propagated to error envelope.
   - Health check `GET /health` and readiness `GET /ready`.
   - No stack traces in production responses.
   - Secrets via env only. `.env.example` committed.

# STACK

Node.js + TypeScript + Express + PostgreSQL + Prisma + Zod for request validation (mirrors frontend Zod), stripe, sessions/rate-limit, Helmete.

# Recommended middleware flow

Request
↓
Request ID
↓
Logger
↓
Helmet
↓
CORS
↓
Body Parser
↓
Rate Limiter
↓
Authentication
↓
Authorization
↓
Validation
↓
Route
↓
Controller
↓
Service
↓
Repository
↓
Database
↓
Response
↓
Central Error Handler

```
logger/
├── logger.ts
├── http-logger.ts
└── serializers.ts
```

Security layer

```
helmet
cors
rate-limit
input validation
authentication
authorization
secure cookies
request size limits
security headers
```

# API CONTRACT TO IMPLEMENT

Mirror `src/lib/api/endpoints.js` from the frontend exactly. For each endpoint below, produce: method, path, auth requirement, role requirement, request schema (Zod), response schema, status codes, and error codes.

## Auth

- `POST /auth/login` — body `{ email, password, rememberMe? }` → sets refresh cookie, returns `{ user, accessToken, expiresIn }`
- `POST /auth/logout` — invalidates refresh token, clears cookie
- `POST /auth/refresh` — rotates refresh token, returns new access token
- `GET  /auth/me` — returns current user `{ id, email, name, role, ... }`

## Public (no auth)

- `GET  /public/plans` — catalog
- `GET  /public/plans/:planId`
- `GET  /public/add-ons`
- `POST /public/checkout/session` — creates a checkout session (server-side state; fixes the frontend's "no funnel persistence" gap)
- `PATCH /public/checkout/session/:id` — step data (personal-info, verification)
- `POST /public/checkout/session/:id/payment-intent` — returns PSP `client_secret`
- `POST /public/checkout/session/:id/confirm` — finalizes order; idempotent
- `GET  /public/checkout/session/:id` — resume funnel
- `POST /webhooks/psp` — PSP webhook (signature-verified, idempotent)

## Admin (role: admin)

`GET/POST/PATCH/DELETE` for: `customers`, `orders`, `identity`, `plans`, `add-ons`, `esim`, `billing`, `support`, `notifications`, `users`, `settings`, `audit-logs`
`GET /admin/reports/*` (define sub-reports the frontend actually renders)

## Collaborator (role: collaborator, scoped)

`GET/POST/PATCH` for: `customers`, `orders`, `activations`, `commissions`, `invoices`, `notifications`, `profile`, `identity`, `plans`, `support`
**All queries auto-scoped to `collaboratorId = req.user.id`.**

## User (role: user, self only)

`GET` for: `overview`, `usage`, `bills`, `payments`, `esim`, `notifications`, `my-information`, `security`, `plans-options`
`POST` for: `support/tickets`, `payments`, `esim` (rename/delete), `security/change-password`

# DATA MODEL (minimum)

Design a normalized schema covering at least:

- `users` (id, email UNIQUE, password_hash, name, role ENUM, status, created_at, updated_at)
- `refresh_tokens` (id, user_id, token_hash, expires_at, revoked_at, user_agent, ip)
- `login_attempts` (email, ip, success, created_at) — for lockout
- `customers` (id, owner_user_id, collaborator_id, profile fields, KYC status)
- `plans`, `add_ons`, `plan_add_ons`
- `orders` (id, customer_id, plan_id, status, total, currency, psp_payment_intent_id)
- `order_items`
- `esims` (id, order_id, iccid, status, activated_at)
- `bills`, `payments` (id, order_id|bill_id, amount, currency, psp_ref, status)
- `usage_records` (esim_id, period, data_used, voice_used, sms_used)
- `support_tickets`, `support_messages`
- `notifications` (user_id, type, payload JSONB, read_at)
- `audit_logs` (actor_id, action, resource, resource_id, before, after, ip, request_id)
- `commissions` (collaborator_id, order_id, amount, status)
- `invoices`
- `activations`
- `identity_documents` (customer_id, type, status, file_ref) — store file refs, not blobs
- `checkout_sessions` (id, step, payload JSONB, expires_at)
- `idempotency_keys` (key, user_id, endpoint, response_hash, created_at)

Add indexes on: all FKs, `users.email`, `refresh_tokens.token_hash`, `orders.status`, `notifications (user_id, read_at)`, `audit_logs (resource, resource_id)`, `checkout_sessions.expires_at`.

# Pattern Stack (Concrete)

```
backend/
├── src/
│   ├── modules/              # ← feature-first (frontend er features/ er mirror)
│   │   ├── auth/
│   │   ├── public/plans/
│   │   ├── public/addOns/
│   │   ├── public/checkout/
│   │   ├── payments/
│   │   ├── dash/admin/customers/
│   │   ├── dash/admin/orders/
│   │   ├── ...
│   │   ├── dash/collaborator/customers/
│   │   ├── dash/user/support/
│   │   └── webhooks/
│   ├── shared/               # cross-cutting
│   │   ├── db/               # prisma client, migrations
│   │   ├── middleware/       # auth, rbac, validate, error, idempotency
│   │   ├── errors/           # AppError, error codes
│   │   ├── logger/
│   │   ├── config/           # env parsing (Zod)
│   │   └── queue/            # bullmq
│   ├── app.ts                # fastify/express/nest bootstrap
│   └── server.ts             # listen
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── tests/
│   ├── integration/
│   └── unit/
└── docker-compose.yml
```

# DELIVERABLES (in this exact order)

1. **DECISIONS.md** — stack choice + rationale, auth strategy (cookie vs bearer), 403-vs-404 policy per resource, pagination shape, error code registry.
2. **Folder structure** — feature-first, mirroring the frontend's `features/` domains so wiring is 1:1 later.
3. **Prisma schema** — full, with enums, relations, indexes.
4. **Migrations** — initial migration + seed script with at least: 1 admin, 1 collaborator, 1 user, 5 customers, 10 plans, 5 orders, 3 tickets, 3 bills, 2 esims. Seed must be idempotent.
5. **Auth module** — login, logout, refresh, me, rate-limit, lockout, password hash/verify, JWT signing, refresh rotation, logout invalidation.
6. **RBAC middleware** — `requireAuth`, `requireRole(...roles)`, `requireOwnership(resourceLoader)`. Show exactly how collaborator scoping is enforced in query layer (not just middleware).
7. **Domain modules** — one folder per feature from the route surface above. Each with: routes, controller, service, repository, Zod schemas, and tests.
8. **Payment module** — PaymentIntent creation, webhook handler (signature verify + idempotency + order state machine), refund endpoint stub.
9. **Checkout session module** — server-side funnel state so the frontend can drop its local-only checkout.
10. **Error envelope + global error handler** — matches the JSON shape above, includes `requestId`.
11. **OpenAPI 3.1 spec** generated from Zod schemas. Export as `openapi.json`.
12. **Tests** — integration tests (supertest / equivalent) for: login success/fail/lockout, refresh rotation, 401/403/404/422/429 envelopes, collaborator scoping (must NOT see another collaborator's customers), user self-scoping, checkout session lifecycle, payment webhook idempotency. Target ≥70% coverage on auth + RBAC + payments.
13. **Dockerfile + docker-compose.yml** — app + Postgres + Redis. `.env.example` with every var.
14. **README.md** — how to run, seed, test, and **how to point the frontend at it** (`VITE_API_BASE_URL`, `VITE_USE_API_MOCKS=false`), plus a "frontend wiring checklist" mapping each frontend feature folder → backend module.
15. **FRONTEND_WIRING.md** — explicit list of the frontend files that must change (from the audit's "Files Likely to Need Changes" section): `AuthContext.jsx`, `features/auth/**`, `lib/api/interceptors.js` (401 handler), all page `*Data.js` files, `PaymentFormSection.jsx`, checkout pages. This document is a handoff, not a code change.

# CONSTRAINTS

- TypeScript strict mode.
- No `any` in public interfaces.
- All request bodies validated with Zod (mirror frontend schemas field-for-field).
- All DB access through repository layer — no raw SQL in controllers.
- All mutating endpoints accept `Idempotency-Key` header (stored in `idempotency_keys`).
- No secrets in code. No `console.log` — use the logger.
- Never return `password_hash`, `token_hash`, or PAN.
- Every 4xx/5xx must include the error envelope with a stable `code` string.

# ACCEPTANCE CRITERIA

- [ ] `npm run dev` (or equivalent) boots API + DB + Redis via docker-compose
- [ ] `GET /health` and `GET /ready` return 200
- [ ] `POST /auth/login` with seeded admin returns access token + sets refresh cookie
- [ ] `GET /auth/me` with that token returns the user; without token returns 401 envelope
- [ ] Collaborator calling `GET /collaborator/customers` sees ONLY their own customers
- [ ] User calling `GET /admin/users` returns 403 envelope
- [ ] `GET /public/plans` returns `{ data, meta }` shape
- [ ] `POST /public/checkout/session` then `PATCH` then `POST .../payment-intent` works end-to-end against Stripe test mode
- [ ] Webhook replay with same event ID is a no-op (idempotent)
- [ ] All integration tests pass
- [ ] `openapi.json` validates against OpenAPI 3.1
- [ ] README documents flipping `VITE_USE_API_MOCKS=false` and the frontend boots against the backend

# OUTPUT FORMAT

Produce the deliverables in order, one section per heading, with full code blocks (not pseudocode) for: schema, auth module, RBAC middleware, one representative domain module (pick `support` — it exists in all three roles), payment module, webhook handler, error handler, OpenAPI generation, docker-compose, seed script, and the test suite for auth + RBAC + collaborator scoping. For the remaining domain modules, produce the file tree + Zod schemas + route signatures (full code optional, but every endpoint must have a schema).

Do not ask clarifying questions — make reasonable decisions, document them in DECISIONS.md, and proceed.
