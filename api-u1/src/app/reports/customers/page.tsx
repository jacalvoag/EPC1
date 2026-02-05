import { query } from '@/lib/db';
import { z } from 'zod';

const CustomerPaginationSchema = z.object({
  page: z.string().transform(Number).pipe(z.number().positive()).catch(1),
  limit: z.string().transform(Number).pipe(z.number().positive().max(100)).catch(10),
});

interface CustomerValueRow {
  cliente: string;
  total_gastado: number;
  num_ordenes: number;
  gasto_promedio: number;
}

export default async function CustomerValuePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { page, limit } = CustomerPaginationSchema.parse(searchParams);
  const offset = (page - 1) * limit;


  const sql = `
    SELECT cliente, total_gastado, num_ordenes, gasto_promedio 
    FROM vw_customer_value 
    ORDER BY total_gastado DESC 
    LIMIT $1 OFFSET $2
  `;

  const { rows } = await query<CustomerValueRow>(sql, [limit, offset]);

  const avgGastoTop = rows.length > 0 
    ? rows.reduce((acc, curr) => acc + Number(curr.gasto_promedio), 0) / rows.length 
    : 0;

  return (
    <div className="p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Valor de Clientes</h1>
        <p className="text-gray-600">Insight: Identificación de clientes frecuentes y gasto promedio[cite: 6, 27].</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded shadow-sm">
          <span className="text-sm font-medium text-blue-700 uppercase">Gasto Promedio (Top Clientes)</span>
          <p className="text-2xl font-bold text-blue-900">${avgGastoTop.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4">Cliente</th>
              <th className="p-4 text-center">Órdenes</th>
              <th className="p-4 text-right">Total Gastado</th>
              <th className="p-4 text-right">Promedio x Ticket</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium">{row.cliente}</td>
                <td className="p-4 text-center">{row.num_ordenes}</td>
                <td className="p-4 text-right">${Number(row.total_gastado).toFixed(2)}</td>
                <td className="p-4 text-right text-green-600">${Number(row.gasto_promedio).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <span>Mostrando página {page} (Límite: {limit})</span>
        <div className="flex gap-2">
        </div>
      </div>
    </div>
  );
}