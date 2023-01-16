import { v4 } from "uuid";
import { UserType } from "../server/types.js";

export const users: UserType[] = [];

process.on("message", ({ cmd, data }) => {
  if (process.send) {
    if (cmd === "getUsers") {
      process.send(users);
    }
    if (cmd === "addUser") {
      const newUser = {
        id: v4(),
        username: data.username,
        age: data.age,
        hobbies: data.hobbies,
      };
      users.push(newUser);
      process.send(newUser);
    }
    if (cmd === "getById") {
      const user = users.find((user) => user.id === data);
      if (!user) {
        process.send(null);
      } else {
        process.send(user);
      }
    }
    if (cmd === "update") {
      const userIndex = users.findIndex((user) => user.id === data.id);
      users[userIndex] = {
        id: data.id,
        username: data.user.username,
        age: data.user.age,
        hobbies: data.user.hobbies,
      };
      process.send(users[userIndex]);
    }
    if (cmd === "delete") {
      const userIndex = users.findIndex((user) => user.id === data);
      users.splice(userIndex, 1);
      process.send(null);
    }
  }
});
process.stdin.on("data", () => null);
