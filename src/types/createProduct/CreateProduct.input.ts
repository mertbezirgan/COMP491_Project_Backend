export interface CreateProductInput {
  name: string;
  description: string;
  weight: number;
  price: number;
  bundle_price: number;
  token: { token_address: string; image_url: string };
  skus: { size: string; stock: number }[];
  images: { url: string; altText: string }[];
}
