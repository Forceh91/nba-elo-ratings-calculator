import NBALeagueItem from "./nbaleagueitem";
import NBATeam from "../nbateam/nbateam";
import { calculateEloChange } from "../elorating/elorating";

export default class NBALeague {
  constructor(league?: NBALeague) {
    if (league) {
      this.standard = league.standard;
      this.getStandardTeams();
    }
  }

  private _standardTeams: Array<NBATeam> = [];
  public standard: Array<NBALeagueItem> = [];

  public get standardGames(): Array<NBALeagueItem> {
    return this.standard;
  }

  public get standardCompletedGames(): Array<NBALeagueItem> {
    return this.standard.filter((game: NBALeagueItem) => game.hTeam.win === "1" || game.vTeam.win === "1");
  }

  public get standardTeams(): Array<NBATeam> {
    return this._standardTeams;
  }

  private getStandardTeams(): void {
    this.standard.forEach((game: NBALeagueItem) => {
      this.addTeam(Number(game.hTeam.teamId));
      this.addTeam(Number(game.vTeam.teamId));
    });
  }

  private addTeam(teamID: number): void {
    if (!this.doesTeamExist(teamID)) this._standardTeams.push(new NBATeam(teamID));
  }

  private doesTeamExist(teamID: number): boolean {
    return this._standardTeams.find((team: NBATeam) => team.id === teamID) !== undefined;
  }

  private getTeamFromID(teamID: number): NBATeam | undefined {
    return this._standardTeams.find((team: NBATeam) => team.id === teamID);
  }

  public calculateEloForMatches() {
    const gamesToCalculate = this.standardCompletedGames.filter(
      (match: NBALeagueItem) => match.hTeam.score && match.vTeam.score
    );

    gamesToCalculate.forEach((match: NBALeagueItem) => {
      // get the teams
      const homeTeam = this.getTeamFromID(Number(match.hTeam.teamId));
      if (!homeTeam) return;

      const versusTeam = this.getTeamFromID(Number(match.vTeam.teamId));
      if (!versusTeam) return;

      // figure out win% for each and the actual winner
      const homeTeamWinChance = homeTeam?.expectedOutcomeOnOpponent(versusTeam);
      const homeResult = Number(match.hTeam.win);

      const versusTeamWinChance = versusTeam?.expectedOutcomeOnOpponent(homeTeam);
      const versusResult = Number(match.vTeam.win);

      // calculate the change amounts for home
      const homeTeamChange = calculateEloChange(homeTeamWinChance, homeResult);
      homeTeam.changeEloRating(homeTeamChange, true);

      // calculate the change amounts for away
      const versusTeamChange = calculateEloChange(versusTeamWinChance, versusResult);
      versusTeam.changeEloRating(versusTeamChange, true);
    });
  }
}
