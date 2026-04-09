import request from "supertest";
import { app } from "../src/app";

describe("Not found handler", () => {
  it("returns a consistent 404 response shape", async () => {
    const response = await request(app).get("/api/does-not-exist");

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(typeof response.body.message).toBe("string");
  });
});

