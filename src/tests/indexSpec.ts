import app from "../index";

import supertest from "supertest";

const request = supertest(app);

describe("test main end point", () => {
  it("Get /", async () => {
    const response = await request.get("/");
    expect(response.status).toBe(200);
  });
});
