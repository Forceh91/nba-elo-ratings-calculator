export default class NBATeamNextGame {
  constructor(
    private _gameID: string,
    private _opponentID: number,
    private _opponentFullName: string,
    private _opponentTricode: string,
    private _opponentElo: number,
    private _winChance: number,
    private _potentialGain: number
  ) {}

  public get gameID(): string {
    return this._gameID;
  }

  public get opponent(): object {
    return {
      teamID: this._opponentID,
      fullName: this._opponentFullName,
      triCode: this._opponentTricode,
      rating: this._opponentElo,
    };
  }

  public get winChance(): number {
    return this._winChance * 100;
  }

  public get potentialGain(): number {
    return this._potentialGain;
  }

  public toJSON(): object {
    return {
      gameID: this.gameID,
      opponent: this.opponent,
      winChance: this.winChance,
      potentialGain: this.potentialGain,
    };
  }
}
