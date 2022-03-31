export interface ListProductsInput {
  limit: number;
  offset: number;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  notPurchased?: boolean;
}
