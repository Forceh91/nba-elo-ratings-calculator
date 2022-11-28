export default class NBAGameTeam {
  private teamId: number = 0;
  private teamName: string = "";
  private teamTricode: string = "";
  private teamCity: string = "";
  private score: number = 0;

  constructor(data: Partial<NBAGameTeam> = {}) {
    Object.assign(this, data);
  }

  public get id(): number {
    return this.teamId;
  }

  public get name(): string {
    return this.teamName;
  }

  public get triCode(): string {
    return this.teamTricode;
  }

  public get city(): string {
    return this.teamCity;
  }

  public get gameScore(): number {
    return this.score;
  }
}
