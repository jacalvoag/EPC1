import Link from 'next/link';
import { query } from '@/lib/db';

interface SalesRow {
  sale_date: Date;
  total_ventas: number;
  total_tickets: number;
  ticket_promedio: number;
}

export default async function SalesPage() {
  const sql = `
    SELECT sale_date, total_ventas, total_tickets, ticket_promedio 
    FROM vw_sales_daily 
    ORDER BY sale_date DESC
    LIMIT 30
  `;

  const { rows } = await query<SalesRow>(sql);
  const total = rows.reduce((acc, r) => acc + Number(r.total_ventas), 0);

  return (
    <div className="container">
      <Link href="/" className="back-link">← Volver al inicio</Link>

      <h1 className="page-title">Ventas Diarias</h1>
      <p className="page-subtitle">Últimos 30 días de ventas</p>

      <div style={{ margin: '1.5rem 0' }}>
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