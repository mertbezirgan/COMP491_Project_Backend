import IController from "IController"
import apiResponse from '../utilities/apiResponse';
import httpStatusCodes from 'http-status-codes';
import productService from '../services/product.service';

const create: IController = async (req, res) => {
  let product = productService.create(req.body);
  apiResponse.error(res, httpStatusCodes.BAD_REQUEST, "Not implemented");
}

const get: IController = async (req, res) => {
  let sid = req.params.id;
  if (!sid) return apiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  let id = +sid; // Cast to number

  let product = await productService.getProductById(id);
  if (!product) return apiResponse.error(res, httpStatusCodes.NOT_FOUND);

  
}

export default {
  create,
  get
}