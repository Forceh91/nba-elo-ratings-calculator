// https://cdn.nba.com/static/json/staticData/scheduleLeagueV2_2.json

import NBAGame from "../game/nbagame";
import NBATeam from "../nbateam/nbateam";
import NBAGameTeam from "../game/nbagameteam";

export default class NBASchedule {
  private seasonYear: string = "";
  private leagueId: String = "";
  private gameDates: Array<NBAGame> = [];

  private _games: Array<NBAGame> = [];
  private _teams: Array<NBATeam> = [];

  constructor(data: Partial<NBASchedule>) {
    Object.assign(this, data);

    this._games = this.gameDates.reduce((acc: Array<NBAGame>, curr: any) => {
      acc.push(...curr.games);
      return acc;
    }, this._games);

    this.generateTeamsFromSchedule();
  }

  private generateTeamsFromSchedule(): void {
    this.completedRegularSeasonGames.forEach((game: NBAGame) => {
      this.addTeam(new NBAGameTeam(game.homeTeam));
      this.addTeam(new NBAGameTeam(game.awayTeam));
    });
  }

  private addTeam(team: NBAGameTeam): void {
    if (!this.doesTeamExist(team.id)) {
      this._teams.push(new NBATeam(team.id, team.name, team.triCode));
    }
  }

  private doesTeamExist(teamID: number): boolean {
    return this._teams.find((team: NBATeam) => team.id === teamID) !== undefined;
  }

  public getTeamFromID(teamID: number): NBATeam | undefined {
    return this._teams.find((team: NBATeam) => team.id === teamID);
  }

  public get games(): Array<NBAGame> {
    return this._games;
  }

  public get regularSeasonGames(): Array<NBAGame> {
    //The third digit in the game id is actually a flag for season type. 1 is preason, 2 regular season, 3 all star weekend, 4 play off and 5 play-ins
    return this._games.filter((game: NBAGame) => game.gameId && Number(game.gameId[2]) === 2);
  }

  public get completedGames(): Array<NBAGame> {
    return this._games.filter((game: NBAGame) => game.gameStatusText === "Final");
  }

  public get completedRegularSeasonGames(): Array<NBAGame> {
    return this.regularSeasonGames.filter((game: NBAGame) => game.gameStatusText === "Final");
  }

  public get teams(): Array<NBATeam> {
    return this._teams;
  }
}
