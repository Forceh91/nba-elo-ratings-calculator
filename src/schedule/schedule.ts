// https://cdn.nba.com/static/json/staticData/scheduleLeagueV2_2.json

import NBAGame from "../game/nbagame";
import NBATeam from "../nbateam/nbateam";
import NBAGameTeam from "../game/nbagameteam";
import NBATeamNextGame from "../nbateam/nbateamnextgame";
import { calculateEloChange } from "../elorating/elorating";

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
      this._teams.push(new NBATeam(team.id, team.name, team.triCode, team.city));
    }
  }

  private doesTeamExist(teamID: number): boolean {
    return this._teams.find((team: NBATeam) => team.id === teamID) !== undefined;
  }

  public getTeamFromID(teamID: number): NBATeam | undefined {
    return this._teams.find((team: NBATeam) => team.id === teamID);
  }

  public getNextGameForTeam(teamID: number): NBATeamNextGame | undefined {
    const team: NBATeam = this.getTeamFromID(teamID);
    if (!team) return;

    let game: NBAGame = this.upcomingRegularSeasonGames.find(
      (game: NBAGame) =>
        new NBAGameTeam(game.homeTeam)?.id === team.id || new NBAGameTeam(game.awayTeam)?.id === team.id
    );
    if (!game) return;

    game = { ...game, awayTeam: new NBAGameTeam(game.awayTeam), homeTeam: new NBAGameTeam(game.homeTeam) };

    const isHome = game.homeTeam.id === team.id;
    const opponent: NBATeam = isHome ? this.getTeamFromID(game.awayTeam.id) : this.getTeamFromID(game.homeTeam.id);
    const expectedOutcome: number = team.expectedOutcomeOnOpponent(opponent);
    return new NBATeamNextGame(
      game.gameId,
      opponent.id,
      opponent.fullName,
      opponent.tricode,
      opponent.eloRating,
      expectedOutcome,
      calculateEloChange(expectedOutcome, 1)
    );
  }

  public get season(): string {
    return this.seasonYear;
  }

  public get games(): Array<NBAGame> {
    return this._games;
  }

  public get regularSeasonGames(): Array<NBAGame> {
    //The third digit in the game id is actually a flag for season type. 1 is preason, 2 regular season, 3 all star weekend, 4 play off and 5 play-ins
    return this._games.filter((game: NBAGame) => game.gameId && Number(game.gameId[2]) === 2);
  }

  public get completedGames(): Array<NBAGame> {
    return this._games.filter((game: NBAGame) => game.gameStatus === 3);
  }

  public get completedRegularSeasonGames(): Array<NBAGame> {
    return this.regularSeasonGames.filter((game: NBAGame) => game.gameStatus === 3);
  }

  public get upcomingRegularSeasonGames(): Array<NBAGame> {
    return this.regularSeasonGames
      .slice(this.completedRegularSeasonGames.length)
      .filter((game: NBAGame) => game.gameStatus !== 3);
  }

  public get teams(): Array<NBATeam> {
    return this._teams;
  }
}
