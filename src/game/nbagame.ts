import NBAGameTeam from "./nbagameteam";

export default class NBAGame {
  public gameId: string;
  public gameCode: number;
  public gameStatus: number;
  public gameStatusText: string;
  public homeTeam: NBAGameTeam;
  public awayTeam: NBAGameTeam;
}
