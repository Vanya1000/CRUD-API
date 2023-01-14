import cluster from "cluster";
import { v4 } from "uuid";
import { users } from "../data/users.js";
import { requestToDB } from "../data/requestToDB.js";
import { CreateUserType, UserType } from "../server/types.js";

class UserService {
  public async getAllUsersService() {
    if (cluster.isPrimary) {
      return users;
    } else {
      const users = await requestToDB.getAll();
      return users as UserType[];
    }
  }

  public async createUserService(user: CreateUserType) {
    if (cluster.isPrimary) {
      const newUser = {
        id: v4(),
        username: user.username,
        age: user.age,
        hobbies: user.hobbies,
      };
      users.push(newUser);
      return newUser as UserType;
    } else {
      const newUser = await requestToDB.add(user);
      return newUser as UserType;
    }
  }

  public async getByIdUserService(id: string) {
    if (cluster.isPrimary) {
      const user = users.find((user) => user.id === id);
      if (!user) {
        return null;
      } else {
        return user;
      }
    } else {
      const user = await requestToDB.getById(id);
      return user as UserType;
    }
  }

  public async updateUserService(id: string, user: CreateUserType) {
    if (cluster.isPrimary) {
      const userIndex = users.findIndex((user) => user.id === id);
      users[userIndex] = {
        id: id,
        username: user.username,
        age: user.age,
        hobbies: user.hobbies,
      };
      return users[userIndex];
    } else {
      const updatedUser = await requestToDB.update(id, user);
    return updatedUser as UserType;
    }
  }

  public async deleteUserService(id: string) {
    if (cluster.isPrimary) {
      const userIndex = users.findIndex((user) => user.id === id);
      users.splice(userIndex, 1);
      return null;
    } else {
      await requestToDB.delete(id);
    }
  }
}

export default new UserService();
