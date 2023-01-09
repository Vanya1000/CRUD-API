import request from "supertest";
import app from "..";

const testUser = {
  username: "test",
  age: 30,
  hobbies: ["test"]
}

describe("Test Users endpoints", () => {
  /*   beforeEach(() => {
    app.listen("5000");
  }); */
  /* 
  afterEach((done) => {
    app.close();
    done();
  }); */

  it("should get an empty array users", async () => {
    const response = await request(app.server)
      .get("/api/users")
      .set("Accept", "application/json");
    expect(response.body).toEqual([]);
  });

  it("should create a new user", async () => {
    const response = await request(app.server)
      .post("/api/users")
      .send(testUser)
      .set("Accept", "application/json");
    expect(response.body).toMatchObject({
      id: expect.any(String),
      ...testUser
    });
  });

/*   it("should get an empty array users", async () => {
    const response = await request(app.server)
      .get("/api/users")
      .set("Accept", "application/json");
    expect(response.body).toEqual([]);
  }); */
});
