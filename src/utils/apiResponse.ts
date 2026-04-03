import type { Response } from "express";

interface SuccessResponseOptions<T> {
  statusCode?: number;
  message?: string;
  data?: T;
  meta?: unknown;
}

export const sendSuccess = <T>(res: Response, options: SuccessResponseOptions<T>) => {
  const payload: Record<string, unknown> = {
    success: true,
    message: options.message ?? "Request completed successfully."
  };

  if (options.data !== undefined) {
    payload.data = options.data;
  }

  if (options.meta !== undefined) {
    payload.meta = options.meta;
  }

  return res.status(options.statusCode ?? 200).json(payload);
};
