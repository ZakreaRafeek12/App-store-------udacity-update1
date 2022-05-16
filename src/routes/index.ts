import { Router } from 'express';
import userRoutes from './api/users.routes';
import productRoutes from './api/products.routes';

const route = Router();

route.use('/users', userRoutes);
route.use('/products', productRoutes);

export default route;
