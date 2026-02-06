import Link from 'next/link';
import { query } from '@/lib/db';

interface ProductRow {
  producto: string;
  categoria: string;
  unidades_vendidas: number;
  ingresos_totales: number;
  ranking_ingresos: number;
}

export default async function ProductsPage() {
  const sql = `
    SELECT producto, categoria, unidades_vendidas, ingresos_totales, ranking_ingresos
    FROM vw_top_products_ranked
    ORDER BY ranking_ingresos ASC
    LIMIT 20
  `;

  const { rows } = await query<ProductRow>(sql);

  return (
    <div className="container">
      <Link href="/" className="back-link">← Volver al inicio</Link>

      <h1 className="page-title">Productos Estrella</h1>
      <p className="page-subtitle">Top 20 productos por ingresos</p>

      <div className="table-container" style={{ marginTop: '1.5rem' }}>
        <table className="simple-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Unidades</th>
              <th>Ingresos</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 600, color: 'var(--primary)' }}>#{row.ranking_ingresos}</td>
                <td>{row.producto}</td>
                <td>{row.categoria}</td>
                <td>{row.unidades_vendidas}</td>
                <td>${Number(row.ingresos_totales).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}