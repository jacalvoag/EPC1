import { query } from '@/lib/db';
import { z } from 'zod';

const ProductSearchSchema = z.object({
  search: z.string().optional().default(''),
  page: z.string().transform(Number).pipe(z.number().positive()).catch(1),
  limit: z.string().transform(Number).pipe(z.number().positive().max(50)).catch(10),
});

interface ProductRankRow {
  producto: string;
  categoria: string;
  unidades_vendidas: number;
  ingresos_totales: number;
  ranking_ingresos: number;
}

export default async function TopProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  const { search, page, limit } = ProductSearchSchema.parse(searchParams);
  const offset = (page - 1) * limit;

  const sql = `
    SELECT producto, categoria, unidades_vendidas, ingresos_totales, ranking_ingresos
    FROM vw_top_products_ranked
    WHERE producto ILIKE $1
    ORDER BY ranking_ingresos ASC
    LIMIT $2 OFFSET $3
  `;

  const { rows } = await query<ProductRankRow>(sql, [`%${search}%`, limit, offset]);

  return (
    <div className="p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Ranking de Productos Estrella</h1>
        <p className="text-gray-600">Insight: Identificación de productos con mayor impacto en ingresos[cite: 6, 23].</p>
      </header>

      <form className="mb-8 flex gap-2">
        <input 
          type="text" 
          name="search" 
          defaultValue={search}
          placeholder="Buscar producto..." 
          className="border p-2 rounded w-full md:w-1/3"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Buscar
        </button>
      </form>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4"># Rank</th>
              <th className="p-4">Producto</th>
              <th className="p-4">Categoría</th>
              <th className="p-4 text-right">Ingresos</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((product, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-4 font-bold text-blue-600">#{product.ranking_ingresos}</td>
                <td className="p-4">{product.producto}</td>
                <td className="p-4">{product.categoria}</td>
                <td className="p-4 text-right font-medium">${Number(product.ingresos_totales).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}