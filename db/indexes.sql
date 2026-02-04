-- vw_sales_daily 
CREATE INDEX idx_orders_created_at ON orders(created_at);

-- vw_top_products_ranked 
CREATE INDEX idx_order_items_product_id ON order_items(product_id);

-- vw_inventory_risk 
CREATE INDEX idx_products_category_id ON products(category_id);