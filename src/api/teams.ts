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
  const teamIDs = req.params.teamID.split(",");
  if (teamIDs.length === 1) {
    const team = schedule?.getTeamFromID(Number(req.params.teamID));
    if (!team) return res.sendStatus(404);

    team.setNextGame(schedule?.getNextGameForTeam(team.id));

    return res.send(team);
  } else {
    const teams = teamIDs.map((teamID: string) => schedule?.getTeamFromID(Number(teamID)));
    if (!teams || !teams.length) return res.sendStatus(404);

    return res.send(teams);
  }
});

export default router;
