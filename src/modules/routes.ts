import { Router } from "express";
import userRoutes from "./user/user.route";
import todoRoutes from "./todo/todo.route";

const router: Router = Router();

router.use("/users", userRoutes);

router.use("/todos", todoRoutes);

export default router;
