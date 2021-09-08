import supertest from "supertest";
import { INITIAL_DIGIPET, setDigipet } from "../digipet/model";
import app from "../server";

describe("User can rehome a digipet if they currently have one, so that they free up the space", () => {
  // setup: ensure there is a digipet to begin with
  setDigipet(INITIAL_DIGIPET);

  test("1st GET /digipet informs them that they currently have a digipet", async () => {
    const response = await supertest(app).get("/digipet");
    expect(response.body.message).toMatch(/your digipet/i);
    expect(response.body.digipet).toBeDefined();
  });

  test("1st GET /digipet/rehome informs them that they have rehomed a digipet and the data is null now", async () => {
    const response = await supertest(app).get("/digipet/rehome");
    expect(response.body.message).toMatch(/success/i);
    expect(response.body.message).toMatch(/rehome/i);
    expect(response.body.digipet).toBeUndefined(
    );
  });

  test("2nd GET /digipet now informs them that they don't currently have a digipet", async () => {
    const response = await supertest(app).get("/digipet");
    expect(response.body.message).toMatch(/don't have/i);
    expect(response.body.digipet).toBeUndefined();
  });
});
