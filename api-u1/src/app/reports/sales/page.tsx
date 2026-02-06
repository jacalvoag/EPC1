import Link from 'next/link';
import { query } from '@/lib/db';
import { z } from 'zod';

const FilterSchema = z.object({
  date_from: z.string().optional().transform(val => val && val.match(/^\d{4}-\d{2}-\d{2}$/) ? val : undefined),
  date_to: z.string().optional().transform(val => val && val.match(/^\d{4}-\d{2}-\d{2}$/) ? val : undefined),
});

interface SalesRow {
  sale_date: Date;
  total_ventas: number;
  total_tickets: number;
  ticket_promedio: number;
}

export default async function SalesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const { date_from, date_to } = FilterSchema.parse(params);

  const sql = `
    SELECT sale_date, total_ventas, total_tickets, ticket_promedio 
    FROM vw_sales_daily 
    WHERE ($1::DATE IS NULL OR sale_date >= $1)
      AND ($2::DATE IS NULL OR sale_date <= $2)
    ORDER BY sale_date DESC
  `;

  const { rows } = await query<SalesRow>(sql, [date_from || null, date_to || null]);
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