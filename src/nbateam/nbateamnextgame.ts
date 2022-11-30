import NBATeam from "./nbateam";

export default class NBATeamNextGame {
  constructor(private _gameID: string, private _opponent: NBATeam) {}

  public get gameID(): string {
    return this._gameID;
  }

  public get opponent(): NBATeam {
    return this._opponent;
  }

  public toJSON(): object {
    return {
      gameID: this.gameID,
      opponent: this._opponent,
    };
  }
}
