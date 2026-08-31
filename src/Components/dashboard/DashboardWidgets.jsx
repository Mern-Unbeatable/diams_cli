const StatCard = ({ label, value, hint }) => (
  <article className="rounded-2xl border border-gray-200 bg-white p-5">
    <p className="text-sm font-medium text-primary/55">{label}</p>
    <p className="mt-2 text-2xl font-bold text-primary">{value}</p>
    <p className="mt-1 text-xs font-medium text-btnPrimary">{hint}</p>
  </article>
);

export const DataTable = ({ title, columns, rows }) => (
  <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
    {title ? (
      <div className="border-b border-gray-100 px-5 py-4">
        <h2 className="text-base font-bold text-primary">{title}</h2>
      </div>
    ) : null}
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-[#f8fbff] text-primary/60">
          <tr>
            {columns.map((column) => (
              <th key={column} className="px-5 py-3 font-semibold">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`${row[0]}-${rowIndex}`} className="border-t border-gray-100">
              {row.map((cell, cellIndex) => (
                <td
                  key={`${cell}-${cellIndex}`}
                  className={[
                    "px-5 py-3.5",
                    cellIndex === 0 ? "font-semibold text-primary" : "text-primary/70",
                  ].join(" ")}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </section>
);

export { StatCard };
