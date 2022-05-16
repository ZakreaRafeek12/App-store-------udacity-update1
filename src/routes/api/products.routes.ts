import { Router, Request, Response } from 'express';

import 
{
  createProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from '../../controllers/products.controller';

const route = Router();

route.route('/').get(getProducts).post(createProduct);
route.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct);

export default route;
