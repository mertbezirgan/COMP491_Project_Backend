import { CreateOrderInput } from "order/CreateOrder.input";
import { CreateOrderOutput } from "order/CreateOrder.output";
import { Order } from "../entities/order/order.entity";
import { getRepository } from "typeorm";
import { StockKeepingUnit } from "../entities/stockKeepingUnit/stockKeepingUnit.entity";
import { orderStatus } from "../constants/enums";
import { User } from "../entities/user/user.entity";

const create = async (input: CreateOrderInput): Promise<CreateOrderOutput> => {
  const stockKeepingUnitRepository = getRepository(StockKeepingUnit);
  const orderRepository = getRepository(Order);
  const userRepository = getRepository(User);

  try {
    let res: CreateOrderOutput = { success: false };
    let sku = await stockKeepingUnitRepository.findOne(input.sku_id);
    if (!sku) return res;
    if (sku.stock <= 0) return res;
    sku.stock--;
    sku = await stockKeepingUnitRepository.save(sku);

    let user = await userRepository.findOne({
      where: { id: input.user_id },
      relations: ["addresses"],
    });
    if (!user) return res;

    let address = user.addresses.filter(x => x.id == input.address_id).length > 0 ? user.addresses.filter(x => x.id == input.address_id)[0] : null;
    if (!address) return res;

    let order = new Order();
    order = { ...input, ...order };
    order.status = orderStatus.pending;
    order.stockKeepingUnit = sku;
    order.user = user;
    order.address = address;
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
