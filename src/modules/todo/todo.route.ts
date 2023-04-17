import { Router } from "express";
import * as todoController from "./todo.controller";
import * as todoSchema from "./todo.schema";
import validateRequest from "@middlewares/validateRequest";
import { checkAuth } from "@middlewares/checkAuth";

const router: Router = Router();

router.post(
  "/",
  checkAuth,
  validateRequest(todoSchema.addTodo, "body"),
  todoController.addTodo
);

router.get(
  "/",
  checkAuth,
  validateRequest(todoSchema.getTodos, "query"),
  todoController.getTodos
);

router.get("/:todoId", checkAuth, todoController.getTodo);

router.patch(
  "/:todoId",
  checkAuth,
  validateRequest(todoSchema.updateTodo, "body"),
  todoController.updateTodo
);

router.delete("/:todoId", checkAuth, todoController.deleteTodo);

export default router;
