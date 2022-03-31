import { getRepository } from 'typeorm';
import { Product } from "../entities/product/product.entity";

const create = async (body: any) => {
  try {
    
  }catch {

  }
}

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