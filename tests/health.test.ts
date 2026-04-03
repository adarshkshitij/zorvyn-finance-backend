import request from "supertest";
import { app } from "../src/app";

describe("Health endpoint", () => {
  it("returns service health information", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.environment).toBeDefined();
  });
});
