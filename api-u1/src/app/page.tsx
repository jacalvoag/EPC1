import Link from 'next/link';

const REPORTS = [
  { id: 1, title: 'Ventas Diarias', path: '/reports/sales', desc: 'Ingresos por fecha' },
  { id: 2, title: 'Productos Estrella', path: '/reports/products', desc: 'Ranking de ventas' },
  { id: 3, title: 'Inventario', path: '/reports/inventory', desc: 'Estado de stock' },
  { id: 4, title: 'Clientes', path: '/reports/customers', desc: 'Valor por cliente' },
  { id: 5, title: 'Métodos de Pago', path: '/reports/payments', desc: 'Distribución de pagos' },
];

export default function HomePage() {
  return (
    <div className="container">
      <header style={{ marginBottom: '2rem' }}>
        <h1 className="page-title">Cafetería UP</h1>
        <p className="page-subtitle">Actividad para la evaluación de la unidad 1</p>
      </header>

      <div className="report-grid">
        {REPORTS.map((r) => (
          <Link key={r.id} href={r.path} className="report-card">
            <div className="report-card-title">{r.title}</div>
            <div className="report-card-desc">{r.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}