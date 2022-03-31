import { getRepository } from "typeorm";
import { size } from "../constants/enums";
import { Product } from "../entities/product/product.entity";
import { ProductImage } from "../entities/product/productImage.entity";
import { StockKeepingUnit } from "../entities/stockKeepingUnit/stockKeepingUnit.entity";
import { Token } from "../entities/token/token.entity";
import { CreateProductInput } from "../types/createProduct/CreateProduct.input";
import { CreateProductOutput } from "../types/createProduct/createProduct.output";
import { ListProductsInput } from "../types/listProduct/ListProduct.input";
import { ListProductsOutput } from "../types/listProduct/ListProduct.output";

const create = async (
  input: CreateProductInput
): Promise<CreateProductOutput> => {
  try {
    const productRepository = getRepository(Product);
    const productImageRepository = getRepository(ProductImage);
    const stockKeepingUnitRepository = getRepository(StockKeepingUnit);
    const tokenRepository = getRepository(Token);
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

    return {
      success: true,
      product: savedProduct,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

const list = async (input: ListProductsInput): Promise<ListProductsOutput> => {
  try {
    //TODO add nft ownership filter, product type check
    //TODO calculate averate points for each product
    const productRepository = getRepository(Product);
    let query = productRepository.createQueryBuilder("product");
    //left join token and productImages
    query = query.leftJoinAndSelect("product.token", "token");
    query = query.leftJoinAndSelect("product.productImages", "productImages");
    if (input.minPrice) {
      query = query.where("product.price >= :minPrice", {
        minPrice: input.minPrice,
      });
    }
    if (input.maxPrice) {
      query = query.where("product.price <= :maxPrice", {
        maxPrice: input.maxPrice,
      });
    }
    if (input.sortBy) {
      query = query.orderBy(input.sortBy, "ASC");
    }
    if (input.notPurchased) {
      query = query.andWhere("product.once_sold = :once_sold", {
        once_sold: !input.notPurchased,
      });
    }
    query = query.skip(input.offset);
    query = query.take(input.limit);
    let products = await query.getMany();
    return {
      success: true,
      products: products,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
};

const getProductById = async (id: number) => {
  try {
    return await getRepository(Product).findOne(
      { id },
      {
        relations: [
          "token",
          "productImages",
          "stockKeepingUnits",
          "productReviews",
        ],
      }
    );
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default {
  create,
  getProductById,
  list,
};
