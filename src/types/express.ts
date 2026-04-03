import type { Request } from "express";
import type { AuthenticatedRequestUser } from "./auth";

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedRequestUser;
}
