import { ProductReview } from "../../entities/product/productReview.entity";

export interface CreateProductReviewOutput {
  success: boolean;
  productReview?: ProductReview;
  error?: string;
}
