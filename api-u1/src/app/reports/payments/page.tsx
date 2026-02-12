import Link from 'next/link';

interface PaymentRow {
  metodo_pago: string;
  total_transacciones: number;
  monto_acumulado: number;
  porcentaje_popularidad: number;
}

async function getPaymentsData(): Promise<PaymentRow[]> {
  const res = await fetch('http://localhost:3000/api/reports/payments', {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch payments data');
  }

  return res.json();
}

export default async function PaymentsPage() {
  const rows = await getPaymentsData();

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