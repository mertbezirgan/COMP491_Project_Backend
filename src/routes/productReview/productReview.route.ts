import express from "express";
import { celebrate } from "celebrate";
import productReviewController from "../../controllers/productReview.controller";
import productReviewSchema from "../../constants/schema/productReview.schema";

const router = express.Router();

router.post("/", celebrate(productReviewSchema.create), productReviewController.create);

export default router;
