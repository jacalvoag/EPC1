import Link from 'next/link';
import { query } from '@/lib/db';

interface CustomerRow {
  cliente: string;
  total_gastado: number;
  num_ordenes: number;
  gasto_promedio: number;
}

export default async function CustomersPage() {
  const sql = `
    SELECT cliente, total_gastado, num_ordenes, gasto_promedio 
    FROM vw_customer_value 
    ORDER BY total_gastado DESC 
    LIMIT 20
  `;

  const { rows } = await query<CustomerRow>(sql);

  return (
    <div className="container">
      <Link href="/" className="back-link">← Volver al inicio</Link>

      <h1 className="page-title">Valor de Clientes</h1>
      <p className="page-subtitle">Top 20 clientes por gasto total</p>

      <div className="table-container" style={{ marginTop: '1.5rem' }}>
        <table className="simple-table">
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Órdenes</th>
              <th>Total Gastado</th>
              <th>Promedio</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td>{row.cliente}</td>
                <td>{row.num_ordenes}</td>
                <td>${Number(row.total_gastado).toFixed(2)}</td>
                <td>${Number(row.gasto_promedio).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}