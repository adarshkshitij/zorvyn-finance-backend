import { Role, UserStatus, RecordType } from "@prisma/client";
import { z } from "zod";

export const registerAdminSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email().transform((value) => value.toLowerCase()),
  password: z.string().min(6).max(100)
});

export const loginSchema = z.object({
  email: z.email().transform((value) => value.toLowerCase()),
  password: z.string().min(1)
});

export const createUserSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email().transform((value) => value.toLowerCase()),
  password: z.string().min(6).max(100),
  role: z.nativeEnum(Role).optional(),
  status: z.nativeEnum(UserStatus).optional()
});

export const updateUserSchema = z.object({
  name: z.string().trim().min(2).max(100).optional(),
  email: z.email().transform((value) => value.toLowerCase()).optional(),
  password: z.string().min(6).max(100).optional(),
  role: z.nativeEnum(Role).optional(),
  status: z.nativeEnum(UserStatus).optional()
}).refine((value) => Object.keys(value).length > 0, {
  message: "At least one field is required for update."
});

export const userQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  role: z.nativeEnum(Role).optional(),
  status: z.nativeEnum(UserStatus).optional(),
  search: z.string().trim().min(1).optional()
});

export const createRecordSchema = z.object({
  title: z.string().trim().min(2).max(150),
  amount: z.coerce.number().nonnegative(),
  type: z.nativeEnum(RecordType),
  category: z.string().trim().min(2).max(100),
  date: z.string().date(),
  notes: z.string().max(500).optional()
});

export const updateRecordSchema = z.object({
  title: z.string().trim().min(2).max(150).optional(),
  amount: z.coerce.number().nonnegative().optional(),
  type: z.nativeEnum(RecordType).optional(),
  category: z.string().trim().min(2).max(100).optional(),
  date: z.string().date().optional(),
  notes: z.string().max(500).optional()
}).refine((value) => Object.keys(value).length > 0, {
  message: "At least one field is required for update."
});

export const recordQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  type: z.nativeEnum(RecordType).optional(),
  category: z.string().trim().min(1).optional(),
  search: z.string().trim().min(1).optional(),
  startDate: z.string().date().optional(),
  endDate: z.string().date().optional(),
  sortBy: z.enum(["date", "amount", "createdAt", "category", "title", "type"]).default("date"),
  sortOrder: z.enum(["asc", "desc"]).default("desc")
});

export const summaryQuerySchema = z.object({
  startDate: z.string().date().optional(),
  endDate: z.string().date().optional()
});

export const uuidParamSchema = z.object({
  id: z.uuid()
});
