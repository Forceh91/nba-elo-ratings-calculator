import { DEFAULT_ELO_RATING } from "../elorating/elorating";

export default class NBATeam {
  private _eloRating: number = DEFAULT_ELO_RATING;
  private _eloRatingHistory: Array<number> = [];

  constructor(private _teamID: number, private _teamName: string, private _teamTricode: string) {}

  public get id() {
    return this._teamID;
  }

  public get name() {
    return this._teamName;
  }

  public get tricode() {
    return this._teamTricode;
  }

  public get eloRating() {
    return this._eloRating;
  }

  public get roundedEloRating() {
    return Math.round(this._eloRating);
  }

  public expectedOutcomeOnOpponent(opponent: NBATeam) {
    return 1.0 / (1 + Math.pow(10, (opponent.eloRating - this._eloRating) / 400.0));
  }

  public changeEloRating(byAmount: number, trackChange: boolean) {
    if (trackChange) this._eloRatingHistory.push(this._eloRating);
    this._eloRating += byAmount;
  }
}
