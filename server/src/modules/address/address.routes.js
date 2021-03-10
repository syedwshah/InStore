import { Router } from 'express';

import { create, userAddress, update, deleteAddress } from "./address.controller";
import { customerAuth } from '../customer';

const routes = Router(); 

routes.post('/', customerAuth, create);
routes.get('/', customerAuth, userAddress);
routes.put('/:id', customerAuth, update);
routes.delete('/:id', customerAuth, deleteAddress);

export default routes;