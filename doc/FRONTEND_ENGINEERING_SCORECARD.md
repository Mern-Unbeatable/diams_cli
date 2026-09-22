# Frontend Engineering Quality Scorecard

**Product:** NovaSky (`diams`)  
**Basis:** Evidence from codebase inspection and `FRONTEND_E2E_ANALYSIS.md`  
**Date:** 2026-09-22  
**Scope:** Engineering quality only — no code modifications  

---

## 1. Overall Engineering Score

```text
Overall Score: 5.6 / 10
```

**Derivation:** Arithmetic mean of the 20 category scores below  
`(8+7+7+6+6+6+7+6+5+7+4+4+5+3+1+7+5+7+6+5) / 20 = 112 / 20 = 5.6`

**Why this score (not higher / not lower):**

The frontend earns mid-range credit for a **clear SPA structure**, **consistent visual system**, **role-based routing**, **reusable dashboard primitives**, and a **well-designed (but unused) API layer**. It loses substantial points for **zero automated tests**, **JS-only / weak type safety**, **demo-grade auth security**, **thin error handling in real UI paths**, **mock-only data with no live API integration**, and **navigation/funnel inconsistencies** that indicate incomplete product engineering.

This is a **strong UI prototype with good scaffolding**, not yet a production-grade frontend engineering system.

---

## 2. Category Scores (Summary)

| Category               | Score / 10 |
| ---------------------- | ---------: |
| Project Structure      |       8/10 |
| Architecture           |       7/10 |
| Readability            |       7/10 |
| Maintainability        |       6/10 |
| Scalability            |       6/10 |
| Code Quality           |       6/10 |
| Reusability            |       7/10 |
| Separation of Concerns |       6/10 |
| State Management       |       5/10 |
| API Architecture       |       7/10 |
| Error Handling         |       4/10 |
| Security               |       4/10 |
| Performance            |       5/10 |
| Type Safety            |       3/10 |
| Testing                |       1/10 |
| UI/UX Consistency      |       7/10 |
| Accessibility          |       5/10 |
| Responsive Design      |       7/10 |
| Developer Experience   |       6/10 |
| Documentation          |       5/10 |
| **Overall**            |   **5.6/10** |

---

## 3. Score Distribution

```text
Project Structure       ████████░░  8.0
Architecture            ███████░░░  7.0
Readability             ███████░░░  7.0
Maintainability         ██████░░░░  6.0
Scalability             ██████░░░░  6.0
Code Quality            ██████░░░░  6.0
Reusability             ███████░░░  7.0
Separation of Concerns  ██████░░░░  6.0
State Management        █████░░░░░  5.0
API Architecture        ███████░░░  7.0
Error Handling          ████░░░░░░  4.0
Security                ████░░░░░░  4.0
Performance             █████░░░░░  5.0
Type Safety             ███░░░░░░░  3.0
Testing                 █░░░░░░░░░  1.0
UI/UX Consistency       ███████░░░  7.0
Accessibility           █████░░░░░  5.0
Responsive Design       ███████░░░  7.0
Developer Experience    ██████░░░░  6.0
Documentation           █████░░░░░  5.0
────────────────────────────────────
Overall                 █████░░░░░  5.6
```

---

## 4. Radar / Dimension Summary

| Dimension       | Score | Status     | Main Reason |
| --------------- | ----: | ---------- | ----------- |
| Structure       |  8/10 | Strong     | Clear `pages` / `config` / `Components` / `api` / `router` layout |
| Architecture    |  7/10 | Strong     | Sound provider + role routing; API/state incomplete in practice |
| Maintainability |  6/10 | Acceptable | Feature folders help; mock sprawl + large views + route/nav drift hurt |
| Security        |  4/10 | Weak       | Demo localStorage auth; client-only RBAC; payment fields decorative |
| Performance     |  5/10 | Acceptable | Fine for mock data; no lazy routes; unused deps |
| Testing         |  1/10 | Critical   | No unit/component/E2E tests or test scripts |
| API             |  7/10 | Strong     | Central endpoints/CRUD/Query scaffold; not wired to UI |
| Type safety     |  3/10 | Weak       | JS-only; Zod on a few forms only |
| A11y / UX eng.  |  5–7  | Mixed      | Visual consistency strong; modal a11y incomplete |

---

## 5. Category Detail

