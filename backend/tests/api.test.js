const request = require("supertest");
const app = require("../src/app");

describe("API Test", () => {
  test("GET /api/tickers should return data", async () => {
    const res = await request(app).get("/api/tickers");

    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
  });
});