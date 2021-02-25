import { Router } from 'express';

import { create, userAddress } from "./address.controller";
import { customerAuth } from '../customer'
const routes = Router(); 

routes.post('/', customerAuth, create);
routes.get('/', customerAuth, userAddress);

export default routes;