### Project Structure — 8/10

**Score:** 8/10

**Why:**  
A new developer can usually tell where pages, shared UI, content config, routing, and API scaffolding belong. Dashboard features are grouped by role (`admin` / `collaborator` / `user`). Minor naming/docs drift and a few thin placeholder pages keep it from 9+.

**Strengths:**
- Predictable top-level: `src/pages`, `src/Components`, `src/config`, `src/api`, `src/layout`, `src/router`, `src/context`
- Role-based dashboard folders mirror product IA
- Path alias `@` configured in `vite.config.js` and `jsconfig.json`

**Problems:**
- README describes outdated tree (`App.jsx`, `Assets/`, admin-only focus)
- Some collaborator routes exist as thin shells while rich modules live deeper
- `hooks/` is a stub re-export, not a real hooks layer yet

**Evidence:**
- `src/router/routes.jsx` — centralized route table
- `src/config/dashboard.js` — nav by role
- `src/api/*` — dedicated API folder
- `README.md` — structure section does not match repo

**What would make it 9–10:**
- Align README with actual folders
- Establish `hooks/queries` / `hooks/mutations` as the documented home for data access
- Resolve placeholder vs real collaborator modules consistently

---

### Architecture — 7/10

**Score:** 7/10

**Why:**  
Bootstrap layering is clean (`AppQueryProvider` → `AuthProvider` → `RouterProvider`). Guards and layouts form a coherent shell. The intended API architecture is good. Runtime architecture is still mostly “UI + local mock state,” so end-to-end layering is incomplete.

**Strengths:**
- Clear provider hierarchy in `src/main.jsx`
- Guest / Protected / Role route composition in `ProtectedRoute.jsx`
- Documented backend wiring path in `doc/BACKEND_INTEGRATION.md`

**Problems:**
- Pages do not use the API/Query layer
- Checkout has no shared funnel state/architecture
- Secondary allowlist in `DashboardLayout` can contradict router registration

**Evidence:**
- `src/main.jsx` L9–16
- `src/Components/dashboard/ProtectedRoute.jsx`
- `src/layout/DashboardLayout.jsx` L35–50 (nav allowlist)
- Grep: no page-level `useQuery` / `apiGet` consumers

**What would make it 9–10:**
- Wire features through hooks + `ApiStateGate`
- Single source of truth for route access (router vs allowlist)
- Checkout context or durable step state

---

### Readability — 7/10

**Score:** 7/10

**Why:**  
Naming is generally consistent (`*View`, `*Data.js`, config modules). Most screens are section-composed. Several 400–600 line admin builders reduce scanability.

**Strengths:**
- Config-driven copy keeps JSX thinner on marketing pages
- Shared class patterns for inputs/buttons recur
- Feature sections are usually named by UI responsibility

**Problems:**
- God-ish views: `CreateAddonView.jsx` (~614), `CreatePlanView.jsx` (~514), large `DataTable.jsx`
- Mixed form styles (RHF vs raw `useState`) force context-switching
- Few explanatory comments where funnel/auth intent is non-obvious

**Evidence:**
- `src/pages/dashboard/admin/addOns/sections/CreateAddonView.jsx`
- `src/pages/dashboard/admin/plans/sections/CreatePlanView.jsx`
- `src/Components/dashboard/DataTable.jsx`
- `src/lib/formSchemas.js` vs checkout `PersonalInfoFormSection.jsx`

**What would make it 9–10:**
- Split create/detail gods into field groups + hooks
- Standardize one form approach for new work
- Keep view files under a practical size budget

---

### Maintainability — 6/10

**Score:** 6/10

**Why:**  
Feature folders and shared chrome make many changes local. Drift between routes, nav, footer links, and checkout steps will create recurring fix cost. Replacing 21 `*Data.js` files without hooks discipline will be noisy.

**Strengths:**
- Content changes often isolated to `src/config/*`
- Shared `DataTable` / dashboard shell reduce copy-paste for tables
- API helpers already centralized for future migration

**Problems:**
- Route inventory vs `DASHBOARD_NAV` vs footer targets disagree
- Mock mutations live inside views (`AdminCustomerView.jsx` local `setCustomersList`)
- Dual validation stacks increase change surface

