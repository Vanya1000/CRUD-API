import { validate } from "uuid";
import { HandlerType, CreateUserType } from "../server/types.js";
import { errorHandler } from "../utils/index.js";
import { checkValid } from "../validator/index.js";
import { CreateUserDto } from "./dto/create-user.dto.js";
import userService from "./userService.js";

class UserController {
  public getAll: HandlerType = async (req, res) => {
    try {
      if (!res.send) throw new Error("res.send is undefined");
      const users = userService.getAllUsersService();
      res.send(users);
    } catch (error) {
      errorHandler(error, res);
    }
  };

  public getById: HandlerType = async (req, res, id) => {
    try {
      if (!res.send) throw new Error("res.send is undefined");
      if (!id || !validate(id)) {
        res.send({ message: "Invalid id" }, 400);
        return;
      }
      const user = userService.getByIdUserService(id);
      if (!user) {
        res.send({ message: "User not found" }, 404);
        return;
      }
      res.send(user);
    } catch (error) {
      errorHandler(error, res);
    }
  };

  public create: HandlerType = async (req, res) => {
    try {
      if (!res.send) throw new Error("res.send is undefined");
      const user = req.body as CreateUserType;
      const errors = checkValid(user, CreateUserDto);
      if (errors.length) {
        res.send({ message: "Validation failed", errors }, 400);
        return;
      }
      const newUser = userService.createUserService(user);
      res.send(newUser, 201);
    } catch (error) {
      errorHandler(error, res);
    }
  };

  public update: HandlerType = async (req, res, id) => {
    try {
      if (!res.send) throw new Error("res.send is undefined");
      if (!id || !validate(id)) {
        res.send({ message: "Invalid id" }, 400);
        return;
      }
      const user = userService.getByIdUserService(id);
      if (!user) {
        res.send({ message: "User not found" }, 404);
        return;
      }
      const updatedUser = req.body as CreateUserType;
      const errors = checkValid(updatedUser, CreateUserDto);
      if (errors.length) {
        res.send({ message: "Validation failed", errors }, 400);
        return;
      }
      const updated = userService.updateUserService(id, updatedUser);
      res.send(updated);
    } catch (error) {
      errorHandler(error, res);
    }
  }

  public delete: HandlerType = async (req, res, id) => {
    try {
      if (!res.send) throw new Error("res.send is undefined");
      if (!id || !validate(id)) {
        res.send({ message: "Invalid id" }, 400);
        return;
      }
      const user = userService.getByIdUserService(id);
      if (!user) {
        res.send({ message: "User not found" }, 404);
        return;
      }
      userService.deleteUserService(id);
      res.send({ message: `User ${id} was successfully deleted` }, 204);
    } catch (error) {
      errorHandler(error, res);
    }
  }
}

export default new UserController();
