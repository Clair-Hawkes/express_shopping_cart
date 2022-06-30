const request = require("supertest");
const app = require("./app");
let { items } = require("./fakeDb");

describe("POST /items", function () {
  it("tests if posting an item works", async function () {
    const resp = await request(app).post(`/items`).send({
      name: "candy",
      price: 1.5,
    });
    expect(resp.statusCode).toEqual(201);

    expect(resp.body).toEqual({
      added: { name: "candy", price: 1.5 },
    });
  });
});