**Evidence:**
- `src/config/footer.js` links to `/esim`, `/about`, … (no routes)
- `src/config/configure.js` Review step vs payment → confirmation skip
- `src/pages/dashboard/admin/customer/AdminCustomerView.jsx`

**What would make it 9–10:**
- Single navigational source of truth
- Data access behind hooks; views become presentational
- Automated smoke tests around guards and funnel

---

### Scalability — 6/10

**Score:** 6/10

**Why:**  
**Code scalability:** Adding another admin module is straightforward by copying the feature folder pattern. **Runtime scalability:** Fine for small mock lists; no pagination/virtualization strategy, no route-level code splitting, Query cache unused.

**Strengths:**
- Role/feature folders scale with more developers if ownership is by area
- `createResourceApi` / `queryKeys` patterns can scale API surface

**Problems:**
- All routes statically imported in `routes.jsx` (bundle grows with every view)
- No list virtualization / server pagination patterns in UI
- Checkout deep-linking without state will not scale to real order objects

**Evidence:**
- `src/router/routes.jsx` — full static import list
- No `React.lazy` / `Suspense` usage
- Mock tables seeded from `*Data.js` (small datasets)

**What would make it 9–10:**
- Lazy-load public vs role dashboards
- Introduce list contracts (page/cursor) when API lands
- Shared checkout/order model

---

### Code Quality — 6/10

**Score:** 6/10

**Why:**  
Code is generally clean and consistent for a large JSX SPA. Quality is pulled down by dead paths, unused deps, silent mutations, and inconsistent enforcement of validation/error patterns—not by chaotic style.

**Strengths:**
- ESLint flat config with React Hooks rules (`eslint.config.js`)
- Little `console.log` noise (2 stub sites)
- Cohesive Tailwind token usage in `src/index.css`

**Problems:**
- Unreachable registered routes (allowlist)
- Unused packages (`chart.js`, `react-chartjs-2`, non-React `lucide`)
- Incomplete application of existing good abstractions (`ApiStateGate`)

**Evidence:**
- `package.json` dependencies vs recharts-only usage
- `AdminSupportView.jsx` / `AdminAddOnsView.jsx` console stubs
- `src/api/ApiState.jsx` unused by pages

**What would make it 9–10:**
- Delete or wire dead code/deps
- Enforce ApiState + schema validation on mutations
- Keep complexity budgets on view files

---

### Reusability — 7/10

**Score:** 7/10

**Why:**  
Meaningful shared primitives exist and are used. Some parallel components with the same name and duplicated modal shells show incomplete consolidation—not a failure of reuse intent.

**Strengths:**
- `DataTable`, `DashboardSidebar`, `DashboardHeader`, `CheckoutStepper`, `OrderSummary`
- `FieldError` for RHF
- Status badge helper `getStatusBadgeStyle`

**Problems:**
- Two different `NeedHelpCard` components (public vs user my-information)
- Modal overlay pattern duplicated without shared Dialog
- Placeholder `DashboardPageShell` tables vs rich custom modules

**Evidence:**
- `src/Components/dashboard/DataTable.jsx`
- `src/Components/public/NeedHelpCard.jsx`
- `src/pages/dashboard/user/my-information/components/NeedHelpCard.jsx`

**What would make it 9–10:**
- Shared accessible Dialog/Modal
- Deduplicate help widgets by props/variants
- Promote repeated filter bars into one primitive

---

### Separation of Concerns — 6/10

**Score:** 6/10

**Why:**  
Content config vs presentation is a real strength. Data access, business rules, and UI are still often collocated in views because the API layer is unused and mocks live beside UI.

**Strengths:**
- Marketing/checkout copy largely in `src/config`
- Auth isolated in `AuthContext` + `dummyAuth`
- API folder separated from UI

**Problems:**
- Filtering, status updates, and navigation orchestration inside page components
- Checkout business progression encoded as Links inside form sections
- Settings “API key” demo data mixed into UI settings model

**Evidence:**
- `AdminCustomerView.jsx` filter + mutate + navigate
- `PaymentFormSection.jsx` Link-based continue
- `settingsData.js` `apiKey: "sk_live_xxxxxxx"`

**What would make it 9–10:**
- Hooks own data/commands; views render
- Checkout orchestrator owns step transitions
- Keep secrets/config out of presentational mock objects

---

### State Management — 5/10

**Score:** 5/10

