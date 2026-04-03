import request from "supertest";
import { app } from "../src/app";

describe("Protected routes", () => {
  it("blocks unauthenticated access to users endpoint", async () => {
    const response = await request(app).get("/api/users");

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
  });
});
