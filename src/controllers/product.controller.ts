import IController from "IController"
import apiResponse from '../utilities/apiResponse';
import httpStatusCodes from 'http-status-codes';
import productService from '../services/product.service';

const create: IController = async (req, res) => {
  let product = productService.create(req.body);
  apiResponse.error(res, httpStatusCodes.BAD_REQUEST, "Not implemented");
}

export default {
  create
}