**Why:**  
Appropriate simplicity for a mock UI (Auth Context + local state). Inadequate as a product state architecture: Query mounted but idle; checkout state ephemeral; dashboard edits not durable.

**Strengths:**
- Single auth context with clear API (`login` / `logout` / `user`)
- Sidebar collapse persisted intentionally
- No premature Redux complexity

**Problems:**
- TanStack Query provider with zero feature queries
- No shared checkout/order state across steps
- In-memory list edits reset on refresh

**Evidence:**
- `src/context/AuthContext.jsx`
- `src/api/AppQueryProvider.jsx` + unused queries
- `ConfigureView.jsx` local `useState` only

**What would make it 9–10:**
- Server state via Query; client UI state kept local
- Checkout session store
- Clear invalidation rules documented and used

---

### API Architecture — 7/10

**Score:** 7/10

**Why:**  
The **designed** API layer scores well: Axios instance, interceptors hook, `ENDPOINTS`, CRUD helpers, error normalization, query keys, UI gate components, and a migration guide. It is not yet an **operating** architecture because pages do not consume it.

**Strengths:**
- `src/api/endpoints.js` central path map
- `src/api/crud.js` unwrap + `getErrorMessage`
- `doc/BACKEND_INTEGRATION.md` concrete patterns

**Problems:**
- No page/hook consumers
- `queryKeys` covers subset of endpoints
- Bearer token fields never populated by demo login

**Evidence:**
- `src/api/axiosInstance.js`, `endpoints.js`, `crud.js`, `queryKeys.js`, `ApiState.jsx`
- `AuthContext.jsx` stores `{email,name,role}` only

**What would make it 9–10:**
- Feature hooks for each major resource
- Complete key factory; typed parsers
- Auth login writes token; 401 path enabled

---

### Error Handling — 4/10

**Score:** 4/10

**Why:**  
Infrastructure for API errors exists but is unused. Most UI paths lack async error UX. Login is a positive exception.

**Strengths:**
- `getErrorMessage` covers network/timeout/envelope shapes
- `ApiError` / `ApiStateGate` ready
- Login shows `authError`

**Problems:**
- Dashboard mutations often silent or `console.log`
- Checkout continues without validation failures blocking navigation
- Empty catches only for storage parse (acceptable) but no broader logging strategy

**Evidence:**
- `src/api/crud.js` L6–27
- `AuthFormSection.jsx` auth error UI
- `AdminSupportView.jsx` reply `console.log`

**What would make it 9–10:**
- All mutations surface user-visible errors + retry
- Route/error boundaries for unexpected render failures
- Consistent toast/inline error pattern

---

### Security — 4/10

**Score:** 4/10

**Why:**  
Evaluated as engineering readiness for a real telecom product, not as “does the demo login work.” Demo auth is explicit and contained, which is honest—but the security engineering bar for production is not met.

**Confirmed Security Issue (demo architecture):**
- Sessions are forgeable client-side (`localStorage` JSON role)
- Demo passwords live in source and are shown in the login UI

**Potential Security Risk:**
- Planned JWT-in-`localStorage` (XSS-sensitive) per integration doc + Axios interceptor
- Uncontrolled card inputs if later posted to a backend
- 401 logout still commented out

**No Evidence of Issue:**
- No `dangerouslySetInnerHTML` usage found
- No real secrets in `.env.example` (only `VITE_API_BASE_URL`)

**Strengths:**
- Role guards exist as UI gates (`ProtectedRoute`, `RoleRoute`)
- Auth storage parse fails closed to logged-out

**Problems:**
- Client-only authorization assumptions
- Published demo credentials in UI
- Payment UI looks “secure” (PCI banners) without a processor

**Evidence:**
- `src/config/dummyAuth.js`
- `src/pages/auth/sections/AuthFormSection.jsx` (demo password display)
- `src/api/axiosInstance.js` (token + commented 401)
- `PaymentFormSection.jsx`

**What would make it 9–10:**
- Real auth + server RBAC; httpOnly cookies or hardened token strategy
- Remove demo credentials from production builds
- Hosted payment fields / PSP; never handle PAN in app state

---

### Performance — 5/10

**Score:** 5/10

**Why:**  
No measured production perf crisis in source; mock datasets are small. Engineering choices that affect future performance are mediocre: no lazy routes, unused chart/lenis weight, full Poppins range.

