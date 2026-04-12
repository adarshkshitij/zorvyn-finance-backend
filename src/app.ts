import cors from "cors";
import express from "express";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import { env } from "./config/env";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import recordRoutes from "./routes/recordRoutes";
import summaryRoutes from "./routes/summaryRoutes";
import { errorHandler, notFoundHandler } from "./middlewares/error";
import { swaggerSpec } from "./docs/swagger";

export const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin: env.clientOrigin === "*" ? true : env.clientOrigin.split(",").map((origin) => origin.trim()),
    credentials: true
  })
);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Finance Ledger Backend API is running."
  });
});

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Service is healthy.",
    data: {
      environment: env.nodeEnv,
      timestamp: new Date().toISOString()
    }
  });
});

app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/summaries", summaryRoutes);

app.use(notFoundHandler);
app.use(errorHandler);
