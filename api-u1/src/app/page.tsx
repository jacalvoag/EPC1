import Link from 'next/link';

// Configuración sencilla de rutas para evitar hardcoding en el JSX
const REPORT_LINKS = [
  { id: 1, title: 'Ventas Diarias', path: '/reports/sales', insight: 'Análisis de ingresos por fecha' },
  { id: 2, title: 'Productos Estrella', path: '/reports/products', insight: 'Ranking de los más vendidos' },
  { id: 3, title: 'Riesgo de Inventario', path: '/reports/inventory', insight: 'Alertas de stock crítico' },
  { id: 4, title: 'Valor del Cliente', path: '/reports/customers', insight: 'Top clientes y gasto promedio' },
  { id: 5, title: 'Mezcla de Pagos', path: '/reports/payments', insight: 'Distribución por método de pago' },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-8 flex flex-col items-center">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Dashboard Cafetería</h1>
        <p className="text-gray-600">Analítica del campus: AWOS y BDA [cite: 2, 6]</p>
      </header>

      {/* Grid de Reportes Sencillo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full">
        {REPORT_LINKS.map((report) => (
          <Link 
            key={report.id} 
            href={report.path}
            className="group p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-400 transition-all duration-200"
          >
            <div className="flex flex-col h-full">
              <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-2">
                Reporte #{report.id} 
              </span>
              <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 mb-2">
                {report.title}
              </h2>
              <p className="text-sm text-gray-500 flex-grow">
                {report.insight} [cite: 69]
              </p>
              <div className="mt-4 text-blue-600 font-medium text-sm flex items-center">
                Ver reporte <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <footer className="mt-16 text-gray-400 text-xs uppercase tracking-widest">
        Sistema de Analítica - Unidad 1 [cite: 1]
      </footer>
    </main>
  );
}