**Strengths:**
- Query defaults disable refetch-on-focus (good when used)
- Images are static imports/public assets—simple pipeline
- Tables not huge in mock data

**Problems:**
- Static import of entire route tree
- Unused `chart.js` / `react-chartjs-2` / unmounted Lenis
- No evidence of image optimization strategy

**Evidence:**
- `src/router/routes.jsx` imports
- `package.json` vs recharts-only usage
- `src/Components/utility/SmoothScroll.jsx` unused
- `index.html` Poppins 300–800

**What would make it 9–10:**
- Role/public lazy boundaries
- Dependency hygiene
- Measure LCP/TTI after API wiring; optimize with evidence

---

### Type Safety — 3/10

**Score:** 3/10

**Why:**  
JavaScript-only SPA with partial Zod at form edges. No PropTypes, no API response schemas in use, no TS.

**Strengths:**
- Zod schemas for login / password / ticket / account settings (`formSchemas.js`)
- jsconfig path alias helps imports

**Problems:**
- Zero `.ts`/`.tsx`
- Most forms and all mock entities untyped
- API unwrap returns implicit `any`-like JS values

**Evidence:**
- Project file types: `.js`/`.jsx` only
- `src/lib/formSchemas.js`
- `src/api/crud.js` `unwrap`

**What would make it 9–10:**
- TS (or Zod parsers) at API boundary first
- Shared entity types for Customer/Order/Ticket
- Strict lint for unsafe patterns

---

### Testing — 1/10

**Score:** 1/10

**Why:**  
No test runner scripts, no test files, no E2E harness. ESLint is the only automated quality gate.

**Strengths:**
- `npm run lint` exists

**Problems:**
- No Vitest/Jest/Playwright/Cypress
- Critical flows (guards, checkout, role allowlist) untested
- Refactors are high-risk by default

**Evidence:**
- `package.json` scripts: `dev`, `build`, `lint`, `preview` only
- Glob: zero `*.test.*` / `*.spec.*`

**What would make it 9–10:**
- Unit tests for auth/guards/schemas
- Component tests for DataTable actions
- Playwright smoke: login per role + checkout happy path

---

### UI/UX Consistency — 7/10

**Score:** 7/10

**Why:**  
Strong brand tokens and recurring dashboard/public patterns. Inconsistencies appear in forms, loading, and incomplete pages—not in random one-off styling chaos.

**Strengths:**
- `@theme` colors/fonts in `src/index.css`
- Shared checkout chrome and dashboard shell
- Status pill language via `getStatusBadgeStyle`

**Problems:**
- RHF screens vs raw checkout/admin modals feel different
- Stub pages (`UpcomingPage`, thin collaborator shells)
- README promises motion that is not mounted

**Evidence:**
- `src/index.css` `@theme`
- `NotificationsView.jsx` → `UpcomingPage`
- `SmoothScroll.jsx` unused; Framer absent from `package.json`

**What would make it 9–10:**
- One form + modal system
- Finish or remove stubs
- Align motion claims with implementation

---

### Accessibility — 5/10

**Score:** 5/10

**Why:**  
Some solid primitives (labels, FAQ `aria-expanded`, checkout nav label, password toggles). Overlay/dialog accessibility is systematically weak.

**Strengths:**
- Login labels/`htmlFor`/`aria-label` on password toggle
- `CheckoutStepper` `aria-label="Checkout progress"`
- Decorative heroes often `aria-hidden`

**Problems:**
- Modals lack `role="dialog"`, focus trap, Escape handling (pattern across admin/user)
- Error messages often not `role="alert"`
- Uneven icon-button labeling

**Evidence:**
- `CreatePlanModal.jsx` / `ReplyTicketModal.jsx` backdrop pattern
- Repo-wide absence of focus-trap / `aria-modal` dialog pattern

**What would make it 9–10:**
- Shared Dialog with focus management
- Keyboard coverage for custom `role="button"` widgets
- Audited contrast on muted navy text

---

### Responsive Design — 7/10

**Score:** 7/10

**Why:**  
Responsive intent is encoded consistently (mobile nav, sidebar drawer, checkout stepper mobile mode, grid breakpoints). Not a 9 without device QA evidence.

**Strengths:**
- `Navbar.jsx` mobile menu
- `DashboardLayout` / sidebar open state for small screens
- `CheckoutStepper` mobile scroll + step label

