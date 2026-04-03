export const buildPaginationMeta = (page: number, limit: number, totalRecords: number) => ({
  page,
  limit,
  totalRecords,
  totalPages: Math.max(1, Math.ceil(totalRecords / limit)),
  hasNextPage: page * limit < totalRecords,
  hasPreviousPage: page > 1
});
