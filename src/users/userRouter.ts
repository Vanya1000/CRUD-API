import Router from "../server/Router.js";
import userController from "./userController.js";

const userRouter = new Router();

userRouter.get("/api/users", userController.getAll);
userRouter.get("/api/users/:id", userController.getById);
userRouter.post("/api/users", userController.create);
userRouter.put("/api/users/:id", userController.update);
userRouter.delete("/api/users/:id", userController.delete);

export default userRouter;