**Problems:**
- Dense admin tables likely need horizontal scroll on phones
- Very large create forms rely on stacking—verify field overflow
- Touch-target QA not evidenced in code alone

**Evidence:**
- `CheckoutStepper.jsx` `lg:hidden` / `hidden lg:flex`
- `DashboardSidebar.jsx` / header menu button
- Widespread `sm:` / `lg:` Tailwind usage

**What would make it 9–10:**
- Documented breakpoints + tested table strategies
- Consistent min touch sizes
- Visual regression on key funnels

---

### Developer Experience — 6/10

**Score:** 6/10

**Why:**  
Vite + alias + lint + API guide are solid. Missing tests, outdated README, and no formatter config weaken day-2 DX.

**Strengths:**
- Fast Vite toolchain
- `@` imports
- `doc/BACKEND_INTEGRATION.md` is actionable
- `.env.example` documents the one public env var

**Problems:**
- README inaccurate (App.jsx, Framer, Lenis “in use”, structure)
- No Prettier/editorconfig found
- No test command; hooks folder empty of real hooks

**Evidence:**
- `vite.config.js`, `package.json`, `README.md`, `doc/BACKEND_INTEGRATION.md`
- `src/hooks/index.js` comments-only convention

**What would make it 9–10:**
- Accurate README + contribution checklist
- Format-on-save standard
- Scaffold first query hook as the exemplar

---

### Documentation — 5/10

**Score:** 5/10

**Why:**  
Backend integration doc is a genuine asset. Primary README overclaims and misdescribes structure/stack details.

**Strengths:**
- `doc/BACKEND_INTEGRATION.md` matches `src/api` design
- Inline API comments explain intended usage
- `.env.example` clear

**Problems:**
- README lists Framer Motion (not installed), implies Lenis active, references `App.jsx`
- Structure diagram admin-centric / outdated paths
- No architecture doc for checkout/auth realities

**Evidence:**
- `README.md` tech stack + project structure sections
- `package.json` dependencies
- `src/main.jsx` (no App.jsx)

**What would make it 9–10:**
- Rewrite README to match code
- Short ADRs for auth mode (demo vs real) and checkout state
- Keep endpoint doc synced with backend

---

## 6. Top 10 Engineering Strengths

1. **Centralized routing** — `src/router/routes.jsx` is the single route inventory.  
2. **Role-aware dashboard IA** — `src/config/dashboard.js` + `RoleRoute` encode product roles clearly.  
3. **Config/content separation** — `src/config/*` keeps marketing/user copy out of many views.  
4. **API scaffolding quality** — `endpoints.js`, `crud.js`, `ApiState.jsx`, Query provider.  
5. **Actionable backend guide** — `doc/BACKEND_INTEGRATION.md`.  
6. **Reusable DataTable** — shared actions/status patterns in `Components/dashboard/DataTable.jsx`.  
7. **Checkout UI composition** — stepper/sidebar/summary components under `Components/public`.  
8. **Design tokens** — Tailwind v4 `@theme` in `src/index.css`.  
9. **Auth boundary isolation** — `AuthContext` + guards rather than ad-hoc checks everywhere.  
10. **Low debug noise** — essentially two intentional `console.log` stubs in admin flows.

---

## 7. Top 10 Engineering Weaknesses

### Critical

**Problem:** No automated tests  
**Impact:** Regressions in guards/funnel/auth are undetectable in CI  
**Evidence:** `package.json` scripts; zero test files  
**Recommended direction:** Add Vitest + Playwright smoke for login roles and checkout  

**Problem:** Demo auth treated like product security surface  
**Impact:** Client-forgeable roles; unsafe if deployed as “real” auth  
**Evidence:** `dummyAuth.js`, `AuthContext.jsx`, password display in `AuthFormSection.jsx`  
**Recommended direction:** Explicit demo mode + real token/session auth for non-demo builds  

### High

**Problem:** API layer unused by UI  
**Impact:** Dual maintenance (mocks + endpoints); integration risk later  
**Evidence:** No page `useQuery`/`apiGet` consumers  
**Recommended direction:** Migrate one vertical (e.g. customers) end-to-end as template  

