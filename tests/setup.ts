process.env.NODE_ENV = process.env.NODE_ENV || "test";
process.env.DATABASE_URL = process.env.DATABASE_URL || "postgresql://postgres:password@localhost:5432/finance_ledger";
process.env.JWT_SECRET = process.env.JWT_SECRET || "test-secret-key-12345";
process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";
process.env.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "*";
