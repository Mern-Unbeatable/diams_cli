const StatCard = ({ label, value, hint }) => (
  <article className="rounded-2xl border border-gray-200 bg-white p-5">
    <p className="text-sm font-medium text-primary/55">{label}</p>
    <p className="mt-2 text-2xl font-bold text-primary">{value}</p>
    <p className="mt-1 text-xs font-medium text-btnPrimary">{hint}</p>
  </article>
);
import DataTable from "./DataTable";

export { DataTable, StatCard };
