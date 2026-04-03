import "dotenv/config";
import { app } from "./app";
import { env } from "./config/env";
import { prisma } from "./lib/prisma";

const startServer = async () => {
  try {
    await prisma.$connect();

    app.listen(env.port, () => {
      console.log(`Server running on port ${env.port} in ${env.nodeEnv} mode`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

void startServer();
