-- 1. Insertar Categorías
INSERT INTO categories (name) VALUES 
('Café en Grano'), 
('Bebidas Calientes'), 
('Bebidas Frías'),
('Repostería'), 
('Métodos de Extracción'),
('Snacks'),
('Merchandising');

-- 2. Insertar Productos (más variedad y casos de prueba)
INSERT INTO products (name, category_id, price, stock, active) VALUES 
-- Bebidas Calientes
('Espresso Americano', 2, 45.00, 100, true),
('Latte Vainilla', 2, 65.00, 5, true),        -- Riesgo Crítico
('Cappuccino', 2, 60.00, 8, true),            -- Riesgo Crítico
('Mocha', 2, 70.00, 50, true),
('Té Chai Latte', 2, 55.00, 3, true),         -- Riesgo Crítico

-- Bebidas Frías
('Cold Brew', 3, 55.00, 20, true),
('Frappé Caramelo', 3, 75.00, 2, true),       -- Riesgo Crítico
('Limonada Natural', 3, 40.00, 0, true),      -- Agotado

-- Repostería
('Croissant de Mantequilla', 4, 35.00, 0, true),  -- Agotado
('Muffin de Arándanos', 4, 40.00, 25, false),     -- Inactivo
('Brownie de Chocolate', 4, 45.00, 15, true),
('Cheesecake', 4, 65.00, 7, true),                -- Riesgo Bajo
('Pan de Plátano', 4, 38.00, 1, true),            -- Riesgo Crítico

-- Café en Grano
('Bolsa Café Chiapas (1kg)', 1, 320.00, 15, true),  -- Riesgo Bajo
('Bolsa Café Colombia (500g)', 1, 180.00, 4, true), -- Riesgo Crítico
('Bolsa Café Brasil (1kg)', 1, 280.00, 30, true),
('Café Descafeinado (500g)', 1, 200.00, 0, true),   -- Agotado

-- Métodos de Extracción
('Prensa Francesa', 5, 450.00, 50, true),
('Chemex', 5, 650.00, 12, true),
('V60 Hario', 5, 380.00, 6, true),               -- Riesgo Bajo

-- Snacks
('Galletas de Avena', 6, 30.00, 40, true),
('Almendras Tostadas', 6, 55.00, 9, true),       -- Riesgo Bajo
('Barra de Granola', 6, 35.00, 0, true),         -- Agotado

-- Merchandising
('Taza Cerámica 350ml', 7, 150.00, 25, true),
('Termo Acero Inox', 7, 420.00, 5, true),        -- Riesgo Crítico
('Camiseta Logo Café', 7, 280.00, 0, false);     -- Agotado + Inactivo

-- 3. Insertar Clientes (18 clientes totales)
INSERT INTO customers (name, email) VALUES 
('Juan Pérez', 'juan@email.com'),
('María García', 'maria@email.com'),
('Luis Rodríguez', 'luis@email.com'),
('Ana Martínez', 'ana@email.com'),
('Carlos López', 'carlos@email.com'),
('Sofía Hernández', 'sofia@email.com'),
('Roberto Díaz', 'roberto@email.com'),
('Laura Torres', 'laura@email.com'),
('Patricia Ramírez', 'patricia@email.com'),
('Miguel Ángel Flores', 'miguel@email.com'),
('Daniela Castro', 'daniela@email.com'),
('Fernando Ruiz', 'fernando@email.com'),
('Gabriela Morales', 'gabriela@email.com'),
('Jorge Vargas', 'jorge@email.com'),
('Valeria Ortiz', 'valeria@email.com'),
('Ricardo Mendoza', 'ricardo@email.com'),
('Isabel Navarro', 'isabel@email.com'),
('Alejandro Guzmán', 'alejandro@email.com');

-- 4. Insertar Órdenes (50 órdenes en 7 días)

-- Hace 6 días (2026-02-06)
INSERT INTO orders (customer_id, created_at, status, channel) VALUES 
(1, '2026-02-06 08:30:00', 'completed', 'Mostrador'),
(2, '2026-02-06 09:15:00', 'completed', 'App Móvil'),
(3, '2026-02-06 14:20:00', 'completed', 'Delivery'),
(9, '2026-02-06 10:30:00', 'completed', 'App Móvil'),
(10, '2026-02-06 15:45:00', 'completed', 'Mostrador');

