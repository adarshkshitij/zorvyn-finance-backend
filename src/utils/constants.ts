import { Prisma, Role, UserStatus, RecordType } from "@prisma/client";

export { Role, UserStatus, RecordType };

export const toNumber = (value: Prisma.Decimal | number) => Number(value);
