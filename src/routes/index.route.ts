import * as express from 'express';

import userAuth from './user/auth.route';
import productRoute from './product/mainProduct.route';
import orderRoute from './order/order.route';
import productReviewRoute from './productReview/productReview.route';
import addressRoute from './address/address.route';

const router = express.Router();

router.use('/user/auth', userAuth);
router.use('/product', productRoute);
router.use('/order', orderRoute);
router.use('/productReview', productReviewRoute);
router.use('/address', addressRoute);

export default router;
