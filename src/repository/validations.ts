import { ValidationError } from "../utils/errorFactory";

export class Validation {
  static id(id: string): void {
    if (!id) throw new ValidationError("id is required");

    if (typeof id !== "string")
      throw new ValidationError("id must be a string");
  }

  static url(url: string): void {
    if (!url) throw new ValidationError("Url is required");

    if (typeof url !== "string")
      throw new ValidationError("url must be a string");
    if (url.length < 3)
      throw new ValidationError("Url must be at least 3 characters long");

    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );

    if (!urlPattern.test(url)) {
      throw new ValidationError("Invalid URL format");
    }
  }

  static shortCode(shortCode: string): void {
    if (!shortCode) throw new ValidationError("Short code is required");

    if (typeof shortCode !== "string")
      throw new ValidationError("Short code must be a string");
    if (shortCode.length < 1)
      throw new ValidationError(
        "Short code must be at least 1 characters long"
      );
  }

  static createdAt(createdAt: string): void {
    if (!createdAt) throw new ValidationError("Created at is required");

    if (typeof createdAt !== "string")
      throw new ValidationError("Created at must be a string");
    if (createdAt.length < 1)
      throw new ValidationError(
        "Created at must be at least 1 characters long"
      );
  }

  static updatedAt(updatedAt: string): void {
    if (!updatedAt) throw new ValidationError("Updated at is required");

    if (typeof updatedAt !== "string")
      throw new ValidationError("Updated at must be a string");
    if (updatedAt.length < 1)
      throw new ValidationError(
        "Updated at must be at least 1 characters long"
      );
  }

  static accessCount(accessCount: string): void {
    if (!accessCount) throw new ValidationError("Access count is required");

    if (typeof accessCount !== "string")
      throw new ValidationError("Access count must be a string");
    if (accessCount.length < 1)
      throw new ValidationError(
        "Access count must be at least 1 characters long"
      );
  }
}
