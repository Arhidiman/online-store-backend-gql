INSERT INTO categories (name) VALUES
  ('Электроника'),
  ('Книги'),
  ('Одежда'),
  ('Дом'),
  ('Игрушки'),
  ('Спорт'),
  ('Красота'),
  ('Авто');


INSERT INTO products (name, price, image, in_stock, discount, rating, category_id)
SELECT 
  'Товар ' || i,
  ROUND((random() * (50000 - 1000) + 1000)::numeric, 2) AS price,
  'https://placehold.co/200x300/ff5e5e/gray' AS image,
  FLOOR(random() * 100 + 1)::int AS in_stock,
  ROUND((random() * 50)::numeric, 2) AS discount,
  ROUND((random() * 5)::numeric, 1) AS rating,
  FLOOR(random() * 8 + 1)::int AS category_id
FROM generate_series(1, 40) AS s(i);
