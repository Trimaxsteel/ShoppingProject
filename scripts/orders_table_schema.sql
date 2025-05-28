// Supabase Orders Table Schema Suggestion
// You should create this table in Supabase if not already present:
// Table: orders
// Columns:
// id (serial, primary key)
// user_email (text)
// items (jsonb)
// total (numeric)
// shipping_address (jsonb)
// created_at (timestamp, default now())

// You can use the following SQL in Supabase SQL editor:
/*
create table orders (
  id serial primary key,
  user_email text,
  items jsonb,
  total numeric,
  shipping_address jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
*/
