import Link from 'next/link';
import { query } from '@/lib/db';

interface InventoryRow {
  producto: string;
  stock_actual: number;
  categoria: string;
  estado_stock: string;
}

export default async function InventoryPage() {
  const sql = `
    SELECT producto, stock_actual, categoria, estado_stock
    FROM vw_inventory_risk
    ORDER BY stock_actual ASC
  `;

  const { rows } = await query<InventoryRow>(sql);
  const criticos = rows.filter(r => r.estado_stock === 'Riesgo Crítico' || r.estado_stock === 'Agotado').length;

  const getBadgeClass = (estado: string) => {
    if (estado === 'Saludable') return 'badge badge-success';
    if (estado === 'Riesgo Bajo') return 'badge badge-warning';
    return 'badge badge-danger';
  };

  return (
    <div className="container">
      <Link href="/" className="back-link">← Volver al inicio</Link>

      <h1 className="page-title">Inventario</h1>
      <p className="page-subtitle">Estado del stock de productos</p>

      <div style={{ margin: '1.5rem 0' }}>
        <div className="kpi-card" style={{ maxWidth: '300px', borderColor: 'var(--danger)', background: 'var(--danger-light)' }}>
          <div className="kpi-label" style={{ color: 'var(--danger)' }}>Productos en Riesgo</div>
          <div className="kpi-value">{criticos}</div>
        </div>
      </div>

      <div className="table-container">
        <table className="simple-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Categoría</th>
              <th>Stock</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td>{row.producto}</td>
                <td>{row.categoria}</td>
                <td>{row.stock_actual}</td>
                <td><span className={getBadgeClass(row.estado_stock)}>{row.estado_stock}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}