import IController from "IController";
import apiResponse from "../utilities/apiResponse";
import httpStatusCodes from "http-status-codes";
import productService from "../services/product.service";
import { CreateProductInput } from "../types/createProduct/CreateProduct.input";

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
  let product = productService.create(input);
  apiResponse.error(res, httpStatusCodes.BAD_REQUEST, "Not implemented");
};

export default {
  create,
};
