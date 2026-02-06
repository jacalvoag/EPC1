# Cafetería UP - Dashboard de Analítica

Dashboard de reportes para una cafetería del campus. Visualiza ventas, productos estrella, inventario en riesgo, clientes frecuentes y mezcla de pagos.

## Tecnologías

- **Frontend**: Next.js 16 (TypeScript, App Router)
- **Base de datos**: PostgreSQL 16
- **Contenedores**: Docker Compose

## Levantar el proyecto

### 1. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales:

```env
DB_NAME=cafeteria_up
POSTGRES_USER=postgres
POSTGRES_PASSWORD=tu_password_seguro
APP_DB_USER=app
APP_DB_PASSWORD=tu_password_app
```

### 2. Levantar con Docker

```bash
docker compose up --build
```

La aplicación estará disponible en: **http://localhost:3000**

### 3. Scripts ejecutados automáticamente

Al iniciar el contenedor de PostgreSQL, se ejecutan en orden:
1. `schema.sql` - Crea las 6 tablas
2. `reports_vw.sql` - Crea las 6 vistas
3. `indexes.sql` - Crea 3 índices
4. `roles.sql` - Crea el usuario `app`
5. `seed.sql` - Inserta datos de prueba
6. `migrate.sql` - Verifica la estructura

---

## Modelo de datos

```
categories ──┐
             │
products ────┼── order_items ── orders ── payments
             │                     │
             └─────────────────────┴── customers
```

**6 tablas, 5+ relaciones FK**

---

## Reportes (VIEWS)

| Vista | Descripción | Funcionalidades |
|-------|-------------|-----------------|
| `vw_sales_daily` | Ventas por día | Filtros de fecha |
| `vw_top_products_ranked` | Ranking de productos | Búsqueda + Paginación |
| `vw_inventory_risk` | Stock en riesgo | Filtro por categoría |
| `vw_customer_value` | Valor por cliente | Paginación |
| `vw_payment_mix` | Métodos de pago | - |
| `vw_channel_performance` | Canales de venta | - |

---

## Evidencia de Índices (EXPLAIN)

### Índice 1: `idx_orders_created_at`

```sql
EXPLAIN ANALYZE SELECT * FROM orders WHERE created_at >= '2026-02-01';
```

**Resultado esperado:**
```
Index Scan using idx_orders_created_at on orders
  Index Cond: (created_at >= '2026-02-01')
  Planning Time: 0.123 ms
  Execution Time: 0.045 ms
```

### Índice 2: `idx_order_items_product_id`

```sql
EXPLAIN ANALYZE 
SELECT p.name, SUM(oi.qty) 
FROM order_items oi 
JOIN products p ON oi.product_id = p.id 
GROUP BY p.name;
```

**Resultado esperado:**
```
HashAggregate
  -> Nested Loop
       -> Seq Scan on products p
       -> Index Scan using idx_order_items_product_id on order_items oi
             Index Cond: (product_id = p.id)
```

---

## Seguridad: Usuario `app`

La aplicación se conecta como usuario `app`, NO como `postgres`.

### Verificar permisos restringidos

Conectar como usuario `app`:

```bash
psql -h localhost -U app -d cafeteria_up
```

**Prueba 1: Acceso a VIEWS (debe funcionar)**
```sql
SELECT * FROM vw_sales_daily LIMIT 1;
-- ✅ Retorna datos
```

**Prueba 2: Acceso a tablas (debe fallar)**
```sql
SELECT * FROM products LIMIT 1;
-- ❌ ERROR: permission denied for table products
```

**Prueba 3: Verificar grants**
```sql
\dp vw_sales_daily
-- Muestra: app=r/postgres (SELECT permitido)
```

---

## Estructura del proyecto

```
├── docker-compose.yml
├── .env.example
├── api-u1/                    # Aplicación Next.js
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx       # Dashboard
│   │   │   └── reports/       # 5 páginas de reportes
│   │   └── lib/
│   │       └── db.ts          # Conexión a BD
│   └── Dockerfile
└── db/
    ├── schema.sql             # Tablas
    ├── reports_vw.sql         # Vistas
    ├── indexes.sql            # Índices
    ├── roles.sql              # Usuario app
    ├── seed.sql               # Datos de prueba
    └── migrate.sql            # Verificaciones
```

---

## Autor: Calvo Aguilar José Antonio

Proyecto de evaluación práctica - Unidad 1
