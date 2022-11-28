import NBASchedule from "./schedule/schedule";
import { createNBASchedule } from "./schedule/schedulecontroller";
import axios, { AxiosResponse } from "axios";
import { setupAPI } from "./api/main";
import { createEloRatings } from "./elorating/eloratingcontroller";
import { EloRatings } from "./elorating/elorating";

function get2022Schedule() {
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
      const schedule: NBASchedule = createNBASchedule(data.leagueSchedule);

      // create elo rating calculator
      const eloRating: EloRatings = createEloRatings(schedule?.teams, schedule?.games);

      // calculate elo ratings
      eloRating.calculateEloForMatches();

      // setup our api now everything is done
      setupAPI();
    });
}

console.log("Fetching 2022 season schedule...");
get2022Schedule();
