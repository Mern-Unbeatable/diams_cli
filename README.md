# 🛰️ NovaSky — Connect Higher

[![Live Demo](https://img.shields.io/badge/Live%20Demo-nova--sky.maktechgroup.tech-0284c7?style=for-the-badge&logo=vercel)](https://nova-sky.maktechgroup.tech/)
[![React 19](https://img.shields.io/badge/React-19.2.0-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-7.2.4-646cff?style=for-the-badge&logo=vite)](https://vitejs.dev/)

**NovaSky** is a next-generation telecommunications web platform and enterprise management dashboard tailored for eSIM provisioning, mobile cellular plans, international roaming, and high-performance telecom operations.

🌐 **Live URL:** [https://nova-sky.maktechgroup.tech/](https://nova-sky.maktechgroup.tech/)

---

## 🌟 Platform Overview

NovaSky delivers a customer-facing portal and a full-featured administrator workspace with real-time analytics, eSIM delivery workflows, automated billing, customer identity verification, and multi-channel support center management.

### 📱 Customer Portal Features
- **Modern Landing Experience:** High-converting hero layouts, smooth Lenis scrolling, interactive plan comparisons, and network coverage explorer.
- **Plans & Add-ons:** Comprehensive listing of prepaid, postpaid, family, and business lines.
- **Coverage & Network:** Country-by-country 5G roaming lookup and international packages.
- **Business Solutions:** Enterprise telecom offerings with dedicated line management.
- **Help Center & FAQ:** Knowledge base and self-service support documentation.
- **Responsive Navigation & Cart:** Seamless mobile and desktop experience with cart checkout.

---

## 🛠️ Enterprise Admin Dashboard Modules

The admin dashboard (`/dashboard/admin`) provides full lifecycle management across 11 core telecom operational modules:

| Module | Features & Capabilities |
| :--- | :--- |
| **📊 Overview** | 8 Real-time KPI stat cards, interactive Recharts telemetry charts (Revenue, Customer Growth, Activations), Recent Activity timeline, and Popular Plans distribution. |
| **👥 Customers** | Unified customer directory, line status, active subscription details, and profile inspection. |
| **📦 Orders** | Order processing queue, fulfillment tracking, and status filtering. |
| **🪪 Identity Verification** | Swiss/EU KYC workflow, document verification status, ID review modals, approval & rejection triggers. |
| **📋 Plans & Add-ons** | Plan catalog management, data/speed limits, pricing tiers, and service add-ons. |
| **📲 eSIM Management** | Live eSIM inventory, instant QR code provisioning, line suspension, and single-click profile reissuance. |
| **💳 Billing & Payments** | Financial revenue metrics, invoice generation modals, payment received receipts, and refund processing modals. |
| **🎧 Support Center** | Priority-coded ticket inbox (`High`, `Medium`, `Low`), conversational threads, reply modals, agent assignment, and audit-logged ticket closing. |
| **🔔 Notifications** | Multi-channel broadcast dispatch (Email, SMS, Push), audience targeting (`All Customers` / `Individual`), and detailed message preview modals. |
| **📈 Reports & Analytics** | Telecom analytics, interactive Recharts area charts, activation funnel statistics, and monthly performance benchmarks. |
| **🔐 Users & Permissions** | Team management, email invite card, and granular 12-module RBAC permission matrix modals. |
| **⚙️ System Settings** | Configuration cards with inline edit/save toggles for Company details, VAT & Currency, 4-Language localization, Email templates, 2FA security, API connections, and Payment gateway testing. |
| **📜 Audit Logs** | Comprehensive security audit trail, 4-column filter controls (Admin, Module, Action, Date), and detailed activity log inspection modals. |

---

## 💻 Tech Stack & Architecture

- **Frontend Core:** React 19.2.0, React DOM
- **Routing:** React Router v7.12.0
- **Styling:** Tailwind CSS v4 with custom dark & glassmorphism theme tokens
- **Typography:** Google Fonts Poppins (`weights 300-800`)
- **Data Visualization:** Recharts for smooth gradient area charts and telemetry
- **Icons:** Lucide React & React Icons
- **Motion & Experience:** Lenis smooth scrolling & Framer Motion transitions
- **Build Engine:** Vite 7.2.4

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/Mern-Unbeatable/diams_cli.git
cd diams_cli
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start development server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

### 4. Build for production
```bash
npm run build
```

### 5. Preview production build
```bash
npm run preview
```

---

## 📂 Project Structure

```
diams_cli/
├── public/                 # Static assets, logo, icons
├── src/
│   ├── Assets/             # Images, vector illustrations
│   ├── Components/         # Reusable UI components
│   │   ├── dashboard/      # Shared DataTable, PageShell, StatCards, Modals
│   │   └── home/           # Public portal sections & widgets
│   ├── layout/             # Main layout, Navbar, Footer, Dashboard Sidebar
│   ├── pages/
│   │   ├── dashboard/
│   │   │   └── admin/      # 11 Admin dashboard modules
│   │   │       ├── overview/
│   │   │       ├── customer/
│   │   │       ├── orders/
│   │   │       ├── identityVerification/
│   │   │       ├── plan/
│   │   │       ├── esim/
│   │   │       ├── billingPayment/
│   │   │       ├── supportCenter/
│   │   │       ├── notification/
│   │   │       ├── reports/
│   │   │       ├── usersPermission/
│   │   │       ├── systemsettings/
│   │   │       └── auditLogs/
│   │   └── home/           # Public pages (Home, Plans, Coverage, Business, Help)
│   ├── router/             # Centralized application routing (`routes.jsx`)
│   ├── context/            # Global application state & auth contexts
│   ├── App.jsx             # Main App root component
│   ├── index.css           # Tailwind CSS theme and base styles
│   └── main.jsx            # Application entry point
├── index.html              # HTML entry template with Poppins font preconnect
├── package.json            # Project manifest and scripts
├── vite.config.js          # Vite build configuration
└── README.md               # Project documentation
```

---

## 🔗 Deployment

- **Live Application:** [https://nova-sky.maktechgroup.tech/](https://nova-sky.maktechgroup.tech/)
- **Repository:** [https://github.com/Mern-Unbeatable/diams_cli](https://github.com/Mern-Unbeatable/diams_cli)

---

## 📄 License

This project is developed for NovaSky Telecommunications. All rights reserved.
