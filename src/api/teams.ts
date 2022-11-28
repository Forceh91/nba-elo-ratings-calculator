import express from "express";

import NBASchedule from "../schedule/schedule";
import { getNBASchedule } from "../schedulecontroller";

const router = express.Router();
router.get("/", function (req, res) {
  const schedule: NBASchedule | undefined = getNBASchedule();

  return res.send(schedule?.teams?.map((team) => team.toJSON()));
});

export default router;
