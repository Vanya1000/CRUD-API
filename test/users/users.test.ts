import request from "supertest";
import app from "..";

const testUser = {
  username: "test",
  age: 30,
  hobbies: ["test"],
};

const updateUser = {
  username: "updated",
  age: 30,
  hobbies: ["updated"],
};

describe("Test Users endpoints", () => {
  it("should get an empty array users", async () => {
    const response = await request(app.server)
      .get("/api/users")
      .set("Accept", "application/json");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it("should create a new user", async () => {
    const response = await request(app.server)
      .post("/api/users")
      .send(testUser)
      .set("Accept", "application/json");
    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      id: expect.any(String),
      ...testUser,
    });
  });

  it("should get user by Id", async () => {
    const response = await request(app.server)
      .post("/api/users")
      .send(testUser)
      .set("Accept", "application/json");
    const idUser = response.body.id;
    const responseGetUser = await request(app.server)
      .get(`/api/users/${idUser}`)
      .set("Accept", "application/json");
    expect(responseGetUser.status).toBe(200);
    expect(responseGetUser.body).toMatchObject({
      id: idUser,
      ...testUser,
    });
  });

  it("should update user data", async () => {
    const response = await request(app.server)
      .post("/api/users")
      .send(testUser)
      .set("Accept", "application/json");
    const idUser = response.body.id;
    const responseUpdateUser = await request(app.server)
      .put(`/api/users/${idUser}`)
      .send(updateUser)
      .set("Accept", "application/json");
    expect(responseUpdateUser.status).toBe(200);
    expect(responseUpdateUser.body).toMatchObject({
      id: idUser,
      ...updateUser,
    });
  });

  it("should delete user", async () => {
    const response = await request(app.server)
      .post("/api/users")
      .send(testUser)
      .set("Accept", "application/json");
    const idUser = response.body.id;
    const responseDeleteUser = await request(app.server)
      .delete(`/api/users/${idUser}`)
      .set("Accept", "application/json");
    expect(responseDeleteUser.status).toBe(204);
  });

  it("should answer is that there is no such object deleted user", async () => {
    const response = await request(app.server)
      .post("/api/users")
      .send(testUser)
      .set("Accept", "application/json");
    const idUser = response.body.id;
    await request(app.server)
      .delete(`/api/users/${idUser}`)
      .set("Accept", "application/json");
    const responseGetUser = await request(app.server)
      .get(`/api/users/${idUser}`)
      .set("Accept", "application/json");
    expect(responseGetUser.status).toBe(404);
  });
});
