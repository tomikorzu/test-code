import request from "supertest";
import app from "../../../index.js";
import db from "../../config/db/users-db.js";

// Describe === seccion donde podemos agrupar varios test
describe("GET /users", () => {
  test("Should responses with an array of users", async () => {
    const response = await request(app).get("/users");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });
});
