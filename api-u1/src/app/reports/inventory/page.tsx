import { query } from '@/lib/db';
import { z } from 'zod';

const InventoryFilterSchema = z.object({
  category_id: z.string().optional().default(''),
});

interface InventoryRow {
  producto: string;
  stock_actual: number;
  categoria: string;
  estado_stock: string;
  ratio_disponibilidad: number;
}

export default async function InventoryRiskPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { category_id } = InventoryFilterSchema.parse(searchParams);

  const sql = `
    SELECT producto, stock_actual, categoria, estado_stock, ratio_disponibilidad
    FROM vw_inventory_risk
    WHERE ($1 = '' OR categoria = $1)
    ORDER BY stock_actual ASC
  `;
  
  const { rows } = await query<InventoryRow>(sql, [category_id]);

  const itemsEnRiesgo = rows.filter(r => r.estado_stock === 'Riesgo Crítico' || r.estado_stock === 'Agotado').length;

  return (
    <div className="p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Inventario en Riesgo</h1>
        <p className="text-gray-600">Insight: Productos o categorías con stock bajo y porcentaje en riesgo.</p>
      </header>

      <div className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 rounded shadow-sm">
        <span className="text-sm font-medium text-red-700 uppercase">Alertas Críticas</span>
        <p className="text-2xl font-bold text-red-900">{itemsEnRiesgo} productos requieren reabastecimiento</p>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4">Producto</th>
              <th className="p-4">Categoría</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Estado</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium">{row.producto}</td>
                <td className="p-4">{row.categoria}</td>
                <td className="p-4">{row.stock_actual}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    row.estado_stock === 'Saludable' ? 'bg-green-100 text-green-700' :
                    row.estado_stock === 'Riesgo Bajo' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {row.estado_stock.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}