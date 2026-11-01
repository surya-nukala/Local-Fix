import "dotenv/config";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import { connectDatabase } from "./db.js";
import authRoutes from "./routes/authRoutes.js";
import providerRoutes from "./routes/providerRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.disable("x-powered-by");
app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Origin is not allowed by CORS"));
  },
  optionsSuccessStatus: 200
}));
app.use(express.json());
app.use("/api", rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: "draft-8",
  legacyHeaders: false
}));
app.use("/api/auth", rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-8",
  legacyHeaders: false
}));

app.get("/api/health", (_request, response) => {
  response.json({ message: "LocalFix API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/requests", requestRoutes);

app.use((error, _request, response, _next) => {
  console.error(error);
  if (error.name === "ValidationError") {
    return response.status(400).json({ message: "Invalid request data" });
  }
  if (error.name === "CastError") {
    return response.status(400).json({ message: "Invalid resource identifier" });
  }
  if (error.code === 11000) {
    return response.status(409).json({ message: "A record with that value already exists" });
  }
  response.status(500).json({ message: "Something went wrong on the server" });
});

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
  throw new Error("JWT_SECRET must be set to at least 32 characters.");
}

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`LocalFix API running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error(`Database connection failed: ${error.message}`);
    process.exit(1);
  });
