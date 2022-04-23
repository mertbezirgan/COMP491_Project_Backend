import { Order } from "../../entities/order/order.entity";

export interface CreateOrderOutput {
  success: boolean;
  order?: Order;
  error?: string;
}
