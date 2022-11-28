import NBASchedule from "./schedule/schedule";
import axios, { AxiosResponse } from "axios";
import NBAGame from "./game/nbagame";
import NBATeam from "./nbateam/nbateam";
import { EloRatings } from "./elorating/elorating";

function get2022Schedule() {
  let schedule: NBASchedule | undefined;

  axios
    .get("https://cdn.nba.com/static/json/staticData/scheduleLeagueV2_2.json", {
      headers: {
        "Accept-Encoding": "application/json",
      },
    })
    .then((resp: AxiosResponse) => {
      const data = resp.data;
      if (!data) return;

      // create the schedule
      schedule = new NBASchedule(data.leagueSchedule);

      // create elo rating calculator
      const eloRating = new EloRatings(schedule.teams, schedule.completedRegularSeasonGames);

      // calculate elo ratings
      eloRating.calculateEloForMatches();

      // print them
      eloRating.printSortedEloRatings();
    });
}

console.log("Fetching 2022 season schedule...");
get2022Schedule();
