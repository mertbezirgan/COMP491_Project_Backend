import { getRepository } from "typeorm";
import { size } from "../constants/enums";
import { Product } from "../entities/product/product.entity";
import { ProductImage } from "../entities/product/productImage.entity";
import { StockKeepingUnit } from "../entities/stockKeepingUnit/stockKeepingUnit.entity";
import { Token } from "../entities/token/token.entity";
import { CreateProductInput } from "../types/createProduct/CreateProduct.input";

const create = async (input: CreateProductInput) => {
  try {
    const productRepository = await getRepository(Product);
    const productImageRepository = await getRepository(ProductImage);
    const stockKeepingUnitRepository = await getRepository(StockKeepingUnit);
    const tokenRepository = await getRepository(Token);
    //create product
    const product = new Product();
    product.name = input.name;
    product.description = input.description;
    product.weight = input.weight;
    product.price = input.price;
    product.bundle_price = input.bundle_price;

    //create token
    const token = new Token();
    token.token_address = input.token.token_address;
    token.image_url = input.token.image_url;
    let savedToken = await tokenRepository.save(token);
    product.token = savedToken;
    let savedProduct = await productRepository.save(product);
    //create skus
    let skus: StockKeepingUnit[] = [];
    input.skus.map(async (sku) => {
      const newSku = new StockKeepingUnit();
      newSku.size = sku.size as size;
      newSku.sku = product.id + "-" + newSku.size;
      newSku.stock = sku.stock;
      // newSku.is_available = true;
      newSku.product = product;
      let savedSku = await stockKeepingUnitRepository.save(newSku);
      skus.push(savedSku);
    });
    //create images
    let images: ProductImage[] = [];
    input.images.map(async (image) => {
      const newImage = new ProductImage();
      newImage.image_url = image.url;
      newImage.alt_text = image.altText;
      newImage.product = product;
      let savedImage = await productImageRepository.save(newImage);
      images.push(savedImage);
    });
    console.log(savedProduct);
    console.log(savedToken);
    console.log(skus);
    console.log(images);
  } catch (error) {
    console.log(error);
  }
};

const getProductById = async (id: number) => {
  try {
    return await getRepository(Product).findOne({ id });
  } catch (e) {
    console.log(e);
    return null;
  }
}

export default {
  create,
  getProductById
}
