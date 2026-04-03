import jwt from "jsonwebtoken";
import type { Secret, SignOptions } from "jsonwebtoken";
import { env } from "../config/env";

export const generateToken = (userId: string) =>
  jwt.sign({ userId }, env.jwtSecret as Secret, {
    expiresIn: env.jwtExpiresIn as SignOptions["expiresIn"]
  });
