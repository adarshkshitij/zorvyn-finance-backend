import type { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError, JsonWebTokenError } from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { env } from "../config/env";
import { ApiError } from "../utils/apiError";
import { asyncHandler } from "../utils/asyncHandler";
import { UserStatus } from "../utils/constants";

export const requireAuth = asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    throw new ApiError(401, "Authorization token is required.");
  }

  try {
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, env.jwtSecret) as { userId: string };

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        lastLoginAt: true,
        createdAt: true,
        updatedAt: true
      }
    });

    if (!user) {
      throw new ApiError(401, "User not found for this token.");
    }

    if (user.status !== UserStatus.active) {
      throw new ApiError(403, "Inactive users cannot access this resource.");
    }

    (req as Request & { user: typeof user }).user = user;
    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new ApiError(401, "Authentication token has expired.");
    }

    if (error instanceof JsonWebTokenError) {
      throw new ApiError(401, "Invalid authentication token.");
    }

    throw error;
  }
});
