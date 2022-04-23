export interface CreateOrderInput {
  item_price: number;
  tax: number;
  total_price: number;
  status: number;
  sku_id: number;
  user_id: number;
  address: string;
}
