import request from "supertest";
import app from "../index";

describe("API Endpoints", () => {
  const shortCode = "urMom";
  const url = "https://www.example.com/some/long/url";

  it("should create a new short URL", async () => {
    const response = await request(app)
      .post("/shorten")
      .send({ url, shortCode });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty(
      "url",
      "https://www.example.com/some/long/url"
    );
    expect(response.body).toHaveProperty("shortCode");
  });

  it("should retrieve the original URL", async () => {
    const response = await request(app).get(`/shorten/arsolitabby`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty(
      "url",
      "https://www.example.com/some/long/url222"
    );
    expect(response.body).toHaveProperty("shortCode", "arsolitabby");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body.updatedAt).toEqual(null);
  });

  it("should update an existing short URL", async () => {
    const response = await request(app)
      .put(`/shorten/arsolitabby`)
      .send({ url: "https://www.example.com/some/updated/url333" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty(
      "url",
      "https://www.example.com/some/updated/url333"
    );
    expect(response.body).toHaveProperty("shortCode", "arsolitabby");
    expect(response.body).toHaveProperty("createdAt");
    expect(response.body.updatedAt).toBeDefined();
  });

  it("should delete an existing short URL", async () => {
    const response = await request(app).delete(`/shorten/${shortCode}`);

    expect(response.status).toBe(204);
  });

  it("should return an url with stats", async () => {
    const response = await request(app).get(`/shorten/arsolitabby/stats`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty(
      "url",
      "https://www.example.com/some/updated/url333"
    );
    expect(response.body).toHaveProperty("shortCode", "arsolitabby");
    expect(response.body).toHaveProperty("createdAt");
    // expect(response.body.updatedAt).toBeDefined();
    expect(response.body).toHaveProperty("accessCount", 1);
  });
});
