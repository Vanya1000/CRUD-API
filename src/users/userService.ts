import { v4 } from 'uuid'
import { users } from "../data/users.js";
import { CreateUserType } from "../server/types.js";

class UserService {
  public getAllUsersService() {
    return users;
  }
  public createUserService(user: CreateUserType) {
    const newUser = {
      id: v4(),
      username: user.username,
      age: user.age,
      hobbies: user.hobbies,
    }
    users.push(newUser);
    return newUser;
  }

  public getByIdUserService(id: string) {
    const user = users.find((user) => user.id === id);
    return user;
  }

  public updateUserService(id: string, user: CreateUserType) {
    const userIndex = users.findIndex((user) => user.id === id);
    users[userIndex] = {
      id,
      username: user.username,
      age: user.age,
      hobbies: user.hobbies,
    };
    return users[userIndex];
  }

  public deleteUserService(id: string) {
    const userIndex = users.findIndex((user) => user.id === id);
    users.splice(userIndex, 1);
  }
}

export default new UserService();
