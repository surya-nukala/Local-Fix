import "dotenv/config";
import cors from "cors";
import express from "express";
import { connectDatabase } from "./db.js";
import authRoutes from "./routes/authRoutes.js";
import providerRoutes from "./routes/providerRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import serviceRoutes from "./routes/serviceRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:5173",
  "http://127.0.0.1:5173"
];

app.use(cors({
  origin: allowedOrigins,
  optionsSuccessStatus: 200
}));
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ message: "LocalFix API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/requests", requestRoutes);

app.use((error, _request, response, _next) => {
  console.error(error);
  response.status(500).json({ message: "Something went wrong on the server" });
});

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