-- Hace 5 días (2026-02-07)
INSERT INTO orders (customer_id, created_at, status, channel) VALUES 
(4, '2026-02-07 07:45:00', 'completed', 'Mostrador'),
(5, '2026-02-07 11:00:00', 'completed', 'App Móvil'),
(6, '2026-02-07 16:30:00', 'completed', 'Mostrador'),
(1, '2026-02-07 18:00:00', 'cancelled', 'Delivery'),  -- Orden cancelada
(11, '2026-02-07 08:20:00', 'completed', 'Delivery'),
(12, '2026-02-07 13:15:00', 'completed', 'Mostrador'),
(13, '2026-02-07 17:00:00', 'completed', 'App Móvil');

-- Hace 4 días (2026-02-08)
INSERT INTO orders (customer_id, created_at, status, channel) VALUES 
(7, '2026-02-08 09:00:00', 'completed', 'Delivery'),
(2, '2026-02-08 12:30:00', 'completed', 'Mostrador'),
(8, '2026-02-08 15:45:00', 'completed', 'App Móvil'),
(14, '2026-02-08 07:30:00', 'completed', 'Mostrador'),
(15, '2026-02-08 11:45:00', 'completed', 'Delivery'),
(16, '2026-02-08 16:20:00', 'completed', 'App Móvil');

-- Hace 3 días (2026-02-09)
INSERT INTO orders (customer_id, created_at, status, channel) VALUES 
(3, '2026-02-09 08:15:00', 'completed', 'Mostrador'),
(4, '2026-02-09 10:20:00', 'completed', 'Delivery'),
(5, '2026-02-09 13:00:00', 'completed', 'App Móvil'),
(6, '2026-02-09 17:30:00', 'completed', 'Mostrador'),
(17, '2026-02-09 09:30:00', 'completed', 'Mostrador'),
(18, '2026-02-09 14:15:00', 'completed', 'App Móvil'),
(9, '2026-02-09 18:45:00', 'completed', 'Delivery');

-- Hace 2 días (2026-02-10)
INSERT INTO orders (customer_id, created_at, status, channel) VALUES 
(7, '2026-02-10 07:30:00', 'completed', 'App Móvil'),
(8, '2026-02-10 11:45:00', 'completed', 'Mostrador'),
(1, '2026-02-10 14:00:00', 'completed', 'Delivery'),
(2, '2026-02-10 16:20:00', 'pending', 'Mostrador'),   -- Orden pendiente
(10, '2026-02-10 08:45:00', 'completed', 'Mostrador'),
(11, '2026-02-10 12:00:00', 'completed', 'App Móvil'),
(12, '2026-02-10 15:30:00', 'completed', 'Delivery'),
(13, '2026-02-10 19:00:00', 'cancelled', 'Mostrador');  -- Cancelada

-- Hace 1 día (2026-02-11)
INSERT INTO orders (customer_id, created_at, status, channel) VALUES 
(3, '2026-02-11 08:00:00', 'completed', 'Mostrador'),
(4, '2026-02-11 09:30:00', 'completed', 'App Móvil'),
(5, '2026-02-11 12:15:00', 'completed', 'Delivery'),
(6, '2026-02-11 15:40:00', 'completed', 'Mostrador'),
(7, '2026-02-11 18:00:00', 'completed', 'App Móvil'),
(14, '2026-02-11 07:15:00', 'completed', 'App Móvil'),
(15, '2026-02-11 10:30:00', 'completed', 'Mostrador'),
(16, '2026-02-11 13:45:00', 'completed', 'Delivery'),
(17, '2026-02-11 16:00:00', 'completed', 'App Móvil'),
(18, '2026-02-11 19:30:00', 'completed', 'Mostrador');

-- Hoy (2026-02-12)
INSERT INTO orders (customer_id, created_at, status, channel) VALUES 
(8, '2026-02-12 07:45:00', 'completed', 'Mostrador'),
(1, '2026-02-12 09:00:00', 'completed', 'App Móvil'),
(2, '2026-02-12 11:30:00', 'completed', 'Delivery'),
(9, '2026-02-12 08:15:00', 'completed', 'Mostrador'),
(10, '2026-02-12 10:45:00', 'completed', 'Delivery'),
(11, '2026-02-12 12:30:00', 'pending', 'App Móvil'),    -- Pendiente
(12, '2026-02-12 14:00:00', 'completed', 'Mostrador'),
(13, '2026-02-12 16:15:00', 'completed', 'App Móvil');

