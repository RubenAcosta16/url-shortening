// middleware/errorHandler.ts
import { Request, Response,NextFunction } from "express";
import { ValidationError, UrlError, NotFoundError } from "./errorFactory";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ValidationError) {
    return res.status(400).json({
      message: err.message,
    });
  }

  if (err instanceof UrlError) {
    return res.status(400).json({
      message: err.message,
    });
  }

  if (err instanceof NotFoundError) {
    return res.status(404).json({
      message: err.message,
    });
  }

  // Para cualquier otro error
  return res.status(500).json({ message: "Internal server error" });
};

export default errorHandler;
