import { CreateUserType } from "../server/types";

class RequestToDB {
  public async getAll() {
    return new Promise((resolve) => {
      if (process.send) {
        process.send({ cmd: "getUsers" });
      }
      process.on("message", (data) => {
        resolve(data);
      });
    });
  }

  public async add(user: CreateUserType) {
    return new Promise((resolve) => {
      if (process.send) {
        process.send({ cmd: "addUser", data: user });
      }
      process.on("message", (data) => {
        resolve(data);
      });
    });
  }

  public async getById(id: string) {
    return new Promise((resolve) => {
      if (process.send) {
        process.send({ cmd: "getById", data: id });
      }
      process.on("message", (data) => {
        resolve(data);
      });
    });
  }

  public async update(id: string, user: CreateUserType) {
    return new Promise((resolve) => {
      if (process.send) {
        process.send({ cmd: "update", data: { id, user } });
      }
      process.on("message", (data) => {
        resolve(data);
      });
    });
  }

  public async delete(id: string) {
    return new Promise((resolve) => {
      if (process.send) {
        process.send({ cmd: "delete", data: id });
      }
      process.on("message", (data) => {
        resolve(data);
      });
    });
  }
}

export const requestToDB = new RequestToDB();
