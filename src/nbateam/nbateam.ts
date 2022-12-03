import HistoricEloGame from "../elorating/historicelogame";
import { DEFAULT_ELO_RATING } from "../elorating/elorating";
import NBATeamNextGame from "./nbateamnextgame";

export default class NBATeam {
  private _eloRating: number = DEFAULT_ELO_RATING;
  private _eloRatingHistory: Array<number> = [];
  private _historicEloGames: Array<HistoricEloGame> = [];
  private _nextGame: NBATeamNextGame | null = null;
  private _wins: number = 0;

  constructor(
    private _teamID: number,
    private _teamName: string,
    private _teamTricode: string,
    private _teamCity: string
  ) {}

  public get id() {
    return this._teamID;
  }

  public get name() {
    return this._teamName;
  }

  public get tricode() {
    return this._teamTricode;
  }

  public get city() {
    return this._teamCity;
  }

  public get fullName() {
    return `${this._teamCity} ${this._teamName}`;
  }

  public get eloRating() {
    return this._eloRating;
  }

  public get roundedEloRating() {
    return Math.round(this._eloRating);
  }

  public get eloRatingHistory() {
    return [...this._eloRatingHistory, this.eloRating];
  }

  public get nextGame() {
    return this._nextGame;
  }

  public get games() {
    return this._eloRatingHistory.length;
  }

  public get wins() {
    return this._wins;
  }

  public get eloRatingChangeAverage(): number {
    // to do: this can be figured out during elo changes rather than when we need the data
    if (!this.eloRatingHistory || !this.eloRatingHistory.length) return 0.0;

    // use the history to figure out the average change in elo per game
    let changeTotal: number = this.eloRatingHistory.reduce((acc: number, curr: number, ix: number) => {
      if (!ix) return acc;

      // figure out the diff between this elo and the previous one
      const change = curr - this.eloRatingHistory[ix - 1];
      return acc + change;
    }, 0.0);

    return Number((changeTotal / this.eloRatingHistory.length).toFixed(1));
  }

  public get history(): Array<HistoricEloGame> {
    return this._historicEloGames;
  }

  private addWin(): void {
    this._wins++;
  }

  public expectedOutcomeOnOpponent(opponent: NBATeam) {
    return 1.0 / (1 + Math.pow(10, (opponent.eloRating - this._eloRating) / 400.0));
  }

  public changeEloRating(gameID: string, byAmount: number, trackChange: boolean, opponent: NBATeam) {
    const eloBeforeGame = this._eloRating;

    if (trackChange) this._eloRatingHistory.push(this._eloRating);
    this._eloRating += byAmount;

    // track games they did
    const historicEloGame: HistoricEloGame = new HistoricEloGame(
      gameID,
      eloBeforeGame,
      this._eloRating,
      opponent.id,
      opponent.eloRating
    );

    this._historicEloGames.push(historicEloGame);

    // increase wins if the elo went up
    if (byAmount > 0) this.addWin();
  }

  public setNextGame(nextGame: NBATeamNextGame) {
    this._nextGame = nextGame;
  }

  toJSON(): object {
    return {
      id: this._teamID,
      tricode: this._teamTricode,
      city: this._teamCity,
      name: this._teamName,
      fullName: this.fullName,
      eloRating: this.eloRating,
      roundedEloRating: this.roundedEloRating,
      eloRatingHistory: this.eloRatingHistory,
      eloRatingChangeAverage: this.eloRatingChangeAverage,
      history: this._historicEloGames,
      games: this.games,
      wins: this.wins,
      nextGame: this.nextGame,
    };
  }
}