-- 5. Detalle de Órdenes (order_items)
INSERT INTO order_items (order_id, product_id, qty, unit_price) VALUES 
-- Orden 1
(1, 1, 2, 45.00),  -- 2 Americanos
(1, 9, 1, 35.00),  -- 1 Croissant
-- Orden 2
(2, 14, 1, 320.00), -- Café Chiapas
(2, 23, 1, 150.00), -- Taza
-- Orden 3
(3, 2, 1, 65.00),   -- Latte
(3, 11, 1, 45.00),  -- Brownie
-- Orden 4
(4, 3, 1, 60.00),   -- Cappuccino
(4, 11, 1, 45.00),  -- Brownie
-- Orden 5
(5, 1, 2, 45.00),   -- 2 Americanos
(5, 9, 1, 35.00),   -- Croissant
-- Orden 6
(6, 6, 2, 55.00),   -- 2 Cold Brew
(6, 20, 1, 30.00),  -- Galletas
-- Orden 7
(7, 4, 1, 70.00),   -- Mocha
(7, 12, 1, 65.00),  -- Cheesecake
-- Orden 8
(8, 1, 3, 45.00),   -- 3 Americanos
-- Orden 9 (cancelada)
(9, 3, 2, 60.00),
-- Orden 10
(10, 7, 1, 75.00),   -- Frappé
(10, 12, 1, 65.00),  -- Cheesecake
-- Orden 11
(11, 4, 1, 70.00),   -- Mocha
(11, 13, 1, 38.00),  -- Pan plátano
-- Orden 12
(12, 14, 1, 320.00), -- Café Chiapas
(12, 20, 2, 30.00),  -- 2 Galletas
-- Orden 13
(13, 1, 3, 45.00),   -- 3 Americanos
(13, 21, 1, 55.00),  -- Almendras
-- Orden 14
(14, 18, 1, 450.00), -- Prensa Francesa
(14, 1, 1, 45.00),
-- Orden 15
(15, 2, 1, 65.00),
(15, 13, 1, 38.00),  -- Pan plátano
-- Orden 16
(16, 6, 1, 55.00),
(16, 7, 1, 75.00),
-- Orden 17
(17, 6, 2, 55.00),   -- 2 Cold Brew
(17, 11, 2, 45.00),  -- 2 Brownies
-- Orden 18
(18, 2, 1, 65.00),   -- Latte
(18, 23, 1, 150.00), -- Taza
-- Orden 19
(19, 5, 2, 55.00),   -- 2 Té Chai
(19, 9, 2, 35.00),   -- 2 Croissants
-- Orden 20
(20, 1, 2, 45.00),
(20, 9, 2, 35.00),
-- Orden 21
(21, 15, 1, 180.00), -- Café Colombia
(21, 21, 1, 55.00),  -- Almendras
-- Orden 22
(22, 4, 1, 70.00),
(22, 11, 1, 45.00),
-- Orden 23
(23, 3, 2, 60.00),
(23, 20, 1, 30.00),
-- Orden 24
(24, 1, 1, 45.00),
(24, 6, 1, 55.00),
-- Orden 25
(25, 5, 1, 55.00),   -- Té Chai
(25, 12, 1, 65.00),
-- Orden 26
(26, 1, 4, 45.00),   -- 4 Americanos (grupo)
(26, 9, 3, 35.00),   -- 3 Croissants
-- Orden 27
(27, 14, 1, 320.00),
(27, 19, 1, 650.00), -- Chemex
-- Orden 28
(28, 6, 2, 55.00),
(28, 11, 2, 45.00),
-- Orden 29 (pendiente)
(29, 2, 1, 65.00),
-- Orden 30
(30, 1, 1, 45.00),
(30, 13, 1, 38.00),
-- Orden 31
(31, 7, 1, 75.00),   -- Frappé
(31, 11, 1, 45.00),
-- Orden 32
(32, 3, 2, 60.00),
(32, 20, 2, 30.00),
-- Orden 33
(33, 18, 1, 450.00), -- Prensa Francesa
(33, 16, 1, 280.00), -- Café Brasil
-- Orden 34
(34, 3, 1, 60.00),
(34, 20, 1, 30.00),
-- Orden 35
(35, 1, 1, 45.00),
(35, 6, 1, 55.00),
-- Orden 36
(36, 4, 2, 70.00),   -- 2 Mochas
(36, 12, 1, 65.00),
-- Orden 37
(37, 2, 1, 65.00),
(37, 11, 1, 45.00),
-- Orden 38
(38, 1, 5, 45.00),   -- 5 Americanos (pedido grande)
(38, 9, 4, 35.00),   -- 4 Croissants
-- Orden 39
(39, 2, 1, 65.00),
(39, 12, 1, 65.00),
-- Orden 40 (cancelada)
(40, 7, 1, 75.00),
-- Orden 41
(41, 14, 1, 320.00),
(41, 24, 1, 420.00), -- Termo
-- Orden 42
(42, 15, 1, 180.00), -- Café Colombia
(42, 19, 1, 650.00), -- Chemex
-- Orden 43
(43, 1, 2, 45.00),
(43, 13, 1, 38.00),
-- Orden 44
(44, 6, 1, 55.00),
(44, 7, 1, 75.00),
(44, 11, 1, 45.00),
-- Orden 45
(45, 3, 1, 60.00),
(45, 9, 1, 35.00),
-- Orden 46
(46, 2, 1, 65.00),
(46, 12, 1, 65.00),
-- Orden 47
(47, 14, 1, 320.00),
(47, 24, 1, 420.00), -- Termo
-- Orden 48 (pendiente)
(48, 4, 1, 70.00),
-- Orden 49
(49, 1, 1, 45.00),
(49, 6, 1, 55.00),
(49, 20, 1, 30.00),
-- Orden 50
(50, 3, 2, 60.00),
(50, 21, 1, 55.00);

