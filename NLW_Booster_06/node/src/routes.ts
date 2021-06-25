import { Router } from "express";

import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { AuthenticateUserController } from "./controllers/AuthenticateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ListUserSendComplimentsController } from "./controllers/ListUserSendComplimentsController";
import { ListUserReceiveComplimentsController } from "./controllers/ListUserReceiveComplimentsController";
import { ListTagController } from "./controllers/ListTagController";

import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { ListUserController } from "./controllers/ListUserController";

const createUserController = new CreateUserController();
const listUserController = new ListUserController();
const createTagController = new CreateTagController();
const listTagController = new ListTagController();
const authenticateUserController = new AuthenticateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSendComplimentsController =
  new ListUserSendComplimentsController();
const listUserReceiveComplimentsController =
  new ListUserReceiveComplimentsController();

const routes = Router();

routes.post("/users", createUserController.handle);
routes.get("/users", ensureAuthenticated, listUserController.handle);

routes.post(
  "/tags",
  ensureAuthenticated,
  ensureAdmin,
  createTagController.handle
);

routes.get("/tags", ensureAuthenticated, listTagController.handle);

routes.post("/login", authenticateUserController.handle);

routes.post(
  "/compliments",
  ensureAuthenticated,
  createComplimentController.handle
);

routes.get(
  "/users/compliments/send",
  ensureAuthenticated,
  listUserSendComplimentsController.handle
);
routes.get(
  "/users/compliments/receive",
  ensureAuthenticated,
  listUserReceiveComplimentsController.handle
);

export { routes };
