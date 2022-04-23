import { CreateProductReviewInput } from "productReview/CreateProductReview.input";
import { CreateProductReviewOutput } from "productReview/CreateProductReview.output";
import { ProductReview } from "../entities/product/productReview.entity";
import { getRepository } from "typeorm";

const create = async (input: CreateProductReviewInput): Promise<CreateProductReviewOutput> => {
  const productReviewRepository = getRepository(ProductReview);

  try {
    let res: CreateProductReviewOutput = { success: false };
    let productReview = new ProductReview();
    productReview = { ...input, ...productReview };
    productReview = await productReviewRepository.save(productReview);

    res.success = true;
    res.productReview = productReview;
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  create,
};
