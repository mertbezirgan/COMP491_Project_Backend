import IController from "IController";
import apiResponse from "../utilities/apiResponse";
import httpStatusCodes from "http-status-codes";
import { CreateAddressInput } from "address/CreateAddress.input";
import addressService from "../services/address.service";

const create: IController = async (req, res) => {
  let input = req.body as CreateAddressInput
  let addressRes = await addressService.create(input);

  if (!addressRes.success) {
    return apiResponse.error(res, httpStatusCodes.BAD_REQUEST, "Error occured");
  }

  return apiResponse.result(res, addressRes);
};


export default {
  create,
}
