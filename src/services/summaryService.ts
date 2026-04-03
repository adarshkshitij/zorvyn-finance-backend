import { prisma } from "../lib/prisma";
import { toNumber } from "../utils/constants";

export const summaryService = {
  async getDashboardSummary(filters: { startDate?: string; endDate?: string }) {
    const where = {
      isDeleted: false,
      ...((filters.startDate || filters.endDate)
        ? {
            recordDate: {
              ...(filters.startDate ? { gte: new Date(filters.startDate) } : {}),
              ...(filters.endDate ? { lte: new Date(filters.endDate) } : {})
            }
          }
        : {})
    };

    const [records, aggregates] = await prisma.$transaction([
      prisma.financialRecord.findMany({
        where,
        include: {
          createdBy: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true
            }
          }
        },
        orderBy: [{ recordDate: "desc" }, { createdAt: "desc" }]
      }),
      prisma.financialRecord.groupBy({
        by: ["type"],
        where,
        orderBy: { type: "asc" },
        _sum: { amount: true },
        _count: { _all: true }
      })
    ]);

    const incomeAggregate = aggregates.find((item) => item.type === "income");
    const expenseAggregate = aggregates.find((item) => item.type === "expense");
    const totalIncome = incomeAggregate?._sum?.amount;
    const totalExpenses = expenseAggregate?._sum?.amount;
    const totalRecords = records.length;

    const categoryTotalsMap = new Map<string, { income: number; expense: number }>();
    const monthlyTotalsMap = new Map<string, { income: number; expense: number }>();

    records.forEach((record) => {
      const categoryKey = record.category;
      const monthKey = record.recordDate.toISOString().slice(0, 7);
      const numericAmount = toNumber(record.amount);

      if (!categoryTotalsMap.has(categoryKey)) {
        categoryTotalsMap.set(categoryKey, { income: 0, expense: 0 });
      }

      if (!monthlyTotalsMap.has(monthKey)) {
        monthlyTotalsMap.set(monthKey, { income: 0, expense: 0 });
      }

      const categoryBucket = categoryTotalsMap.get(categoryKey);
      const monthBucket = monthlyTotalsMap.get(monthKey);

      if (!categoryBucket || !monthBucket) {
        return;
      }

      if (record.type === "income") {
        categoryBucket.income += numericAmount;
        monthBucket.income += numericAmount;
      } else {
        categoryBucket.expense += numericAmount;
        monthBucket.expense += numericAmount;
      }
    });

    return {
      overview: {
        totalIncome: totalIncome ? toNumber(totalIncome) : 0,
        totalExpenses: totalExpenses ? toNumber(totalExpenses) : 0,
        netBalance: (totalIncome ? toNumber(totalIncome) : 0) - (totalExpenses ? toNumber(totalExpenses) : 0),
        totalRecords
      },
      breakdown: {
        categoryTotals: [...categoryTotalsMap.entries()]
          .flatMap(([category, totals]) => [
            { category, type: "income", total: totals.income },
            { category, type: "expense", total: totals.expense }
          ])
          .filter((item) => item.total > 0),
        incomeByCategory: [...categoryTotalsMap.entries()]
          .map(([category, totals]) => ({ category, total: totals.income }))
          .filter((item) => item.total > 0)
          .sort((a, b) => b.total - a.total),
        expenseByCategory: [...categoryTotalsMap.entries()]
          .map(([category, totals]) => ({ category, total: totals.expense }))
          .filter((item) => item.total > 0)
          .sort((a, b) => b.total - a.total),
        monthlyTrends: [...monthlyTotalsMap.entries()]
          .map(([month, totals]) => ({
            month,
            income: totals.income,
            expense: totals.expense,
            balance: totals.income - totals.expense
          }))
          .sort((a, b) => a.month.localeCompare(b.month))
      },
      recentActivity: records.slice(0, 5).map((record) => ({
        ...record,
        amount: toNumber(record.amount)
      }))
    };
  }
};
