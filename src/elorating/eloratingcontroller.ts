import NBAGame from "../game/nbagame";
import NBATeam from "../nbateam/nbateam";
import { EloRatings } from "./elorating";

let eloRatings: EloRatings;

function createEloRatings(teams: Array<NBATeam>, games: Array<NBAGame>): EloRatings {
  if (eloRatings) return eloRatings;
  return (eloRatings = new EloRatings(teams, games));
}

function getEloRatings(): EloRatings | undefined {
  return eloRatings;
}

export { createEloRatings, getEloRatings };
