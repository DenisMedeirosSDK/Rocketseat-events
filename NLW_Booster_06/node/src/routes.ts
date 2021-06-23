import { Router } from "express";

import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();

const routes = Router();

routes.post("/users", createUserController.handle);
routes.post("/tags", ensureAdmin, createTagController.handle);

export { routes };
