import Link from 'next/link';

interface SalesRow {
  sale_date: string; // Dates from JSON are strings
  total_ventas: number;
  total_tickets: number;
  ticket_promedio: number;
}

async function getSalesData(date_from?: string, date_to?: string): Promise<SalesRow[]> {
  const params = new URLSearchParams();
  if (date_from) params.append('date_from', date_from);
  if (date_to) params.append('date_to', date_to);

  const res = await fetch(`http://localhost:3000/api/reports/sales?${params.toString()}`, {
    cache: 'no-store', // Ensure fresh data
  });

  if (!res.ok) {
    throw new Error('Failed to fetch sales data');
  }

  return res.json();
}

export default async function SalesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const date_from = typeof params.date_from === 'string' ? params.date_from : undefined;
  const date_to = typeof params.date_to === 'string' ? params.date_to : undefined;

  const rows = await getSalesData(date_from, date_to);
  const total = rows.reduce((acc, r) => acc + Number(r.total_ventas), 0);

  return (
    <div className="container">
      <Link href="/" className="back-link">← Volver al inicio</Link>

      <h1 className="page-title">Ventas Diarias</h1>
      <p className="page-subtitle">Filtrar por rango de fechas</p>

      <form className="filter-form" style={{ margin: '1.5rem 0', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <div>
          <label className="filter-label">Desde</label>
          <input type="date" name="date_from" defaultValue={date_from} className="filter-input" />
        </div>
        <div>
          <label className="filter-label">Hasta</label>
          <input type="date" name="date_to" defaultValue={date_to} className="filter-input" />
        </div>
        <button type="submit" className="btn-primary">Filtrar</button>
      </form>

      <div style={{ marginBottom: '1.5rem' }}>
        <div className="kpi-card" style={{ maxWidth: '250px' }}>
          <div className="kpi-label">Total del Periodo</div>
          <div className="kpi-value">${total.toFixed(2)}</div>
        </div>
      </div>

      <div className="table-container">
        <table className="simple-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Ventas</th>
              <th>Tickets</th>
              <th>Promedio</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td>{new Date(row.sale_date).toLocaleDateString()}</td>
                <td>${Number(row.total_ventas).toFixed(2)}</td>
                <td>{row.total_tickets}</td>
                <td>${Number(row.ticket_promedio).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
