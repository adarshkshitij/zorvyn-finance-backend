import bcrypt from "bcryptjs";
import { Role, UserStatus } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/apiError";

export const userSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  status: true,
  lastLoginAt: true,
  createdAt: true,
  updatedAt: true
} as const;

export const userService = {
  async getAdminCount() {
    return prisma.user.count({ where: { role: Role.admin } });
  },

  async createUser(input: {
    name: string;
    email: string;
    password: string;
    role?: Role;
    status?: UserStatus;
  }) {
    const existingUser = await prisma.user.findUnique({ where: { email: input.email } });

    if (existingUser) {
      throw new ApiError(409, "A user with this email already exists.");
    }

    const passwordHash = await bcrypt.hash(input.password, 12);

    return prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        passwordHash,
        role: input.role ?? Role.viewer,
        status: input.status ?? UserStatus.active
      },
      select: userSelect
    });
  },

  async findByEmailWithPassword(email: string) {
    return prisma.user.findUnique({
      where: { email },
      select: {
        ...userSelect,
        passwordHash: true
      }
    });
  },

  async updateLastLogin(userId: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { lastLoginAt: new Date() },
      select: userSelect
    });
  },

  async getUserById(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId }, select: userSelect });

    if (!user) {
      throw new ApiError(404, "User not found.");
    }

    return user;
  },

  async listUsers(filters: {
    page: number;
    limit: number;
    role?: Role;
    status?: UserStatus;
    search?: string;
  }) {
    const where = {
      ...(filters.role ? { role: filters.role } : {}),
      ...(filters.status ? { status: filters.status } : {}),
      ...(filters.search
        ? {
            OR: [
              { name: { contains: filters.search, mode: "insensitive" as const } },
              { email: { contains: filters.search, mode: "insensitive" as const } }
            ]
          }
        : {})
    };

    const [data, totalRecords] = await prisma.$transaction([
      prisma.user.findMany({
        where,
        select: userSelect,
        orderBy: { createdAt: "desc" },
        skip: (filters.page - 1) * filters.limit,
        take: filters.limit
      }),
      prisma.user.count({ where })
    ]);

    return { data, totalRecords };
  },

  async updateUser(
    userId: string,
    input: {
      name?: string;
      email?: string;
      password?: string;
      role?: Role;
      status?: UserStatus;
    }
  ) {
    await this.getUserById(userId);

    if (input.email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: input.email,
          NOT: { id: userId }
        }
      });

      if (existingUser) {
        throw new ApiError(409, "A user with this email already exists.");
      }
    }

    const passwordHash = input.password ? await bcrypt.hash(input.password, 12) : undefined;

    return prisma.user.update({
      where: { id: userId },
      data: {
        ...(input.name ? { name: input.name } : {}),
        ...(input.email ? { email: input.email } : {}),
        ...(input.role ? { role: input.role } : {}),
        ...(input.status ? { status: input.status } : {}),
        ...(passwordHash ? { passwordHash } : {})
      },
      select: userSelect
    });
  }
};