**Problem:** Navigation / route / stepper drift  
**Impact:** 404s, blocked pages, incorrect funnel mental model  
**Evidence:** `footer.js`, `DashboardLayout` allowlist, `CHECKOUT_STEPS` vs payment Link  
**Recommended direction:** Generate nav from route metadata; fix Review step  

**Problem:** Checkout lacks durable state  
**Impact:** Cannot build real orders; back navigation loses choices  
**Evidence:** Local state in `ConfigureView.jsx`; Link-only transitions  
**Recommended direction:** Checkout context/session keyed by `planId`  

### Medium

**Problem:** Weak applied error handling  
**Impact:** Failed actions look successful  
**Evidence:** `console.log` replies; unused `ApiError`  
**Recommended direction:** Mandate mutation error UI  

**Problem:** Large multi-responsibility views  
**Impact:** Hard reviews/conflicts  
**Evidence:** `CreatePlanView.jsx`, `CreateAddonView.jsx`  
**Recommended direction:** Split by section + hook  

**Problem:** Partial type safety  
**Impact:** API shape bugs at integration time  
**Evidence:** JS-only; Zod limited to few forms  
**Recommended direction:** Zod/TS at API boundary  

### Low

**Problem:** Unused dependencies / dead SmoothScroll  
**Impact:** Bundle & confusion  
**Evidence:** `package.json`, `SmoothScroll.jsx` unused  
**Recommended direction:** Remove or mount intentionally  

**Problem:** Documentation drift  
**Impact:** Onboarding cost  
**Evidence:** `README.md` vs `main.jsx` / deps  
**Recommended direction:** Sync docs to code  

---

## 8. Maintainability Tests

### New Developer Test

> Could a new developer understand the project quickly?

**Score: 7/10**  
Folders and routes are discoverable; README inaccuracies and mock-vs-API duality slow trust.

### New Feature Test

> How difficult would it be to add a significant new feature?

**Score: 6/10**  
Copying an admin feature folder is easy. Doing it “the right way” (hooks + endpoints + keys) is documented but not exemplified in live code.

### Bug Fix Test

> How easy is it to locate and fix bugs?

**Score: 6/10**  
Feature paths are clear; god components and local mock mutations make root-cause tracing longer.

### Refactoring Test

> How safely can the codebase be refactored?

**Score: 4/10**  
Without tests, refactors of routing/auth/DataTable are high risk.

### Team Scaling Test

> Can multiple developers work without excessive conflicts?

**Score: 6/10**  
Role folders help parallel work; shared `DataTable` / `routes.jsx` / giant create views are conflict hotspots.

---

## 9. Production Readiness Score

```text
Production Readiness: 3.5 / 10
```

**Why:**  
UI polish and routing breadth look product-like, but production readiness requires reliable data, real authz, error recovery, tests, and safe payment/PII handling. Current evidence shows **mock data**, **demo auth**, **decorative payment**, **no tests**, and **unused API error paths**. Deployment tooling is basic Vite build only—fine as a static host start, insufficient as a complete production frontend system.

**Evidence anchors:** `dummyAuth.js`, unused `src/api` consumers, `PaymentFormSection.jsx`, empty test suite, broken public links.

---

## 10. Technical Debt

```text
Technical Debt Level: High
Technical Debt Score: 4 / 10
```

*(10 = very low debt; 1 = severe debt → 4 means substantial accumulated debt)*

**Major debt sources:**
1. Mock `*Data.js` + config datasets pending API replacement  
2. Unwired Query/API abstractions  
3. Route/nav/footer/stepper inconsistencies  
4. Zero test safety net  
5. Large create/detail views  
6. Unused dependencies and dead components  
7. README / marketing claims vs implementation  

---

## 11. Engineering Maturity

```text
Engineering Maturity: Prototype
```

**Explanation:**  
Despite large surface area and strong visual completion, the system’s data, auth, payment, testing, and observability characteristics match a **high-fidelity prototype / UI spike**. The API layer and integration doc show movement toward **Early Production**, but that maturity is not yet realized in feature code.

Not classified higher because: no tests, demo security, mock persistence, incomplete funnel integrity.

---

## 12. Biggest Score Reducers

- Zero automated testing (largest single drag on overall + production readiness)
- Demo-only authentication and client-only authorization assumptions
- API/Query architecture designed but not connected to pages
- Weak applied error handling on mutations and checkout
- Checkout funnel incomplete (missing Review, no shared state)
- Broken/blocked navigation targets (footer + allowlist mismatches)
- Minimal type safety (JS-only, Zod rarely applied)
- Oversized create/admin views increasing change risk
- Documentation drift reducing trustworthy onboarding
- Performance engineering gaps (no lazy routes; unused deps)

