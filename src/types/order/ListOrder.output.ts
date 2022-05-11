import { Order } from "../../entities/order/order.entity";

export interface ListOrderOutput {
  success: boolean;
  orders: Order[];
  error?: string;
}
