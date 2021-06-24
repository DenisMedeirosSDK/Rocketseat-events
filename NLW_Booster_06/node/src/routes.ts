import { Router } from "express";

import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ensureAdmin } from "./middlewares/ensureAdmin";

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();

const routes = Router();

routes.post("/users", createUserController.handle);
routes.post("/tags", ensureAdmin, createTagController.handle);
routes.post("/login", authenticateUserController.handle);
routes.post("/compliments", createComplimentController.handle);

export { routes };
