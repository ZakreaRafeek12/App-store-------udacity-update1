CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price numeric DEFAULT 0.00,
    category VARCHAR(50)
)1