import express, { Request, Response, NextFunction } from "express";
import { PORT } from "./utils/config";
import errorHandler from "./utils/errorHandler";

import { CreateUrlType } from "./utils/types";
import UrlRepository from "./repository/UrlRepository";

const app = express();

app.use(express.json());

app.get(
  "/shorten/:shortCode",
  async (req: Request, res: Response, next: NextFunction) => {
    const { shortCode } = req.params;
    try {
      const urlFound = await UrlRepository.getOne(shortCode);
      res.status(200).json(urlFound);
    } catch (error) {
      next(error);
    }
  }
);

app.post(
  "/shorten",
  async (req: Request, res: Response, next: NextFunction) => {
    const newUrlProps: CreateUrlType = req.body;

    try {
      const newUrl = await UrlRepository.create(newUrlProps);
      res.status(201).json(newUrl);
    } catch (error) {
      next(error);
    }
  }
);

app.put(
  "/shorten/:shortCode",
  async (req: Request, res: Response, next: NextFunction) => {
    const { shortCode } = req.params;
    const url = req.body;

    try {
      const newUrl = await UrlRepository.update(shortCode, url.url);
      res.status(200).json(newUrl);
    } catch (error) {
      next(error);
    }
  }
);

app.delete(
  "/shorten/:shortCode",
  async (req: Request, res: Response, next: NextFunction) => {
    const { shortCode } = req.params;
    try {
      await UrlRepository.delete(shortCode);
      res.status(204).json({});
    } catch (error) {
      next(error);
    }
  }
);

app.get(
  "/shorten/:shortCode/stats",
  async (req: Request, res: Response, next: NextFunction) => {
    const { shortCode } = req.params;
    try {
      const urlFound = await UrlRepository.getStats(shortCode);
      res.status(200).json(urlFound);
    } catch (error) {
      next(error);
    }
  }
);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(err, req, res, next);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;
