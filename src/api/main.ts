import express from "express";
import cors from "cors";

import teamsRoutes from "./teams";
import ratingsRoutes from "./eloratings";

const CORS_OPTIONS = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

const PORT = 8600;

const setupAPI = (): void => {
  console.log("Setting up API");
  // setup express
  const api = express().use(cors(CORS_OPTIONS)).use(express.json());
  api.listen(PORT);

  // setup express routes
  const router = express.Router();
  router.use("/teams", teamsRoutes);
  router.use("/ratings", ratingsRoutes);
  api.use("/api/v:version", router);

  console.log("API setup complete");
};

export { setupAPI };