-- 6. Pagos
INSERT INTO payments (order_id, method, paid_amount) VALUES 
(1, 'Efectivo', 125.00),
(2, 'Tarjeta de Crédito', 470.00),
(3, 'Transferencia', 110.00),
(4, 'Tarjeta de Débito', 105.00),
(5, 'Efectivo', 125.00),
(6, 'Tarjeta de Crédito', 140.00),
(7, 'Transferencia', 135.00),
(8, 'Efectivo', 135.00),
-- Orden 9 cancelada (sin pago)
(10, 'Tarjeta de Crédito', 140.00),
(11, 'Transferencia', 108.00),
(12, 'Efectivo', 380.00),
(13, 'Tarjeta de Débito', 190.00),
(14, 'Transferencia', 495.00),
(15, 'Tarjeta de Crédito', 103.00),
(16, 'Efectivo', 130.00),
(17, 'Tarjeta de Débito', 200.00),
(18, 'Transferencia', 215.00),
(19, 'Efectivo', 180.00),
(20, 'Tarjeta de Crédito', 160.00),
(21, 'Transferencia', 235.00),
(22, 'Efectivo', 115.00),
(23, 'Tarjeta de Débito', 150.00),
(24, 'Efectivo', 100.00),
(25, 'Tarjeta de Crédito', 120.00),
(26, 'Efectivo', 285.00),
(27, 'Tarjeta de Crédito', 970.00),
(28, 'Transferencia', 200.00),
-- Orden 29 pendiente (sin pago)
(30, 'Efectivo', 83.00),
(31, 'Tarjeta de Débito', 120.00),
(32, 'Efectivo', 180.00),
(33, 'Tarjeta de Crédito', 730.00),
(34, 'Efectivo', 90.00),
(35, 'Tarjeta de Débito', 100.00),
(36, 'Transferencia', 205.00),
(37, 'Efectivo', 110.00),
(38, 'Efectivo', 365.00),
(39, 'Tarjeta de Crédito', 130.00),
-- Orden 40 cancelada (sin pago)
(41, 'Transferencia', 740.00),
(42, 'Tarjeta de Crédito', 830.00),
(43, 'Efectivo', 128.00),
(44, 'Transferencia', 175.00),
(45, 'Tarjeta de Débito', 95.00),
(46, 'Tarjeta de Crédito', 130.00),
(47, 'Transferencia', 740.00),
-- Orden 48 pendiente (sin pago)
(49, 'Efectivo', 130.00),
(50, 'Tarjeta de Débito', 175.00);