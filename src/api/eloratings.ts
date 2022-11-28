import express from "express";

import { EloRatings } from "../elorating/elorating";
import { getEloRatings } from "../elorating/eloratingcontroller";

const router = express.Router();
router.get("/", function (req, res) {
  const ratings: EloRatings | undefined = getEloRatings();

  const isSortedLowToHigh = Number(req.query["lowToHigh"]);
  return res.send(ratings?.ratingsToJSON(isSortedLowToHigh === 1));
});

export default router;
