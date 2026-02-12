import Link from 'next/link';

interface CustomerRow {
  cliente: string;
  total_gastado: number;
  num_ordenes: number;
  gasto_promedio: number;
}

async function getCustomersData(page: number, limit: number): Promise<CustomerRow[]> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  const res = await fetch(`http://localhost:3000/api/reports/customers?${params.toString()}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch customers data');
  }

  return res.json();
}

export default async function CustomersPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 10;

  const rows = await getCustomersData(page, limit);

  return (
    <div className="container">
      <Link href="/" className="back-link">← Volver al inicio</Link>

      <h1 className="page-title">Valor de Clientes</h1>
      <p className="page-subtitle">Clientes ordenados por gasto total</p>

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

      <div className="pagination" style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Página {page} (Límite: {limit})</span>
        {page > 1 && (
          <a href={`?page=${page - 1}&limit=${limit}`} className="btn-secondary">← Anterior</a>
        )}
        {rows.length === limit && (
          <a href={`?page=${page + 1}&limit=${limit}`} className="btn-secondary">Siguiente →</a>
        )}
      </div>
    </div>
  );
}
