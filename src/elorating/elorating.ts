import NBAGame from "../game/nbagame";
import NBAGameTeam from "../game/nbagameteam";
import NBATeam from "../nbateam/nbateam";
import NBASchedule from "../schedule/schedule";

const DEFAULT_ELO_RATING = 1500;
const KFACTOR = 20;

function calculateEloChange(expected: number, actual: number) {
  return KFACTOR * (actual - expected);
}

class EloRatings {
  constructor(private _teams: Array<NBATeam>, private _games: Array<NBAGame>) {}

  private getTeamFromID(teamID: number): NBATeam | undefined {
    return this._teams.find((team: NBATeam) => team.id === teamID);
  }

  public calculateEloForMatches() {
    const gamesToCalculate = this._games;
    gamesToCalculate.forEach((game: NBAGame) => {
      const gameHomeTeam = new NBAGameTeam(game.homeTeam);
      const gameAwayTeam = new NBAGameTeam(game.awayTeam);

      // get the teams
      const homeTeam = this.getTeamFromID(gameHomeTeam.id);
      if (!homeTeam) return;

      const versusTeam = this.getTeamFromID(gameAwayTeam.id);
      if (!versusTeam) return;

      // figure out win% for each and the actual winner
      const homeTeamWinChance = homeTeam?.expectedOutcomeOnOpponent(versusTeam);
      const homeResult = gameHomeTeam.gameScore > gameAwayTeam.gameScore ? 1 : 0;

      const versusTeamWinChance = versusTeam?.expectedOutcomeOnOpponent(homeTeam);
      const versusResult = gameHomeTeam.gameScore < gameAwayTeam.gameScore ? 1 : 0;

      // calculate the change amounts for home
      const homeTeamChange = calculateEloChange(homeTeamWinChance, homeResult);
      homeTeam.changeEloRating(homeTeamChange, true);

      // calculate the change amounts for away
      const versusTeamChange = calculateEloChange(versusTeamWinChance, versusResult);
      versusTeam.changeEloRating(versusTeamChange, true);
    });
  }

  public get sortedEloRatings(): Array<NBATeam> {
    return this._teams.sort((team1: NBATeam, team2: NBATeam) => team2.eloRating - team1.eloRating);
  }

  public printEloRatings(): void {
    console.log(
      this._teams.map((team: NBATeam) => ({ id: team.id, team: team.tricode, eloRating: team.roundedEloRating }))
    );
  }

  public printSortedEloRatings(): void {
    console.log("Elo Ratings after", this._games.length, "completed games:");
    console.log(
      this.sortedEloRatings.map((team: NBATeam) => ({
        team: team.tricode,
        eloRating: team.roundedEloRating,
      }))
    );
  }
}

export { DEFAULT_ELO_RATING, KFACTOR, calculateEloChange, EloRatings };
