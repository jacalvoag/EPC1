import { query } from '@/lib/db';
import { SalesFilterSchema } from '@/lib/validations';

interface SalesRow {
  sale_date: Date;
  total_ventas: number;
  total_tickets: number;
  ticket_promedio: number;
}

export default async function SalesReportPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { date_from, date_to } = SalesFilterSchema.parse(searchParams);

  const sql = `
    SELECT sale_date, total_ventas, total_tickets, ticket_promedio 
    FROM vw_sales_daily 
    WHERE ($1::DATE IS NULL OR sale_date >= $1)
      AND ($2::DATE IS NULL OR sale_date <= $2)
    ORDER BY sale_date DESC
  `;
  
  const { rows } = await query<SalesRow>(sql, [date_from || null, date_to || null]);

  const totalPeriodo = rows.reduce((acc, row) => acc + Number(row.total_ventas), 0);

  return (
    <div className="p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Análisis de Ventas Diarias</h1>
        <p className="text-gray-600">Reporte basado en vw_sales_daily</p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-green-100 border-l-4 border-green-500 rounded">
          <p className="text-sm font-medium text-green-700 uppercase">Ingresos Totales (Periodo)</p>
          <p className="text-2xl font-bold text-green-900">${totalPeriodo.toFixed(2)}</p>
        </div>
      </section>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-left bg-white">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 font-semibold">Fecha</th>
              <th className="p-4 font-semibold">Ventas</th>
              <th className="p-4 font-semibold">Tickets</th>
              <th className="p-4 font-semibold">Ticket Promedio</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-4">{new Date(row.sale_date).toLocaleDateString()}</td>
                <td className="p-4 font-medium">${Number(row.total_ventas).toFixed(2)}</td>
                <td className="p-4">{row.total_tickets}</td>
                <td className="p-4 text-blue-600">${Number(row.ticket_promedio).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}