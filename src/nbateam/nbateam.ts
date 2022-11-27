import { DEFAULT_ELO_RATING } from "../elorating/elorating";

export default class NBATeam {
  private _eloRating: number = DEFAULT_ELO_RATING;
  private _eloRatingHistory: Array<number> = [];

  constructor(private _teamID: number) {
    this._teamID = _teamID;
  }

  public get id() {
    return this._teamID;
  }

  public get eloRating() {
    return this._eloRating;
  }

  public expectedOutcomeOnOpponent(opponent: NBATeam) {
    return 1.0 / (1 + Math.pow(10, (opponent.eloRating - this._eloRating) / 400.0));
  }

  public changeEloRating(byAmount: number, trackChange: boolean) {
    if (trackChange) this._eloRatingHistory.push(this._eloRating);
    this._eloRating += byAmount;
  }
}
