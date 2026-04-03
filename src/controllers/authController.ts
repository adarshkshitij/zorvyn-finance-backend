import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { Role, UserStatus } from "@prisma/client";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/apiError";
import { sendSuccess } from "../utils/apiResponse";
import { generateToken } from "../utils/auth";
import { userService } from "../services/userService";
import type { AuthenticatedRequest } from "../types/express";

export const registerAdmin = asyncHandler(async (req: Request, res: Response) => {
  const adminCount = await userService.getAdminCount();

  if (adminCount > 0) {
    throw new ApiError(409, "An admin account has already been created.");
  }

  const user = await userService.createUser({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: Role.admin,
    status: UserStatus.active
  });

  return sendSuccess(res, {
    statusCode: 201,
    message: "Admin account created successfully.",
    data: {
      token: generateToken(user.id),
      user
    }
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.findByEmailWithPassword(req.body.email);

  if (!user) {
    throw new ApiError(401, "Invalid email or password.");
  }

  const isPasswordCorrect = await bcrypt.compare(req.body.password, user.passwordHash);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password.");
  }

  if (user.status !== UserStatus.active) {
    throw new ApiError(403, "Your account is inactive.");
  }

  const safeUser = await userService.updateLastLogin(user.id);

  return sendSuccess(res, {
    message: "Login successful.",
    data: {
      token: generateToken(safeUser.id),
      user: safeUser
    }
  });
});

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const request = req as AuthenticatedRequest;

  return sendSuccess(res, {
    data: request.user
  });
});
