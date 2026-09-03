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

// Custom Tooltip on Mouse Hover
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
        {/* Pointer triangle */}
        <div className="-mt-1 h-2 w-2 rotate-45 border-r border-b border-slate-100 bg-white shadow-sm" />
      </div>
    );
  }
  return null;
};

// Static Floating Badge Component for July when idle (not hovering)
const StaticFloatingBadge = ({ cx, cy, label = "July", value = "$5600.00" }) => {
  if (typeof cx !== "number" || typeof cy !== "number") return null;
  const boxWidth = 84;
  const boxHeight = 42;
  const x = cx - boxWidth / 2;
  const y = cy - boxHeight - 12;

  return (
    <g className="pointer-events-none transition-opacity duration-200">
      {/* Outer Halo */}
      <circle cx={cx} cy={cy} r={7} fill="rgba(56, 189, 248, 0.25)" />
      {/* Inner White Dot with Blue Stroke */}
      <circle
        cx={cx}
        cy={cy}
        r={4.5}
        fill="#ffffff"
        stroke="#0284c7"
        strokeWidth={2.5}
      />

      {/* Floating Card Background */}
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

      {/* Pointer triangle */}
      <polygon
        points={`${cx - 4},${y + boxHeight - 0.5} ${cx},${y + boxHeight + 4} ${cx + 4},${y + boxHeight - 0.5}`}
        fill="#ffffff"
        stroke="rgba(226, 232, 240, 0.9)"
        strokeWidth={1}
      />

      {/* Month Label */}
      <text
        x={cx}
        y={y + 14}
        textAnchor="middle"
        fill="#64748b"
        fontSize={10}
        fontWeight={500}
        fontFamily="Poppins, sans-serif"
      >
        {label}
      </text>

      {/* Value Label */}
      <text
        x={cx}
        y={y + 31}
        textAnchor="middle"
        fill="#0284c7"
        fontSize={13}
        fontWeight={700}
        fontFamily="Poppins, sans-serif"
      >
        {value}
      </text>
    </g>
  );
};

// Reusable Recharts Area Card Component for Collaborator
const CollaboratorAreaChart = ({
  id = "collaborator-revenue",
  title = "Revenue Overview",
  subtitle = "Paid invoice revenue by selected period.",
  totalMetric = "CHF 275.00",
  totalMetricLabel = "Total Earnings",
  data,
  highlightValue = "$5600.00",
  highlightMonth = "July",
  timeFilter = "This year",
  height = "h-[260px] sm:h-[280px]",
}) => {
  const [selectedFilter, setSelectedFilter] = useState(timeFilter);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const filterOptions = ["This year", "Last 6 months", "Previous year"];
  const gradientId = `areaGradient_${id}`;

  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.02)] sm:p-6">
      {/* Card Header */}
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="text-base font-bold tracking-tight text-slate-900">
            {title}
          </h2>
          <p className="mt-0.5 text-xs text-slate-400">{subtitle}</p>
        </div>

        {/* Dropdown Filter */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
          >
            <span>{selectedFilter}</span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </button>

          {isDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsDropdownOpen(false)}
              />
              <div className="absolute right-0 top-full z-20 mt-1.5 min-w-32 rounded-lg border border-slate-100 bg-white p-1 shadow-lg">
                {filterOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setSelectedFilter(opt);
                      setIsDropdownOpen(false);
                    }}
                    className={`block w-full rounded-md px-3 py-1.5 text-left text-xs font-medium transition-colors ${
                      selectedFilter === opt
                        ? "bg-sky-50 font-semibold text-sky-600"
                        : "text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* High-level Metric Display */}
      {totalMetric && (
        <div className="mt-4">
          <div className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            {totalMetric}
          </div>
          <p className="text-xs text-slate-400">{totalMetricLabel}</p>
        </div>
      )}

      {/* Chart Canvas */}
      <div className={`mt-2 w-full ${height}`}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 38, right: 10, left: -20, bottom: 0 }}
            onMouseMove={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.35} />
                <stop offset="70%" stopColor="#38bdf8" stopOpacity={0.08} />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="rgba(226, 232, 240, 0.6)"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#94a3b8",
                fontSize: 11,
                fontFamily: "Poppins, sans-serif",
              }}
              dy={8}
            />

            <YAxis
              domain={[0, 60]}
              ticks={[0, 15, 30, 45, 60]}
              tickFormatter={(val) => `$${val}k`}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#94a3b8",
                fontSize: 11,
                fontFamily: "Poppins, sans-serif",
              }}
            />

            {/* Vertical dashed line on July */}
            <ReferenceLine
              x="Jun"
              stroke="#38bdf8"
              strokeDasharray="4 4"
              strokeWidth={1.5}
            />

            {/* Static marker on July when not hovering */}
            {!isHovered && (
              <ReferenceDot
                x="Jun"
                y={28}
                shape={(props) => (
                  <StaticFloatingBadge
                    {...props}
                    label={highlightMonth}
                    value={highlightValue}
                  />
                )}
              />
            )}

            {/* Hover Tooltip */}
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#38bdf8",
                strokeWidth: 1.5,
                strokeDasharray: "4 4",
              }}
              isAnimationActive={false}
            />

            <Area
              type="natural"
              dataKey="value"
              stroke="#38bdf8"
              strokeWidth={2.2}
              fill={`url(#${gradientId})`}
              activeDot={{
                r: 5,
                fill: "#ffffff",
                stroke: "#0284c7",
                strokeWidth: 2.5,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CollaboratorAreaChart;
