export default class HistoricEloGame {
  constructor(
    private _gameID: string,
    private _eloBeforeGame: number,
    private _eloAfterGame: number,
    private _opponentId: number,
    private _opponentElo: number
  ) {}

  public get gameID(): string {
    return this._gameID;
  }

  public get eloBeforeGame(): number {
    return this._eloBeforeGame;
  }

  public get eloAfterGame(): number {
    return this._eloAfterGame;
  }

  public get opponentId(): number {
    return this._opponentId;
  }

  public get opponentElo(): number {
    return this._opponentElo;
  }

  public toJSON(): object {
    return {
      gameID: this.gameID,
      eloBeforeGame: this.eloBeforeGame,
      eloAfterGame: this.eloAfterGame,
      opponentId: this.opponentId,
      opponentElo: this._opponentElo,
    };
  }
}
