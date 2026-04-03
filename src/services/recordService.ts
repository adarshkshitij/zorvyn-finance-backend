import { Prisma, RecordType } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { ApiError } from "../utils/apiError";

const recordInclude = {
  createdBy: {
    select: {
      id: true,
      name: true,
      email: true,
      role: true
    }
  }
} as const;

const getOrderBy = (sortBy: string, sortOrder: "asc" | "desc") => {
  switch (sortBy) {
    case "amount":
      return [{ amount: sortOrder }, { createdAt: "desc" as const }];
    case "createdAt":
      return [{ createdAt: sortOrder }];
    case "category":
      return [{ category: sortOrder }, { createdAt: "desc" as const }];
    case "title":
      return [{ title: sortOrder }, { createdAt: "desc" as const }];
    case "type":
      return [{ type: sortOrder }, { createdAt: "desc" as const }];
    case "date":
    default:
      return [{ recordDate: sortOrder }, { createdAt: "desc" as const }];
  }
};

export const recordService = {
  async createRecord(input: {
    title: string;
    amount: number;
    type: RecordType;
    category: string;
    date: string;
    notes?: string;
    createdById: string;
  }) {
    return prisma.financialRecord.create({
      data: {
        title: input.title,
        amount: new Prisma.Decimal(input.amount),
        type: input.type,
        category: input.category,
        recordDate: new Date(input.date),
        notes: input.notes ?? "",
        createdById: input.createdById
      },
      include: recordInclude
    });
  },

  async listRecords(filters: {
    page: number;
    limit: number;
    type?: RecordType;
    category?: string;
    search?: string;
    startDate?: string;
    endDate?: string;
    sortBy: string;
    sortOrder: "asc" | "desc";
  }) {
    const where = {
      isDeleted: false,
      ...(filters.type ? { type: filters.type } : {}),
      ...(filters.category ? { category: { equals: filters.category, mode: "insensitive" as const } } : {}),
      ...(filters.search
        ? {
            OR: [
              { title: { contains: filters.search, mode: "insensitive" as const } },
              { category: { contains: filters.search, mode: "insensitive" as const } },
              { notes: { contains: filters.search, mode: "insensitive" as const } }
            ]
          }
        : {}),
      ...((filters.startDate || filters.endDate)
        ? {
            recordDate: {
              ...(filters.startDate ? { gte: new Date(filters.startDate) } : {}),
              ...(filters.endDate ? { lte: new Date(filters.endDate) } : {})
            }
          }
        : {})
    };

    const [data, totalRecords] = await prisma.$transaction([
      prisma.financialRecord.findMany({
        where,
        include: recordInclude,
        orderBy: getOrderBy(filters.sortBy, filters.sortOrder),
        skip: (filters.page - 1) * filters.limit,
        take: filters.limit
      }),
      prisma.financialRecord.count({ where })
    ]);

    return { data, totalRecords };
  },

  async getRecordById(recordId: string) {
    const record = await prisma.financialRecord.findFirst({
      where: { id: recordId, isDeleted: false },
      include: recordInclude
    });

    if (!record) {
      throw new ApiError(404, "Financial record not found.");
    }

    return record;
  },

  async updateRecord(
    recordId: string,
    input: {
      title?: string;
      amount?: number;
      type?: RecordType;
      category?: string;
      date?: string;
      notes?: string;
    }
  ) {
    await this.getRecordById(recordId);

    return prisma.financialRecord.update({
      where: { id: recordId },
      data: {
        ...(input.title ? { title: input.title } : {}),
        ...(input.amount !== undefined ? { amount: new Prisma.Decimal(input.amount) } : {}),
        ...(input.type ? { type: input.type } : {}),
        ...(input.category ? { category: input.category } : {}),
        ...(input.date ? { recordDate: new Date(input.date) } : {}),
        ...(input.notes !== undefined ? { notes: input.notes } : {})
      },
      include: recordInclude
    });
  },

  async deleteRecord(recordId: string) {
    await this.getRecordById(recordId);

    await prisma.financialRecord.update({
      where: { id: recordId },
      data: { isDeleted: true }
    });
  }
};
