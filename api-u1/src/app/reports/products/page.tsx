import Link from 'next/link';

interface ProductRow {
  producto: string;
  categoria: string;
  unidades_vendidas: number;
  ingresos_totales: number;
  ranking_ingresos: number;
}

async function getProductsData(search: string, page: number, limit: number): Promise<ProductRow[]> {
  const params = new URLSearchParams({
    search,
    page: page.toString(),
    limit: limit.toString(),
  });

  const res = await fetch(`http://localhost:3000/api/reports/products?${params.toString()}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products data');
  }

  return res.json();
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const search = typeof params.search === 'string' ? params.search : '';
  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 10;

  const rows = await getProductsData(search, page, limit);

  return (
    <div className="container">
      <Link href="/" className="back-link">← Volver al inicio</Link>

      <h1 className="page-title">Productos Estrella</h1>
      <p className="page-subtitle">Buscar y paginar productos</p>

      <form className="filter-form" style={{ margin: '1.5rem 0', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <label className="filter-label">Buscar producto</label>
          <input type="text" name="search" defaultValue={search} placeholder="Nombre del producto..." className="filter-input" />
        </div>
        <button type="submit" className="btn-primary">Buscar</button>
      </form>

      <div className="table-container">
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

      <div className="pagination" style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Página {page}</span>
        {page > 1 && (
          <a href={`?search=${search}&page=${page - 1}&limit=${limit}`} className="btn-secondary">← Anterior</a>
        )}
        {rows.length === limit && (
          <a href={`?search=${search}&page=${page + 1}&limit=${limit}`} className="btn-secondary">Siguiente →</a>
        )}
      </div>
    </div>
  );
}
