import { CreateOrderInput } from "order/CreateOrder.input";
import { CreateOrderOutput } from "order/CreateOrder.output";
import { Order } from "../entities/order/order.entity";
import { getRepository } from "typeorm";
import { StockKeepingUnit } from "../entities/stockKeepingUnit/stockKeepingUnit.entity";
import { CreateProductInput } from "../types/createProduct/CreateProduct.input";

const create = async (input: CreateOrderInput): Promise<CreateOrderOutput> => {
  const stockKeepingUnitRepository = getRepository(StockKeepingUnit);
  const orderRepository = getRepository(Order);

  try {
    let res: CreateOrderOutput = { success: false };
    let sku = await stockKeepingUnitRepository.findOne(input.sku_id);
    if (!sku) return res;
    if (sku.stock <= 0) return res;
    sku.stock--;
    sku = await stockKeepingUnitRepository.save(sku);

    let order = new Order();
    order = { ...input, ...order };
    order = await orderRepository.save(order);

    res.success = true;
    res.order = order;
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  create,
};
