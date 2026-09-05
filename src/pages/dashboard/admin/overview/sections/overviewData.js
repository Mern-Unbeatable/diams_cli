// 1. Top 8 Stat Cards Data
export const STAT_CARDS = [
  {
    id: "total-customers",
    title: "Total Customers",
    badge: "Customer base",
    badgeStyle: "bg-sky-50 text-sky-700 border-sky-100",
    value: "8",
    path: "/dashboard/admin/customer",
  },
  {
    id: "active-lines",
    title: "Active Lines",
    badge: "Live",
    badgeStyle: "bg-emerald-50 text-emerald-700 border-emerald-100",
    value: "4",
    path: "/dashboard/admin/customer",
  },
  {
    id: "pending-activations",
    title: "Pending Activations",
    badge: "Needs action",
    badgeStyle: "bg-amber-50 text-amber-700 border-amber-100",
    value: "3",
    path: "/dashboard/admin/identity",
  },
  {
    id: "active-esims",
    title: "Active eSIMs",
    badge: "Provisioned",
    badgeStyle: "bg-emerald-50 text-emerald-700 border-emerald-100",
    value: "4",
    path: "/dashboard/admin/esim",
  },
  {
    id: "monthly-revenue",
    title: "Monthly Revenue",
    badge: "Paid",
    badgeStyle: "bg-emerald-50 text-emerald-700 border-emerald-100",
    value: "CHF 328.70",
    path: "/dashboard/admin/billing",
  },
  {
    id: "new-customers",
    title: "New Customers - Last 30 Days",
    badge: "Growth",
    badgeStyle: "bg-sky-50 text-sky-700 border-sky-100",
    value: "3",
    path: "/dashboard/admin/customer",
  },
  {
    id: "open-tickets",
    title: "Open Support Tickets",
    badge: "Support",
    badgeStyle: "bg-amber-50 text-amber-700 border-amber-100",
    value: "3",
    path: "/dashboard/admin/support",
  },
  {
    id: "network-status",
    title: "Network Status",
    badge: "5G stable",
    badgeStyle: "bg-emerald-50 text-emerald-700 border-emerald-100",
    value: "Nominal",
    path: "/dashboard/admin/settings",
  },
];

// 2. Popular Plans Data
export const POPULAR_PLANS = [
  {
    name: "Novasky One",
    count: 245,
    percentage: 82,
    color: "#f97316", // Orange
  },
  {
    name: "Novasky Plus",
    count: 186,
    percentage: 62,
    color: "#0ea5e9", // Sky Blue
  },
  {
    name: "Novasky Max",
    count: 152,
    percentage: 50,
    color: "#f97316", // Orange
  },
];

// 3. Recent Activities Data
export const RECENT_ACTIVITIES = [
  {
    id: "act-1",
    title: "Registration",
    description: "Amina Rossi registered for Nova Start",
  },
  {
    id: "act-2",
    title: "Activation",
    description: "Lena Meier line activated successfully",
  },
  {
    id: "act-3",
    title: "Payment",
    description: "Invoice INV-9022 paid by Marco Keller",
  },
];

// 4. Monthly Chart Datasets
export const REVENUE_DATA = [
  { month: "Jan", fullMonth: "January", value: 17, displayVal: "$1,700.00" },
  { month: "Feb", fullMonth: "February", value: 21, displayVal: "$2,100.00" },
  { month: "Mar", fullMonth: "March", value: 19, displayVal: "$1,900.00" },
  { month: "Apr", fullMonth: "April", value: 28, displayVal: "$2,800.00" },
  { month: "May", fullMonth: "May", value: 30, displayVal: "$3,000.00" },
  { month: "Jun", fullMonth: "June", value: 27, displayVal: "$2,700.00" },
  { month: "Jul", fullMonth: "July", value: 36, displayVal: "$5600.00" },
  { month: "Aug", fullMonth: "August", value: 28, displayVal: "$2,800.00" },
  { month: "Sep", fullMonth: "September", value: 38, displayVal: "$3,800.00" },
  { month: "Oct", fullMonth: "October", value: 43, displayVal: "$4,300.00" },
  { month: "Nov", fullMonth: "November", value: 41, displayVal: "$4,100.00" },
  { month: "Dec", fullMonth: "December", value: 44, displayVal: "$4,400.00" },
];

export const GROWTH_DATA = [
  { month: "Jan", fullMonth: "January", value: 17, displayVal: "1,700" },
  { month: "Feb", fullMonth: "February", value: 22, displayVal: "2,200" },
  { month: "Mar", fullMonth: "March", value: 20, displayVal: "2,000" },
  { month: "Apr", fullMonth: "April", value: 29, displayVal: "2,900" },
  { month: "May", fullMonth: "May", value: 31, displayVal: "3,100" },
  { month: "Jun", fullMonth: "June", value: 28, displayVal: "2,800" },
  { month: "Jul", fullMonth: "July", value: 36, displayVal: "5600" },
  { month: "Aug", fullMonth: "August", value: 28, displayVal: "2,800" },
  { month: "Sep", fullMonth: "September", value: 38, displayVal: "3,800" },
  { month: "Oct", fullMonth: "October", value: 43, displayVal: "4,300" },
  { month: "Nov", fullMonth: "November", value: 41, displayVal: "4,100" },
  { month: "Dec", fullMonth: "December", value: 45, displayVal: "4,500" },
];

export const ACTIVATIONS_DATA = [
  { month: "Jan", fullMonth: "January", value: 15, displayVal: "150" },
  { month: "Feb", fullMonth: "February", value: 20, displayVal: "200" },
  { month: "Mar", fullMonth: "March", value: 19, displayVal: "190" },
  { month: "Apr", fullMonth: "April", value: 27, displayVal: "270" },
  { month: "May", fullMonth: "May", value: 30, displayVal: "300" },
  { month: "Jun", fullMonth: "June", value: 26, displayVal: "260" },
  { month: "Jul", fullMonth: "July", value: 36, displayVal: "200" },
  { month: "Aug", fullMonth: "August", value: 29, displayVal: "290" },
  { month: "Sep", fullMonth: "September", value: 37, displayVal: "370" },
  { month: "Oct", fullMonth: "October", value: 43, displayVal: "430" },
  { month: "Nov", fullMonth: "November", value: 41, displayVal: "410" },
  { month: "Dec", fullMonth: "December", value: 45, displayVal: "450" },
];
