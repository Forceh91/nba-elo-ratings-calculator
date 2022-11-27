export default class NBAGameTeam {
  private teamId: number = 0;
  private teamName: string = "";
  private teamTricode: string = "";
  private score: number = 0;

  constructor(data: Partial<NBAGameTeam> = {}) {
    Object.assign(this, data);
  }

  public get id() {
    return this.teamId;
  }

  public get name() {
    return this.teamName;
  }

  public get triCode() {
    return this.teamTricode;
  }

  public get gameScore() {
    return this.score;
  }
}
