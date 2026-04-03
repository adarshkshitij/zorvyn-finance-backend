import { Role, UserStatus } from "@prisma/client";

export interface SafeUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthenticatedRequestUser extends SafeUser {}
