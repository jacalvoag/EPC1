import { query } from '@/lib/db';

interface PaymentMixRow {
  metodo_pago: string;
  total_transacciones: number;
  monto_acumulado: number;
  porcentaje_popularidad: number;
}

export default async function PaymentMixPage() {
  const sql = `
    SELECT metodo_pago, total_transacciones, monto_acumulado, porcentaje_popularidad 
    FROM vw_payment_mix
    ORDER BY monto_acumulado DESC
  `;

  const { rows } = await query<PaymentMixRow>(sql);

  const topMethod = rows[0]?.metodo_pago || 'N/A';
  const topPercent = rows[0]?.porcentaje_popularidad || 0;

  return (
    <div className="p-8">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Mezcla de Pagos</h1>
        <p className="text-gray-600">Insight: Distribución de ingresos por método y frecuencia de uso.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-purple-50 border-l-4 border-purple-500 rounded shadow-sm">
          <span className="text-sm font-medium text-purple-700 uppercase">Método Dominante</span>
          <p className="text-2xl font-bold text-purple-900">{topMethod} ({topPercent}%)</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4">Método de Pago</th>
              <th className="p-4 text-center">Transacciones</th>
              <th className="p-4 text-right">Monto Total</th>
              <th className="p-4 text-right">Participación (%)</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-4 font-medium">{row.metodo_pago}</td>
                <td className="p-4 text-center">{row.total_transacciones}</td>
                <td className="p-4 text-right">${Number(row.monto_acumulado).toFixed(2)}</td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-sm text-gray-500">{row.porcentaje_popularidad}%</span>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-600 h-2 rounded-full" 
                        style={{ width: `${row.porcentaje_popularidad}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}