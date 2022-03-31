import { Product } from "../../entities/product/product.entity";

export interface ListProductsOutput {
  success: boolean;
  products?: Product[];
  error?: string;
}
