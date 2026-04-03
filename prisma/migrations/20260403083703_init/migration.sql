-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'analyst', 'viewer');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('active', 'inactive');

-- CreateEnum
CREATE TYPE "RecordType" AS ENUM ('income', 'expense');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'viewer',
    "status" "UserStatus" NOT NULL DEFAULT 'active',
    "last_login_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "financial_records" (
    "id" UUID NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "type" "RecordType" NOT NULL,
    "category" VARCHAR(100) NOT NULL,
    "record_date" DATE NOT NULL,
    "notes" TEXT NOT NULL DEFAULT '',
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" UUID NOT NULL,

    CONSTRAINT "financial_records_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_role_status_idx" ON "users"("role", "status");

-- CreateIndex
CREATE INDEX "financial_records_is_deleted_record_date_idx" ON "financial_records"("is_deleted", "record_date" DESC);

-- CreateIndex
CREATE INDEX "financial_records_type_category_record_date_idx" ON "financial_records"("type", "category", "record_date" DESC);

-- CreateIndex
CREATE INDEX "financial_records_created_by_record_date_idx" ON "financial_records"("created_by", "record_date" DESC);

-- AddForeignKey
ALTER TABLE "financial_records" ADD CONSTRAINT "financial_records_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
