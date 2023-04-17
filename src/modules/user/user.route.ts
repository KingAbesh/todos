import { Router } from "express";
import * as userController from "./user.controller";
import * as userSchema from "./user.schema";
import validateRequest from "@middlewares/validateRequest";
import { checkAuth } from "@middlewares/checkAuth";

const router: Router = Router();

router.post(
  "/register",
  validateRequest(userSchema.register, "body"),
  userController.register
);

router.post(
  "/login",
  validateRequest(userSchema.login, "body"),
  userController.login
);

router.get("/me", checkAuth, userController.me);

export default router;
