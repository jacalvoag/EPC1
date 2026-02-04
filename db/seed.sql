-- 1. Insertar Categorías
INSERT INTO categories (name) VALUES 
('Café en Grano'), 
('Bebidas Calientes'), 
('Repostería'), 
('Métodos de Extracción');

-- 2. Insertar Productos
INSERT INTO products (name, category_id, price, stock, active) VALUES 
('Espresso Americano', 2, 45.00, 100, true),
('Latte Vainilla', 2, 65.00, 5, true),        -- Riesgo Crítico
('Croissant de Mantequilla', 3, 35.00, 0, true), -- Agotado
('Bolsa Café Chiapas (1kg)', 1, 320.00, 15, true), -- Riesgo Bajo
('Prensa Francesa', 4, 450.00, 50, true),
('Muffin de Arándanos', 3, 40.00, 25, false);  -- Inactivo (no debería salir en riesgo)

-- 3. Insertar Clientes
INSERT INTO customers (name, email) VALUES 
('Juan Pérez', 'juan@email.com'),
('María García', 'maria@email.com'),
('Luis Rodríguez', 'luis@email.com');

-- 4. Insertar Órdenes (Ventas Diarias y Canales)
-- Orden 1: Juan (Mostrador)
INSERT INTO orders (customer_id, created_at, status, channel) 
VALUES (1, '2026-02-04 09:00:00', 'completed', 'Mostrador');

-- Orden 2: María (App Móvil)
INSERT INTO orders (customer_id, created_at, status, channel) 
VALUES (2, '2026-02-04 10:30:00', 'completed', 'App Móvil');

-- Orden 3: Luis (Delivery)
INSERT INTO orders (customer_id, created_at, status, channel) 
VALUES (3, '2026-02-05 08:15:00', 'completed', 'Delivery');

-- 5. Detalle de Órdenes (Items)
INSERT INTO order_items (order_id, product_id, qty, unit_price) VALUES 
(1, 1, 2, 45.00),  -- 2 Americanos
(1, 3, 1, 35.00),  -- 1 Croissant
(2, 4, 1, 320.00), -- 1 Bolsa Café
(3, 2, 1, 65.00);  -- 1 Latte

-- 6. Pagos (Mezcla de métodos)
INSERT INTO payments (order_id, method, paid_amount) VALUES 
(1, 'Efectivo', 125.00),
(2, 'Tarjeta de Crédito', 320.00),
(3, 'Transferencia', 65.00);