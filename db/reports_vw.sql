-- VISTA: vw_sales_daily
-- Descripción: Resumen de ventas agregado por día
-- Grano: Una fila por fecha (sale_date)
-- Métricas: total_ventas (SUM), total_tickets (COUNT), ticket_promedio (ratio)
-- Verificación:
--   SELECT * FROM vw_sales_daily ORDER BY sale_date DESC LIMIT 5;
--   SELECT SUM(total_ventas) AS ventas_totales FROM vw_sales_daily;
CREATE VIEW vw_sales_daily AS
SELECT 
    created_at::DATE AS sale_date,
    SUM(paid_amount) AS total_ventas,
    COUNT(DISTINCT o.id) AS total_tickets,
    ROUND(SUM(paid_amount) / NULLIF(COUNT(DISTINCT o.id), 0), 2) AS ticket_promedio
FROM orders o
JOIN payments p ON o.id = p.order_id
WHERE o.status = 'completed'
GROUP BY created_at::DATE
HAVING COUNT(DISTINCT o.id) > 0;

-- VISTA: vw_top_products_ranked
-- Descripción: Ranking de productos por ingresos usando Window Function
-- Grano: Una fila por producto
-- Métricas: unidades_vendidas (SUM), ingresos_totales (SUM), ranking (DENSE_RANK)
-- Verificación:
--   SELECT * FROM vw_top_products_ranked ORDER BY ranking_ingresos LIMIT 10;
--   SELECT * FROM vw_top_products_ranked WHERE producto ILIKE '%café%';
CREATE VIEW vw_top_products_ranked AS
SELECT 
    p.name AS producto,
    c.name AS categoria,
    SUM(oi.qty) AS unidades_vendidas,
    SUM(oi.qty * oi.unit_price) AS ingresos_totales,
    DENSE_RANK() OVER (ORDER BY SUM(oi.qty * oi.unit_price) DESC) AS ranking_ingresos
FROM products p
JOIN categories c ON p.category_id = c.id
JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.name, c.name;

-- VISTA: vw_inventory_risk
-- Descripción: Identificación de productos con stock bajo y estado de riesgo
-- Grano: Una fila por producto activo
-- Métricas: stock_actual, estado_stock (CASE), ratio_disponibilidad (ratio)
-- Verificación:
--   SELECT * FROM vw_inventory_risk WHERE estado_stock = 'Riesgo Crítico';
--   SELECT categoria, COUNT(*) FROM vw_inventory_risk GROUP BY categoria;
CREATE VIEW vw_inventory_risk AS
SELECT 
    p.name AS producto,
    p.stock AS stock_actual,
    COALESCE(c.name, 'Sin Categoría') AS categoria,
    CASE 
        WHEN p.stock = 0 THEN 'Agotado'
        WHEN p.stock < 10 THEN 'Riesgo Crítico'
        WHEN p.stock < 20 THEN 'Riesgo Bajo'
        ELSE 'Saludable'
    END AS estado_stock,
    ROUND((p.stock::DECIMAL / 100), 2) AS ratio_disponibilidad
FROM products p
LEFT JOIN categories c ON p.category_id = c.id
WHERE p.active = true;

-- VISTA: vw_customer_value
-- Descripción: Análisis de valor por cliente usando CTE
-- Grano: Una fila por cliente con órdenes
-- Métricas: total_gastado (SUM), num_ordenes (COUNT), gasto_promedio (ratio)
-- Verificación:
--   SELECT * FROM vw_customer_value ORDER BY total_gastado DESC LIMIT 10;
--   SELECT AVG(gasto_promedio) FROM vw_customer_value;
CREATE VIEW vw_customer_value AS
WITH customer_stats AS (
    SELECT 
        c.id,
        c.name,
        SUM(p.paid_amount) AS total_gastado,
        COUNT(o.id) AS num_ordenes
    FROM customers c
    JOIN orders o ON c.id = o.customer_id
    JOIN payments p ON o.id = p.order_id
    GROUP BY c.id, c.name
)
SELECT 
    name AS cliente,
    total_gastado,
    num_ordenes,
    ROUND(total_gastado / NULLIF(num_ordenes, 0), 2) AS gasto_promedio
FROM customer_stats
WHERE num_ordenes > 0
GROUP BY name, total_gastado, num_ordenes
HAVING SUM(total_gastado) > 50;

-- VISTA: vw_payment_mix
-- Descripción: Distribución de pagos por método usando Window Function
-- Grano: Una fila por método de pago
-- Métricas: total_transacciones (COUNT), monto_acumulado (SUM), porcentaje (Window)
-- Verificación:
--   SELECT * FROM vw_payment_mix ORDER BY monto_acumulado DESC;
--   SELECT SUM(porcentaje_popularidad) FROM vw_payment_mix; -- Debe ser 100
CREATE VIEW vw_payment_mix AS
SELECT 
    method AS metodo_pago,
    COUNT(*) AS total_transacciones,
    SUM(paid_amount) AS monto_acumulado,
    ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER(), 2) AS porcentaje_popularidad
FROM payments
GROUP BY method;

-- VISTA: vw_channel_performance (BONUS)
-- Descripción: Rendimiento por canal de venta
-- Grano: Una fila por canal (Mostrador, App, Delivery)
-- Métricas: total_pedidos (COUNT), ingresos_totales (SUM), porcentaje_ingresos (Window)
-- Verificación:
--   SELECT * FROM vw_channel_performance ORDER BY ingresos_totales DESC;
--   SELECT SUM(porcentaje_ingresos) FROM vw_channel_performance; -- Debe ser 100
CREATE VIEW vw_channel_performance AS
SELECT 
    o.channel AS canal_venta,
    COUNT(o.id) AS total_pedidos,
    SUM(p.paid_amount) AS ingresos_totales,
    ROUND(AVG(p.paid_amount), 2) AS ticket_medio_canal,
    ROUND(
        100.0 * SUM(p.paid_amount) / SUM(SUM(p.paid_amount)) OVER(), 
        2
    ) AS porcentaje_ingresos
FROM orders o
JOIN payments p ON o.id = p.order_id
GROUP BY o.channel;