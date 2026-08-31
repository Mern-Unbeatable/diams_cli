import { DataTable, StatCard } from "./DashboardWidgets";

export const DashboardOverviewPage = ({
  title,
  subtitle,
  stats,
  tableTitle,
  columns,
  rows,
}) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-primary">{title}</h2>
      <p className="mt-1 text-sm text-primary/60">{subtitle}</p>
    </div>

    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.id} {...stat} />
      ))}
    </div>

    <DataTable title={tableTitle} columns={columns} rows={rows} />
  </div>
);

export const DashboardSectionPage = ({ title, description, columns, rows }) => (
  <div className="space-y-6">
    <div>
      <h2 className="text-2xl font-bold text-primary">{title}</h2>
      <p className="mt-1 text-sm text-primary/60">{description}</p>
    </div>

    <DataTable columns={columns} rows={rows} />
  </div>
);
