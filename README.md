# NovaSky — Connect Higher

[![Live Demo](https://img.shields.io/badge/Live%20Demo-nova--sky.maktechgroup.tech-0284c7?style=for-the-badge&logo=vercel)](https://nova-sky.maktechgroup.tech/)
[![React 19](https://img.shields.io/badge/React-19-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![TanStack Query](https://img.shields.io/badge/TanStack%20Query-v5-FF4154?style=for-the-badge&logo=reactquery)](https://tanstack.com/query)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7-646cff?style=for-the-badge&logo=vite)](https://vitejs.dev/)

**NovaSky** is a telecommunications web platform: public marketing + checkout, and role-based dashboards for admin, collaborator, and end-user operations (eSIM, plans, billing, support).

**Live:** [https://nova-sky.maktechgroup.tech/](https://nova-sky.maktechgroup.tech/)

---

## Platform overview

### Public site
- Landing, plans, coverage, business, help, legal
- Checkout funnel (configure → personal info → verification → payment → confirmation → activation)

### Dashboards (`/dashboard/…`)
| Role | Path | Focus |
| :--- | :--- | :--- |
| **Admin** | `/dashboard/admin` | Customers, orders, KYC, plans/add-ons, eSIM, billing, support, notifications, reports, users, settings, audit logs |
| **Collaborator** | `/dashboard/collaborator` | Partner customers, orders, activations, commissions, invoices, profile |
| **User** | `/dashboard/user` | Overview, my line, usage, bills, payments, eSIM, support, security |

Demo login accounts live in `src/config/dummyAuth.js`.

---

## Tech stack

| Layer | Choice |
| :--- | :--- |
| UI | React 19, Tailwind CSS v4 |
| Routing | React Router 7 (`src/routes`) |
| Server state | TanStack Query v5 + Devtools (DEV only) |
| HTTP | Axios (`src/lib/api`) |
| Forms | react-hook-form + Zod (`src/lib/validation` + feature schemas) |
| Charts | Recharts / Chart.js |
| Build | Vite 7 |

---

## Architecture

```text
pages / Components     → UI only
features/              → domain API + Query hooks + mocks (+ feature validation)
lib/                   → shared infrastructure (api, provider, auth, storage, config, validation)
routes/                → path constants, guards, route modules
context/               → AuthProvider (session UI state)
config/                → UI copy / demo auth constants (not HTTP env)
```

**Data flow (intended):**

```text
Page → feature hook (useOrders, …)
     → feature api (mock or apiClient + ENDPOINTS)
     → lib/api
```

Feature layout and conventions: [`src/features/README.md`](src/features/README.md).

> **Note:** Feature Query hooks are scaffolded with demo mocks. Many screens still use page-local `*Data.js` until migrated.

---

## Getting started

### Prerequisites
- Node.js 18+
- npm

### Setup
```bash
git clone <repo-url>
cd diams
npm install
cp .env.example .env
npm run dev
```

App: [http://localhost:5173](http://localhost:5173)

### Scripts
```bash
npm run dev       # Vite dev server
npm run build     # production build
npm run preview   # preview dist/
npm run lint      # ESLint
```

### Environment

Copy `.env.example` → `.env`:

| Variable | Purpose |
| :--- | :--- |
| `VITE_API_BASE_URL` | Axios base URL (default `http://localhost:3000/api`) |
| `VITE_USE_API_MOCKS` | Feature APIs return demo mocks unless set to `false` |

Env reads are centralized in `src/lib/config/env.js`.

---

## Project structure

```text
src/
├── Components/
│   ├── common/              # Navbar, Footer, RouteFallback, …
│   ├── layout/              # PublicLayout, DashLayout
│   ├── navigation/          # public + dashboard Header/Sidebar
│   └── …                    # dashboard / public UI widgets
├── config/                  # Page copy, nav, dummyAuth
├── context/                 # AuthContext
├── features/                # Feature-based server state (see README inside)
│   ├── auth/
│   ├── public/              # plans, addOns
│   └── dash/
│       ├── admin/
│       ├── collaborator/
│       └── user/
├── lib/                     # Shared infrastructure
│   ├── api/                 # client, endpoints, interceptors, mock
│   ├── provider/            # QueryClient + AppQueryProvider
│   ├── auth/                # session / token helpers
│   ├── storage/             # localStorage helpers
│   ├── config/              # env
│   └── validation/          # shared Zod primitives + change-password
├── pages/                   # Route screens (public, auth, dashboard roles)
├── routes/                  # paths, guards, auth/public/dashboard modules
├── App.jsx
├── main.jsx
└── index.css
```

### Shared `lib` responsibilities

| Path | Role |
| :--- | :--- |
| `lib/api` | Axios client, interceptors, `ENDPOINTS`, mock helpers |
| `lib/provider` | TanStack `queryClient` + `AppQueryProvider` |
| `lib/auth` | Session/token helpers (not login UI) |
| `lib/storage` | Safe localStorage get/set/JSON |
| `lib/config` | Vite env (`apiBaseUrl`, `useApiMocks`) |
| `lib/validation` | Shared Zod fields + `changePasswordSchema` |

Feature-only schemas live under `features/.../validation/` (e.g. login, support ticket).

---

## Deployment

- **Live:** [https://nova-sky.maktechgroup.tech/](https://nova-sky.maktechgroup.tech/)

---

## License

Developed for NovaSky Telecommunications. All rights reserved.
