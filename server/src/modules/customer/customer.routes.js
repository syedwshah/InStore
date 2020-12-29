import { Router } from "express";

import { create, getUserInfo } from "./customer.controller";
import { customerAuth } from "./customer";

const routes = Router();

routes.post("/", create); //create a user with this post req
routes.get("/me", customerAuth, getUserInfo); //retrieve info for a potential existing user

export default routes;
