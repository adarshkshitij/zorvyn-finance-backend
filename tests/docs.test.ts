import request from "supertest";
import { app } from "../src/app";

describe("Swagger docs endpoint", () => {
  it("serves API docs", async () => {
    const response = await request(app).get("/api/docs/");

    expect(response.status).toBe(200);
    expect(response.text).toContain("swagger-ui");
  });
});