---

## 13. What Would Make This a 9/10?

Minimum meaningful improvements—not a rewrite.

### Architecture
| Current problem | Proposed change | Affected files | Benefit | Risk |
|-----------------|-----------------|----------------|---------|------|
| API unused | Ship 1–2 verticals via hooks + `ApiStateGate` | `src/hooks/**`, admin customer/orders, `*Data.js` | Proves architecture | Medium |
| Allowlist vs routes | Single access policy | `dashboard.js`, `DashboardLayout.jsx`, `routes.jsx` | Predictable IA | Low |
| Checkout ephemeral | Context/session + Review step decision | checkout views, `configure.js` | Real funnel | Medium |

### Maintainability
| Current problem | Proposed change | Affected files | Benefit | Risk |
|-----------------|-----------------|----------------|---------|------|
| God create views | Split sections + validation schemas | `CreatePlanView.jsx`, `CreateAddonView.jsx` | Easier reviews | Low |
| Dual forms | Standardize on RHF+Zod for new forms | `formSchemas.js`, checkout forms | Consistency | Low |

### Performance
| Current problem | Proposed change | Affected files | Benefit | Risk |
|-----------------|-----------------|----------------|---------|------|
| Monolithic route imports | Lazy load by role/public | `routes.jsx` | Smaller initial JS | Low |
| Unused deps | Remove chart.js stack / decide Lenis | `package.json`, `SmoothScroll.jsx` | Cleaner bundle | Low |

### Security
| Current problem | Proposed change | Affected files | Benefit | Risk |
|-----------------|-----------------|----------------|---------|------|
| Demo auth | Real login + token/session; hide demos in prod | `AuthContext`, `axiosInstance`, auth UI | Real trust boundary | Medium |
| Card fields | PSP hosted fields; demo watermark until then | `PaymentFormSection.jsx` | PCI posture | Medium |

### Testing
| Current problem | Proposed change | Affected files | Benefit | Risk |
|-----------------|-----------------|----------------|---------|------|
| No tests | Lint+unit+E2E smoke in CI | new tests, `package.json` | Safe change | Medium |

### UX
| Current problem | Proposed change | Affected files | Benefit | Risk |
|-----------------|-----------------|----------------|---------|------|
| Broken links / stubs | Fix targets or add pages; finish notifications | `footer.js`, hero/features, notifications | Trust | Low |
| Modal a11y | Shared Dialog | admin/user modals | WCAG | Low |

### Developer Experience
| Current problem | Proposed change | Affected files | Benefit | Risk |
|-----------------|-----------------|----------------|---------|------|
| README drift | Rewrite to match code | `README.md` | Faster onboarding | Low |
| Empty hooks layer | Add exemplar query/mutation | `src/hooks/**` | Copy-paste correctness | Low |

---

## 14. Final Engineering Scorecard

| Category | Score |
|---|---:|
| Project Structure | 8/10 |
| Architecture | 7/10 |
| Readability | 7/10 |
| Maintainability | 6/10 |
| Scalability | 6/10 |
| Code Quality | 6/10 |
| Reusability | 7/10 |
| Separation of Concerns | 6/10 |
| State Management | 5/10 |
| API Architecture | 7/10 |
| Error Handling | 4/10 |
| Security | 4/10 |
| Performance | 5/10 |
| Type Safety | 3/10 |
| Testing | 1/10 |
| UI/UX | 7/10 |
| Accessibility | 5/10 |
| Responsive Design | 7/10 |
| Developer Experience | 6/10 |
| Documentation | 5/10 |
| **Overall** | **5.6/10** |

```text
Production Readiness: 3.5/10
Technical Debt: 4/10  (High debt level)
Engineering Maturity: Prototype
```

---

## 15. One-Line Verdict

> **Engineering quality is an acceptable mid-tier prototype shell (5.6/10): strong structure and UI scaffolding, weak production hardening—especially testing, security, live API integration, and applied error handling.**

A senior engineer should treat this as a **high-quality UI foundation ready for disciplined backend wiring and hardening**, not as a finished production frontend.
