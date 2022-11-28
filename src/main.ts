import NBASchedule from "./schedule/schedule";
import { createNBASchedule } from "./schedulecontroller";
import axios, { AxiosResponse } from "axios";
import { EloRatings } from "./elorating/elorating";
import { setupAPI } from "./api/main";

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
      schedule = createNBASchedule(data.leagueSchedule);

      // create elo rating calculator
      const eloRating = new EloRatings(schedule.teams, schedule.completedRegularSeasonGames);

      // calculate elo ratings
      eloRating.calculateEloForMatches();

      // setup our api now everything is done
      setupAPI();
    });
}

console.log("Fetching 2022 season schedule...");
get2022Schedule();
