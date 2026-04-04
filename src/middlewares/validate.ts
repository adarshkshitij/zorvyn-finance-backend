import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";
import { ApiError } from "../utils/apiError";

interface ValidationSchemas {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}

export const validate = (schemas: ValidationSchemas) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }

      if (schemas.query) {
        Object.defineProperty(req, "query", {
          value: schemas.query.parse(req.query),
          configurable: true,
          enumerable: true,
          writable: true
        });
      }

      if (schemas.params) {
        Object.defineProperty(req, "params", {
          value: schemas.params.parse(req.params),
          configurable: true,
          enumerable: true,
          writable: true
        });
      }

      next();
    } catch (error) {
      next(error instanceof Error ? new ApiError(400, error.message, error) : error);
    }
  };
};
