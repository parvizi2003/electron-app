export type User = {
  id: number;
  name: string;
  email: string | null;
  phone_number: string | null;
  address: string | null;
  role: string;
};

export type LoginFormValues = {
  email: string;
  password: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  image_url: string;
};

export type Product = {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  image_url: string;
};

export type Cart = {
  id: number;
  user_id: number;
  total: number;
  items_count: number;
};

export type CartItem = {
  id: number;
  cart_id: number;
  product_id: number;
  count: number;
  total: number;
};

export interface CartItemWithProduct extends CartItem {
  product: Product;
}

export interface CartWithItems extends Cart {
  items: CartItemWithProduct[];
}

export type Order = {
  id: number;
  user_id: number | null;
  phone_number: string | null;
  address: null | string;
  user_name: string;
  items_count: number;
  total: number;
  status:
    | "PENDING"
    | "PREPARING"
    | "READY"
    | "DELIVERING"
    | "COMPLETED"
    | "CANCELLED";
};

export type OrderItem = {
  id: number;
  order_id: number;
  items_count: number;
  price_at_add: number;
  product_id: number;
  product_name: string;
  total: number;
};

export interface OrderWithItems extends Order {
  items: OrderItem[];
}

export type ErrorResponse = {
  message: string;
  errors?: Record<string, string[]>;
};
