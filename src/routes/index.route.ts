import * as express from 'express';

import userAuth from './user/auth.route';
import productRoute from './product/mainProduct.route';

const router = express.Router();

router.use('/user/auth', userAuth);
router.use('/product', productRoute);

export default router;
