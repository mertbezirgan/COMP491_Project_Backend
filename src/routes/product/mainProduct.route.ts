import express from 'express';
import { celebrate } from 'celebrate';
import productSchema from '../../constants/schema/product.schema';
import productController from '../../controllers/product.controller';

const router = express.Router();

router.post(
  '/',
  celebrate(productSchema.create),
  productController.create,
);
router.get(
  '/:id',
  celebrate(productSchema.get),
  productController.get
);

export default router