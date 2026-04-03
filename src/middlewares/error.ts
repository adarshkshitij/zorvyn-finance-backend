import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { ApiError } from "../utils/apiError";
import { env } from "../config/env";

const normalizeError = (error: unknown) => {
  if (error instanceof ApiError) {
    return error;
  }

  if (error instanceof ZodError) {
    return new ApiError(400, "Validation failed.", error.flatten());
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return new ApiError(409, "A unique field value already exists.");
    }

    if (error.code === "P2025") {
      return new ApiError(404, "Requested resource was not found.");
    }
  }

  if (error instanceof Error) {
    return new ApiError(500, error.message);
  }

  return new ApiError(500, "Something went wrong.");
};

export const notFoundHandler = (req: Request, _res: Response, next: NextFunction) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
};

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const normalized = normalizeError(error);

  if (env.nodeEnv !== "test") {
    console.error(error);
  }

  res.status(normalized.statusCode).json({
    success: false,
    message: normalized.message,
    errors: normalized.details,
    ...(env.nodeEnv !== "production" && error instanceof Error ? { stack: error.stack } : {})
  });
};
