import { Sequelize } from "sequelize";
import supertest from "supertest";
import app from "../../app";
import config from "@config";

describe("General Test", () => {
  let token: string;
  const request = supertest(app);
  beforeAll(async (done) => {
    const {
      secrets: { dbURL },
    } = config();
    const sequelize = new Sequelize(dbURL, {
      logging: false, // Alternative way to use custom logger, displays all messages
    });
    await sequelize.sync({ force: false });
    console.log("Connection to test db has been established successfully.");
    done();
  });

  describe("User Tests", () => {
    it("should register a user if all conditions are satisfied", async (done) => {
      let response: any;
      try {
        response = await request.post("/api/v1/users/register").send({
          firstName: "Abasifreke",
          lastName: "Ekwere",
          email: "abeshekwere@abesh.com",
          password: "12345678",
          confirmPassword: "12345678",
        });
      } catch (err) {}

      expect(response?.status).toBe(201);
      done();
    });

    it("should not register a user if details already exists", async (done) => {
      let response: any;
      try {
        response = await request.post("/api/v1/users/register").send({
          firstName: "Abasifreke",
          lastName: "Ekwere",
          email: "abeshekwere@abesh.com",
          password: "12345678",
          confirmPassword: "12345678",
        });
      } catch (err) {}

      expect(response?.status).toBe(400);
      done();
    });

    it("should log user in if all conditions are met", async (done) => {
      let response: any;
      try {
        response = await request.post("/api/v1/users/login").send({
          email: "abeshekwere@abesh.com",
          password: "12345678",
        });
      } catch (err) {}

      expect(response?.status).toBe(200);

      token = response.body.data?.accessToken;
      done();
    });

    it("should not log user in if details are incorrect", async (done) => {
      let response: any;
      try {
        response = await request.post("/api/v1/users/login").send({
          email: "abeshekwere@abesh.com",
          password: "12345679",
        });
      } catch (err) {}

      expect(response?.status).toBe(400);

      done();
    });

    it("should return logged in user if authed", async (done) => {
      let response: any;
      try {
        response = await request
          .get("/api/v1/users/me")
          .set("Authorization", "Bearer " + token);
      } catch (err) {}

      expect(response?.status).toBe(200);

      done();
    });

    it("should not return logged in user if not authed", async (done) => {
      let response: any;
      try {
        response = await request.get("/api/v1/users/me");
      } catch (err) {}

      expect(response?.status).toBe(401);

      done();
    });
  });

  let todoId: number;
  describe("Todo Tests", () => {
    it("should create todos when supplied the right details", async (done) => {
      let response: any;
      try {
        response = await request
          .post("/api/v1/todos")
          .send({
            title: "Do some leetcode",
            description: "Reverse a doubly linked list",
          })
          .set("Authorization", "Bearer " + token);
      } catch (err) {}

      expect(response?.status).toBe(201);
      todoId = response.body.data.id;
      done();
    });

    it("should not create todos if all details are not supplied", async (done) => {
      let response: any;
      try {
        response = await request
          .post("/api/v1/todos")
          .send({
            description: "Reverse a doubly linked list",
          })
          .set("Authorization", "Bearer " + token);
      } catch (err) {}

      expect(response?.status).toBe(422);

      done();
    });

    it("should update a todo if it exists", async (done) => {
      let response: any;
      try {
        response = await request
          .patch(`/api/v1/todos/${todoId}`)
          .send({
            description: "Reverse a doubly linked list",
          })
          .set("Authorization", "Bearer " + token);
      } catch (err) {}

      expect(response?.status).toBe(200);

      done();
    });

    it("should not update a todo if it does not exist", async (done) => {
      let response: any;
      try {
        response = await request
          .patch("/api/v1/todos/2")
          .send({
            description: "Reverse a doubly linked list",
          })
          .set("Authorization", "Bearer " + token);
      } catch (err) {}

      expect(response?.status).toBe(400);

      done();
    });

    it("should get a todo if it exists", async (done) => {
      let response: any;
      try {
        response = await request
          .get(`/api/v1/todos/${todoId}`)
          .set("Authorization", "Bearer " + token);
      } catch (err) {}

      expect(response?.status).toBe(200);

      done();
    });

    it("should not get a todo if it does not exist", async (done) => {
      let response: any;
      try {
        response = await request
          .get(`/api/v1/todos/2`)
          .set("Authorization", "Bearer " + token);
      } catch (err) {}

      expect(response?.status).toBe(400);

      done();
    });

    it("should get all todos", async (done) => {
      let response: any;
      try {
        response = await request
          .get(`/api/v1/todos?page=1`)
          .set("Authorization", "Bearer " + token);
      } catch (err) {}

      expect(response?.status).toBe(200);

      done();
    });
  });

  it("should delete a todo if it exists", async (done) => {
    let response: any;
    try {
      response = await request
        .delete(`/api/v1/todos/${todoId}`)
        .set("Authorization", "Bearer " + token);
    } catch (err) {}

    expect(response?.status).toBe(200);

    done();
  });

  it("should not delete a todo if it does not exist", async (done) => {
    let response: any;
    try {
      response = await request
        .delete(`/api/v1/todos/${todoId}`)
        .set("Authorization", "Bearer " + token);
    } catch (err) {}

    expect(response?.status).toBe(400);

    done();
  });
});
