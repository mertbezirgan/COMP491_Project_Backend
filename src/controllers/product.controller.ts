import IController from "IController";
import apiResponse from "../utilities/apiResponse";
import httpStatusCodes from "http-status-codes";
import productService from "../services/product.service";
import { CreateProductInput } from "../types/createProduct/CreateProduct.input";
import { ListProductsInput } from "../types/listProduct/ListProduct.input";

const create: IController = async (req, res) => {
  let input: CreateProductInput = {
    name: req.body.name,
    description: req.body.description,
    weight: req.body.weight,
    price: req.body.price,
    bundle_price: req.body.bundle_price,
    token: req.body.token,
    skus: req.body.skus,
    images: req.body.images,
  };
  let result = await productService.create(input);

  if (result.success) {
    apiResponse.result(res, result.product, httpStatusCodes.CREATED);
  } else {
    apiResponse.error(res, httpStatusCodes.INTERNAL_SERVER_ERROR, result.error);
  }
};

const get: IController = async (req, res) => {
  let sid = req.params.id;
  if (!sid) return apiResponse.error(res, httpStatusCodes.BAD_REQUEST);
  let id = +sid; // Cast to number

  let product = await productService.getProductById(id);
  if (!product) return apiResponse.error(res, httpStatusCodes.NOT_FOUND);

  return apiResponse.result(res, product, httpStatusCodes.OK);
};

const list: IController = async (req, res) => {
  let input: ListProductsInput = {
    limit: req.body.limit,
    offset: req.body.offset,
    minPrice: req.body.minPrice,
    maxPrice: req.body.maxPrice,
    sortBy: req.body.sortBy,
    notPurchased: req.body.notPurchased,
  };
  let result = await productService.list(input);
  if (result.success) {
    apiResponse.result(res, result.products, httpStatusCodes.OK);
  } else {
    apiResponse.error(res, httpStatusCodes.INTERNAL_SERVER_ERROR, result.error);
  }
};

export default {
  create,
  get,
  list,
};
