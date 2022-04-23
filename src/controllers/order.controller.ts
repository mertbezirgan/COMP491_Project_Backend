import IController from "IController";
import apiResponse from "../utilities/apiResponse";
import httpStatusCodes from "http-status-codes";
import { CreateOrderInput } from "order/CreateOrder.input";
import orderService from "../services/order.service";

const create: IController = async (req, res) => {
  let input = req.body as CreateOrderInput
  let orderRes = await orderService.create(input);

  if (!orderRes.success) {
    return apiResponse.error(res, httpStatusCodes.BAD_REQUEST, "Error occured");
  }

  return apiResponse.result(res, orderRes);
};


export default {
  create,
}
