import Link from 'next/link';
import { query } from '@/lib/db';

interface PaymentRow {
  metodo_pago: string;
  total_transacciones: number;
  monto_acumulado: number;
  porcentaje_popularidad: number;
}

export default async function PaymentsPage() {
  const sql = `
    SELECT metodo_pago, total_transacciones, monto_acumulado, porcentaje_popularidad 
    FROM vw_payment_mix
    ORDER BY monto_acumulado DESC
  `;

  const { rows } = await query<PaymentRow>(sql);

  return (
    <div className="container">
      <Link href="/" className="back-link">← Volver al inicio</Link>

      <h1 className="page-title">Métodos de Pago</h1>
      <p className="page-subtitle">Distribución de pagos</p>

      <div className="table-container" style={{ marginTop: '1.5rem' }}>
        <table className="simple-table">
          <thead>
            <tr>
              <th>Método</th>
              <th>Transacciones</th>
              <th>Monto Total</th>
              <th>Porcentaje</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td>{row.metodo_pago}</td>
                <td>{row.total_transacciones}</td>
                <td>${Number(row.monto_acumulado).toFixed(2)}</td>
                <td>{row.porcentaje_popularidad}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}