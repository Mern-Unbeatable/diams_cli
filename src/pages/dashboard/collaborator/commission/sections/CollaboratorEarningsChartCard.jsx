import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ReferenceDot,
} from "recharts";
import { COMMISSIONS_CHART_DATA } from "./collaboratorCommissionData";

const CHART_DATA = [
  { month: "Jan", revenue: 16000, fullMonth: "January", displayVal: "$1600.00" },
  { month: "Feb", revenue: 20000, fullMonth: "February", displayVal: "$2000.00" },
  { month: "Mar", revenue: 18000, fullMonth: "March", displayVal: "$1800.00" },
  { month: "Apr", revenue: 26000, fullMonth: "April", displayVal: "$2600.00" },
  { month: "May", revenue: 32000, fullMonth: "May", displayVal: "$3200.00" },
  { month: "Jun", revenue: 35600, fullMonth: "June", displayVal: "$5600.00" },
  { month: "Jul", revenue: 38000, fullMonth: "July", displayVal: "$5600.00" },
  { month: "Aug", revenue: 31000, fullMonth: "August", displayVal: "$3100.00" },
  { month: "Sep", revenue: 37000, fullMonth: "September", displayVal: "$3700.00" },
  { month: "Oct", revenue: 42000, fullMonth: "October", displayVal: "$4200.00" },
  { month: "Nov", revenue: 41000, fullMonth: "November", displayVal: "$4100.00" },
  { month: "Dec", revenue: 46000, fullMonth: "December", displayVal: "$4600.00" },
];

// Custom Tooltip on Hover
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload;
    return (
      <div className="pointer-events-none relative flex flex-col items-center drop-shadow-md">
        <div className="min-w-20 rounded-xl border border-slate-100 bg-white px-3.5 py-1.5 text-center shadow-sm">
          <span className="block text-[10px] font-medium leading-tight text-slate-400">
            {item.fullMonth || label}
          </span>
          <span className="block text-xs font-bold leading-snug tracking-tight text-[#0284c7] sm:text-sm">
            {item.displayVal}
          </span>
        </div>
        <div className="-mt-1 h-2 w-2 rotate-45 border-r border-b border-slate-100 bg-white shadow-sm" />
      </div>
    );
  }
  return null;
};

// Static Floating Badge Component for July
const StaticFloatingBadge = ({ cx, cy, label = "July", value = "$5600.00" }) => {
  if (typeof cx !== "number" || typeof cy !== "number") return null;
  const boxWidth = 84;
  const boxHeight = 42;
  const x = cx - boxWidth / 2;
  const y = cy - boxHeight - 12;

  return (
    <g className="pointer-events-none transition-opacity duration-200">
      <circle cx={cx} cy={cy} r={7} fill="rgba(56, 189, 248, 0.25)" />
      <circle
        cx={cx}
        cy={cy}
        r={4.5}
        fill="#ffffff"
        stroke="#0284c7"
        strokeWidth={2.5}
      />
      <rect
        x={x}
        y={y}
        width={boxWidth}
        height={boxHeight}
        rx={8}
        ry={8}
        fill="#ffffff"
        stroke="rgba(226, 232, 240, 0.9)"
        strokeWidth={1}
        filter="drop-shadow(0 4px 10px rgba(14, 165, 233, 0.12))"
      />
      <polygon
        points={`${cx - 4},${y + boxHeight - 0.5} ${cx},${y + boxHeight + 4} ${cx + 4},${y + boxHeight - 0.5}`}
        fill="#ffffff"
        stroke="rgba(226, 232, 240, 0.9)"
        strokeWidth={1}
      />
      <text
        x={cx}
        y={y + 14}
        textAnchor="middle"
        fill="#64748b"
        fontSize={10}
        fontWeight={500}
        fontFamily="Inter, system-ui, sans-serif"
      >
        {label}
      </text>
      <text
        x={cx}
        y={y + 31}
        textAnchor="middle"
        fill="#0284c7"
        fontSize={13}
        fontWeight={700}
        fontFamily="Inter, system-ui, sans-serif"
      >
        {value}
      </text>
    </g>
  );
};

const CollaboratorEarningsChartCard = () => {
  const [period, setPeriod] = useState("This year");
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="space-y-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] sm:p-8">
      {/* Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold tracking-tight text-[#0b1736] sm:text-lg">
            Earnings Over Time
          </h2>
          <p className="mt-0.5 text-xs text-slate-400">
            Paid invoice revenue by selected period.
          </p>
        </div>

        {/* Period Dropdown */}
        <div className="relative">
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="appearance-none rounded-xl border border-slate-200 bg-white py-1.5 pl-3.5 pr-8 text-xs font-medium text-slate-700 outline-none transition-colors hover:border-slate-300 focus:border-sky-500 cursor-pointer shadow-2xs"
          >
            <option value="This year">This year</option>
            <option value="Last year">Last year</option>
            <option value="All time">All time</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* Big Value Display */}
      <div>
        <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
          CHF 4444275.00
        </div>
        <p className="mt-0.5 text-xs font-medium text-slate-400">
          Total Earnings
        </p>
      </div>

      {/* Chart Area */}
      <div
        className="h-64 sm:h-72 w-full select-none"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={CHART_DATA}
            margin={{ top: 40, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="commissionsBlueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.35} />
                <stop offset="50%" stopColor="#60a5fa" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#93c5fd" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#64748b",
                fontSize: 11,
                fontFamily: "Inter, system-ui, sans-serif",
              }}
              dy={8}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              ticks={[0, 15000, 30000, 45000, 60000]}
              domain={[0, 60000]}
              tickFormatter={(v) => (v === 0 ? "$0k" : `$${v / 1000}k`)}
              tick={{
                fill: "#94a3b8",
                fontSize: 11,
                fontFamily: "Inter, system-ui, sans-serif",
              }}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#38bdf8",
                strokeWidth: 1.5,
                strokeDasharray: "4 4",
              }}
            />

            {/* July Vertical Dashed Reference Line */}
            <ReferenceLine
              x="Jun"
              stroke="#38bdf8"
              strokeDasharray="3 3"
              strokeWidth={1.5}
            />

            {/* Static Floating Badge on July */}
            {!isHovering && (
              <ReferenceDot
                x="Jun"
                y={35600}
                r={0}
                shape={<StaticFloatingBadge label="July" value="$5600.00" />}
              />
            )}

            <Area
              type="natural"
              dataKey="revenue"
              stroke="#38bdf8"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#commissionsBlueGradient)"
              activeDot={{
                r: 5,
                fill: "#0284c7",
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CollaboratorEarningsChartCard;
