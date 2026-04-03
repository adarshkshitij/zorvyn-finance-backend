import type { NextFunction, Request, Response } from "express";
import type { Role } from "@prisma/client";
import { ApiError } from "../utils/apiError";

export const requireRole = (...roles: Role[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const request = req as Request & { user?: { role: Role } };

    if (!request.user) {
      return next(new ApiError(401, "Authentication is required."));
    }

    if (!roles.includes(request.user.role)) {
      return next(new ApiError(403, "You do not have permission to perform this action."));
    }

    next();
  };
};
