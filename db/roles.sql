CREATE ROLE app_user WITH LOGIN PASSWORD 'cafeteria_secure_pass';

-- Otorgar permiso de conexión
GRANT CONNECT ON DATABASE cafeteria_up TO app_user;
GRANT USAGE ON SCHEMA public TO app_user;

-- Permiso ÚNICAMENTE sobre las vistas (Prohibido sobre tablas base)
GRANT SELECT ON vw_sales_daily TO app_user;
GRANT SELECT ON vw_top_products_ranked TO app_user;
GRANT SELECT ON vw_inventory_risk TO app_user;
GRANT SELECT ON vw_customer_value TO app_user;
GRANT SELECT ON vw_payment_mix TO app_user;
GRANT SELECT ON vw_channel_performance TO app_user;