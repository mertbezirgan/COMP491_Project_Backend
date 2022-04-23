import express from "express";
import { celebrate } from "celebrate";
import orderController from "../../controllers/order.controller";
import orderSchema from "../../constants/schema/order.schema";

const router = express.Router();

router.post("/", celebrate(orderSchema.create), orderController.create);

export default router;
