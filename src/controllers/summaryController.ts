import type { Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess } from "../utils/apiResponse";
import { summaryService } from "../services/summaryService";

export const getSummary = asyncHandler(async (req, res: Response) => {
  const query = req.query as { startDate?: string; endDate?: string };
  const summary = await summaryService.getDashboardSummary(query);

  return sendSuccess(res, {
    data: summary,
    meta: {
      filters: {
        startDate: query.startDate ?? null,
        endDate: query.endDate ?? null
      }
    }
  });
});
