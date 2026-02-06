-- Crear rol de aplicación (solo lectura sobre vistas)
-- NOTA: La contraseña se define aquí pero debe coincidir con APP_DB_PASSWORD en .env
CREATE ROLE app WITH LOGIN PASSWORD 'tu_password_app_aqui';

-- Otorgar permiso de conexión
GRANT CONNECT ON DATABASE cafeteria_up TO app;
GRANT USAGE ON SCHEMA public TO app;

-- Permiso ÚNICAMENTE sobre las vistas (Prohibido sobre tablas base)
GRANT SELECT ON vw_sales_daily TO app;
GRANT SELECT ON vw_top_products_ranked TO app;
GRANT SELECT ON vw_inventory_risk TO app;
GRANT SELECT ON vw_customer_value TO app;
GRANT SELECT ON vw_payment_mix TO app;
GRANT SELECT ON vw_channel_performance TO app;

-- Verificación de seguridad (ejecutar manualmente):
-- SELECT * FROM products; -- Debe fallar con usuario app
-- SELECT * FROM vw_sales_daily; -- Debe funcionar con usuario app