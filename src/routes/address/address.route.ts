import express from "express";
import { celebrate } from "celebrate";
import addressController from "../../controllers/address.controller";
import addressSchema from "../../constants/schema/address.schema";

const router = express.Router();

router.post("/", celebrate(addressSchema.create), addressController.create);

export default router;
