import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess } from "../utils/apiResponse";
import { buildPaginationMeta } from "../utils/pagination";
import { userService } from "../services/userService";
import type { Role, UserStatus } from "@prisma/client";

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);

  return sendSuccess(res, {
    statusCode: 201,
    message: "User created successfully.",
    data: user
  });
});

export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query as unknown as {
    page: number;
    limit: number;
    role?: Role;
    status?: UserStatus;
    search?: string;
  };

  const result = await userService.listUsers(query);

  return sendSuccess(res, {
    data: result.data,
    meta: {
      pagination: buildPaginationMeta(query.page, query.limit, result.totalRecords),
      filters: {
        role: query.role ?? null,
        status: query.status ?? null,
        search: query.search ?? null
      }
    }
  });
});

export const getUserById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const user = await userService.getUserById(id);

  return sendSuccess(res, {
    data: user
  });
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const user = await userService.updateUser(id, req.body);

  return sendSuccess(res, {
    message: "User updated successfully.",
    data: user
  });
});
