export interface UrlType {
  id:           string;
  url:          string;
  shortCode:    string;
  createdAt:    Date;
  updatedAt:    Date|null;
  accessCount: number;
}

export type CreateUrlType = Omit<UrlType, "id" | "createdAt" | "updatedAt" | "accessCount">;