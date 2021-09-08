import supertest from "supertest";
import { Digipet, setDigipet } from "../digipet/model";
import app from "../server";


describe("When a user ignors a digipet repeatedly,everything decreases by 10 each time until it eventually maxes out at 100", () => {
  beforeAll(() => {
    // setup: give an initial digipet
    const startingDigipet: Digipet = {
      happiness: 15,
      nutrition: 15,
      discipline: 20,
    };
    setDigipet(startingDigipet);
  });

  test("GET /digipet informs them that they have a digipet with expected stats", async () => {
    const response = await supertest(app).get("/digipet");
    expect(response.body.message).toMatch(/your digipet/i);
    expect(response.body.digipet).toHaveProperty("happiness", 15);
    expect(response.body.digipet).toHaveProperty("discipline", 20);
    expect(response.body.digipet).toHaveProperty("nutrition", 15);
  });

  test("1st GET /digipet/ignore informs them about the ignore and shows decrease everything", async () => {
    const response = await supertest(app).get("/digipet/ignore");
    expect(response.body.digipet).toHaveProperty("happiness", 5);
    expect(response.body.digipet).toHaveProperty("discipline", 10);
    expect(response.body.digipet).toHaveProperty("nutrition", 5);
  });

  test("2nd GET /digipet/ignore shows continued stats change", async () => {
    const response = await supertest(app).get("/digipet/ignore");
    expect(response.body.digipet).toHaveProperty("happiness", 0);
    expect(response.body.digipet).toHaveProperty("discipline", 0);
    expect(response.body.digipet).toHaveProperty("nutrition", 0);
  });

});

