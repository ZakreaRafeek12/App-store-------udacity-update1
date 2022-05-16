import { Router, Request, Response } from 'express';

import 
{
  createUser,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
} from '../../controllers/users.controller';

const route = Router();

route.route('/').get(getUsers).post(createUser);
route.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

export default route;
