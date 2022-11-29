import express from "express";

import NBASchedule from "../schedule/schedule";
import { getNBASchedule } from "../schedule/schedulecontroller";

const router = express.Router();
router.get("/", function (req, res) {
  const schedule: NBASchedule | undefined = getNBASchedule();

  return res.send(schedule?.teams?.map((team) => team.toJSON()));
});

router.get("/:teamID", function (req, res) {
  const schedule: NBASchedule | undefined = getNBASchedule();
  const team = schedule?.getTeamFromID(Number(req.params.teamID));
  if (!team) res.sendStatus(404);

  return res.send(team);
});

export default router;
