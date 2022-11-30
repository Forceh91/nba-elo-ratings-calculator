import schedule from "./data/schedule.json";
import NBATeam from "../src/nbateam/nbateam";
import NBASchedule from "../src/schedule/schedule";
import NBATeamNextGame from "../src/nbateam/nbateamnextgame";

describe("NBASchedule", () => {
  let nbaschedule: NBASchedule;

  beforeEach(() => {
    nbaschedule = new NBASchedule(schedule.leagueSchedule);
  });

  it("upcomingRegularSeasonGames: gets the upcoming regular season games correctly", (done) => {
    expect(nbaschedule.upcomingRegularSeasonGames.length).toBe(919);
    done();
  });

  it("getNextGameForTeam: gets the next upcoming game correctly", (done) => {
    const team: NBATeam | undefined = nbaschedule.teams.find((team: NBATeam) => team.tricode === "TOR");
    if (!team) return;

    const nextGame: NBATeamNextGame | undefined = nbaschedule.getNextGameForTeam(team?.id);
    if (!nextGame) return;

    const { triCode, fullName }: any = nextGame.opponent;

    expect(nextGame.gameID).toBe("0022200318");
    expect(triCode).toBe("NOP");
    expect(fullName).toBe("New Orleans Pelicans");
    done();
  });
});
