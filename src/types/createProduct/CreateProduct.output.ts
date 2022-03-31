import { Product } from "../../entities/product/product.entity";

export interface CreateProductOutput {
  success: boolean;
  error?: string;
  product?: Product;
}
