import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Routes
import userRoutes from "./route/users.js";
import recipeRoutes from "./route/recipe.js";
import analytisRoutes from "./route/analytis.js";
import otpRouters from "./route/otp.js";
import { dbConnection } from "./config/dbConnection.js";
import logger from "./utils/logger.js";

// Setup
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(cors());

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(
    morgan("combined", {
      stream: { write: (msg) => logger.info(msg.trim()) },
    })
  );
}

// API routes
app.use("/api/otp", otpRouters);
app.use("/api/user", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/analytis", analytisRoutes);

// Uploads dir
const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(__dirname, "uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
app.use("/uploads", express.static(UPLOAD_DIR));

// ✅ Serve Vite frontend in production
const clientDistPath = path.join(__dirname, "..", "..", "frontend", "dist");

if (process.env.NODE_ENV === "production") {
  if (fs.existsSync(clientDistPath)) {
    app.use(express.static(clientDistPath));
    app.get("*", (req, res) =>
      res.sendFile(path.join(clientDistPath, "index.html"))
    );
  } else {
    console.log("⚠️ Frontend dist not found. Did you run vite build?");
  }
} else {
  app.get("/", (req, res) => res.send("✅ API running in development"));
}

// DB + Server
dbConnection()
  .then(() => {
    console.log("✅ Database connected successfully!");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port: ${PORT}`)
    );
  })
  .catch((err) =>
    console.error(`❌ Error connecting to database: ${err.message}`)
  );

export default app;
