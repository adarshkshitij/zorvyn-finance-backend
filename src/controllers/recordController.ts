import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess } from "../utils/apiResponse";
import { buildPaginationMeta } from "../utils/pagination";
import { recordService } from "../services/recordService";
import { toNumber } from "../utils/constants";
import type { AuthenticatedRequest } from "../types/express";
import type { RecordType } from "@prisma/client";

const serializeRecord = (record: any) => ({
  ...record,
  amount: toNumber(record.amount),
  recordDate: record.recordDate instanceof Date ? record.recordDate.toISOString().slice(0, 10) : record.recordDate,
  createdAt: record.createdAt,
  updatedAt: record.updatedAt
});

export const createRecord = asyncHandler(async (req: Request, res: Response) => {
  const request = req as AuthenticatedRequest;
  const record = await recordService.createRecord({
    ...request.body,
    createdById: request.user.id
  });

  return sendSuccess(res, {
    statusCode: 201,
    message: "Financial record created successfully.",
    data: serializeRecord(record)
  });
});

export const getRecords = asyncHandler(async (req: Request, res: Response) => {
  const query = req.query as unknown as {
    page: number;
    limit: number;
    type?: RecordType;
    category?: string;
    search?: string;
    startDate?: string;
    endDate?: string;
    sortBy: string;
    sortOrder: "asc" | "desc";
  };

  const result = await recordService.listRecords(query);

  return sendSuccess(res, {
    data: result.data.map(serializeRecord),
    meta: {
      pagination: buildPaginationMeta(query.page, query.limit, result.totalRecords),
      filters: {
        type: query.type ?? null,
        category: query.category ?? null,
        search: query.search ?? null,
        startDate: query.startDate ?? null,
        endDate: query.endDate ?? null
      },
      sorting: {
        sortBy: query.sortBy,
        sortOrder: query.sortOrder
      }
    }
  });
});

export const getRecordById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const record = await recordService.getRecordById(id);

  return sendSuccess(res, {
    data: serializeRecord(record)
  });
});

export const updateRecord = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const record = await recordService.updateRecord(id, req.body);

  return sendSuccess(res, {
    message: "Financial record updated successfully.",
    data: serializeRecord(record)
  });
});

export const deleteRecord = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  await recordService.deleteRecord(id);

  return sendSuccess(res, {
    message: "Financial record deleted successfully."
  });
});
