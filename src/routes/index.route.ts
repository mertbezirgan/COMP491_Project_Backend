import * as express from 'express';

import userAuth from './user/auth.route';
import productRoute from './product/mainProduct.route';
import orderRoute from './order/order.route';

const router = express.Router();

router.use('/user/auth', userAuth);
router.use('/product', productRoute);
router.use('/order', orderRoute);

export default router;
