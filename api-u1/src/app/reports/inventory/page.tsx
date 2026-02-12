import Link from 'next/link';

// Whitelist de categorías permitidas
const ALLOWED_CATEGORIES = ['Café en Grano', 'Bebidas Calientes', 'Repostería', 'Métodos de Extracción', ''];

interface InventoryRow {
  producto: string;
  stock_actual: number;
  categoria: string;
  estado_stock: string;
}

async function getInventoryData(categoria: string): Promise<InventoryRow[]> {
  const params = new URLSearchParams();
  if (categoria) params.append('categoria', categoria);

  const res = await fetch(`http://localhost:3000/api/reports/inventory?${params.toString()}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch inventory data');
  }

  return res.json();
}

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const categoria = typeof params.categoria === 'string' && ALLOWED_CATEGORIES.includes(params.categoria)
    ? params.categoria
    : '';

  const rows = await getInventoryData(categoria);
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

      <form className="filter-form" style={{ margin: '1.5rem 0', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <div>
          <label className="filter-label">Filtrar por Categoría</label>
          <select name="categoria" defaultValue={categoria} className="filter-input">
            <option value="">Todas las categorías</option>
            {ALLOWED_CATEGORIES.filter(c => c !== '').map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn-primary">Filtrar</button>
      </form>

      <div style={{ marginBottom: '1.5rem' }}>
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
