import { getRepository } from "typeorm";
import { StockKeepingUnit } from "../entities/stockKeepingUnit/stockKeepingUnit.entity";
import { CreateProductInput } from "../types/createProduct/CreateProduct.input";

const create = async (input: CreateProductInput) => {
  try {
    // TODO create input interface and finish service
    
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default {
  create,
};
