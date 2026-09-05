import {
  Users,
  Zap,
  Clock,
  CreditCard,
  TrendingUp,
  FileText,
  Plus,
  Radio,
  Sparkles,
  DollarSign,
} from "lucide-react";

// 1. Top 6 Metric Cards Data
export const COLLABORATOR_STAT_CARDS = [
  {
    id: "total-customers",
    title: "Total Customers",
    value: "24",
    icon: Users,
    iconBg: "bg-sky-50 text-sky-500",
    path: "/dashboard/collaborator/customers",
  },
  {
    id: "active-lines",
    title: "Active Lines",
    value: "12",
    icon: Zap,
    iconBg: "bg-emerald-50 text-emerald-500",
    path: "/dashboard/collaborator/activations",
  },
  {
    id: "pending-activations",
    title: "Pending Activations",
    value: "12",
    icon: Clock,
    iconBg: "bg-amber-50 text-amber-500",
    path: "/dashboard/collaborator/activations",
  },
  {
    id: "total-earnings",
    title: "Total Earnings",
    value: "CHF 185.00",
    icon: CreditCard,
    iconBg: "bg-slate-100 text-slate-600",
    path: "/dashboard/collaborator/commissions",
  },
  {
    id: "month-commission",
    title: "Current Month Commission",
    value: "CHF 135.00",
    icon: TrendingUp,
    iconBg: "bg-cyan-50 text-cyan-600",
    path: "/dashboard/collaborator/commissions",
  },
  {
    id: "pending-commission",
    title: "Pending Commission",
    value: "CHF 395.00",
    icon: FileText,
    iconBg: "bg-amber-50 text-amber-600",
    path: "/dashboard/collaborator/commissions",
  },
];

// 2. Quick Actions Data
export const COLLABORATOR_QUICK_ACTIONS = [
  {
    id: "register-customer",
    label: "Register Customer",
    icon: Plus,
    isPrimary: true,
    href: "/dashboard/collaborator/customers/register",
  },
  {
    id: "order-sim",
    label: "Order SIM/eSIM",
    icon: Radio,
    isPrimary: false,
    href: "/dashboard/collaborator/orders",
  },
  {
    id: "start-activation",
    label: "Start Activation",
    icon: Sparkles,
    isPrimary: false,
    href: "/dashboard/collaborator/orders",
  },
  {
    id: "view-customers",
    label: "View Customers",
    icon: Users,
    isPrimary: false,
    href: "/dashboard/collaborator/customers",
  },
  {
    id: "view-earnings",
    label: "View Earnings",
    icon: DollarSign,
    isPrimary: false,
    href: "/dashboard/collaborator",
  },
];

// 3. Monthly Revenue Chart Data
export const COLLABORATOR_REVENUE_DATA = [
  { month: "Jan", fullMonth: "January", value: 16, displayVal: "$1,600.00" },
  { month: "Feb", fullMonth: "February", value: 20, displayVal: "$2,000.00" },
  { month: "Mar", fullMonth: "March", value: 18, displayVal: "$1,800.00" },
  { month: "Apr", fullMonth: "April", value: 25, displayVal: "$2,500.00" },
  { month: "May", fullMonth: "May", value: 31, displayVal: "$3,100.00" },
  { month: "Jun", fullMonth: "June", value: 28, displayVal: "$2,800.00" },
  { month: "Jul", fullMonth: "July", value: 36, displayVal: "$5600.00" },
  { month: "Aug", fullMonth: "August", value: 29, displayVal: "$2,900.00" },
  { month: "Sep", fullMonth: "September", value: 37, displayVal: "$3,700.00" },
  { month: "Oct", fullMonth: "October", value: 43, displayVal: "$4,300.00" },
  { month: "Nov", fullMonth: "November", value: 40, displayVal: "$4,000.00" },
  { month: "Dec", fullMonth: "December", value: 45, displayVal: "$4,500.00" },
];

// 4. Recent Customers Data
export const COLLABORATOR_RECENT_CUSTOMERS = [
  {
    id: "cust-1",
    name: "John Smith",
    email: "john.smith@email.com",
    plan: "NovaSky Plus",
    simType: "eSIM",
    status: "Active",
    registered: "Aug 12, 2026",
  },
  {
    id: "cust-2",
    name: "Anna Müller",
    email: "anna.mueller@email.com",
    plan: "NovaSky Max",
    simType: "Physical SIM",
    status: "Active",
    registered: "Aug 10, 2026",
  },
  {
    id: "cust-3",
    name: "Marco Rossi",
    email: "marco.rossi@email.com",
    plan: "NovaSky One",
    simType: "eSIM",
    status: "Pending",
    registered: "Aug 13, 2026",
  },
  {
    id: "cust-4",
    name: "Sophie Bernard",
    email: "sophie.bernard@email.com",
    plan: "NovaSky Plus",
    simType: "Physical SIM",
    status: "Processing",
    registered: "Aug 14, 2026",
  },
  {
    id: "cust-5",
    name: "Thomas Weber",
    email: "t.weber@email.com",
    plan: "NovaSky Max",
    simType: "eSIM",
    status: "Active",
    registered: "Aug 8, 2026",
  },
];

// 5. Recent Activations Data
export const COLLABORATOR_RECENT_ACTIVATIONS = [
  {
    id: "act-1",
    name: "John Smith",
    plan: "NovaSky Plus",
    simType: "eSIM",
    status: "Active",
    date: "Aug 12, 2026",
    action: "View",
  },
  {
    id: "act-2",
    name: "Anna Müller",
    plan: "NovaSky Max",
    simType: "Physical SIM",
    status: "Active",
    date: "Aug 10, 2026",
    action: "View",
  },
  {
    id: "act-3",
    name: "Marco Rossi",
    plan: "NovaSky One",
    simType: "eSIM",
    status: "Pending",
    date: "—",
    action: "View",
  },
  {
    id: "act-4",
    name: "Sophie Bernard",
    plan: "NovaSky Plus",
    simType: "Physical SIM",
    status: "Processing",
    date: "Aug 14, 2026",
    action: "View",
  },
];
