import IController from "IController";
import apiResponse from "../utilities/apiResponse";
import httpStatusCodes from "http-status-codes";
import productReviewService from "../services/productReview.service";
import { CreateProductReviewInput } from "productReview/CreateProductReview.input";

const create: IController = async (req, res) => {
  let input = req.body as CreateProductReviewInput
  let productReviewRes = await productReviewService.create(input);

  if (!productReviewRes.success) {
    return apiResponse.error(res, httpStatusCodes.BAD_REQUEST, "Error occured");
  }

  return apiResponse.result(res, productReviewRes);
};


export default {
  create,
}
