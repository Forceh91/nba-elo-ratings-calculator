import express from "express";
import cors from "cors";

import teamsRoutes from "./teams";

const CORS_OPTIONS = {
  origin: "http://localhost:8080",
  optionsSuccessStatus: 200,
};

const PORT = 8600;

const setupAPI = (): void => {
  console.log("Setting up API");
  // setup express
  const api = express().use(cors(CORS_OPTIONS)).use(express.json());
  api.listen(PORT);

  // setup express routes
  api.use("/api/teams", teamsRoutes);

  console.log("API setup complete");
};

export { setupAPI };
