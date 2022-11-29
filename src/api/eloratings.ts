import express from "express";
import NBASchedule from "../schedule/schedule";
import { getNBASchedule } from "../schedule/schedulecontroller";

import { EloRatings } from "../elorating/elorating";
import { getEloRatings } from "../elorating/eloratingcontroller";

const router = express.Router();
router.get("/", function (req, res) {
  const ratings: EloRatings | undefined = getEloRatings();
  const schedule: NBASchedule | undefined = getNBASchedule();

  const isSortedLowToHigh = Number(req.query["lowToHigh"]);
  return res.send({ season: schedule?.season, ...ratings?.ratingsToJSON(isSortedLowToHigh === 1) });
});

export default router;
