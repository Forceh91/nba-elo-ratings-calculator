import NBASchedule from "./schedule/schedule";
import axios, { AxiosResponse } from "axios";
import NBAGame from "./game/nbagame";
import NBATeam from "./nbateam/nbateam";
import { EloRatings } from "./elorating/elorating";

function get2022Schedule() {
  let schedule: NBASchedule | undefined;

  axios
    .get("https://cdn.nba.com/static/json/staticData/scheduleLeagueV2.json", {
      headers: {
        "Accept-Encoding": "application/json",
      },
    })
    .then((resp: AxiosResponse) => {
      const data = resp.data;
      if (!data) return;

      const leagueSchedule = data.leagueSchedule;
      const scheduledGameDates = leagueSchedule?.gameDates;
      const scheduledGames = scheduledGameDates.reduce((acc: Array<NBAGame>, curr: any) => {
        acc.push(...curr.games);
        return acc;
      }, []);

      // create the schedule
      schedule = new NBASchedule(leagueSchedule.seasonYear, leagueSchedule.leagueId, scheduledGames);

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
