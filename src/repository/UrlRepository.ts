import crypto from "node:crypto";

import { Validation } from "./validations";
import { UrlType, CreateUrlType } from "../utils/types";
import { UrlError, NotFoundError } from "../utils/errorFactory";

// Base de datos provisional
const db: UrlType[] = [
  {
    id: "1",
    url: "https://www.example.com/some/long/url222",
    shortCode: "arsolitabby",
    createdAt: new Date(),
    updatedAt: null,
    accessCount: 0,
  },
];

// esta vacio porque uso este codigo mio como plantilla y siempre olvido inicializar la db jaja
async function initDB() {}

export default class UrlRepository {
  static async getOne(
    shortCode: string
  ): Promise<Omit<UrlType, "accessCount">> {
    await initDB();
    Validation.shortCode(shortCode);

    const urlFound = db.find((urlG) => urlG.shortCode === shortCode);
    if (!urlFound) throw new NotFoundError("URL not found");

    const updatedUrl: UrlType = {
      ...urlFound,
      accessCount: urlFound.accessCount + 1,
    };

    const urlIndex = db.indexOf(urlFound);
    db[urlIndex] = updatedUrl;

    const { accessCount, ...urlWithoutAccessCount } = urlFound;
    return urlWithoutAccessCount;
  }

  static async create(
    url: CreateUrlType
  ): Promise<Omit<UrlType, "accessCount">> {
    await initDB();

    Validation.url(url.url);
    Validation.shortCode(url.shortCode);

    const id = crypto.randomUUID();

    const existingUrl = db.find((urlG) => urlG.url === url.url);
    if (existingUrl) throw new UrlError("Url already exists");
    const existingShort = db.find((urlG) => urlG.shortCode === url.shortCode);
    if (existingShort) throw new UrlError("Shortcode already exists");

    const newUrl = {
      id,
      ...url,
      createdAt: new Date(),
      updatedAt: null,
      accessCount: 0,
    };

    db.push(newUrl);
    const { accessCount, ...urlWithoutAccessCount } = newUrl;
    return urlWithoutAccessCount;
  }

  static async update(
    shortCode: string,
    newUrlG: string
  ): Promise<Omit<UrlType, "accessCount">> {
    await initDB();

    Validation.shortCode(shortCode);
    Validation.url(newUrlG);

    const urlFound = db.find((urlG) => urlG.shortCode === shortCode);
    if (!urlFound) throw new NotFoundError("URL not found");

    const updatedUrl: UrlType = {
      ...urlFound,
      updatedAt: new Date(),
      url: newUrlG,
    };

    const urlIndex = db.indexOf(urlFound);
    db[urlIndex] = updatedUrl;

    const { accessCount, ...urlWithoutAccessCount } = updatedUrl;

    return urlWithoutAccessCount;
  }

  static async delete(shortCode: string): Promise<void> {
    await initDB();

    Validation.shortCode(shortCode);

    const urlIndex = db.findIndex((urlG) => urlG.shortCode === shortCode);
    if (urlIndex === -1) throw new NotFoundError("Url not found");

    db.splice(urlIndex, 1);
  }

  static async getStats(shortCode: string): Promise<UrlType> {
    Validation.shortCode(shortCode);

    const urlFound = db.find((urlG) => urlG.shortCode === shortCode);
    if (!urlFound) throw new NotFoundError("Url not found");

    return urlFound;
  }
}
