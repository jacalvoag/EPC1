import Link from 'next/link';
import { query } from '@/lib/db';
import { z } from 'zod';

const FilterSchema = z.object({
  search: z.string().optional().default(''),
  page: z.string().transform(Number).pipe(z.number().positive()).catch(1),
  limit: z.string().transform(Number).pipe(z.number().positive().max(50)).catch(10),
});

interface ProductRow {
  producto: string;
  categoria: string;
  unidades_vendidas: number;
  ingresos_totales: number;
  ranking_ingresos: number;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const { search, page, limit } = FilterSchema.parse(params);
  const offset = (page - 1) * limit;

  const sql = `
    SELECT producto, categoria, unidades_vendidas, ingresos_totales, ranking_ingresos
    FROM vw_top_products_ranked
    WHERE producto ILIKE $1
    ORDER BY ranking_ingresos ASC
    LIMIT $2 OFFSET $3
  `;

  const { rows } = await query<ProductRow>(sql, [`%${search}%`, limit, offset]);

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